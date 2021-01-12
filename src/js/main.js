let products = document.getElementById("js-product-wrapper");
let productDetail = document.getElementById("js-product-detail")

// if (location.search) {
//     let data = {
//         catIndex: location.search.split('catindex=')[1].split('&'),
//         subCatIndex: location.search.split('subCatIndex=')[1].split('&'),
//         prodIndex:  location.search.split('prodIndex=')[1].split('&'),
//     }
//     openProductDetail(data.catIndex, data.subCatIndex, data.prodIndex)
// }

let categoryItem = ''
demonstration.category.forEach((c, index) => {
    categoryItem += `
<div class="category__item slider__item" onclick="openCategory(${index})">
                    <div class="category__title">${c.cName}</div>
                     </div>`
});
document.getElementById('js-category-list').innerHTML = categoryItem;
// let subCategoryItemFirst = ''
// demonstration.category[0].subCategory.forEach((sc, indexSubCat) => {
//     subCategoryItemFirst += `
//                         <div class="category__sub slider__item">
//                         <div class="category__sub-item" onclick="openProductList(${0}, ${indexSubCat})">${sc.subCName}</div>
//                         </div>`
// })
// document.getElementById('js-category-inner').innerHTML = subCategoryItemFirst
// let productItemFirst = ''
// demonstration.category[0].subCategory[0].subCLinks.forEach((scl, sclIndex) => {
//     productItemFirst += `<div class="product__item">
//                             <div class="product__item-title" onclick="openProductDetail(${0}, ${0}, ${sclIndex})">${scl.linkName}</div>
//                         </div>`
//
// })
// document.getElementById('js-product-wrapper').innerHTML = productItemFirst

function openCategory(index) {
    let subCategoryItem = ''
    demonstration.category[index].subCategory.forEach((sc, indexSubCat) => {
        subCategoryItem += `
                        <div class="category__sub slider__item">
                        <div class="category__sub-item" onclick="openProductList(${index}, ${indexSubCat})">${sc.subCName}</div>
                        </div>`
    })
    document.getElementById('js-category-inner').innerHTML = subCategoryItem
}
function openProductList(index, indexSubCat) {
    let productItem = ''
    demonstration.category[index].subCategory[indexSubCat].subCLinks.forEach((scl, sclIndex) => {
        productItem += `<div class="product__item slider__item">
                            <div class="product__item-title" onclick="openProductDetail(${index}, ${indexSubCat}, ${sclIndex})">${scl.linkName}</div>
                        </div>`

    })
    document.getElementById('js-product-wrapper').innerHTML = productItem
}
function openProductDetail(catIndex, subCatIndex, prodIndex) {
    location.replace(location.host)
    const prod = demonstration.category[catIndex].subCategory[subCatIndex].subCLinks[prodIndex]
    productInfo = ''
    productInfo += `   <div class="product__name">Name: ${prod.linkName}</div>
                <div class="product__name">Category: ${demonstration.category[catIndex].cName}</div>
                <div class="product__name">Description: ${prod.info}</div>
                    <div class="dolphinContainer">

                <div class="divState">
                    <button class="dsState mobileState" onclick="changeState(this)">Mobile</button>
                    <button class="dsState desktopState" onclick="changeState(this)">Desktop</button>
                </div>
                   <div id="divIframe">
                    <center>
                        <iframe id="dsIframe" src="${prod.link}"></iframe>
                    </center>
                </div>
            </div>
    `
    location.replace(location.href + `?=${catIndex}&=${subCatIndex}&=${prodIndex}`)
    document.getElementById('js-product-info').innerHTML = productInfo
    location.replace(location.href + `?catIndex=${catIndex}&subCatIndex=${subCatIndex}&prodIndex=${prodIndex}`)
}

//video//
var isMobile2 = false;
var divState = document.getElementsByClassName("divState")[0];

changeView();

function changeView() {
    isMobile2 = false;
    isMobile2 = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile2) {
        dsIframe.height = "600";
        dsIframe.width = "320";
        dsIframe.setAttribute("state", "mobile");
        divState.style.display = "none";
        dsIframe.contentWindow.location.reload();
        return;
    } else {
        dsIframe.height = "550";
        dsIframe.width = "970";
        dsIframe.setAttribute("state", "desktop");
        divState.style.display = "block";
        dsIframe.contentWindow.location.reload();
        return;
    }

}

function changeState(e) {

    if (e.classList[1] == "mobileState") {
        isMobile2 = true;
        dsIframe.setAttribute("height", 600);
        dsIframe.setAttribute("width", 320)
        dsIframe.setAttribute("state", "mobile");
        dsIframe.contentWindow.location.reload();
        return;
    } else if (e.classList[1] == "desktopState") {
        isMobile2 = false;
        dsIframe.setAttribute("height", 550);
        dsIframe.setAttribute("width", 970);
        dsIframe.setAttribute("state", "desktop");
        dsIframe.contentWindow.location.reload();
        return;
    }
}

function changeIframe(e) {
    dsIframe.src = e.name
    dsIframe.setAttribute("src", e.name);
}