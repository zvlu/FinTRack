create database expense_tracker;
use expense_tracker;

insert into users (firstName,lastName,email,password) VALUES ("Andrew","LN","and@gmail.com","andr");
select * from users;

insert into bank (currentBalance,userId) values (10456.89, 2);
select * from bank;

insert into categories (type, name) values ("income", "Primary"), ("income", "Secondary"), ("income", "Supplementary"), ("expense", "Mortgage"), ("expense", "Rent"),
											("expense", "Car"), ("expense", "Gas"), ("expense", "Electricity"), ("expense", "Grocery"), ("expense", "Grocery"), 
                                            ("expense", "Entertainment"), ("expense", "Misc");
                                            
select * from categories;

insert into portfolio (portfolioVal, userId) values (8000, 2);
select * from portfolio;

insert into inandouts (date,amount,UserId,CategoryId) values (curdate(), 10545,1, 1), (curdate(), 1500,1,4), (curdate(), 350,1,6), (curdate(), 50,1,7),
															(curdate(), 9000,2,1), (curdate(), 1350,2,2), (curdate(), 2000,2,4),(curdate(), 150,2,8);
insert into inandouts (date,amount,UserId,CategoryId) values (curdate()-2, 90,2,10);
select * from inandouts; 


