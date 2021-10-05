import AOS from 'aos';
  
$(() => {
  AOS.init({
    once: true, // whether animation should happen only once - while scrolling down
    offset: 0,
    duration: 1000,
  });

  window.addEventListener('scroll', aosRefresh);

  function aosRefresh() {
    const timeout = setTimeout( () => {
      clearTimeout(timeout)
      AOS.refresh();
      window.addEventListener('scroll', aosRefresh);
    },1000);

    window.removeEventListener('scroll', aosRefresh);
  }
});