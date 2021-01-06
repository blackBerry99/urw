let productList = document.getElementById("js-product-wrapper");
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
                subCLinks: [{
                    linkName: "XL",
                    link: "https://adsil1.com/tools/demonstration/XL/1905/live/index.html",

                },
                    {
                        linkName: "Azorim",
                        link: "http://adsil1.com/tools/demonstration/azorim/0518/index.html",

                    },

                ],

            },
            {
                subCName: "moveElement",
                subCLinks: [{
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
demonstration.category.forEach((c) => {
    categoryItem += `<div class="category__item" id="js-openCategory" onclick="openCategory()">
                    <div class="category__title">${c.cName}</div>
                    <div class="category__sub">
                        <div class="category__sub-item"></div>
                    </div>
                </div>`

});
document.getElementById('js-category-list').innerHTML = categoryItem;


// let productItem = ''
// demonstration.category.subCategory.forEach((subC) => {
//     productItem += `<div class="product__item">
//                 <div class="product__item-title">${subC.subCName}</div>
// <!--                <img src="" alt="" class="product__item-banner">-->
//             </div>`
//
// });
// document.getElementById('js-product-list').innerHTML = productItem;
//
function openCategory() {
    productList.style.display = "block";
}
