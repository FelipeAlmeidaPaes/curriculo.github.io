(function (win, doc) {
  'use strict';

  const home = $('#link-home')[0];
  const sobre = $('#link-sobre')[0];
  const skills = $('#link-skills')[0];
  const portfolio = $('#link-portfolio')[0];
  const contato = $('#link-contato')[0];
  const toTop = $('#toTop')[0];

  const links = [home, sobre, skills, portfolio, contato, toTop];

  // -------------------------------------------------
  // -------------------    HOME    ------------------
  // -------------------------------------------------

  const animate_text = () => {
    const animateSpan = $('#animated-text');

    animateSpan.typed({
      strings: ["Desenvolvedor FullStack", "Programador PHP", "Apaixonado por JavaScript"],
      loop: true,
      startDelay: 1e3,
      backDelay: 2e3
    });
  }

  const isTop = () => {
    var top = win.pageYOffset;
    return top <= 1 ? true : false;
  };

  const changeNavBgOnScroll = () => {
    const navbar = $('#navbar');
    isTop() ? $(navbar).removeClass('navbar-bg-black').addClass('navbar-bg-transparent') : $(navbar).removeClass('navbar-bg-transparent').addClass('navbar-bg-black');
  }

  const linksPreventDefault = () => {
    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
      });
    })
  }

  // -----------------------------------------------------
  // --------------------    TOTOP    --------------------
  // -----------------------------------------------------

  function toTop_hide() {

    var toTop = jQuery(".toTop");
    if (toTop.length) {
      var topOffSet = toTop.offset().top;

      if (topOffSet > 1350) {
        toTop.addClass('opened');
      } else {
        toTop.removeClass('opened');
      }
    }
  }

  // block fancybox to change url
  $.fancybox.defaults.hash = false;

  // invocação de todas as funções

  animate_text();
  win.addEventListener('scroll', () => {
    changeNavBgOnScroll();
    toTop_hide();
  });
  linksPreventDefault();

}(window, document));