$(document).ready(function() {
  // Getting references to our form and input
  var expenseForm = $("form.Expense");
  var dateInput = $("#date-pick");
  var expenseTypeInput = $("#expense-type");
  var expenseAmtInput = $("#expense-amt");

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
        window.location.replace("/expense");
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
