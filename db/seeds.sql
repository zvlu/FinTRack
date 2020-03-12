create database expense_tracker;
use expense_tracker;

insert into users (firstName,lastName,email,password) VALUES ("Andrew","LN","and@gmail.com","andr");
select * from users;

insert into bank (currentBalance,userId) values (8800, 3);
select * from bank;

insert into categories (type, name) values ("income", "Primary"), ("income", "Secondary"), ("income", "Supplementary"), ("expense", "Mortgage"), ("expense", "Rent"),
											("expense", "Car"), ("expense", "Gas"), ("expense", "Electricity"), ("expense", "Grocery"), ("expense", "Grocery"), 
                                            ("expense", "Entertainment"), ("expense", "Misc");
                                            
select * from categories;

insert into portfolio (portfolioVal, userId) values (8000, 1);
select * from portfolio;

insert into inandouts (date,amount,UserId,CategoryId) values (curdate(), 10545,1, 1), (curdate(), 1500,1,4), (curdate(), 350,1,6), (curdate(), 50,1,7),
															(curdate(), 9000,2,1), (curdate(), 1350,2,2), (curdate(), 2000,2,4),(curdate(), 150,2,8);
insert into inandouts (date,amount,UserId,CategoryId) values (curdate()-2 , 90,1,10);
select * from inandouts; 
insert into inandouts (date,amount,UserId,CategoryId) values (curdate()-3, 1000, 1,( Select id from categories where name="Secondary"));

select * from inandouts join categories on inandouts.CategoryId = categories.id where UserId =1 ;
select sum(amount), categories.type  from inandouts join categories on inandouts.CategoryId = categories.id where userId= 12 GROUP BY categories.type;
select * from inandouts join categories on inandouts.CategoryId = categories.id where UserId = 1 and month(inandouts.date) = 3;

