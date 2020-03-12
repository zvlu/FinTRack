/* eslint-disable no-unused-vars */
// cost members = require("./members.js");
// let incomes = members.incomes;

// incomes.map(item => console.log("item from incomes array " + item));

var ctx = document.getElementById("myChartInc").getContext("2d");
var ctx1 = document.getElementById("myChartExp").getContext("2d");

// var myDoughnutChart = new Chart(ctx, {
//   type: "doughnut",
//   data: {
//     // labels: [
//     //   "Mortgage",
//     //   "Rent",
//     //   "Car",
//     //   "Gas",
//     //   "Electricity",
//     //   "Entertainment",
//     //   "Misc"
//     // ],
//     labels: names,
//     datasets: [
//       {
//         label: "My First dataset",
//         backgroundColor: [
//           "rgba(255, 99, 132, 0.2)",
//           "rgba(54, 162, 235, 0.2)",
//           "rgba(255, 206, 86, 0.2)",
//           "rgba(75, 192, 192, 0.2)",
//           "rgba(153, 102, 255, 0.2)",
//           "rgba(255, 159, 64, 0.2)",
//           "rgba(45, 192, 86, 0.2) "
//         ],
//         borderColor: [
//           "rgba(255, 99, 132, 1)",
//           "rgba(54, 162, 235, 1)",
//           "rgba(255, 206, 86, 1)",
//           "rgba(75, 192, 192, 1)",
//           "rgba(153, 102, 255, 1)",
//           "rgba(255, 159, 64, 1)",
//           "rgba(45, 192, 86, 0.2)"
//         ],
// data: [15, 10, 5, 2, 20, 30, 45]

//       }
//     ]
//   },
//   options: {}
// });
// var names = [];
// var amt = [];
// for (i = 0; i < incomeObj.length; i++) {
//   console.log(incomeObj);
//   names.push(incomeObj[i].name);
//   amt.push(incomeObj[i].amount);
// }
// console.log(names);
// console.log(amt);
// myDoughnutChart.update();
// console.log(myDoughnutChart);

// var c = document.getElementById("chart");
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
for (i = 0; i < incomeObj.length; i++) {
  chartInc.config.data.labels.push(incomeObj[i].name);
  chartInc.config.data.datasets[0].data.push(incomeObj[i].amount);
}

chartInc.update();
// var c = document.getElementById("chart");
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
var expenseObj = [
  { amount: "1000", name: "Rent" },
  { amount: "400", name: "Grocery" },
  { amount: "100", name: "Electricity" }
];
for (i = 0; i < expenseObj.length; i++) {
  chartExp.config.data.labels.push(expenseObj[i].name);
  chartExp.config.data.datasets[0].data.push(expenseObj[i].amount);
}

chartExp.update();
