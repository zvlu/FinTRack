/* eslint-disable no-unused-vars */
// cost members = require("./members.js");
// let incomes = members.incomes;

// incomes.map(item => console.log("item from incomes array " + item));

var ctx = document.getElementById("myChartInc").getContext("2d");
var ctx1 = document.getElementById("myChartExp").getContext("2d");
var data = {
  labels: [],
  datasets: [
    {
      data: [],
      label: "My First dataset",
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(45, 192, 86, 0.2) "
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
        "rgba(45, 192, 86, 0.2)"
      ],
      hoverBackgroundColor: []
    }
  ]
};
var options = {
  title: {
    display: true,
    text: "Income"
  },
  cutoutPercentage: 0,
  rotation: -0.5 * Math.PI,
  circumference: 2 * Math.PI
};
var opt = {
  type: "pie",
  data: data,
  options: options
};
var chartInc = new Chart(ctx, opt);
var incomeObj = [
  { amount: "11000", name: "Primary" },
  { amount: "4000", name: "Supplementary" }
];
var data1 = {
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(45, 192, 86, 0.2) "
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
        "rgba(45, 192, 86, 0.2)"
      ],
      hoverBackgroundColor: []
    }
  ]
};
var options1 = {
  title: {
    display: true,
    text: "Expense"
  },
  cutoutPercentage: 0,
  rotation: -0.5 * Math.PI,
  circumference: 2 * Math.PI
};
var opt1 = {
  type: "pie",
  data: data1,
  options: options1
};
var chartExp = new Chart(ctx1, opt1);
function updateChart(chart, arr) {
  for (i = 0; i < arr.length; i++) {
    chart.config.data.labels.push(arr[i].name);
    chart.config.data.datasets[0].data.push(arr[i].amount);
  }

  chart.update();
}

$.get("/api/chart_data")
  .then(function(data) {
    console.log(data);
    if (data.dbJoinChart.length) {
      var incomes = [];
      var expenses = [];
      for (i = 0; i < data.dbJoinChart.length; i++) {
        if (data.dbJoinChart[i]["Category.type"] === "income") {
          incomes.push({
            amount: data.dbJoinChart[i].amount,
            name: data.dbJoinChart[i]["Category.name"]
          });
        } else {
          expenses.push({
            amount: data.dbJoinChart[i].amount,
            name: data.dbJoinChart[i]["Category.name"]
          });
        }
      }
      updateChart(chartInc, incomes);
      updateChart(chartExp, expenses);
    }
  })
  .catch(function(err) {
    console.log(err);
  });
