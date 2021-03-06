/* eslint-disable prettier/prettier */
// Requiring our models and passport as we've configured it
const db = require("../models");
const sequelize = require("sequelize");

module.exports = function(app) {
  
  app.get("/api/user_data", async function(req, res) {
    try{
      if (!req.user) {
      // The user is not logged in, send back an empty object
        res.json({});
      } else {
        const dbBank = await db.Bank.findOne({ where: { UserId: req.user.id }});
        const dbPortfolio = await db.Portfolio.findOne({ where: { UserId: req.user.id } });
        const dbJoin = await db.InAndOut.findAll({
          attributes: [
            sequelize.fn("sum", sequelize.col("amount"))
          ],
          where: { userId: req.user.id },
          raw: true,
          include: [{ model: db.Category }],
          group: ["Category.type"]
        });
        var income;
        var expense;
                
        switch (dbJoin.length) {
        case 0:
          income = 0;
          expense = 0;
          break;
        case 1:
          if(dbJoin[0]["Category.type"] === "income"){
            income = dbJoin[0]["sum(`amount`)"];
            expense = 0;
            break;
          }
          expense = dbJoin[0]["sum(`amount`)"];
          income = 0;
          break;
        case 2:
          expense = dbJoin[0]["sum(`amount`)"];
          income = dbJoin[1]["sum(`amount`)"];
          break;
        }
        res.json({
          firstName: req.user.firstName,
          currentBalance:
          dbBank === null ? 0 : dbBank.dataValues.currentBalance,
          portfolioVal:
          dbPortfolio === null ? 0 : dbPortfolio.dataValues.portfolioVal,
          income: income,
          expense: expense,
        });
      }
    }catch(err){
      return res.json(err);
    }
  }); 
  app.get("/api/chart_data/:month", async function(req, res) {
    console.log(req.params.month);
    try{
      if (!req.user) {
      // The user is not logged in, send back an empty object
        res.json({});
      } else {
        const dbJoinChart = await db.InAndOut.findAll({
          where: { UserId: req.user.id,
            $and :sequelize.where(sequelize.fn("month", sequelize.col("date")), req.params.month)
          },
          required: true,
          raw: true,
          include: [{ model: db.Category }],
        });
               
        res.json({
          dbJoinChart:dbJoinChart
        });
      }
    }catch(err){
      return res.json(err);
    }
  });
};
  
