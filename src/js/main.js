(function () {
  var $btnOpener = $('.js-menu-opener');

  $btnOpener.on('click', function () {
    if ($(window).width() < 768) {
      $(this).parents('.js-menu').toggleClass('active');
    }
  });

  $(window).resize(function () {
    if (window.innerWidth > 768 && $btnOpener.length) {
      $('.js-menu').removeClass('active');
    }
  });
}());
