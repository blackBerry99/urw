
let productList = document.getElementById("js-category-inner");
let productWrapper = document.getElementById("js-category-wrapper");
let products = document.getElementById("js-product-list");
let productDetail = document.getElementById("js-product-detail")
var demonstration = {
    category: [
        {
            cName: "swipe/move",
            subCategory: [
                {
                    subCName: "tinder",
                    subCLinks: [
                        {
                            linkName: "Emek",
                            link: "https://adsil1.com/tools/demonstrations/emek/0917/index.html",
                        },
                        {
                            linkName: "swipe Game Cellcom",
                            link: "https://adsil1.com/tools/demonstration/cellcom/swipe_game/1018/index.html",
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
            subCategory: [{
                subCName: "tinder",
                subCLinks: [{
                    linkName: "Emek",
                    link: "https://adsil1.com/tools/demonstrations/emek/0917/index.html",

                },
                    {
                        linkName: "swipe Game Cellcom",
                        link: "https://adsil1.com/tools/demonstration/cellcom/swipe_game/1018/index.html",

                    },

                ]
            }],
        },

        {
            cName: "fifty",
        },

        {
            cName: "games",
        },

        {
            cName: "touch/click",
        },
    ]
}

let categoryItem = ''
demonstration.category.forEach((c, index) => {
    categoryItem += `<div class="category__item" onclick="openCategory(${index})">
                    <div class="category__title">${c.cName}</div>
                     </div>`

});
document.getElementById('js-category-list').innerHTML = categoryItem;
function openCategory(index) {
    let subCategoryItem = ''
    // let productItemAll = ''
    demonstration.category[index].subCategory.forEach((sc, indexSubCat) => {
        subCategoryItem += `
<div class="category__sub">
                        <div class="category__sub-item" onclick="openProductList(${index}, ${indexSubCat})">${sc.subCName}</div>
                        </div>`
    })
    document.getElementById('js-category-inner').innerHTML = subCategoryItem
    productWrapper.style.display = "block";

    // productItemAll = demonstration.category[index].subCategory
    // console.log(demonstration.category[index].subCategory.subCLinks[indexSubCat].linkName)

}
function openProductList(index, indexSubCat) {
    let productItem = ''
    demonstration.category[index].subCategory[indexSubCat].subCLinks.forEach((scl) => {
        productItem += `<div class="product__item">
                            <div class="product__item-title" onclick="openProductDetail()">${scl.linkName}</div>
                        </div>`
    })
    document.getElementById('js-product-list').innerHTML = productItem
    products.style.display = "block";
}
function openProductDetail(index, indexSubCat) {

    productDetail.style.display = "block";
}
function closeSubCat() {
    productWrapper.style.display = "none";
}

function closeProductDetail() {
    productDetail.style.display = "none";
}