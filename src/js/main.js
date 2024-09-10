// let products = document.getElementById("js-product-wrapper");
// let productDetail = document.getElementById("js-product-detail")
// // let subCatList = document.getElementById("js-subcat-list")
// let productsList = document.getElementById("js-product-list-wrapper")
// if (location.search) {
//     let data = {
//         catIndex: location.search.split('catIndex=')[1].split('')[0],
//         // subCatIndex: location.search.split('subCatIndex=')[1].split('&')[0],
//         prodIndex:  location.search.split('prodIndex=')[1].split('')[0],
//     }
//     openProductDetail(data.catIndex, data.prodIndex)
// }
//
//
// let categoryItem = ''
// demonstration.category.forEach((c, index) => {
//
//     categoryItem += `
// <div class="category__item" onclick="openProductList(${index})">
//   <img src="${c.cIcon}" class="category__item-icon">
//                     <div class="category__item-title">${c.cName}</div>
//                      </div>`
// });
// document.getElementById('js-category-list').innerHTML = categoryItem;
//
// function openProductList(index) {
//     let productItem = ''
//     var owl = $('.owl-carousel-prod');
//     demonstration.category[index].subCLinks.forEach((scl, sclIndex) => {
//         productItem += `<div class="product__item">
//                             <div class="product__item-title" onclick="openProductDetail(${index}, ${sclIndex})">${scl.linkName}</div>
//                         </div>`
//     })
//
//     productsList.classList.add('main__products--open')
//     document.getElementById('js-product-wrapper').innerHTML = productItem
//     owl.trigger('destroy.owl.carousel');
//     owl.owlCarousel({
//             margin: 10,
//             nav: true,
//             loop: false,
//             responsive: {
//                 0: {
//                     items: 3
//                 },
//                 600: {
//                     items: 3
//                 },
//                 1000: {
//                     items: 5
//                 }
//             }
//         })
//
//
// }
// function openProductDetail(catIndex, prodIndex, adv) {
//     const prod = demonstration.category[catIndex].subCLinks[prodIndex]
//
//     productInfo = ''
//     productInfo += `
//
//    <div class="product__name">Name: ${demonstration.category[catIndex].subCLinks[prodIndex].linkName}</div>
//                 <div class="product__text"><strong>Type:</strong> ${demonstration.category[catIndex].cName}</div>
//            <div class="divState">
//                     <button class="dsState mobileState btn-state btn-state--mob" onclick="changeState(this)"></button>
//                     <button class="dsState desktopState btn-state btn-state--desktop" id="btn-state--desktop" onclick="changeState(this)"></button>
//                 </div>
//                    <div id="divIframe" class="frame-wrapper">
//                     <center>
//                         <iframe id="dsIframe" src="${prod.link}" class="product__frame product__frame--mob"></iframe>
//                           <div class="preloader" id="preloader">
//     <img src="${prod.loadImage}" alt="">
//   </div>
//                     </center>
//                 </div>
//                    <img src="../../../src/images/phone.png" id="js-product-frame-state" class="product__frame-mob" alt="">
//                  <div class="product__desc"><strong>Description:</strong> ${prod.info}</div>
//                      <a class="product__share" href="javascript:window.location=waCurrentPage();"></a>
//     `
//     document.getElementById('js-product-info').innerHTML = productInfo
//     document.getElementById('js-product-view').style.display = "block"
//     if (prod.isDesktop ==  false) {
//      document.getElementById('btn-state--desktop').disabled = true
//     }
//     history.pushState(null, null, location.pathname + `?catIndex=${catIndex}&prodIndex=${prodIndex}` + `adv=${adv}`)
//     waCurrentPage = function() {
//         return encodeURI("whatsapp://send?text=" + `http://localhost:3000/` + `?catIndex=${catIndex}` +  `?prodIndex=${prodIndex}`);
//     }
//     document.querySelector('iframe').onload = iframeOnload
//
//     function iframeOnload () {
//         document.querySelector('.preloader').remove()
//     }
//     productsList.classList.remove('main__products--open')
//
// }
//
// //video//
// var isMobile2 = true;
// var divState = document.getElementsByClassName("divState")[0];
// changeView();
//
// function changeView() {
//     isMobile2 = true;
//     isMobile2 = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
//     if (isMobile2) {
//         dsIframe.height = "423";
//         dsIframe.width = "240";
//         dsIframe.classList.add(".product__frame--mob")
//         dsIframe.setAttribute("state", "mobile");
//         dsIframe.contentWindow.location.reload();
//         return;
//     } else {
//         // dsIframe.height = "301";
//         // dsIframe.width = "548";
//         // dsIframe.classList.remove("product__frame--desktop")
//         // dsIframe.classList.add("product__frame--desktop")
//         // dsIframe.setAttribute("state", "desktop");
//         // dsIframe.contentWindow.location.reload();
//         return;
//     }
//
// }
//
// function changeState(e) {
//
//    if (e.classList[1] == "mobileState") {
//         var productFrame = document.getElementById("js-product-frame-state");
//         isMobile2 = true;
//         dsIframe.setAttribute("height", 423);
//         dsIframe.setAttribute("width", 240)
//         dsIframe.setAttribute("state", "mobile");
//         dsIframe.classList.add("product__frame--mob");
//         dsIframe.classList.remove("product__frame--desktop");
//         productFrame.classList.remove("product__frame-desktop");
//         productFrame.classList.add("product__frame-mob");
//         productFrame.src = "../../../src/images/phone.png"
//         dsIframe.contentWindow.location.reload();
//         return;
//     } else if (e.classList[1] == "desktopState") {
//         var productFrame = document.getElementById("js-product-frame-state");
//         isMobile2 = false;
//         dsIframe.setAttribute("height", 301);
//         dsIframe.setAttribute("width", 548);
//         dsIframe.setAttribute("state", "desktop");
//         dsIframe.classList.add("product__frame--desktop");
//         productFrame.classList.remove("product__frame-mob");
//         productFrame.classList.add("product__frame-desktop")
//         productFrame.src = "../../../src/images/desktop.png";
//         dsIframe.classList.remove("product__frame--mob");
//         dsIframe.contentWindow.location.reload();
//         return;
//     }
// }
//
// function changeIframe(e) {
//     dsIframe.src = e.name
//     dsIframe.setAttribute("src", e.name);
// }
