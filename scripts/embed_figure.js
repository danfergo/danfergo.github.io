const marked = require('marked');

// Create a custom renderer
const customRenderer = new marked.Renderer();

// Override the paragraph function
customRenderer.paragraph = function (text) {
    return text; // Return the text without the <p> tag
};

// Set the custom renderer as an option
marked.setOptions({renderer: customRenderer});


hexo.extend.tag.register('embed_figure', function (args) {
    const assetPath = (id) => hexo.config.root + this.path + id;

    const argsZeroArgs = args[0].split(':');
    const styleArgs = argsZeroArgs.slice(1);

    const embedType = argsZeroArgs[0];

    const id = args[1];
    const caption = args.length > 2 ? args[2] : undefined;


    let content;
    let captionLabel;

    const pad = styleArgs.indexOf('pad') > -1;

    switch (embedType) {
        case 'img':
        case 'image':
            captionLabel = 'Figure';
            let imgStyle = 'width:100%; margin:0;' + (pad ? 'padding: 1%;' : 'padding: 0;')
            const multiId = id.split(':');
            if (multiId.length > 1) {
                const imgsHTML = multiId.map(imgId => `<div><img src="${assetPath(imgId)}" draggable="false"></div>`).join('');
                content = `
                        <div class="embed-figure-carousel-wrapper"  style="${imgStyle}; padding-bottom: 0;">
                            <div class="embed-figure-carousel">
                            ${imgsHTML}
                            </div>
                            <div class="navigation">
                                <div>
                                    <div class="nav-button nav-prev"><i class="fa fa-chevron-left"></i></div>
                                </div>
                                <div class="pagination"></div>
                                <div>
                                    <div class="nav-button nav-next"><i class="fa fa-chevron-right"></i></div>
                                </div>
                            </div>
                        </div> 
                `
            } else {
                content = `<img style="${imgStyle}" src="${assetPath(id)}">`;
            }


            break;
        case 'video':
            captionLabel = 'Video';
            const videoUrl = hexo.config.root + this.path + id;
            const defaultFormat = 'mp4';
            const videoFormat = ((id.split('.') ?? [defaultFormat]).slice(-1)[0] ?? defaultFormat).toLowerCase();
            content = `<video width="600" height="300" controls style="display: block;">
                          <source src="${videoUrl}" type="video/${videoFormat}">
                          <div style="padding:1rem;">Your browser does not support the video tag.</div>
                      </video>`;
            break;
        case 'youtube':
            captionLabel = 'Video';
            content = `<iframe width="560" height="315" 
                        src="https://www.youtube.com/embed/${id}" 
                        title="YouTube video player" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowfullscreen></iframe>`;
            break;
    }


    // Initialize & increment the embed type counter.
    const mediaType = captionLabel.toLowerCase();
    this.embedFigureCount = this.embedFigureCount || {};
    this.embedFigureCount[mediaType] = this.embedFigureCount[mediaType] || 0;
    this.embedFigureCount[mediaType]++;


    const cls = caption && caption.length > 0 ? 'fig-caption': 'fig-no-caption';
    const captionHTML = caption && caption.length ? `<figcaption><strong>${captionLabel} ${this.embedFigureCount[mediaType]}. </strong> ${marked(caption ?? '')}</figcaption>` : '';

    return `<figure class="${cls}">
            ${content}
            ${captionHTML}
          </figure>`;
});