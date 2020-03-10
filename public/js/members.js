$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
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
});
