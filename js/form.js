
$("#form").on("submit", function () {
  var formData = {
    name: $("#name").val(),
    email: $("#email").val(),
    phone: $("#phone").val(),
    company: $("#company").val(),
    message: $("#message").val(),
  };
  $("#form").prop("disabled", true);
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "send_form_talk_to_us" });

  $.ajax({
    type: "POST",
    url: "/c/contact_form",
    data: formData,
    encode: true,
    success: function (data) {
      const containerTop = $('.section').offset().top;
      $('#form').hide();
      $('#successMessage').show().css('display', 'flex');
      
      // Trigger scroll and fade-in animation
      $('html, body').animate({
          scrollTop: containerTop
      }, 100, function() {
          $('#form').addClass('fade-in');
      });

      $("#form")[0].reset();
      $("#form").prop("disabled", false);
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert("Something is wrong");
      $("#form").prop("disabled", false);
    },
  });
  return false;
});

/*code for show how animation works*/

/*$(document).ready(function () {

  $("#form").on("submit", function (e) {
    e.preventDefault();
    const containerTop = $('.section').offset().top;
      $('#form').hide();
      $('#successMessage').show().css('display', 'flex');
      
      $('html, body').animate({
          scrollTop: containerTop
      }, 100, function() {
          $('#form').addClass('fade-in');
      });
  });

  $(".form-group input, .form-group textarea").on(
    "focus input blur",
    function () {
      const $formGroup = $(this).closest(".form-group");

      if ($(this).val() || $(this).is(":focus")) {
        $formGroup.addClass("active");
      } else {
        $formGroup.removeClass("active");
      }
    }
  );

  $(".form-group input, .form-group textarea").each(function () {
    if ($(this).val()) {
      $(this).closest(".form-group").addClass("active");
    }
  });
});*/
