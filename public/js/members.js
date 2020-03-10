$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
<<<<<<< HEAD
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.firstName);
    $(".stocks").text();
  });
  var modal = document.getElementById("myModal");

  // Get the button that opens the modal
  var btn = document.getElementById("myBtn");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks the button, open the modal
  btn.onclick = function() {
    modal.style.display = "block";
  };

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
  function tickerRender() {
    var queryUrl = "https://financialmodelingprep.com/api/v3/majors-indexes";
    $.ajax({
      url: queryUrl,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      $("#stock-1").text(
        response.majorIndexesList[0].indexName +
          " " +
          response.majorIndexesList[0].price
      );
      $("#stock-2").text(
        response.majorIndexesList[1].indexName +
          " " +
          response.majorIndexesList[1].price
      );
      $("#stock-3").text(
        response.majorIndexesList[2].indexName +
          " " +
          response.majorIndexesList[2].price
      );
      $("#stock-4").text(
        response.majorIndexesList[3].indexName +
          " " +
          response.majorIndexesList[3].price
      );
      $("#stock-5").text(
        response.majorIndexesList[4].indexName +
          " " +
          response.majorIndexesList[4].price
      );
      $("#stock-6").text(
        response.majorIndexesList[5].indexName +
          " " +
          response.majorIndexesList[5].price
      );
      $("#stock-7").text(
        response.majorIndexesList[6].indexName +
          " " +
          response.majorIndexesList[6].price
      );
      $("#stock-8").text(
        response.majorIndexesList[7].indexName +
          " " +
          response.majorIndexesList[7].price
      );
      $("#stock-9").text(
        response.majorIndexesList[8].indexName +
          " " +
          response.majorIndexesList[8].price
      );
    });
  }
  tickerRender();
=======
  $.get("/api/user_data")
    .then(function(data) {
      console.log(data);
      $(".member-name").text(data.firstName);
      $("#bank").val(data.currentBalance);
      $("#stock").val(data.portfolioVal);
      $("#income").val(data.income);
      $("#expenses").val(data.expense);
      $("#income-reserves").val(
        parseFloat(data.income) - parseFloat(data.expense)
      );
    })
    .catch(function(err) {
      console.log("error");
      console.log(err);
    });
>>>>>>> d2d6ade257e7f9b081cef842432dfa681f1efeee
});
