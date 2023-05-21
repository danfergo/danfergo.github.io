function removeTagsFromString(inputString, tagList = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'figure', 'figcaption']) {
    let outputString = inputString;

    tagList.forEach(tag => {
        const regex = new RegExp(`<${tag}\\b[^>]*>|<\\/${tag}>`, 'gi');
        outputString = outputString.replace(regex, '');
    });

    return outputString;
}

hexo.extend.helper.register('clean_html', removeTagsFromString);

