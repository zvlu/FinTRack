$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  var bshare;
  var pshare;

  $.get("/api/user_data")
    .then(function(data) {
      console.log(data);
      $(".member-name").text(data.firstName);
      $("#bank").val(data.currentBalance);
      $("#stock").val(data.portfolioVal);
      $("#income").val(data.income);
      $("#expenses").val(data.expense);
      var incomeReserve = parseFloat(data.income) - parseFloat(data.expense);
      $("#income-reserves").val(incomeReserve);
      if ($("#income-reserves").val() > 0) {
        $("#bankshare").attr("disabled", false);
        $("#bankshare").focus();
        $(".bshare").text("");
        $("#bankshare").focusout(function() {
          var bankperc = parseFloat($("#bankshare").val());
          bshare = (incomeReserve * 0.01 * bankperc).toFixed(2);
          pshare = (incomeReserve - bshare).toFixed(2);
          $("#portshare").val(100 - bankperc);
          $(".bshare").text(bshare);
          $(".pshare").text(pshare);
        });
      }
    })
    .catch(function(err) {
      console.log("error");
      console.log(err);
    });

  $("#submit").on("click", function(event) {
    console.log("allocate clicked");
    console.log("bshare  " + bshare);
    console.log("pshare  " + pshare);
    event.preventDefault();
    var userData = {
      bankShare: bshare,
      portShare: pshare
    };
    $.post("/api/user_data", {
      bshare: userData.bankShare,
      pshare: userData.portShare
    })
      // eslint-disable-next-line no-unused-vars
      .then(function(data) {
        console.log(data);

        $("#income-reserves").val(0);

        // window.location.replace("/income");
        // location.reload();
      })
      .catch(function(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
      });
  });
});
