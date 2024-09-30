document.addEventListener('DOMContentLoaded', () => {
  let currentLanguage = 'ua';

  function loadTranslations(language) {
    fetch(`../locales/${language}-1.json`)
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
    const mobBtn = document.querySelector('.mob__btn');
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
    bannerBtn.href = t.program.downloadLink;
    bannerBtn.target = '_blank';

    mobBtn.textContent = t.banner.participateButton;
    mobBtn.href = t.program.downloadLink;
    mobBtn.target = '_blank';
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
