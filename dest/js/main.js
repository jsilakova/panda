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

  $('.js-tab-link').on('click', function (event) {
    event.preventDefault();
    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');
    var tab = $(this).attr('href');
    $('.js-tab').not(tab).css('display', 'none');
    $(tab).css('display', 'flex');
  });

  $('.js-modal-opener').on('click', function (event) {
    event.preventDefault();
    $('.js-modal').fadeIn();
  });

  $('.js-modal-close').on('click', function (event) {
    $('.js-modal').fadeOut();
  });

  $(window).on('click', function (event) {
    if (event.target == $('.modal')[0]) {
      $('.js-modal').fadeOut();
    }
  });
}());
