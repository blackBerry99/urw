document.addEventListener('DOMContentLoaded', () => {
  let currentLanguage = 'en'; // Default language

// Function to load translations from JSON file
  function loadTranslations(language) {
    fetch(`../locales/${language}.json`)
      .then(response => response.json())
      .then(data => {
        updateText(data);
        createProgramLayout(data.program);
        createEventCards(data.program);
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
    document.querySelector('.banner__btn').textContent = t.banner.participateButton;
    document.querySelector('.mob__btn').textContent = t.banner.participateButton;
    document.querySelector('.about__title').textContent = t.about.title;
    document.querySelector('.about__subtitle').innerHTML = t.about.subtitle;

    document.querySelector('.events__title').textContent = t.events.title;

    document.querySelector('.program__title').textContent = t.program.title;



    document.querySelector('.partners__title').textContent = t.partners.title;


  }

  const navLinks = document.querySelectorAll('.header__nav a, .footer__nav a');

  navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent default anchor click behavior

      const targetId = this.getAttribute('href'); // Get the href attribute
      const targetSection = document.querySelector(targetId); // Select the target section

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth' // Enables smooth scrolling
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

    // Add 'active' class to the clicked language button
    document.getElementById(`switch-${language}`).classList.add('header__lang-item--active');
  }
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

      const options = { weekday: 'long' };
      const weekday = dateObject.toLocaleDateString('en-US', options);
      const day = dateObject.getDate();
      const month = dateObject.toLocaleString('en-US', { month: 'long' });

      const formattedDate = `${weekday}, <br>${month} ${day}`;

      titleElement.innerHTML = formattedDate;
      programItem.appendChild(titleElement);

      events.forEach(event => {
        const timeElement = document.createElement('p');
        timeElement.className = 'program__item-time';
        timeElement.textContent = event.time;
        programItem.appendChild(timeElement);

        if (event.isEvent === 'yes') {
          const eventLink = document.createElement('a');
          eventLink.className = 'program__item-link';
          eventLink.href = event.link || '#';
          eventLink.textContent = event.event;
          programItem.appendChild(eventLink);
        } else {
          const eventTitle = document.createElement('p');
          eventTitle.className = 'program__item-info';
          eventTitle.textContent = event.event;
          programItem.appendChild(eventTitle);
        }

      });

      container.appendChild(programItem);
    });
  }

  function createEventCards(program) {
    const eventsContainer = document.querySelector('.events__grid');
    eventsContainer.innerHTML = '';

    const groupedEvents = program.list.reduce((acc, event) => {
      if (event.isEvent === 'yes') {
        if (!acc[event.event]) {
          acc[event.event] = {
            title: event.event,
            link: event.link || '#',
            dates: [],
          };
        }
        acc[event.event].dates.push(event.date);
      }
      return acc;
    }, {});

    Object.values(groupedEvents).forEach(group => {
      group.dates.sort((a, b) => new Date(a) - new Date(b));

      const dateRange = group.dates.length > 1 ? `${group.dates[0]} - ${group.dates[group.dates.length - 1]}` : group.dates[0];

      const eventItem = document.createElement('a');
      eventItem.className = 'events__item';
      eventItem.dataset.aos="zoom-out-right";
      eventItem.href = group.link;

      const titleElement = document.createElement('h3');
      titleElement.className = 'events__item-title';
      titleElement.textContent = group.title; // Use the event name as the title
      eventItem.appendChild(titleElement);

      const dateElement = document.createElement('p');
      dateElement.className = 'events__item-date';
      dateElement.textContent = dateRange; // Combine date and time
      eventItem.appendChild(dateElement);

      const linkElement = document.createElement('a');
      linkElement.href = group.link;
      linkElement.textContent = 'Детальніше';
      eventItem.appendChild(linkElement);

      eventsContainer.appendChild(eventItem);
    });
  }

  function updatePartnerImages(language) {
    const partnersGrid = document.querySelector('.partners__grid');
    partnersGrid.innerHTML = ''; // Clear any existing images

    // Language-specific images
    const languageSpecificImages = [
      { en: '1_en.png', ua: '1_ua.png' },
      { en: '2-en.png', ua: '2-ua.png' },
    ];

    const commonImages = [
      '3.png',
      '4.webp',
      '5.png',
      '6.jpg',
      '7.jpg',
      '8.jpg',
      '9.svg',
      '10.jpg',
      '11.jpg',
      '12.png',
      '13.png',
      '14.png',
      '15.svg',
      '16.jpg',
      '17.png',
      '18.png'
    ];

    languageSpecificImages.forEach(image => {
      const imgSrc = `src/images/partners/${image[language]}`;
      const imgElement = document.createElement('img');
      imgElement.src = imgSrc;
      imgElement.alt = 'Partner Logo'; // Add an alt attribute for accessibility

      const partnerItem = document.createElement('div');
      partnerItem.className = 'partners__item';
      partnerItem.appendChild(imgElement);

      partnersGrid.appendChild(partnerItem);
    });

    commonImages.forEach(image => {
      const imgSrc = `src/images/partners/${image}`;
      const imgElement = document.createElement('img');
      imgElement.src = imgSrc;
      imgElement.alt = 'Partner Logo';

      const partnerItem = document.createElement('div');
      partnerItem.className = 'partners__item';
      partnerItem.appendChild(imgElement);

      partnersGrid.appendChild(partnerItem);
    });
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
      console.log(sectionContent)
      console.log(sectionContent.scrollHeight)
    }

    if (sectionArrow) {
      sectionArrow.addEventListener('click', () => {
        sectionContent.classList.toggle('section__show--closed');
      });
    }
  });






  loadTranslations('ua');

})
