function download(href: string, name: string) {
    var a = document.createElement("a");

    a.download = name;
    a.href = href;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function inlineSvg(svg: SVGElement) {
    //get svg source.
    var serializer = new XMLSerializer();
    var source = serializer.serializeToString(svg);

    //add name spaces.
    if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
        source = source.replace(
            /^<svg/,
            '<svg xmlns="http://www.w3.org/2000/svg"'
        );
    }
    if (!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
        source = source.replace(
            /^<svg/,
            '<svg xmlns:xlink="http://www.w3.org/1999/xlink"'
        );
    }

    //add xml declaration
    source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

    //convert svg source to URI data scheme.
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
}

export function downloadSVG(svg: SVGElement, filename: string) {
    const url = inlineSvg(svg);
    download(url, filename);
}
