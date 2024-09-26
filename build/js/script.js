document.addEventListener('DOMContentLoaded', () => {
  let currentLanguage = 'ua';

  function loadTranslations(language) {
    fetch(`../locales/${language}.json`)
      .then(response => response.json())
      .then(data => {
        updateText(data);
        createProgramLayout(data.program);
        createEventCards(data.program, data.events.details, data.events.registration);
        updatePartnerImages(language);

      })
      .catch(error => console.error('Error loading translation JSON:', error));
  }

  function updateText(t) {
    const headerContainer = document.querySelector('.header__nav');
    const footerContainer = document.querySelector('.footer__nav');

    // Clear existing navigation items to avoid duplication
    if (headerContainer) headerContainer.innerHTML = '';
    if (footerContainer) footerContainer.innerHTML = '';

    if (headerContainer || footerContainer) {
      Object.entries(t.nav).forEach(([key, value]) => {

        const headerNavItem = document.createElement('li');
        headerNavItem.className = 'nav-item';
        headerNavItem.innerHTML = `<a href="#${key}">${value}</a>`;
        headerContainer.appendChild(headerNavItem);

        const footerNavItem = document.createElement('li');
        footerNavItem.className = 'nav-item';
        footerNavItem.innerHTML = `<a href="#${key}">${value}</a>`;
        footerContainer.appendChild(footerNavItem);
      });
    }

    document.querySelector('.banner__title').textContent = t.banner.title;
    document.querySelector('.banner__subtitle').textContent = t.banner.subtitle;
    // document.querySelector('.mob__btn').textContent = t.banner.participateButton;
    document.querySelector('.about__title').textContent = t.about.title;
    document.querySelector('.about__subtitle').innerHTML = t.about.subtitle;

    document.querySelector('.events__title').textContent = t.events.title;

    document.querySelector('.program__title').textContent = t.program.title;
    document.querySelector('.program__header-label').textContent = t.program.download;
    document.querySelector('.program__header-link').href = t.program.downloadLink;
    document.querySelector('.program__header-link').download = 'Resilience_week_timetable.pdf';

    document.querySelector('.partners__title').textContent = t.partners.title;
    const bannerBtn = document.querySelector('.banner__btn');
    bannerBtn.textContent = t.banner.participateButton;

    bannerBtn.addEventListener('click', function(event) {
      event.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  }

  const navLinks = document.querySelectorAll('.header__nav a, .footer__nav a');

  navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  function switchLanguage(language) {
    currentLanguage = language;
    loadTranslations(language);

    document.querySelectorAll('.header__lang-item').forEach(button => {
      button.classList.remove('header__lang-item--active');
    });

    document.getElementById(`switch-${language}`).classList.add('header__lang-item--active');
  }

  const monthMapping = {
    'вересня': 'September',
    'жовтня': 'October',
  };

  function createProgramLayout(program) {
    const container = document.getElementById('program-container');
    container.innerHTML = '';

    const eventsByDate = program.list.reduce((acc, event) => {
      if (!acc[event.date]) {
        acc[event.date] = [];
      }
      acc[event.date].push(event);
      return acc;
    }, {});

    Object.entries(eventsByDate).forEach(([date, events]) => {
      const programItem = document.createElement('div');
      programItem.className = 'program__item';

      const titleElement = document.createElement('h3');
      titleElement.className = 'program__item-title';

      const dateObject = new Date(date);
      const [day, ukrMonth] = date.split(' ');
      const englishMonth = monthMapping[ukrMonth];

      if (currentLanguage === 'ua') {
        const options = { weekday: 'long' };
        const formattedDateString = `${englishMonth} ${day}, 2024`;
        const dateObject = new Date(formattedDateString);
        const weekday = dateObject.toLocaleDateString('uk-UA', options);
        titleElement.innerHTML = `${weekday}, <br>${day} ${ukrMonth} `;

      } else {
        const options = { weekday: 'long' };
        const weekday = dateObject.toLocaleDateString('en-US', options);
        const day = dateObject.getDate();
        const month = dateObject.toLocaleString('en-US', { month: 'long' });

        titleElement.innerHTML = `${weekday}, <br>${month} ${day}`;
      }

      programItem.appendChild(titleElement);

      events.forEach(event => {
        const timeElement = document.createElement('p');
        timeElement.className = 'program__item-time';
        timeElement.textContent = event.time;
        programItem.appendChild(timeElement);

        if (event.color) {
          const eventLink = document.createElement('a');
          eventLink.className = `program__item-link ${event.color}`;
          eventLink.href = event.link || '#';
          eventLink.textContent = event.event;
          eventLink.target = '_blank';
          programItem.appendChild(eventLink);
        } else {
          const eventTitle = document.createElement('p');
          eventTitle.className = 'program__item-info';
          eventTitle.textContent = event.event;
          programItem.appendChild(eventTitle);
        }

        if (event.description) {
          const descriptionElement = document.createElement('p');
          descriptionElement.className = 'program__item-desc';
          descriptionElement.textContent = event.description;
          programItem.appendChild(descriptionElement);
        }

      });

      container.appendChild(programItem);
    });
  }



  function createEventCards(program, details, registration) {
    const eventsContainer = document.querySelector('.events__grid');
    eventsContainer.innerHTML = '';

    const groupedEvents = program.list.reduce((acc, event) => {
      if (event.color) {
        if (!acc[event.event]) {
          acc[event.event] = {
            title: event.event,
            link: event.eventLink || '#',
            dates: [],
            color: event.color
          };
        }
        acc[event.event].dates.push(event.date);
      }
      return acc;
    }, {});

    Object.values(groupedEvents).forEach(group => {
      group.dates.sort((a, b) => new Date(a) - new Date(b));

      const dateRange = group.dates.length > 1 && group.dates[0].split(' ')[1] === group.dates[group.dates.length - 1].split(' ')[1]
        ? `${group.dates[0].split(' ')[0]}-${group.dates[group.dates.length - 1]}`
        : `${group.dates[0]}`;

      const eventItem = document.createElement('a');
      eventItem.className = `events__item ${group.color}`;
      eventItem.dataset.aos = "zoom-out-right";
      eventItem.href = group.link;
      eventItem.target = '_blank';

      const titleElement = document.createElement('h3');
      titleElement.className = 'events__item-title';
      titleElement.textContent = group.title;
      eventItem.appendChild(titleElement);

      const dateElement = document.createElement('p');
      dateElement.className = 'events__item-date';
      dateElement.textContent = dateRange;
      eventItem.appendChild(dateElement);

      const linkElement = document.createElement('a');
      linkElement.href = group.link;
      linkElement.target = '_blank';
      linkElement.classList.add('events__item-link')

      if (group.color === 'light-blue') {
        linkElement.textContent = registration;
      } else {
        linkElement.textContent = details;
      }
      eventItem.appendChild(linkElement);

      eventsContainer.appendChild(eventItem);
    });
  }

  function updatePartnerImages(language) {
    const partnersGrid = document.querySelector('.partners__grid');
    partnersGrid.innerHTML = '';

    const commonImages = [
      '23.jpg',
      '1.png',
      '2-1.jpeg',
      '3-1.png',
      '4.png',
      '5.png',
      '7.svg',
      '9.png',
      '10.jpg',
      '11.jpeg',
      '12-1.jpg',
      '13.png',
      '14.jpg',
      '15.png',
      '16.png',
      '17.png',
      '18-1.jpg',
      '19.png',
      '20.jpg',
      '21.jpg',
      '22.png',
      '25.png',
      '6.jpg',
      '26.png',
    ];

    commonImages.forEach(image => {
      const imgSrc = `src/images/partners/${image}`;
      const slide = document.createElement('div');
      slide.className = 'swiper-slide partners__item';
      slide.innerHTML = `<img src="${imgSrc}" alt="Partner Logo">`;
      partnersGrid.appendChild(slide);
    });



    let swiper;

    function initializeSwiper() {
      swiper = new Swiper('.partners__swiper', {
        spaceBetween: 32,
        slidesPerView: 'auto',
        allowTouchMove: false,
        speed: 2000,
        autoplay: {
          delay: 0,
        },
        loop:true,
      });

      swiper.autoplay.stop();
      observeSwiperAutoplay();
    }
    function observeSwiperAutoplay() {
      const partnersSection = document.getElementById('partners');

      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(  swiper.autoplay.start(), 2000)
          } else {
          }
        });
      }, { threshold: 1 });

      observer.observe(partnersSection);
    }

    initializeSwiper()
  }


  function openMobContent (selector) {
    const content = document.querySelector(selector)

  }

  document.getElementById('switch-ua').addEventListener('click', () => switchLanguage('ua'));
  document.getElementById('switch-en').addEventListener('click', () => switchLanguage('en'));


  const headerNav =  document.querySelector('.header__nav')
  document.querySelector('.header__burger').addEventListener('click', (e) => {
    e.target.classList.toggle('header__burger--opened');
    headerNav.classList.toggle('header__nav--opened')
  });

  const sectionBlocks = document.querySelectorAll('section')
  sectionBlocks.forEach((sectionBlock) => {
    const sectionArrow = sectionBlock.querySelector('.section__arrow');
    const sectionContent = sectionBlock.querySelector('.section__show');
    if(sectionContent) {

    }

    if (sectionArrow) {
      sectionArrow.addEventListener('click', () => {
        sectionContent.classList.toggle('section__show--closed');
      });
    }
  });

  loadTranslations('ua');
})

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
