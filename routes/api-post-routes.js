/* eslint-disable indent */
// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  app.post("/api/expense", async function(req, res) {
    createIncomeOrExpense(req, res);
  });

  app.post("/api/income", async function(req, res) {
    createIncomeOrExpense(req, res);
  });

  async function createIncomeOrExpense(req, res) {
    try {
      console.log("user id " + req.user.id);
      let dbCategory = await db.Category.findOne({
        where: { name: req.body.category }
      });

      let dbCatExist = await db.InAndOut.findOne({
        where: { CategoryId: dbCategory.dataValues.id, UserId: req.user.id }
      });
      if (dbCatExist) {
        await db.InAndOut.update(
          {
            date: req.body.date,
            amount:
              parseFloat(dbCatExist.dataValues.amount) +
              parseFloat(req.body.amount)
          },
          {
            where: { CategoryId: dbCatExist.dataValues.CategoryId }
          }
        );
      } else {
        await db.InAndOut.create({
          date: req.body.date,
          amount: req.body.amount,
          UserId: req.user.id,
          CategoryId: dbCategory.dataValues.id
        });
        console.log("success");
        return res.sendStatus(200);
      }
    } catch (err) {
      console.log(err);
      return res.json(err);
    }
  }

  app.post("/api/user_data", async function(req, res) {
    try {
      let dbBankOne = await db.Bank.findOne({ where: { userId: req.user.id } });
      if (dbBankOne) {
        await db.Bank.update(
          {
            currentBalance:
              parseFloat(dbBankOne.dataValues.currentBalance) +
              parseFloat(req.body.bshare)
          },
          {
            where: { UserId: dbBankOne.dataValues.UserId }
          }
        );
        // return res.json("Updated "+ updated);
      } else {
        await db.Bank.create({
          currentBalance: req.body.bshare,
          UserId: req.user.id
        });
      }
      let dbPortfolioOne = await db.Portfolio.findOne({
        where: { userId: req.user.id }
      });
      if (dbPortfolioOne) {
        await db.Portfolio.update(
          {
            portfolioVal:
              parseFloat(dbPortfolioOne.dataValues.portfolioVal) +
              parseFloat(req.body.pshare)
          },
          {
            where: { UserId: dbPortfolioOne.dataValues.UserId }
          }
        );
      } else {
        await db.Portfolio.create({
          portfolioVal: req.body.pshare,
          UserId: req.user.id
        });
      }
    } catch (err) {
      console.log("ERROR! " + err.name + ": " + err.message);
      return res.json(err);
    }
  });
  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });
};
