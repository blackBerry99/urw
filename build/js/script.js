var demonstration = {
    category: [
        {
            cName: "scratch",
            subCLinks: [
                {
                    linkName: "Emek",
                    link: "https://adsil1.com/tools/demonstrations/emek/0917/index.html",
                    info: "some text"
                },
                {
                    linkName: "swipe Game Cellcom",
                    link: "https://adsil1.com/tools/demonstration/cellcom/swipe_game/1018/index.html",
                    info: "some text"
                },
            ],
            subCategory: [
                {
                    subCName: "tinder",

                },
                {
                    subCName: "up down",
                    subCLinks: [
                        {
                            linkName: "XL",
                            link: "https://adsil1.com/tools/demonstration/XL/1905/live/index.html",
                            info: "some text"
                        },
                        {
                            linkName: "Knor",
                            link: "http://ds1.co.il/demonstrations/knor/1217/index.html",
                        },
                        {
                            linkName: "clalitWheelOfFortune",
                            link: "http://adsil1.com/tools/demonstration/clalitWheelOfFortune/index.html",
                            info: "some text"
                        },
                        {
                            linkName: "cafejoestraw",
                            link: "http://adsil1.com/tools/demonstration/cafejoestraw062016/index.html",
                            info: "some text"
                        },
                        {
                            linkName: "lotus",
                            link: "http://adsil1.com/tools/demonstration/lotusdip022016/index.html",
                            info: "some text"
                        },
                    ],
                },
                {
                    subCName: "moveElement",
                    subCLinks: [
                        {
                            linkName: "BOX",
                            link: "http://adsil1.com/tools/demonstration/hashmalBox122016/index.html",
                            info: "some text"
                        },
                        {
                            linkName: "Yoplait",
                            link: "http://adsil1.com/tools/demonstration/yopllait/index.html",
                            info: "some text"
                        },

                    ],
                },
                {
                    subCName: "ninja",
                    subCLinks: [{
                        linkName: "fruit NINJA",
                        link: "http://adsil1.com/tools/demonstration/fruit/index.html",
                        info: "some text"
                    },

                    ],
                },
                {
                    subCName: "tinder",
                    subCLinks: [
                        {
                            linkName: "Emek",
                            link: "https://adsil1.com/tools/demonstrations/emek/0917/index.html",
                            info: "some text"
                        },
                        {
                            linkName: "swipe Game Cellcom",
                            link: "https://adsil1.com/tools/demonstration/cellcom/swipe_game/1018/index.html",
                            info: "some text"
                        },
                    ]
                },
                {
                    subCName: "up down",
                    subCLinks: [
                        {
                            linkName: "XL",
                            link: "https://adsil1.com/tools/demonstration/XL/1905/live/index.html",
                        },
                        {
                            linkName: "Knor",
                            link: "http://ds1.co.il/demonstrations/knor/1217/index.html",
                        },
                        {
                            linkName: "clalitWheelOfFortune",
                            link: "http://adsil1.com/tools/demonstration/clalitWheelOfFortune/index.html",
                        },
                        {
                            linkName: "cafejoestraw",
                            link: "http://adsil1.com/tools/demonstration/cafejoestraw062016/index.html",
                        },
                        {
                            linkName: "lotus",
                            link: "http://adsil1.com/tools/demonstration/lotusdip022016/index.html",
                        },
                    ],
                },
                {
                    subCName: "moveElement",
                    subCLinks: [
                        {
                            linkName: "BOX",
                            link: "http://adsil1.com/tools/demonstration/hashmalBox122016/index.html",
                        },
                        {
                            linkName: "Yoplait",
                            link: "http://adsil1.com/tools/demonstration/yopllait/index.html",
                        },

                    ],
                },
                {
                    subCName: "ninja",
                    subCLinks: [{
                        linkName: "fruit NINJA",
                        link: "http://adsil1.com/tools/demonstration/fruit/index.html",

                    },

                    ],
                },
            ],

        },

        {
            cName: "video",
            cIcon: "../../../src/images/icons/video.png",
            subCLinks: [
                {
                    linkName: "One",
                    link: "https://adsil1.com/tools/demonstrations/emek/0917/index.html",
                    info: "some text"
                },
                {
                    linkName: "Two",
                    link: "https://adsil1.com/tools/demonstration/cellcom/swipe_game/1018/index.html",
                    info: "some text"
                },
            ],
        },

        {
            cName: "fifty",
            cIcon: "../../../src/images/icons/50_50.png",
        },

        {
            cName: "games",
            cIcon: "../../../src/images/icons/gaming.png",
        },

        {
            cName: "touch/click",
        },
    ]
}
let products = document.getElementById("js-product-wrapper");
let productDetail = document.getElementById("js-product-detail")
// let subCatList = document.getElementById("js-subcat-list")
let productsList = document.getElementById("js-product-list-wrapper")
if (location.search) {
    let data = {
        catIndex: location.search.split('catIndex=')[1].split('&')[0],
        // subCatIndex: location.search.split('subCatIndex=')[1].split('&')[0],
        prodIndex:  location.search.split('prodIndex=')[1].split('&')[0],
    }
    openProductDetail(data.catIndex, data.prodIndex)
}

let categoryItem = ''
demonstration.category.forEach((c, index) => {

    categoryItem += `
<div class="category__item" onclick="openProductList(${index})">
  <img src="${c.cIcon}" class="category__item-icon">
                    <div class="category__item-title">${c.cName}</div>
                     </div>`
});
document.getElementById('js-category-list').innerHTML = categoryItem;

function openProductList(index) {
    let productItem = ''
    var owl = $('.owl-carousel-prod');
    demonstration.category[index].subCLinks.forEach((scl, sclIndex) => {
        productItem += `<div class="product__item">
                            <div class="product__item-title" onclick="openProductDetail(${index}, ${sclIndex})">${scl.linkName}</div>
                        </div>`
    })

    productsList.classList.add('main__products--open')
    document.getElementById('js-product-wrapper').innerHTML = productItem
    owl.trigger('destroy.owlCarousel');
    owl.owlCarousel({
            margin: 10,
            nav: true,
            loop: true,
            responsive: {
                0: {
                    items: 3
                },
                600: {
                    items: 3
                },
                1000: {
                    items: 5
                }
            }
        })


}
function openProductDetail(catIndex, prodIndex) {
    const prod = demonstration.category[catIndex].subCLinks[prodIndex]
    productInfo = ''
    productInfo += `   

   <div class="product__name">Name: ${demonstration.category[catIndex].subCLinks[prodIndex].linkName}</div>
                <div class="product__text"><strong>Type:</strong> ${demonstration.category[catIndex].cName}</div>
           <div class="divState">
                    <button class="dsState mobileState btn-state btn-state--mob" onclick="changeState(this)"></button>
                    <button class="dsState desktopState btn-state btn-state--desktop" onclick="changeState(this)"></button>
                </div>
                   <div id="divIframe" class="frame-wrapper">
                    <center>
                        <iframe id="dsIframe" src="${prod.link}" class="product__frame product__frame--desktop"></iframe>
                    </center>
                </div>
                   <img src="../../../src/images/desktop.png" id="js-product-frame-state" class="product__frame-desktop" alt="">
                 <div class="product__desc"><strong>Description:</strong> ${prod.info}</div>
                     <a class="product__share" href="javascript:window.location=waCurrentPage();"></a>    
    `
    document.getElementById('js-product-info').innerHTML = productInfo
    document.getElementById('js-product-view').style.display = "block"
    history.pushState(null, null, location.pathname + `?catIndex=${catIndex}&prodIndex=${prodIndex}`)
    waCurrentPage = function() {
        return encodeURI("whatsapp://send?text=" + 'http://' + window.location.href);
    }
    productsList.classList.remove('main__products--open')
}

//video//
var isMobile2 = true;
var divState = document.getElementsByClassName("divState")[0];
changeView();

function changeView() {
    isMobile2 = false;
    isMobile2 = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile2) {
        dsIframe.height = "423";
        dsIframe.width = "240";
        dsIframe.classList.add(".product__frame--mob")
        dsIframe.setAttribute("state", "mobile");
        dsIframe.contentWindow.location.reload();
        return;
    } else {
        dsIframe.height = "301";
        dsIframe.width = "548";
        dsIframe.classList.remove("product__frame--desktop")
        dsIframe.classList.add("product__frame--desktop")
        dsIframe.setAttribute("state", "desktop");
        dsIframe.contentWindow.location.reload();
        return;
    }

}

function changeState(e) {

    if (e.classList[1] == "mobileState") {
        var productFrame = document.getElementById("js-product-frame-state");
        isMobile2 = true;
        dsIframe.setAttribute("height", 423);
        dsIframe.setAttribute("width", 240)
        dsIframe.setAttribute("state", "mobile");
        dsIframe.classList.add("product__frame--mob");
        dsIframe.classList.remove("product__frame--desktop");
        productFrame.classList.remove("product__frame-desktop");
        productFrame.classList.add("product__frame-mob");
        productFrame.src = "../../../src/images/phone.png"
        dsIframe.contentWindow.location.reload();
        return;
    } else if (e.classList[1] == "desktopState") {
        var productFrame = document.getElementById("js-product-frame-state");
        isMobile2 = false;
        dsIframe.setAttribute("height", 301);
        dsIframe.setAttribute("width", 548);
        dsIframe.setAttribute("state", "desktop");
        dsIframe.classList.add("product__frame--desktop");
        productFrame.classList.remove("product__frame-mob");
        productFrame.classList.add("product__frame-desktop")
        productFrame.src = "../../../src/images/desktop.png";
        dsIframe.classList.remove("product__frame--mob");
        dsIframe.contentWindow.location.reload();
        return;
    }
}

function changeIframe(e) {
    dsIframe.src = e.name
    dsIframe.setAttribute("src", e.name);
}