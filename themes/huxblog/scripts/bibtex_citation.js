function generateBibtexCitation(citationObject) {
    let bibtexCitation = '@' + (citationObject.citation_type ?? '') + '{' + (citationObject.citation_id ?? '') + ',\n';

    for (const key in citationObject) {
        if (key !== 'citation_type' && key !== 'citation_id') {
            bibtexCitation += '    ' + key + '={' + citationObject[key] + '},\n';
        }
    }

    bibtexCitation = bibtexCitation.trim() + '\n}';
    return bibtexCitation;
}

hexo.extend.helper.register('bibtex_citation', generateBibtexCitation);
