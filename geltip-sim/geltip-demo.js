class DataViewReader {
    constructor(dataViewOrBuffer) {
        if (dataViewOrBuffer instanceof DataView) {
            this.dataView = dataViewOrBuffer;
        } else if (dataViewOrBuffer instanceof ArrayBuffer) {
            this.dataView = new DataView(dataViewOrBuffer);
        }
        this.offset = 0;
    }

    /* Variable length accessors */

    readBytes(length) {
        const buffer = new DataView(this.dataView.buffer, this.offset, length)
        this.offset += length;
        return buffer;
    }

    readAndASCIIDecodeBytes(length) {
        const array = new Uint8Array(this.dataView.buffer, this.offset, length)
        this.offset += length;
        return this._decodeASCIIByteArray(array);
    }

    /* Fixed length accessors */

    readUint8(littleEndian = false) {
        const value = this.dataView.getUint8(this.offset, littleEndian);
        this.offset += Uint8Array.BYTES_PER_ELEMENT;
        return value;
    }

    readUint16(littleEndian = false) {
        const value = this.dataView.getUint16(this.offset, littleEndian);
        this.offset += Uint16Array.BYTES_PER_ELEMENT;
        return value;
    }

    readUint32(littleEndian = false) {
        const value = this.dataView.getUint32(this.offset, littleEndian);
        this.offset += Uint32Array.BYTES_PER_ELEMENT;
        return value;
    }

    /* Helpers */

    _decodeASCIIByteArray(array) {
        const characters = []
        for (const byte of array) {
            const char = String.fromCharCode(byte);
            characters.push(char);
        }
        return characters.join('');
    }
}

function fromArrayBuffer(buffer) {
    if (!buffer instanceof ArrayBuffer) {
        throw new Error('Argument must be an ArrayBuffer.');
    }
    const reader = new DataViewReader(buffer);
    // comments are taken from https://docs.scipy.org/doc/numpy-1.14.1/neps/npy-format.html#format-specification-version-1-0
    // "The first 6 bytes are a magic string: exactly "x93NUMPY""
    const magicByte = reader.readUint8();
    const magicWord = reader.readAndASCIIDecodeBytes(5);
    if (magicByte != 0x93 || magicWord != 'NUMPY') {
        throw new Error(`unknown file type: "${magicByte}${magicWord}"`);
    }
    // "The next 1 byte is an unsigned byte: the major version number of the file format, e.g. x01.""
    const versionMajor = reader.readUint8();
    // "The next 1 byte is an unsigned byte: the minor version number of the file format, e.g. x00."
    const versionMinor = reader.readUint8();
    // Parse header length. This depends on the major file format version as follows:
    let headerLength;
    if (versionMajor <= 1) {
        // "The next 2 bytes form a little-endian unsigned short int: the length of the header data HEADER_LEN."
        headerLength = reader.readUint16(true);
    } else {
        // "The next 4 bytes form a little-endian unsigned int: the length of the header data HEADER_LEN."
        headerLength = reader.readUint32(true);
    }
    /* "The next HEADER_LEN bytes form the header data describing the array’s format.
    It is an ASCII string which contains a Python literal expression of a dictionary.
    It is terminated by a newline (‘n’) and padded with spaces (‘x20’) to make the total
    length of the magic string + 4 + HEADER_LEN be evenly divisible by 16." */
    const preludeLength = 6 + 4 + headerLength;
    if (preludeLength % 16 != 0) {
        console.warn(`NPY file header is incorrectly padded. (${preludeLength} is not evenly divisible by 16.)`)
    }
    const headerStr = reader.readAndASCIIDecodeBytes(headerLength);
    const header = parseHeaderStr(headerStr);
    if (header.fortran_order) {
        throw new Error('NPY file is written in Fortran byte order, support for this byte order is not yet implemented.')
    }
    // Intepret the bytes according to the specified dtype
    const constructor = typedArrayConstructorForDescription(header.descr);
    const data = new constructor(buffer, reader.offset);
    // Return object with same signature as NDArray expects: {data, shape}
    return { data: data, shape: header.shape };
}


function parseHeaderStr(headerStr) {
    const jsonHeader = headerStr
        .toLowerCase() // boolean literals: False -> false
        .replace('(','[').replace('),',']') // Python tuple to JS array: (10,) -> [10,]
        .replace('[,','[1,]').replace(',]',',1]') // implicit dimensions: [10,] -> [10,1]
        .replace(/'/g, '"'); // single quotes -> double quotes
    return JSON.parse(jsonHeader);
}


function typedArrayConstructorForDescription(dtypeDescription) {
    /* 'dtype' description strings consist of three characters, indicating one of three
       properties each: byte order, data type, and byte length.
       Byte order: '<' (little-endian), '>' (big-endian), or '|' (not applicable)
       Data type: 'u' (unsigned), 'i' (signed integer), 'f' (floating)
       Byte Length: 1, 2, 4 or 8 bytes
       Note that for 1 byte dtypes there is no byte order, thus the use of '|' (not applicable).
       Data types are specified in numpy source:
       https://github.com/numpy/numpy/blob/8aa121415760cc6839a546c3f84e238d1dfa1aa6/numpy/core/_dtype.py#L13
     */
    switch (dtypeDescription) {

        // Unsigned Integers
        case '|u1':
            return Uint8Array;
        case '<u2':
            return Uint16Array;
        case '<u4':
            return Uint32Array;
        case '<u8':
            throw new Error('Because JavaScript doesn\'t currently include standard support for 64-bit unsigned integer values, support for this dtype is not yet implemented.');

        // Integers
        case '|i1': // "byte"
            return Int8Array;
        case '<i2': // "short"
            return Int16Array;
        case '<i4': // "intc"
            return Int32Array;
        case '<i8': // "longlong" (??)
            throw new Error('Because JavaScript doesn\'t currently include standard support for 64-bit integer values, support for this dtype is not yet implemented.');

        // Floating
        case '<f2': // "half"
            throw new Error('Because JavaScript doesn\'t currently include standard support for 16-bit floating point values, support for this dtype is not yet implemented.');
        case '<f4': // "single"
            return Float32Array;
        case '<f8': // "double" "longfloat"
            return Float64Array;

        // No support for ComplexFloating, on-number types (flexible/character/void...) yet

        default:
            throw new Error('Unknown or not yet implemented numpy dtype description: ' + dtype);
    }
}

function displayImage(id, njArray) {
    const height = njArray.shape[0];
    const width = njArray.shape[1];
    const channels = njArray.shape[2];

    // Find an existing canvas with the given ID or create a new one
    let canvas = document.getElementById(id);
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = id;
        document.body.appendChild(canvas);
    }

    // Update canvas dimensions
    canvas.width = width;
    canvas.height = height;

    // Get the 2D rendering context
    const ctx = canvas.getContext('2d');

    // Create an ImageData object from the NumJS array
    const imageData = ctx.createImageData(width, height);

    const flattenedArray = njArray.flatten().tolist();
    console.log('channels', channels)
    for (let i = 0, j = 0; i < flattenedArray.length; i += channels, j += 4) {
        imageData.data[j] = channels === 1 ? Math.round(flattenedArray[i] * 255) : Math.round(flattenedArray[i] * 255); // Normalize to 0-255 range
        imageData.data[j + 1] = channels === 1 ? Math.round(flattenedArray[i] * 255) : Math.round(flattenedArray[i + 1] * 255); // Normalize to 0-255 range
        imageData.data[j + 2] = channels === 1 ? Math.round(flattenedArray[i] * 255) : Math.round(flattenedArray[i + 2] * 255); // Normalize to 0-255 range
        imageData.data[j + 3] = channels === 4 ? Math.round(flattenedArray[i + 3] * 255) : 255; // Set alpha to 255 (opaque) if there are only 3 channels
    }

    // Draw the image data onto the canvas
    ctx.putImageData(imageData, 0, 0);
}

async function loadTiffImage(url) {
    // console.log('TIFIF')
    // const tiff = await GeoTIFF.fromUrl(url);
    // console.log('tiff', tiff);
    // const image = await tiff.getImage();
    // const width = image.getWidth();
    // const height = image.getHeight();
    // const samplesPerPixel = image.getSamplesPerPixel();
    // const data = await image.readRasters({ interleave: true });
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const tiff = await GeoTIFF.fromArrayBuffer(arrayBuffer);
    const image = await tiff.getImage();
    const width = image.getWidth();
    const height = image.getHeight();
    const samplesPerPixel = image.getSamplesPerPixel();

    const data = await image.readRasters({interleave: true});

    const njArray = nj.array(data, dtype = nj.float32).reshape(height, width, samplesPerPixel);

    return {
        width,
        height,
        samplesPerPixel,
        njArray,
    };
}
//
// loadTiffImage('bkg2.tiff')
//     .then((imageData) => {
//         console.log('DATA!', imageData.njArray);
//         displayImage('myCanvas', imageData.njArray);
//     })
//     .catch((error) => console.error('Error loading the TIFF image:', error));

async function loadNumpyArray(url) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();

    // const response = await fetch(url);
    // const arrayBuffer = await response.arrayBuffer();
    console.log('-- 1. ')
    const { data, shape } = fromArrayBuffer(arrayBuffer);

    // Parse the ArrayBuffer into a JavaScript array
    // const numpyParser = new NumpyParser();
    // const jsArray = numpyParser.parse(arrayBuffer);
    console.log('data', data, shape)
    return nj.array(data).reshape(shape);
}

async function main() {

const depth = await loadNumpyArray('depth_1.npy');
console.log(depth, depth.shape, depth.selection.data[0]);
let normed = depth;
normed = normed.subtract(normed.min());
// normed = normed.divide(normed.max());
console.log('---', normed.max());
displayImage('myCanvas', normed);

// console.log('JavaScript array shape:', jsArray.shape);
// console.log('JavaScript array data:', jsArray.data);
}

main();

// Fetch the binary NumPy array data from a file (using the Fetch API, for example)
// fetch('geltip-sim/numpy_array_bin.npy')
//     .then((response) => response.arrayBuffer())
//     .then((arrayBuffer) => {
//         console.log(window);
//         // Convert the binary data to a JavaScript array
//         const jsArray = parse(arrayBuffer);
//
//         // Use the JavaScript array as needed
//         console.log(jsArray);
//     })
//     .catch((error) => console.error('Error loading the binary NumPy array:', error));


const a = nj.array([2, 3, 4]);

console.log('A', a);


// Create the scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 5;

// Create the renderer
// renderer.setSize(window.innerWidth, window.innerHeight);
const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
renderer.setSize(640, 480, false);


const params = {
    format: THREE.DepthFormat,
    type: THREE.UnsignedShortType
};

const formats = {DepthFormat: THREE.DepthFormat, DepthStencilFormat: THREE.DepthStencilFormat};
const types = {
    UnsignedShortType: THREE.UnsignedShortType,
    UnsignedIntType: THREE.UnsignedIntType,
    UnsignedInt248Type: THREE.UnsignedInt248Type
};


const camera2 = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera2.position.z = 1;


const renderer2 = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
renderer2.setPixelRatio(window.devicePixelRatio);
renderer2.setSize(640, 480, false);

const format = parseFloat(params.format);
const type = parseFloat(params.type);

target = new THREE.WebGLRenderTarget(640, 480);
target.texture.minFilter = THREE.NearestFilter;
target.texture.magFilter = THREE.NearestFilter;
target.stencilBuffer = (format === THREE.DepthStencilFormat) ? true : false;
target.depthTexture = new THREE.DepthTexture();
target.depthTexture.format = format;
target.depthTexture.type = type;
console.log('---', type, format);


const dpr = renderer2.getPixelRatio();
target.setSize(640 * dpr, 480 * dpr);


document.querySelector('#geltip-demo-scene').appendChild(renderer.domElement);
document.querySelector('#geltip-demo-depth').appendChild(renderer2.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// Load the STL file
const loader = new THREE.STLLoader();
let meshObject;
loader.load("assets/meshes/elastomer.stl", function (geometry) {
    const material = new THREE.MeshBasicMaterial({color: 'white'});
    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(0.01, 0.01, 0.01);
    scene.add(mesh);
    meshObject = mesh;
});


// Render the scene
function animate() {
    requestAnimationFrame(animate);
    if (meshObject) {
        meshObject.rotation.x += 0.01;
        meshObject.rotation.y += 0.01;
    }
    renderer.render(scene, camera);

    renderer2.setRenderTarget(target);
    renderer2.render(scene, camera2);
}

animate();

