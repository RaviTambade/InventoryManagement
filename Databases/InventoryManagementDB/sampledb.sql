 
	-- Insertion for material
	INSERT INTO categories(category) VALUES ("Bearings");
	INSERT INTO categories(category) VALUES ("1st Gear");
	INSERT INTO categories(category) VALUES ("2nd Gear");
	INSERT INTO categories(category) VALUES ("3rd Gear");
	INSERT INTO categories(category) VALUES ("Reverse Gear");
	INSERT INTO categories(category) VALUES ("Main Shaft");
	INSERT INTO categories(category) VALUES ("Counter Shaft");
	INSERT INTO categories(category) VALUES ("Housing");

	insert into materials(title, categoryid, quantity, unitprice, imageurl) values ('Needle Bearing',1,784,20, '/assets/img/Bearing.jpeg');
	insert into materials(title, categoryid, quantity, unitprice, imageurl) values ('Ball Bearing',1,800,30, '/assets/img/Bearing.jpeg');
	insert into materials(title, categoryid, quantity, unitprice, imageurl) values ('Bush Bearing',1,4500,15, '/assets/img/Bearing.jpeg');
	insert into materials(title, categoryid, quantity, unitprice, imageurl) values ('2nd Gear of ratio 3.4', 3,450,85, '/assets/img/2gear.jpeg');
	insert into materials(title, categoryid, quantity, unitprice, imageurl) values ('2nd Gear of ratio 3.6', 3,400,85, '/assets/img/2gear.jpeg');
	insert into materials(title, categoryid, quantity, unitprice, imageurl) values ('2nd Gear of ratio 4.2', 3,800,85, '/assets/img/2gear.jpeg');
	insert into materials(title, categoryid, quantity, unitprice, imageurl) values ('1st Gear of ratio 8.81', 2,450,90, '/assets/img/1gear.jpeg');
	insert into materials(title, categoryid, quantity, unitprice, imageurl) values ('1st Gear of ratio 9.23', 2,400,90, '/assets/img/1gear.jpeg');
	insert into materials(title, categoryid, quantity, unitprice, imageurl) values ('1st Gear of ratio 7.72', 2,800,90, '/assets/img/1gear.jpeg');
	insert into materials(title, categoryid, quantity, unitprice, imageurl) values ('3rd Gear of ratio 3.4', 4,450,85, '/assets/img/3gear.jpeg');
	insert into materials(title, categoryid, quantity, unitprice, imageurl) values ('3rd Gear of ratio 3.6', 4,400,85, '/assets/img/3gear.jpeg');
	insert into materials(title, categoryid, quantity, unitprice, imageurl) values ('3rd Gear of ratio 4.2', 4,0,85, '/assets/img/3gear.jpeg');
	insert into materials(title, categoryid, quantity, unitprice, imageurl) values ('Reverse Gear of ratio 3.4', 5,450,85, '/assets/img/Rgear.jpeg');
	insert into materials(title, categoryid, quantity, unitprice, imageurl) values ('Reverse Gear of ratio 3.6' , 5,400,85, '/assets/img/Rgear.jpeg');
	insert into materials(title, categoryid, quantity, unitprice, imageurl) values ('Reverse Gear of ratio 4.2', 5,800,85, '/assets/img/Rgear.jpeg');
	insert into materials(title, categoryid, quantity, unitprice, imageurl) values ('GB500 Main Shaft', 6,0,200, '/assets/img/ms.jpeg');
	insert into materials(title, categoryid, quantity, unitprice, imageurl) values ('GB400 Main Shaft',6,87,250, '/assets/img/ms.jpeg');
	insert into materials(title, categoryid, quantity, unitprice, imageurl) values ('GB540 Main Shaft', 6,79,400, '/assets/img/ms.jpeg');
	insert into materials(title, categoryid, quantity, unitprice, imageurl) values ('GB500 Counter Shaft', 7,80,450, '/assets/img/cs.jpeg');
	insert into materials(title, categoryid, quantity, unitprice, imageurl) values ('GB400 Counter Shaft', 7,89,200, '/assets/img/cs.jpeg');
	insert into materials(title, categoryid, quantity, unitprice, imageurl) values ('Gb540 Counter Shaft', 7,0,500, '/assets/img/cs.jpeg');
	insert into materials(title, categoryid, quantity, unitprice, imageurl) values ('GB500 Housing' , 8,50,2000, '/assets/img/housing.jpeg');
	insert into materials(title, categoryid, quantity, unitprice, imageurl) values ('GB400 Housing', 8,8,2500, '/assets/img/housing.jpeg');
	insert into materials(title, categoryid, quantity, unitprice, imageurl) values ('Gb540 Housing' , 8,0,3500, '/assets/img/housing.jpeg');

	-- Insertion for roles
	insert INTO roles(role) VALUES("Incharge");
	INSERT INTO roles(role) VALUES("Store Manager");
	INSERT INTO roles(role) VALUES("Supervisor");
	INSERT INTO roles(role) VALUES("Store Worker");

	-- Insertion for departments
	insert INTO departments(department) VALUES("HR");
	INSERT INTO departments(department) VALUES("Store");
	INSERT INTO departments(department) VALUES("GB500 Line");
	INSERT INTO departments(department) VALUES("GB400 Line");
	INSERT INTO departments(department) VALUES("GB540 Line");
	INSERT INTO departments(department) VALUES("worker");

	-- Insertion for Employees
	INSERT INTO employees(firstname,lastname,birthdate,hiredate,contactnumber,departmentid, roleid,email,password,imageurl,gender)VALUES('Sahil','Mankar','1997-05-19','2021-07-07','8756789158',2, 2 ,'Sahil22@gmail.com','SM569654' ,'/assets/img/mEmp.jpeg', 'male');
	INSERT INTO employees(firstname,lastname,birthdate,hiredate,contactnumber,departmentid, roleid,email,password,imageurl,gender)VALUES('Rahul','Desai','1995-08-11','2021-08-04','9856789157',2, 2 ,'RD@gmail.com','RD854466' ,'/assets/img/mEmp.jpeg', 'male');
	INSERT INTO employees(firstname,lastname,birthdate,hiredate,contactnumber,departmentid, roleid,email,password,imageurl,gender)VALUES('Siddhesh','Pandit','1996-01-02','2021-09-12','7845967845',2, 2 ,'SP@gmail.com','SP789956' ,'/assets/img/mEmp.jpeg', 'male');
	INSERT INTO employees(firstname,lastname,birthdate,hiredate,contactnumber,departmentid, roleid,email,password,imageurl,gender)VALUES('Tejaswini','Salvi','1992-11-19','2020-09-01','9888754415',2, 2 ,'TS22@gmail.com','TS337845' ,'/assets/img/fEmp.jpeg', 'female');
	INSERT INTO employees(firstname,lastname,birthdate,hiredate,contactnumber,departmentid, roleid,email,password,imageurl,gender)VALUES('samiksha','raut','1992-11-19','2020-09-01','7844726596',2, 2 ,'TS22@gmail.com','TS337845' ,'/assets/img/fEmp.jpeg', 'female');
	INSERT INTO employees(firstname,lastname,birthdate,hiredate,contactnumber,departmentid, roleid,email,password,imageurl,gender)VALUES('Vedant','Yadav','1987-01-07','2009-03-11','99887564123',2, 2 ,'VY@gmail.com','VY788814' ,'/assets/img/mEmp.jpeg', 'male');
	INSERT INTO employees(firstname,lastname,birthdate,hiredate,contactnumber,departmentid, roleid,email,password,imageurl,gender)VALUES('sameer','jadhav','1999-05-12','2018-03-11','8455786547',2,2,'SM@gmail.com','VY788815' ,'/assets/img/mEmp.jpeg', 'male');
	INSERT INTO employees(firstname,lastname,birthdate,hiredate,contactnumber,departmentid, roleid,email,password,imageurl,gender)VALUES('kalpesh','joshi','1998-01-14','2018-03-11','9987458745',2, 2 ,'KJgmail.com','KG788816' ,'/assets/img/mEmp.jpeg', 'male');

	INSERT INTO employees(firstname,lastname,birthdate,hiredate,contactnumber,departmentid, roleid,email,password,imageurl,gender)VALUES('suraj','Yadav','1998-02-07','2018-03-11','8755469321',3 , 3,'SY@gmail.com','SY88817' ,'/assets/img/mEmp.jpeg', 'male');
	INSERT INTO employees(firstname,lastname,birthdate,hiredate,contactnumber,departmentid, roleid,email,password,imageurl,gender)VALUES('manoj','sharma','1998-04-20','2018-03-11','9766132597',3, 3,'MS@gmail.com','MS788818' ,'/assets/img/mEmp.jpeg', 'male');
	INSERT INTO employees(firstname,lastname,birthdate,hiredate,contactnumber,departmentid, roleid,email,password,imageurl,gender)VALUES('sahil','dhumak','1998-08-14','2018-03-11','9877452163',4, 3,'SDgmail.com','SD788819' ,'/assets/img/mEmp.jpeg', 'male');
	INSERT INTO employees(firstname,lastname,birthdate,hiredate,contactnumber,departmentid, roleid,email,password,imageurl,gender)VALUES('siddhesh','pandit','1998-11-22','2018-03-11','9987554412',4, 3,'VSPgmail.com','VSP788810' ,'/assets/img/mEmp.jpeg', 'male');
	INSERT INTO employees(firstname,lastname,birthdate,hiredate,contactnumber,departmentid, roleid,email,password,imageurl,gender)VALUES('shankar','kambale','1998-10-26','2018-03-11','7877455512',5, 3 ,'SK@gmail.com','SK788811' ,'/assets/img/mEmp.jpeg', 'male');
	INSERT INTO employees(firstname,lastname,birthdate,hiredate,contactnumber,departmentid, roleid,email,password,imageurl,gender)VALUES('sumit','malap','1998-01-02','2018-03-11','9989745624',5, 3,'SM@gmail.com','SM788812' ,'/assets/img/mEmp.jpeg', 'male');

	INSERT INTO employees(firstname,lastname,birthdate,hiredate,contactnumber,departmentid, roleid,email,password,imageurl,gender)VALUES('shubham','ghanekar','1998-03-22','2018-03-11','8955746251',6, 4,'SGgmail.com','SG788813' ,'/assets/img/mEmp.jpeg', 'male');
	INSERT INTO employees(firstname,lastname,birthdate,hiredate,contactnumber,departmentid, roleid,email,password,imageurl,gender)VALUES('vinaya','satpute','1997-01-01','2018-03-11','9287994765',6, 4 ,'VS@gmail.com','VS7888122' ,'/assets/img/fEmp.jpeg', 'female');
	INSERT INTO employees(firstname,lastname,birthdate,hiredate,contactnumber,departmentid, roleid,email,password,imageurl,gender)VALUES('shivam','kelkar','1999-03-22','2018-03-11','9955746251',6, 4,'Skgmail.com','SG788813' ,'/assets/img/mEmp.jpeg', 'male');
	INSERT INTO employees(firstname,lastname,birthdate,hiredate,contactnumber,departmentid, roleid,email,password,imageurl,gender)VALUES('tejas','khapre','1998-07-02','2018-03-11','977994765',6, 4 ,'TK@gmail.com','VS7888122' ,'/assets/img/fEmp.jpeg', 'male');
	INSERT INTO employees(firstname,lastname,birthdate,hiredate,contactnumber,departmentid, roleid,email,password,imageurl,gender)VALUES('sanket','rewale','1998-11-25','2018-03-11','7855746251',6, 4,'SRgmail.com','SG788813' ,'/assets/img/mEmp.jpeg', 'male');
	INSERT INTO employees(firstname,lastname,birthdate,hiredate,contactnumber,departmentid, roleid,email,password,imageurl,gender)VALUES('aditya','rawnag','1999-11-16','2018-03-11','7787994765',6, 4 ,'AR@gmail.com','VS7888122' ,'/assets/img/fEmp.jpeg', 'male');
	INSERT INTO employees(firstname,lastname,birthdate,hiredate,contactnumber,departmentid, roleid,email,password,imageurl,gender)VALUES('rohit','ghanekar','1995-05-12','2018-03-11','7455746251',6, 4,'SGgmail.com','SG788813' ,'/assets/img/mEmp.jpeg', 'male');
	INSERT INTO employees(firstname,lastname,birthdate,hiredate,contactnumber,departmentid, roleid,email,password,imageurl,gender)VALUES('tejas','harekar','1994-09-23','2018-03-11','7487994765',6, 4 ,'VS@gmail.com','VS7888122' ,'/assets/img/fEmp.jpeg', 'male');
	INSERT INTO employees(firstname,lastname,birthdate,hiredate,contactnumber,departmentid, roleid,email,password,imageurl,gender)VALUES('abhi','horambe','1996-07-14','2018-03-11','7955746251',6, 4,'SGgmail.com','SG788813' ,'/assets/img/mEmp.jpeg', 'male');
	INSERT INTO employees(firstname,lastname,birthdate,hiredate,contactnumber,departmentid, roleid,email,password,imageurl,gender)VALUES('shila','joshi','1998-01-06','2018-03-11','9787994765',6, 4 ,'VS@gmail.com','VS7888122' ,'/assets/img/fEmp.jpeg', 'female');

INSERT INTO workerstatus(workerid)VALUES(21);
INSERT INTO workerstatus(workerid)VALUES(22);
INSERT INTO workerstatus(workerid)VALUES(23);
INSERT INTO workerstatus(workerid)VALUES(24);

	-- Insertion for Sections
	insert into warehouse(section,  categoryid,employeeid)values('Section 1', 1,1);
	insert into warehouse(section, categoryid,employeeid)values('Section 2', 2,2);
	insert into warehouse(section, categoryid,employeeid)values('Section 3', 3,3);
	insert into warehouse(section, categoryid,employeeid)values('Section 4', 4,4);
	insert into warehouse(section, categoryid,employeeid)values('Section 5', 5,5);
	insert into warehouse(section, categoryid,employeeid)values('Section 6', 6,6);
	insert into warehouse(section, categoryid,employeeid)values('Section 7', 7,7);
	insert into warehouse(section, categoryid,employeeid)values('Section 8', 8,8);


	INSERT INTO carts(employeeid) VALUES (9);
	INSERT INTO carts(employeeid) VALUES (10);
	INSERT INTO carts(employeeid) VALUES (11);
	INSERT INTO carts(employeeid) VALUES (12);
	INSERT INTO carts(employeeid) VALUES (13);
	INSERT INTO carts(employeeid) VALUES (14);
--     