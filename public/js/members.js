$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page

  let bshare = 0;
  let pshare = 0;
  let populated = false;
  let currentBalance = 0;
  let portfolioVal = 0;

  $.get("/api/user_data")
    .then(function(data) {
      if (data) {
        populate(data);
      }
      // if (data.dbJoinChart.length) {
      //   var incomes = [];
      //   var expenses = [];
      //   for (i = 0; i < data.dbJoinChart.length; i++) {
      //     if (data.dbJoinChart[i]["Category.type"] === "income") {
      //       incomes.push({
      //         amount: data.dbJoinChart[i].amount,
      //         name: data.dbJoinChart[i]["Category.name"]
      //       });
      //     } else {
      //       expenses.push({
      //         amount: data.dbJoinChart[i].amount,
      //         name: data.dbJoinChart[i]["Category.name"]
      //       });
      //     }
      //     createArray(data);
      //   }
      // }
    })
    .catch(function(err) {
      console.log(err);
    });

  $("#submit").on("click", function(event) {
    console.log("allocate clicked");
    event.preventDefault();
    populated = false;
    if (!populated) {
      $("#bank").val(currentBalance);
      $("#stock").val(portfolioVal);
      resetDisplay(currentBalance, portfolioVal);
    }
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
        // location.reload();
      })
      .catch(function(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
      });
  });

  // function createArray(data) {
  //   var incomes = [];
  //   var expenses = [];
  //   for (i = 0; i < data.dbJoinChart.length; i++) {
  //     if (data.dbJoinChart[i]["Category.type"] === "income") {
  //       incomes.push({
  //         amount: data.dbJoinChart[i].amount,
  //         name: data.dbJoinChart[i]["Category.name"]
  //       });
  //     } else {
  //       expenses.push({
  //         amount: data.dbJoinChart[i].amount,
  //         name: data.dbJoinChart[i]["Category.name"]
  //       });
  //     }
  //   }
  //   console.log(incomes);
  //   console.log(expenses);
  // }
  function populate(data) {
    console.log(data);
    currentBalance = parseFloat(data.currentBalance);
    portfolioVal = parseFloat(data.portfolioVal);
    income = parseFloat(data.income);
    expense = parseFloat(data.expense);
    $(".member-name").text(data.firstName);
    $("#bank").val(currentBalance);
    $("#stock").val(portfolioVal);
    $("#income").val(income);
    $("#expenses").val(expense);
    var incomeReserve = income - expense;
    $("#income-reserves").val(incomeReserve);
    populated = true;
    if ($("#income-reserves").val() > 0) {
      $("#bankshare").attr("disabled", false);
      $("#bankshare").focus();
      $("#bankshare").focusout(function() {
        var bankperc = parseFloat($("#bankshare").val());
        bshare = parseFloat(incomeReserve * 0.01 * bankperc).toFixed(2);
        pshare = parseFloat(incomeReserve - bshare).toFixed(2);
        currentBalance = parseFloat(currentBalance + bshare).toFixed(2);
        portfolioVal = parseFloat(portfolioVal + pshare).toFixed(2);
        $("#portshare").val(100 - bankperc);
        $("#submit").attr("disabled", false);
        if (isNaN(bankperc)) {
          $("#bankshare").val("");
          $("#portshare").val("");
          $("#submit").attr("disabled", true);
        }
        isNaN(bshare) ? "" : $(".bshare").text(bshare);
        isNaN(bshare) ? "" : $(".pshare").text(pshare);
      });
    }
  }
  function resetDisplay() {
    console.log(currentBalance);
    console.log(portfolioVal);
    $("#income-reserves").val("");
    $("#submit").attr("disabled", true);
    $("#bankshare").val("");
    $("#portshare").val("");
    $(".bshare").text("");
    $(".pshare").text("");
    // $("#bank").val(currentBalance);
    // $("#stock").val(portfolioVal);
    $("#income").val(0);
    $("#expenses").val(0);
  }
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
});

console.log(chartData(data));
