$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page


//   $.get("/api/user_data").then(function(data) {
//     $(".member-name").text(data.firstName);
//     $(".stocks").text();
//   });
//   var modal = document.getElementById("myModal");

//   // Get the button that opens the modal
//   var btn = document.getElementById("myBtn");

//   // Get the <span> element that closes the modal
//   var span = document.getElementsByClassName("close")[0];

//   // When the user clicks the button, open the modal
//   btn.onclick = function() {
//     modal.style.display = "block";
//   };

//   // When the user clicks on <span> (x), close the modal
//   span.onclick = function() {
//     modal.style.display = "none";
//   };

//   // When the user clicks anywhere outside of the modal, close it
//   window.onclick = function(event) {
//     if (event.target === modal) {
//       modal.style.display = "none";
//     }
//   };
//   function tickerRender() {
//     var queryUrl = "https://financialmodelingprep.com/api/v3/majors-indexes";
//     $.ajax({
//       url: queryUrl,
//       method: "GET"
//     }).then(function(response) {
//       console.log(response);
//       $("#stock-1").text(
//         response.majorIndexesList[0].indexName +
//           " " +
//           response.majorIndexesList[0].price
//       );
//       $("#stock-2").text(
//         response.majorIndexesList[1].indexName +
//           " " +
//           response.majorIndexesList[1].price
//       );
//       $("#stock-3").text(
//         response.majorIndexesList[2].indexName +
//           " " +
//           response.majorIndexesList[2].price
//       );
//       $("#stock-4").text(
//         response.majorIndexesList[3].indexName +
//           " " +
//           response.majorIndexesList[3].price
//       );
//       $("#stock-5").text(
//         response.majorIndexesList[4].indexName +
//           " " +
//           response.majorIndexesList[4].price
//       );
//       $("#stock-6").text(
//         response.majorIndexesList[5].indexName +
//           " " +
//           response.majorIndexesList[5].price
//       );
//       $("#stock-7").text(
//         response.majorIndexesList[6].indexName +
//           " " +
//           response.majorIndexesList[6].price
//       );
//       $("#stock-8").text(
//         response.majorIndexesList[7].indexName +
//           " " +
//           response.majorIndexesList[7].price
//       );
//       $("#stock-9").text(
//         response.majorIndexesList[8].indexName +
//           " " +
//           response.majorIndexesList[8].price
//       );
//     });
//   }
//   tickerRender();

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
