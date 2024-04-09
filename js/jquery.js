$(document).ready(function () {
  // top arrow
  $(window).scroll(function () {
    let windowScroll = $(window).scrollTop();
    if (windowScroll > 290) {
      $(".top").fadeIn();
    } else {
      $(".top").fadeOut();
    }
  });

  $(".top").click(function () {
    $("html,body").animate({
      scrollTop: $("html").offset().top,
    });
    return false;
  });

  //responsive menu toggle

  $("#menutoggle").click(function () {
    $(".xs-menu").toggleClass("displaynone");
  });

  //drop down menu
  $(".drop-down").hover(function () {
    $(".mega-menu").addClass("display-on");
  });
  $(".drop-down").mouseleave(function () {
    $(".mega-menu").removeClass("display-on");
  });

  // slider index
  $(".bxslider").bxSlider({
    mode: "horizontal",
    moveSlides: 1,
    slideMargin: 40,
    infiniteLoop: true,
    slideWidth: 660,
    minSlides: 3,
    maxSlides: 3,
    speed: 800,
  });

});
