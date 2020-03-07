DROP DATABASE IF EXISTS expense_tracker;
CREATE database expense_tracker;

USE expense_tracker;

insert into users (firstName,lastName,email,password) VALUES ("Aug","SM","sma@yahoo.com","aws");
insert into bank (currentBalance,userId) values (9456.89, 1);
insert into categories (type, name) values ("income", "majorincome");
insert into incomes (date, amount,userId,categoryId) values (curdate(),8000.56,1,1);
