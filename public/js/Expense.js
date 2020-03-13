$(document).ready(function() {
  // Getting references to our form and input
  let expenseForm = $("form.Expense");
  let dateInput = $("#date-pick");
  let expenseTypeInput = $("#expense-type");
  let expenseAmtInput = $("#expense-amt");

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

  expenseForm.on("submit", function(event) {
    event.preventDefault();
    console.log(dateInput.val());
    console.log($("#expense-type option:selected").text());
    console.log(expenseAmtInput.val());

    var userData = {
      date: dateInput.val().trim(),
      category: $("#expense-type option:selected")
        .text()
        .trim(),
      amount: expenseAmtInput.val().trim()
    };
    // eslint-disable-next-line prettier/prettier
    saveExpenseAmt( userData.date, userData.category, userData.amount );
    dateInput.val("");
    expenseTypeInput.val("");
    expenseAmtInput.val("");
  });

  function saveExpenseAmt(date, category, amount) {
    $.post("/api/expense", {
      date: date,
      category: category,
      amount: amount
    })
      // eslint-disable-next-line no-unused-vars
      .then(function(data) {
        console.log(data);
        location.reload();
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
