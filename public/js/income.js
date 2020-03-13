$(document).ready(function() {
  // Getting references to our form and input
  let incomeForm = $("form.income");
  let dateInput = $("#date-pick");
  let incomeTypeInput = $("#income-type");
  let incomeAmtInput = $("#income-amt");

  $(function() {
    let dtToday = new Date();

    let month = dtToday.getMonth() + 1;
    let day = dtToday.getDate();
    let year = dtToday.getFullYear();

    if (month < 10) {
      month = "0" + month.toString();
    }
    if (day < 10) {
      day = "0" + day.toString();
    }

    let maxDate = year + "-" + month + "-" + day;
    $("#date-pick").attr("max", maxDate);
  });

  incomeForm.on("submit", function(event) {
    event.preventDefault();
    console.log(dateInput.val());
    console.log($("#income-type option:selected").text());
    console.log(incomeAmtInput.val());

    var userData = {
      date: dateInput.val().trim(),
      category: $("#income-type option:selected")
        .text()
        .trim(),
      amount: incomeAmtInput.val().trim()
    };
    var incomeCategory = $("#income-type option:selected").text();

    $(".type").text(incomeCategory);
    $(".amount").text(incomeAmtInput.val());
    $(".date").text(dateInput.val());

    // eslint-disable-next-line prettier/prettier
    saveIncomeAmt( userData.date, userData.category, userData.amount );
    // var listHeader = $("#incomelist");
    // liTag = $("<button>").html("<b>" + searchCity + "</b>");
    //     liTag.attr("data-city",searchCity);
    //     liTag.addClass("list-group-item list-group-item-action list-group-item-primary citybutton");
    //     listDiv.append(liTag);
    //     $(".addcity").val("");

    dateInput.val("");
    incomeTypeInput.val("");
    incomeAmtInput.val("");
  });

  function saveIncomeAmt(date, category, amount) {
    $.post("/api/income", {
      date: date,
      category: category,
      amount: amount
    })
      // eslint-disable-next-line no-unused-vars
      .then(function(data) {
        console.log(data);
        // location.reload();
        // window.location.replace("/income");
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
  // $("#submit").on("click", function(event) {
  //   event.preventDefault();

  //   $(".primary").text(incomeAmtInput.val());
  //   console.log(incomeAmtInput.val());
  // });
});
