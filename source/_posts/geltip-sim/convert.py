import numpy as np
from PIL import Image

file_name = "bkg"

# Read the NumPy array from a file (change the file path as needed)
numpy_array = np.load(f'{file_name}.npy')

print(numpy_array.shape)

# Convert the NumPy array to a PIL image
image = Image.fromarray(numpy_array)
print(numpy_array.dtype)
# Save the PIL image as a BMP file
image.save(f'{file_name}.tiff')