// script.js

$(document).ready(function() {
  // Scrollspy + smooth scroll
  $('body').scrollspy({ target: '.navbar', offset: 70 });
  $('.nav-link').on('click', function(e) {
    if (this.hash !== "") {
      e.preventDefault();
      const hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top - 65
      }, 800);
    }
  });
  

  // Validate contact form
  $('#contactForm').on('submit', function(e) {
    let name = $(this).find('input[type=text]').val();
    let email = $(this).find('input[type=email]').val();
    let content = $(this).find('textarea').val();
    let errors = [];

    if (!email) errors.push('Vui lòng nhập email.');
    if (/\d/.test(name)) errors.push('Tên không được chứa số.');
    if (content.length < 20) errors.push('Nội dung phải từ 20 ký tự trở lên.');

    if (errors.length > 0) {
      alert(errors.join('\n'));
      e.preventDefault();
    }
  });

  // Validate modal order form
 $('#orderForm').on('submit', function(e) {
    let filled = true;
    $(this).find('input[type=text], input[type=email], textarea').each(function() {
        if (!$(this).val()) {
            filled = false;
        }
    });

    let email = $(this).find('input[type=email]').val();
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!filled || !emailPattern.test(email)) {
        alert("Vui lòng nhập đầy đủ thông tin và địa chỉ email hợp lệ.");
        e.preventDefault();
    }
});
  // Khi click nút chọn gói, gán tên gói vào input
$('[data-toggle="modal"][data-target="#orderModal"]').on('click', function () {
  const selectedService = $(this).data('service');
  $('#service').val(selectedService);
});




  // Vuốt & kéo slide carousel
  $('#reviewsCarousel').on('touchstart', function (event) {
    const xClick = event.originalEvent.touches[0].pageX;
    $(this).one('touchmove', function (event) {
      const xMove = event.originalEvent.touches[0].pageX;
      const sensitivity = 60;
      if (Math.floor(xClick - xMove) > sensitivity) {
        $(this).carousel('next');
      } else if (Math.floor(xClick - xMove) < -sensitivity) {
        $(this).carousel('prev');
      }
    });
    $(this).on('touchend', function () {
      $(this).off('touchmove');
    });
  });

  let startX = 0;
  let isDragging = false;

  $('#reviewsCarousel').on('mousedown', function (e) {
    isDragging = true;
    startX = e.pageX;
  });

  $('#reviewsCarousel').on('mouseup', function (e) {
    if (isDragging) {
      let endX = e.pageX;
      const sensitivity = 50;
      if (startX - endX > sensitivity) {
        $(this).carousel('next');
      } else if (endX - startX > sensitivity) {
        $(this).carousel('prev');
      }
    }
    isDragging = false;
  });

  // Hiệu ứng animate lại mỗi khi chuyển slide đánh giá
  $('#reviewsCarousel').on('slide.bs.carousel', function (e) {
    const $nextSlide = $(e.relatedTarget);
    $nextSlide.removeClass('animate__fadeInUp');
    void $nextSlide[0].offsetWidth;
    $nextSlide.addClass('animate__animated animate__fadeInUp');
  });
});