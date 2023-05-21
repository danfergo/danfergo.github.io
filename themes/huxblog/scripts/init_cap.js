hexo.extend.helper.register('init_cap', (str) => {
    return str.replace(/\<p\>\s*([\W\w])/, (_, cap) => '<p><span class="init-cap">' + cap + '</span>');
});


