var ctx = document.getElementById("myChart").getContext("2d");
var myDoughnutChart = new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [0, 10, 5, 2, 20, 30, 45]
      }
    ]
  },
  options: {}
});
console.log(myDoughnutChart);
