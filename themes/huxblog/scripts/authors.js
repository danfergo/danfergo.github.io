hexo.extend.helper.register('authors', (authorsList) => {
    const styl = ' style="word-break: keep-all; white-space: nowrap;"';
    const authors = hexo.config.authors || {};

    return (authorsList || []).map((id, i) => {

        if (id === 'etc') {
            return `<span ${styl}> et. al</span>`;
        }
        const author = authors[id];
        const name = author.name || ('--- ---')
            .split(' ')
            .map((n, j, names) => (j === names.length - 1) ? n : `${n[0]}<span>${n.slice(1)}</span>`)
            .join(' ');

        const wrappedName = author.site ? `<a href="${author.site}">${name}</a>` : name;
        const addAnd = i === authorsList.length - 1 && id !== 'end';
        const pre = addAnd ? ' and ' : '';
        const pos = (i < authorsList.length - 2) ? ', ' : '';
        return `<span ${addAnd ? styl : ''}>${pre}${wrappedName}${pos}</span>`;
    }).join('');
});


