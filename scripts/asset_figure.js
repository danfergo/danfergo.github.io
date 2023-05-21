const marked = require('marked');

// Create a custom renderer
const customRenderer = new marked.Renderer();

// Override the paragraph function
customRenderer.paragraph = function(text) {
    return text; // Return the text without the <p> tag
};

// Set the custom renderer as an option
marked.setOptions({ renderer: customRenderer });

hexo.extend.tag.register('asset_figure', function (args) {
    const [filename, altText] = args;
    const imageUrl = hexo.config.root + this.path + filename;

    // Initialize the count if it doesn't exist
    if (!this.assetFigureCount) {
        this.assetFigureCount = 0;
    }

    // Increment the count
    this.assetFigureCount++;

    return `<figure>
            <img src="${imageUrl}" alt="${altText}">
            <figcaption><strong>Figure ${this.assetFigureCount}. </strong> ${marked(altText ?? '')}</figcaption>
          </figure>`;
});