const mainContainer = document.querySelector("[class*=paywalledContent]");

function renderItems(items, container, afterNode, defaultNodeType = "p") {
    console.log("renderItems", items, container, defaultNodeType);
    items.forEach(e => {
        if (e.type == "ad" || e.type == "piano" || e.type == "newsletterAd"){
            return;
        }
        var txt = e.text;
        var skipInnerHtml = false;
        var nodeType = defaultNodeType;
        if (e.type == "list"){
            if (e.list.isOrdered){
                nodeType = "ul" ; 
            }else{
                nodeType = "ol" ; 
            }
            skipInnerHtml = true;
        }
        const node = document.createElement(nodeType);
        if (afterNode?.className){
            node.className = afterNode.className;
        }
        if (e.type == "list"){
            if (e.list.isOrdered){
                node.style = "list-style-type: upper-roman;"
            }else{
                node.style = "list-style-type: circle;"
            }
        }
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
        if (e.type == "listItem"){
            node.style = "margin-left: 16px"
            txt = "- " + txt
        }
        container.appendChild(node);
        if (!skipInnerHtml){
            node.innerHTML = txt || ("TODO: implement type " + e.type);
        }
        if (img){
            node.appendChild(img);
        }
        if (afterNode){
            afterNode.after(node);
        }
        if (e.type == "list"){
            var listItems = e.list.items.map(i => ({...i, type: "list-item"}))
            renderItems(listItems, node, null, "li");
        }
        afterNode = node;
    });
}

renderItems(Fusion.globalContent.elements, mainContainer, document.querySelector("[class*=paywalledContent] > p"));
document.querySelector("[class*=paywalledContent]").style = "height:fit-content!important";
document.querySelector("#piano-lightbox-article-kn").remove();
document.querySelector("[class*=RecommendationContainer]").remove();