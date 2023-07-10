- Insertion for material
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
    -- store employee
	INSERT INTO employees(userid,departmentid, roleid,imageurl)VALUES(1,2, 2 ,'/assets/img/mEmp.jpeg');
	INSERT INTO employees(userid,departmentid, roleid,imageurl)VALUES(2,2, 2 ,'/assets/img/mEmp.jpeg');
	INSERT INTO employees(userid,departmentid, roleid,imageurl)VALUES(3,2, 2 ,'/assets/img/mEmp.jpeg');
	INSERT INTO employees(userid,departmentid, roleid,imageurl)VALUES(4,2, 2 ,'/assets/img/mEmp.jpeg');
	INSERT INTO employees(userid,departmentid, roleid,imageurl)VALUES(5,2, 2 ,'/assets/img/mEmp.jpeg');
	INSERT INTO employees(userid,departmentid, roleid,imageurl)VALUES(6,2, 2 ,'/assets/img/mEmp.jpeg');
	INSERT INTO employees(userid,departmentid, roleid,imageurl)VALUES(7,2, 2 ,'/assets/img/mEmp.jpeg');
	INSERT INTO employees(userid,departmentid, roleid,imageurl)VALUES(8,2, 2 ,'/assets/img/mEmp.jpeg');
    
    -- supervisores
	INSERT INTO employees(userid,departmentid, roleid,imageurl)VALUES(9,3, 3 ,'/assets/img/mEmp.jpeg');
	INSERT INTO employees(userid,departmentid, roleid,imageurl)VALUES(10,3, 3 ,'/assets/img/mEmp.jpeg');
	INSERT INTO employees(userid,departmentid, roleid,imageurl)VALUES(11,4, 3 ,'/assets/img/mEmp.jpeg');
	INSERT INTO employees(userid,departmentid, roleid,imageurl)VALUES(12,4, 3 ,'/assets/img/mEmp.jpeg');
	INSERT INTO employees(userid,departmentid, roleid,imageurl)VALUES(13,5, 3 ,'/assets/img/mEmp.jpeg');
	INSERT INTO employees(userid,departmentid, roleid,imageurl)VALUES(14,5, 3 ,'/assets/img/mEmp.jpeg');
    
    -- store workers
	INSERT INTO employees(userid,departmentid, roleid,imageurl)VALUES(15,6, 4 ,'/assets/img/mEmp.jpeg');
	INSERT INTO employees(userid,departmentid, roleid,imageurl)VALUES(16,6, 4 ,'/assets/img/mEmp.jpeg');
	INSERT INTO employees(userid,departmentid, roleid,imageurl)VALUES(17,6, 4 ,'/assets/img/mEmp.jpeg');
	INSERT INTO employees(userid,departmentid, roleid,imageurl)VALUES(18,6, 4 ,'/assets/img/mEmp.jpeg');

select * from employees;
INSERT INTO workerstatus(workerid)VALUES(15);
INSERT INTO workerstatus(workerid)VALUES(16);
INSERT INTO workerstatus(workerid)VALUES(17);
INSERT INTO workerstatus(workerid)VALUES(18);

	-- Insertion for Sections
	-- Insertion for Sections
	insert into Warehousestaff(section,  categoryid,employeeid)values('Section 1', 1,1);
	insert into Warehousestaff(section, categoryid,employeeid)values('Section 2', 2,2);
	insert into Warehousestaff(section, categoryid,employeeid)values('Section 3', 3,3);
	insert into Warehousestaff(section, categoryid,employeeid)values('Section 4', 4,4);
	insert into Warehousestaff(section, categoryid,employeeid)values('Section 5', 5,5);
	insert into Warehousestaff(section, categoryid,employeeid)values('Section 6', 6,6);
	insert into Warehousestaff(section, categoryid,employeeid)values('Section 7', 7,7);
	insert into Warehousestaff(section, categoryid,employeeid)values('Section 8', 8,8);

	INSERT INTO initialrequest(employeeid) VALUES (9);
	INSERT INTO initialrequest(employeeid) VALUES (10);
	INSERT INTO initialrequest(employeeid) VALUES (11);
	INSERT INTO initialrequest(employeeid) VALUES (12);
	INSERT INTO initialrequest(employeeid) VALUES (13);
	INSERT INTO initialrequest(employeeid) VALUES (14);
   
   