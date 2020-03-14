//import { alpApiUrl } from "../../config/config";
var company;

//console.log(alpApiUrl);
$("#add-city").on("click", function(event) {
  event.preventDefault();
  company = $("#company-input")
    .val()
    .trim();
  $("#company-input").val("");
  // console.log(company);
  findStock(company);
});

async function findStock(company) {
  var queryURL1 =
    "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" +
    company +
    "&apikey=3MA1I2DFH4BCUUCG";
  //alpApiUrl +
  //process.env.ALP_API_URL +
  "/query?function=SYMBOL_SEARCH&keywords=" +
    //company +
    //"&apikey=" +
    //process.env.ALP_API_KEY;
    //console.log("queryURL1====>" + queryURL1);

    $.ajax({
      url: queryURL1,
      method: "GET"
    }).then(function(response) {
      // console.log(response);
      let data = response.bestMatches[0];
      // console.log((Object.values(data)[0]));
      var symbol = Object.values(data)[0];
      console.log(symbol);
      highLowquote(symbol);
      compen(symbol);
      revenueEst(symbol);
      rec(symbol);
      drawChart(symbol);
      $("#myChart").css({
        "background-color": "#ffffff",
        "border-radius": "4px"
      });
    });
}

async function highLowquote(symbol) {
  var queryURL =
    "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" +
    symbol +
    "&apikey=3MA1I2DFH4BCUUCG";
  /*process.env.ALP_API_URL +
    "query?function=GLOBAL_QUOTE&symbol=" +
    symbol +
    "&apikey=" +
    process.env.ALP_API_KEY;*/

  // This is giving "Open price of the day",High price,low price,current price,previous close price,Timestamp of current daily bar for "apple"
  // var queryURL = "https://finnhub.io/api/v1/quote?symbol=" + symbol + "&token=bpkhbgnrh5rcgrlra9h0";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    //console.log('Global Quote==>' + response["Global Quote"]["02. open"]);
    $(".curPrice").append(
      "<b>Current Price: </b>" +
        response["Global Quote"]["05. price"] +
        "<button style='margin: 12px;'class='btn btn-primary glyphicon' type='button'>Buy</button>"
    );
    $(".open").append("<b>Open: </b>" + response["Global Quote"]["02. open"]);
    $(".privClose").append(
      "<b>Previous Close: </b>" + response["Global Quote"]["08. previous close"]
    );
    $(".high").append("<b>High: </b>" + response["Global Quote"]["03. high"]);
    $(".low").append("<b>Low: </b>" + response["Global Quote"]["04. low"]);
    $(".volume").append(
      "<b>Volume: </b>" + response["Global Quote"]["06. volume"]
    );
    $(".disp").css({
      "background-color": "#ffffff",
      "border-radius": "4px",
      "border-radius": "4px",
      "min-width": "350px !important;",
      "flex-grow": "unset"
    });
  });
}

function compen(symbol) {
  //CEO compensation
  var queryURL =
    "https://finnhub.io/api/v1/stock/ceo-compensation?symbol=" +
    symbol +
    "&token=bpkhbgnrh5rcgrlra9h0";

  /*process.env.FINHUB_API_URL +
    "ceo-compensation?symbol=" +
    symbol +
    "&token=" +
    process.env.FINHUB_API_KEY;*/
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
  });
}

function revenueEst(symbol) {
  //company revenue estimate
  var queryurl =
    "https://finnhub.io/api/v1/stock/revenue-estimate?symbol=" +
    symbol +
    "&freq=annual&token=bpkhbgnrh5rcgrlra9h0";
  /*process.env.FINHUB_API_URL +
    "revenue-estimate?symbol=" +
    symbol +
    "&freq=annual&token=" +
    process.env.FINHUB_API_KEY;*/

  $.ajax({
    url: queryurl,
    method: "GET"
  }).then(function(response) {
    console.log(response);
  });
} //This is giving symbol: "BMW.DE",targetHigh,targetLow,targetMean,targetMedian
// var queryURL= "https://finnhub.io/api/v1/stock/price-target?symbol=BMW.DE&token=bpkhbgnrh5rcgrlra9h0";
function rec(symbol) {
  /*process.env.FINHUB_API_URL +
    "recommendation?symbol=" +
    symbol +
    "&token=" +
    process.env.FINHUB_API_KEY;*/
  var queryURL =
    "https://finnhub.io/api/v1/stock/recommendation?symbol=" +
    symbol +
    "&token=bpkhbgnrh5rcgrlra9h0";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
  });
}

let keys = [];
let quotes = [];
let stockName;
let colors = ["rgba(224, 20, 64, 1)", "rgba(20, 224, 75, 1)"];
let bgColor = ["rgba(255, 99, 132, 0.2)", "rgba(139, 234, 164, 1"];

var ctx = document.getElementById("myChart").getContext("2d");

async function drawChart(stockSym) {
  await loadData(stockSym);
  let colorIndex = quotes[quotes.length - 1] - quotes[0] > 0 ? 1 : 0;
  console.log(colorIndex + colors[colorIndex]);
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: keys,
      datasets: [
        {
          label: "Quotes for " + stockSym,
          data: quotes,
          fill: true,
          backgroundColor: bgColor[colorIndex],
          borderColor: colors[colorIndex],
          borderWidth: 1
        }
      ]
    },

    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: false
            }
          }
        ]
      }
    }
  });
}

async function loadData(stockSym) {
  /*alpUrl =
    process.env.ALP_API_URL +
    `/query?function=TIME_SERIES_INTRADAY&symbol=${stockSym}&interval=60min&outputsize=full&apikey=` +
    process.env.ALP_API_KEY;*/
  const response = await fetch(
    `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockSym}&interval=60min&outputsize=full&apikey=3MA1I2DFH4BCUUCG`
    //alpUrl
  );
  const data = await response.json();
  let values = Object.values(Object.values(data)[1]);
  values = values.reverse();
  keys = Object.keys(Object.values(data)[1]);
  keys = keys.reverse();
  //console.log(keys)

  values.forEach(element => {
    //console.log(element);
    //console.log(Object.values(element)[3])
    quotes.push(Object.values(element)[3]);
  });
  // console.log(quotes)
}
