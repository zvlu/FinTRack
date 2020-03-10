// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
var sequelize = require("sequelize");

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

  app.post("/api/income", function(req, res) {
    console.log("user id " + req.user.id);
    return db.Category.findOne({
      where: {
        name: req.body.category
      }
    }).then(function(dbCategory) {
      console.log(dbCategory.dataValues.id);
      console.log(req.body.date);
      console.log(req.body.amount);
      console.log(req.user.id);
      db.InAndOut.create({
        date: req.body.date,
        amount: req.body.amount,
        UserId: req.user.id,
        CategoryId: dbCategory.dataValues.id
      })
        .then(function(dbInAndOut) {
          // res.json({ id: dbInAndOut.insertId });
          // res.redirect(307, "/api/login");
          console.log(dbInAndOut);

          return res.sendStatus(200);
        })
        .catch(function(err) {
          res.status(500).json(err);
        });
    });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      return db.Bank.findOne({
        where: {
          UserId: req.user.id
        }
      })
        .then(function(dbBank) {
          // console.log(dbBank);
          return db.Portfolio.findOne({
            where: {
              UserId: req.user.id
            }
          }).then(function(dbPortfolio) {
            console.log(dbPortfolio);
            return db.InAndOut.findAll({
              attributes: [
                // "db.Category.type",
                sequelize.fn("sum", sequelize.col("amount"))
              ],
              where: { userId: req.user.id },
              raw: true,
              include: [{ model: db.Category }],
              group: ["Category.type"]
            }).then(function(dbJoin) {
              console.log(dbJoin[0]["sum(`amount`)"]);
              res.json({
                firstName: req.user.firstName,
                currentBalance:
                  dbBank === null ? "" : dbBank.dataValues.currentBalance,
                portfolioVal:
                  dbPortfolio === null
                    ? ""
                    : dbPortfolio.dataValues.portfolioVal,
                income: dbJoin === null ? "" : dbJoin[0]["sum(`amount`)"],
                expense: dbJoin === null ? "" : dbJoin[1]["sum(`amount`)"]
              });
            });
          });
        })
        .catch(function(err) {
          return res.json(err);
          // res.status(404).send("Not Found");
        });
    }
  });
};
