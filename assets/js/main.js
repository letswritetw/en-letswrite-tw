document.addEventListener('DOMContentLoaded', () => {

  // 回頂端
  function obToTop() {
    if(document.getElementById('trigger-to-top')) {
      const toTopTrigger = document.getElementById('trigger-to-top');
      const toTopBtn = document.getElementById('js-to-top');

      const toTopOptions = {
          root: null,
          rootMargin: '0px 0px 0px 0px',
          threshold: 1.0,
      };
      const toTopFunc = function(entries, observer) {
        if(entries[0].isIntersecting) {
          toTopBtn.classList.add('opacity-0');
          toTopBtn.classList.remove('opacity-100');
        } else {
          toTopBtn.classList.add('opacity-100');
          toTopBtn.classList.remove('opacity-0');
        }
      };
      const observer = new IntersectionObserver(toTopFunc, toTopOptions);
      observer.observe(toTopTrigger)

      toTopBtn.addEventListener('click', e => {
        e.preventDefault();
        toTopTrigger.scrollIntoView({ behavior: 'smooth' })
      })

    }
  }
  obToTop();
  
})