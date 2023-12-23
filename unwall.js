const container = document.querySelector("[class*=paywalledContent]");
var p = document.querySelector("[class*=paywalledContent] > p");
Fusion.globalContent.elements.forEach(e => {
    if (e.type == "ad" || e.type == "piano" || e.type == "newsletterAd"){
        return;
    }
    var txt = e.text;
    const node = document.createElement("p");
    node.className = p.className;
    if (e.type == "header"){
        node.style = "font-size: x-large;";
    }
    var img;
    if (e.type == "image") {
        img = document.createElement("img");
        img.src = e.imageInfo.src;
        img.alt = e.imageInfo.alt;
        txt = e.imageInfo.caption;
    }
    if (e.type == "customEmbed"){
        var iframe = document.createElement("iframe");
        iframe.src = e.embed.url;
        iframe.style = "width: 100%; height: 500px; background: #97acbf";	
        container.appendChild(iframe);
        txt = "s. unten oder <a href='" + e.embed.url + "'>hier</a>";
    }
    if (e.type == "rawHtml"){
        txt = e.html;
    }
    container.appendChild(node);
    node.innerHTML = txt || ("TODO: implement type " + e.type);
    if (img){
        node.appendChild(img);
    }
    p.after(node);
    p = node;
});
document.querySelector("[class*=paywalledContent]").style = "height:fit-content!important";
document.querySelector("#piano-lightbox-article-kn").remove();
document.querySelector("[class*=RecommendationContainer]").remove();