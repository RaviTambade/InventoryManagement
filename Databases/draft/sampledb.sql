
-- - Insertion for material
INSERT INTO categories(category) VALUES ("Bearings");
INSERT INTO categories(category) VALUES ("1st Gear");
INSERT INTO categories(category) VALUES ("2nd Gear");
INSERT INTO categories(category) VALUES ("3rd Gear");
INSERT INTO categories(category) VALUES ("Reverse Gear");
INSERT INTO categories(category) VALUES ("Main Shaft");
INSERT INTO categories(category) VALUES ("Counter Shaft");
INSERT INTO categories(category) VALUES ("Housing");
INSERT INTO categories(category) VALUES("Clutch Components"),
("Transmission Fluids"),
("Axle Components"),
("Suspension Parts"),
("Engine Block"),
("Pistons and Rings"),
("Crankshaft and Camshaft"),
("Electrical Components");


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
	insert INTO roles(role) VALUES("Store Incharge");
	INSERT INTO roles(role) VALUES("Store Manager");
	INSERT INTO roles(role) VALUES("Supervisor");
	INSERT INTO roles(role) VALUES("Store Worker");
    INSERT INTO roles(role) VALUES("Supervisor Incharge");
    
	-- Insertion for departments
	insert INTO departments(department) VALUES("HR");
	INSERT INTO departments(department) VALUES("Store");
	INSERT INTO departments(department) VALUES("GB500 Line");
	INSERT INTO departments(department) VALUES("GB400 Line");
	INSERT INTO departments(department) VALUES("GB540 Line");
	INSERT INTO departments(department) VALUES("worker");
    INSERT INTO departments(department) VALUES("Engine Line");
	INSERT INTO departments(department) VALUES("Chassis Assembly");
	INSERT INTO departments(department) VALUES("Interior Assembly");
    INSERT INTO departments(department) VALUES("Production");
    

-- Insertion for roles
insert INTO roles(role) VALUES("Store Incharge");
INSERT INTO roles(role) VALUES("Store Manager");
INSERT INTO roles(role) VALUES("Supervisor");
INSERT INTO roles(role) VALUES("Store Worker");
INSERT INTO roles(role) VALUES("Supervisor Incharge");


-- Insertion for departments
insert INTO departments(department) VALUES("HR");
INSERT INTO departments(department) VALUES("Store");
INSERT INTO departments(department) VALUES("GB500 Line");
INSERT INTO departments(department) VALUES("GB400 Line");
INSERT INTO departments(department) VALUES("GB540 Line");
INSERT INTO departments(department) VALUES("worker");
INSERT INTO departments(department) VALUES("Engine Line");
INSERT INTO departments(department) VALUES("Chassis Assembly");
INSERT INTO departments(department) VALUES("Interior Assembly");
INSERT INTO departments(department) VALUES("Production");


-- Insertion for Employees
-- store manager
INSERT INTO employees(userid,departmentid, roleid,hiredate)VALUES(1,2, 2 ,'2019-09-01 00:00:00');
INSERT INTO employees(userid,departmentid, roleid,hiredate)VALUES(2,2, 2 ,'2019-09-01 00:00:00');
INSERT INTO employees(userid,departmentid, roleid,hiredate)VALUES(3,2, 2 ,'2019-09-01 00:00:00');
INSERT INTO employees(userid,departmentid, roleid,hiredate)VALUES(4,2, 2 ,'2019-09-01 00:00:00');
INSERT INTO employees(userid,departmentid, roleid,hiredate)VALUES(5,2, 2 ,'2019-09-01 00:00:00');
INSERT INTO employees(userid,departmentid, roleid,hiredate)VALUES(6,2, 2 ,'2019-09-01 00:00:00');
INSERT INTO employees(userid,departmentid, roleid,hiredate)VALUES(7,2, 2 ,'2019-09-01 00:00:00');
INSERT INTO employees(userid,departmentid, roleid,hiredate)VALUES(8,2, 2 ,'2019-09-01 00:00:00');
INSERT INTO employees(userid,departmentid, roleid,hiredate)VALUES(9,2, 2 ,'2019-09-01 00:00:00');
INSERT INTO employees(userid,departmentid, roleid,hiredate)VALUES(10,2, 2 ,'2019-09-01 00:00:00');
INSERT INTO employees(userid,departmentid, roleid,hiredate)VALUES(11,2, 2 ,'2019-09-01 00:00:00');
INSERT INTO employees(userid,departmentid, roleid,hiredate)VALUES(12,2, 2 ,'2019-09-01 00:00:00');
INSERT INTO employees(userid,departmentid, roleid,hiredate)VALUES(13,2, 2 ,'2019-09-01 00:00:00');
INSERT INTO employees(userid,departmentid, roleid,hiredate)VALUES(14,2, 2 ,'2019-09-01 00:00:00');
INSERT INTO employees(userid,departmentid, roleid,hiredate)VALUES(15,2, 2 ,'2019-09-01 00:00:00');
INSERT INTO employees(userid,departmentid, roleid,hiredate)VALUES(16,2, 2 ,'2019-09-01 00:00:00');
INSERT INTO employees(userid,departmentid, roleid,hiredate)VALUES(17,2, 2 ,'2019-09-01 00:00:00');
INSERT INTO employees(userid,departmentid, roleid,hiredate)VALUES(18,2, 2 ,'2019-09-01 00:00:00');
INSERT INTO employees(userid,departmentid, roleid,hiredate)VALUES(19,2, 2 ,'2019-09-01 00:00:00');
INSERT INTO employees(userid,departmentid, roleid,hiredate)VALUES(20,2, 2 ,'2019-09-01 00:00:00');

-- supervisores
INSERT INTO employees(userid,departmentid, roleid,hiredate)VALUES(21,3, 3 ,'2019-09-01 00:00:00');
INSERT INTO employees(userid,departmentid, roleid,hiredate)VALUES(22,3, 3 ,'2019-09-01 00:00:00');
INSERT INTO employees(userid,departmentid, roleid,hiredate)VALUES(23,4, 3 ,'2019-09-01 00:00:00');
INSERT INTO employees(userid,departmentid, roleid,hiredate)VALUES(24,4, 3 ,'2019-09-01 00:00:00');
INSERT INTO employees(userid,departmentid, roleid,hiredate)VALUES(25,5, 3 ,'2019-09-01 00:00:00');
INSERT INTO employees(userid,departmentid, roleid,hiredate)VALUES(26,5, 3 ,'2019-09-01 00:00:00');
INSERT INTO employees(userid,departmentid, roleid,hiredate)VALUES(27,7, 3 ,'2019-09-01 00:00:00');
INSERT INTO employees(userid,departmentid, roleid,hiredate)VALUES(28,7, 3 ,'2019-09-01 00:00:00');
INSERT INTO employees(userid,departmentid, roleid,hiredate)VALUES(29,8, 3 ,'2019-09-01 00:00:00');
INSERT INTO employees(userid,departmentid, roleid,hiredate)VALUES(30,8, 3 ,'2019-09-01 00:00:00');
INSERT INTO employees(userid,departmentid, roleid,hiredate)VALUES(31,9, 3 ,'2019-09-01 00:00:00');
INSERT INTO employees(userid,departmentid, roleid,hiredate)VALUES(32, 9, 3, '2019-09-01 00:00:00');
INSERT INTO employees(userid,departmentid, roleid,hiredate)VALUES(33, 10, 3, '2019-09-01 00:00:00');
INSERT INTO employees(userid,departmentid, roleid,hiredate)VALUES(34, 10, 3, '2019-09-01 00:00:00');


-- store workers	
INSERT INTO employees(userid,departmentid, roleid,hiredate)VALUES(35, 2, 4,'2015-08-11 00:00:00' );
INSERT INTO employees(userid,departmentid, roleid,hiredate)VALUES(36, 2, 4,'2015-08-11 00:00:00');	
INSERT INTO employees(userid,departmentid, roleid,hiredate)VALUES(37, 2, 4, '2015-08-11 00:00:00');
INSERT INTO employees(userid,departmentid, roleid,hiredate)VALUES(38, 2, 4,'2015-08-11 00:00:00');
INSERT INTO employees(userid,departmentid, roleid,hiredate)VALUES(39, 2, 4,'2015-08-11 00:00:00');
INSERT INTO employees(userid,departmentid, roleid,hiredate)VALUES(40, 2, 4, '2015-08-11 00:00:00');

-- store Incharge
INSERT INTO employees(userid,departmentid, roleid,hiredate)VALUES(41, 1, 1, '2015-08-11 00:00:00');
INSERT INTO employees(userid,departmentid, roleid,hiredate)VALUES(42, 1, 1, '2015-08-11 00:00:00');

-- supervisor incharge
INSERT INTO employees(userid,departmentid, roleid,hiredate)VALUES(43, 1, 5, '2015-08-11 00:00:00');
INSERT INTO employees(userid,departmentid, roleid,hiredate)VALUES(44, 1, 5, '2015-08-11 00:00:00');


INSERT INTO workerstatus(workerid)VALUES(35);
INSERT INTO workerstatus(workerid)VALUES(36);
INSERT INTO workerstatus(workerid)VALUES(37);
INSERT INTO workerstatus(workerid)VALUES(38);
INSERT INTO workerstatus(workerid)VALUES(39);
INSERT INTO workerstatus(workerid)VALUES(40);

-- Insertion for Sections
insert into Warehousestaff(section,  categoryid,employeeid)values('Section 1', 1,1);
insert into Warehousestaff(section, categoryid,employeeid)values('Section 2', 2,2);
insert into Warehousestaff(section, categoryid,employeeid)values('Section 3', 3,3);
insert into Warehousestaff(section, categoryid,employeeid)values('Section 4', 4,4);
insert into Warehousestaff(section, categoryid,employeeid)values('Section 5', 5,5);
insert into Warehousestaff(section, categoryid,employeeid)values('Section 6', 6,6);
insert into Warehousestaff(section, categoryid,employeeid)values('Section 7', 7,7);
insert into Warehousestaff(section, categoryid,employeeid)values('Section 8', 8,8);
insert into Warehousestaff(section, categoryid,employeeid)values('Section 9', 9,9);
insert into Warehousestaff(section, categoryid,employeeid)values('Section 10', 10,10);
insert into Warehousestaff(section, categoryid,employeeid)values('Section 11', 11,11);
insert into Warehousestaff(section, categoryid,employeeid)values('Section 12', 12,12);
insert into Warehousestaff(section, categoryid,employeeid)values('Section 13', 13,13);
insert into Warehousestaff(section, categoryid,employeeid)values('Section 14', 14,14);
insert into Warehousestaff(section, categoryid,employeeid)values('Section 15', 15,15);
insert into Warehousestaff(section, categoryid,employeeid)values('Section 16', 16,16);

        INSERT INTO productionstaff(department,firstsupervisor,secondsupervisor) VALUES("GB500 Line",21,22);
	INSERT INTO productionstaff(department,firstsupervisor,secondsupervisor) VALUES("GB400 Line",23,24);
	INSERT INTO productionstaff(department,firstsupervisor,secondsupervisor) VALUES("GB540 Line",25,26);
	INSERT INTO productionstaff(department,firstsupervisor,secondsupervisor) VALUES("Chassis Assembly",27,28);
        INSERT INTO productionstaff(department,firstsupervisor,secondsupervisor) VALUES("Engine Line",29,30);
	INSERT INTO productionstaff(department,firstsupervisor,secondsupervisor) VALUES("Interior Assembly",31,32);

    
INSERT INTO initialrequest(employeeid) VALUES (21);
INSERT INTO initialrequest(employeeid) VALUES (22);
INSERT INTO initialrequest(employeeid) VALUES (23);
INSERT INTO initialrequest(employeeid) VALUES (24);
INSERT INTO initialrequest(employeeid) VALUES (25);
INSERT INTO initialrequest(employeeid) VALUES (26);
INSERT INTO initialrequest(employeeid) VALUES (27);
INSERT INTO initialrequest(employeeid) VALUES (28);
INSERT INTO initialrequest(employeeid) VALUES (29);
INSERT INTO initialrequest(employeeid) VALUES (30);
INSERT INTO initialrequest(employeeid) VALUES (31);
INSERT INTO initialrequest(employeeid) VALUES (32);
INSERT INTO initialrequest(employeeid) VALUES (33);
INSERT INTO initialrequest(employeeid) VALUES (34);

-- Insert queries for November 2022
INSERT INTO materialrequests (date, supervisorid, status) VALUES
('2022-11-01 12:18:05', 21, 'Delivered'),
('2022-11-02 20:15:07', 22, 'Delivered'),
('2022-11-02 20:16:15', 23, 'Delivered'),
('2022-11-03 20:15:07', 22, 'Delivered'),
('2022-11-03 20:16:15', 27, 'Delivered'),
('2022-11-04 22:15:33', 21, 'Delivered'),
('2022-11-05 23:26:33', 21, 'Delivered'),
('2022-11-07 23:26:56', 25, 'Delivered'),
('2022-11-08 20:27:38', 29, 'Delivered'),
('2022-11-08 22:29:23', 26, 'Delivered'),
('2022-11-09 18:17:28', 22, 'Delivered'),
('2022-11-10 22:59:48', 23, 'Delivered'),
('2022-11-10 23:00:11', 26, 'Delivered'),
('2022-11-11 12:18:05', 30, 'Delivered'),
('2022-11-11 23:26:56', 21, 'Delivered'),
('2022-11-11 23:56:35', 21, 'Delivered'),
('2022-11-12 20:15:07', 22, 'Delivered'),
('2022-11-12 20:16:15', 23, 'Delivered'),
('2022-11-12 22:15:33', 21, 'Cancelled'),
('2022-11-12 23:26:33', 21, 'Delivered'),
('2022-11-14 09:27:08', 21, 'Delivered'),
('2022-11-14 20:27:38', 22, 'Delivered'),
('2022-11-15 18:17:28', 22, 'Delivered'),
('2022-11-15 22:59:18', 22, 'Delivered'),
('2022-11-15 22:59:48', 23, 'Delivered'),
('2022-11-17 18:17:28', 22, 'Delivered'),
('2022-11-17 22:59:18', 22, 'Delivered'),
('2022-11-17 22:59:48', 23, 'Delivered'),
('2022-11-18 18:17:28', 22, 'Delivered'),
('2022-11-18 18:17:28', 21, 'Delivered'),
('2022-11-18 18:17:28', 21, 'Delivered'),
('2022-11-19 22:59:18', 21, 'Delivered'),
('2022-11-19 22:59:48', 23, 'Delivered'),
('2022-11-19 23:00:11', 23, 'Delivered'),
('2022-11-21 18:17:28', 21, 'Delivered'),
('2022-11-21 18:17:28', 26, 'Delivered'),
('2022-11-22 18:17:28', 30, 'Delivered'),
('2022-11-22 22:59:18', 21, 'Delivered'),
('2022-11-24 23:00:11', 23, 'Delivered'),
('2022-11-24 22:59:18', 21, 'Delivered'),
('2022-11-25 22:59:48', 23, 'Delivered'),
('2022-11-25 23:00:11', 23, 'Delivered'),
('2022-11-25 22:59:48', 23, 'Delivered'),
('2022-11-26 23:00:11', 23, 'Delivered'),
('2022-11-26 22:59:18', 22, 'Delivered'),
('2022-11-26 22:59:48', 21, 'Delivered'),
('2022-11-28 22:59:18', 22, 'Delivered'),
('2022-11-29 22:59:48', 21, 'Delivered'),
('2022-11-29 23:00:11', 21, 'Delivered'),
('2022-11-30 22:59:48', 21, 'Delivered'),
('2022-11-30 23:00:11', 21, 'Delivered');

-- Insert queries for December 2022
INSERT INTO materialrequests (date, supervisorid, status) VALUES
('2022-12-01 12:18:05', 21, 'Delivered'),
('2022-12-01 15:30:45', 22, 'Delivered'),
('2022-12-02 08:45:22', 22, 'Delivered'),
('2022-12-02 14:20:10', 21, 'Delivered'),
('2022-12-03 09:55:33', 22, 'Delivered'),
('2022-12-03 17:10:48', 22, 'Delivered'),
('2022-12-03 13:25:15', 21, 'Delivered'),
('2022-12-05 18:40:30', 22, 'Delivered'),
('2022-12-05 10:58:42', 22, 'Delivered'),
('2022-12-05 16:15:55', 21, 'Delivered'),
('2022-12-06 11:30:20', 22, 'Delivered'),
('2022-12-06 19:42:37', 21, 'Delivered'),
('2022-12-06 14:05:55', 21, 'Delivered'),
('2022-12-07 20:30:10', 21, 'Delivered'),
('2022-12-08 09:18:05', 23, 'Delivered'),
('2022-12-08 15:30:45', 21, 'Delivered'),
('2022-12-09 08:45:22', 22, 'Delivered'),
('2022-12-09 14:20:10', 22, 'Delivered'),
('2022-12-10 09:55:33', 21, 'Delivered'),
('2022-12-10 17:10:48', 22, 'Delivered'),
('2022-12-10 13:25:15', 21, 'Delivered'),
('2022-12-10 18:40:30', 21, 'Delivered'),
('2022-12-12 10:58:42', 22, 'Delivered'),
('2022-12-12 16:15:55', 21, 'Delivered'),
('2022-12-13 11:30:20', 21, 'Delivered'),
('2022-12-13 19:42:37', 22, 'Delivered'),
('2022-12-14 14:05:55', 22, 'Delivered'),
('2022-12-14 20:30:10', 21, 'Delivered'),
('2022-12-15 09:18:05', 22, 'Delivered'),
('2022-12-15 15:30:45', 22, 'Delivered'),
('2022-12-16 08:45:22', 21, 'Delivered'),
('2022-12-16 14:20:10', 22, 'Delivered'),
('2022-12-17 09:55:33', 23, 'Delivered'),
('2022-12-17 17:10:48', 21, 'Delivered'),
('2022-12-17 13:25:15', 22, 'Delivered'),
('2022-12-19 18:40:30', 23, 'Delivered'),
('2022-12-19 10:58:42', 21, 'Delivered'),
('2022-12-19 16:15:55', 22, 'Delivered'),
('2022-12-19 11:30:20', 22, 'Delivered'),
('2022-12-19 19:42:37', 21, 'Delivered'),
('2022-12-21 14:05:55', 22, 'Delivered'),
('2022-12-21 20:30:10', 23, 'Delivered'),
('2022-12-22 09:18:05', 21, 'Delivered'),
('2022-12-22 15:30:45', 22, 'Delivered'),
('2022-12-23 08:45:22', 23, 'Delivered'),
('2022-12-23 14:20:10', 21, 'Delivered'),
('2022-12-24 09:55:33', 22, 'Delivered'),
('2022-12-24 17:10:48', 23, 'Delivered'),
('2022-12-26 13:25:15', 21, 'Delivered'),
('2022-12-26 18:40:30', 22, 'Delivered'),
('2022-12-26 10:58:42', 21, 'Delivered'),
('2022-12-26 16:15:55', 21, 'Delivered'),
('2022-12-27 11:30:20', 22, 'Delivered'),
('2022-12-27 19:42:37', 21, 'Delivered'),
('2022-12-28 14:05:55', 21, 'Delivered'),
('2022-12-28 20:30:10', 22, 'Delivered'),
('2022-12-29 09:18:05', 21, 'Delivered'),
('2022-12-29 15:30:45', 21, 'Delivered'),
('2022-12-30 08:45:22', 22, 'Delivered'),
('2022-12-30 14:20:10', 21, 'Delivered'),
('2022-12-31 09:55:33', 21, 'Delivered'),
('2022-12-31 17:10:48', 22, 'Delivered');

-- Insert queries for January 2023
INSERT INTO materialrequests (date, supervisorid, status) VALUES
('2023-01-02 20:15:07', 22, 'Delivered'),
('2023-01-02 20:16:15', 23, 'Delivered'),
('2023-01-04 22:15:33', 21, 'Cancelled'),
('2023-01-05 23:26:33', 21, 'Delivered'),
('2023-01-06 23:26:56', 21, 'Cancelled'),
('2023-01-07 23:56:35', 21, 'Delivered'),
('2023-01-07 09:27:08', 21, 'Delivered'),
('2023-01-09 22:59:18', 22, 'Delivered'),
('2023-01-09 22:59:48', 23, 'Delivered'),
('2023-01-09 23:00:11', 23, 'Delivered'),
('2023-01-11 12:18:05', 21, 'Delivered'),
('2023-01-11 23:26:56', 21, 'Delivered'),
('2023-01-11 23:56:35', 21, 'Delivered'),
('2023-01-12 20:15:07', 22, 'Delivered'),
('2023-01-12 20:16:15', 23, 'Delivered'),
('2023-01-12 22:15:33', 21, 'Cancelled'),
('2023-01-12 23:26:33', 21, 'Delivered'),
('2023-01-13 09:27:08', 21, 'Delivered'),
('2023-01-13 20:27:38', 22, 'Delivered'),
('2023-01-14 22:29:23', 22, 'Delivered'),
('2023-01-14 22:29:23', 23, 'Delivered'),
('2023-01-14 22:29:23', 23, 'Delivered'),
('2023-01-14 22:29:23', 22, 'Delivered'),
('2023-01-16 18:17:28', 22, 'Delivered'),
('2023-01-16 22:59:18', 22, 'Delivered'),
('2023-01-16 22:59:48', 23, 'Delivered'),
('2023-01-17 18:17:28', 22, 'Delivered'),
('2023-01-17 22:59:18', 22, 'Delivered'),
('2023-01-17 22:59:48', 23, 'Delivered'),
('2023-01-18 18:17:28', 22, 'Delivered'),
('2023-01-18 18:17:28', 21, 'Delivered'),
('2023-01-18 18:17:28', 21, 'Delivered'),
('2023-01-19 22:59:18', 21, 'Delivered'),
('2023-01-19 22:59:48', 23, 'Delivered'),
('2023-01-19 23:00:11', 23, 'Delivered'),
('2023-01-20 22:59:18', 22, 'Delivered'),
('2023-01-20 22:59:48', 23, 'Delivered'),
('2023-01-20 23:00:11', 23, 'Delivered'),
('2023-01-21 22:59:18', 22, 'Delivered'),
('2023-01-21 22:59:48', 23, 'Delivered'),
('2023-01-23 22:59:48', 23, 'Delivered'),
('2023-01-23 23:00:11', 23, 'Delivered'),
('2023-01-23 22:59:18', 21, 'Delivered'),
('2023-01-25 22:59:48', 23, 'Delivered'),
('2023-01-25 23:00:11', 23, 'Delivered'),
('2023-01-25 22:59:48', 23, 'Delivered'),
('2023-01-26 23:00:11', 23, 'Delivered'),
('2023-01-26 22:59:18', 22, 'Delivered'),
('2023-01-26 22:59:48', 21, 'Delivered'),
('2023-01-27 23:00:11', 21, 'Delivered'),
('2023-01-27 23:00:11', 21, 'Delivered'),
('2023-01-27 22:59:18', 29, 'Delivered'),
('2023-01-28 22:59:48', 30, 'Delivered'),
('2023-01-28 23:00:11', 31, 'Delivered'),
('2023-01-28 23:00:11', 32, 'Delivered'),
('2023-01-30 22:59:18', 33, 'Delivered'),
('2023-01-30 22:59:48', 34, 'Delivered'),
('2023-01-30 23:00:11', 34, 'Delivered'),
('2023-01-31 23:00:11', 34, 'Delivered');



-- Insert queries for February 2023
INSERT INTO materialrequests (date, supervisorid, status) VALUES
('2023-02-01 12:18:05', 21, 'Delivered'),
('2023-02-01 15:30:45', 22, 'Delivered'),
('2023-02-01 08:45:22', 21, 'Delivered'),
('2023-02-02 14:20:10', 21, 'Delivered'),
('2023-02-03 09:55:33', 21, 'Delivered'),
('2023-02-03 17:10:48', 22, 'Delivered'),
('2023-02-04 13:25:15', 22, 'Delivered'),
('2023-02-04 18:40:30', 21, 'Delivered'),
('2023-02-04 10:58:42', 21, 'Delivered'),
('2023-02-06 16:15:55', 21, 'Delivered'),
('2023-02-06 11:30:20', 21, 'Delivered'),
('2023-02-06 19:42:37', 21, 'Delivered'),
('2023-02-06 14:05:55', 21, 'Delivered'),
('2023-02-07 20:30:10', 22, 'Delivered'),
('2023-02-08 09:18:05', 21, 'Delivered'),
('2023-02-08 15:30:45', 21, 'Delivered'),
('2023-02-09 08:45:22', 22, 'Delivered'),
('2023-02-09 14:20:10', 23, 'Delivered'),
('2023-02-09 09:55:33', 21, 'Delivered'),
('2023-02-10 17:10:48', 22, 'Delivered'),
('2023-02-11 13:25:15', 21, 'Delivered'),
('2023-02-11 18:40:30', 21, 'Delivered'),
('2023-02-11 10:58:42', 22, 'Delivered'),
('2023-02-13 16:15:55', 21, 'Delivered'),
('2023-02-13 11:30:20', 21, 'Delivered'),
('2023-02-13 19:42:37', 22, 'Delivered'),
('2023-02-14 14:05:55', 21, 'Delivered'),
('2023-02-14 20:30:10', 21, 'Delivered'),
('2023-02-15 09:18:05', 22, 'Delivered'),
('2023-02-16 15:30:45', 23, 'Delivered'),
('2023-02-16 08:45:22', 21, 'Delivered'),
('2023-02-16 14:20:10', 22, 'Delivered'),
('2023-02-17 09:55:33', 23, 'Delivered'),
('2023-02-17 17:10:48', 21, 'Delivered'),
('2023-02-17 13:25:15', 22, 'Delivered'),
('2023-02-18 18:40:30', 23, 'Delivered'),
('2023-02-18 10:58:42', 21, 'Delivered'),
('2023-02-18 16:15:55', 22, 'Delivered'),
('2023-02-20 11:30:20', 23, 'Delivered'),
('2023-02-20 19:42:37', 21, 'Delivered'),
('2023-02-21 14:05:55', 22, 'Delivered'),
('2023-02-21 20:30:10', 23, 'Delivered'),
('2023-02-22 09:18:05', 21, 'Delivered'),
('2023-02-22 15:30:45', 22, 'Delivered'),
('2023-02-23 08:45:22', 23, 'Delivered'),
('2023-02-23 14:20:10', 21, 'Delivered'),
('2023-02-24 09:55:33', 22, 'Delivered'),
('2023-02-24 17:10:48', 23, 'Delivered'),
('2023-02-25 13:25:15', 21, 'Delivered'),
('2023-02-25 18:40:30', 22, 'Delivered'),
('2023-02-25 10:58:42', 21, 'Delivered'),
('2023-02-27 16:15:55', 21, 'Delivered'),
('2023-02-27 11:30:20', 21, 'Delivered'),
('2023-02-27 19:42:37', 21, 'Delivered'),
('2023-02-28 14:05:55', 21, 'Delivered'),
('2023-02-28 20:30:10', 22, 'Delivered');


-- Insert queries for March 2023
INSERT INTO materialrequests (date, supervisorid, status) VALUES
('2023-03-01 12:18:05', 21, 'Delivered'),
('2023-03-01 15:30:45', 22, 'Delivered'),
('2023-03-02 08:45:22', 22, 'Delivered'),
('2023-03-02 14:20:10', 21, 'Delivered'),
('2023-03-03 09:55:33', 22, 'Delivered'),
('2023-03-03 17:10:48', 21, 'Delivered'),
('2023-03-04 13:25:15', 21, 'Delivered'),
('2023-03-04 18:40:30', 22, 'Delivered'),
('2023-03-04 10:58:42', 21, 'Delivered'),
('2023-03-04 16:15:55', 21, 'Delivered'),
('2023-03-06 11:30:20', 22, 'Delivered'),
('2023-03-06 19:42:37', 21, 'Delivered'),
('2023-03-07 14:05:55', 21, 'Delivered'),
('2023-03-07 20:30:10', 21, 'Delivered'),
('2023-03-08 09:18:05', 22, 'Delivered'),
('2023-03-08 15:30:45', 21, 'Delivered'),
('2023-03-09 08:45:22', 22, 'Delivered'),
('2023-03-09 14:20:10', 21, 'Delivered'),
('2023-03-10 09:55:33', 21, 'Delivered'),
('2023-03-10 17:10:48', 22, 'Delivered'),
('2023-03-11 13:25:15', 22, 'Delivered'),
('2023-03-11 18:40:30', 21, 'Delivered'),
('2023-03-11 10:58:42', 22, 'Delivered'),
('2023-03-11 16:15:55', 22, 'Delivered'),
('2023-03-13 11:30:20', 21, 'Delivered'),
('2023-03-13 19:42:37', 22, 'Delivered'),
('2023-03-14 14:05:55', 23, 'Delivered'),
('2023-03-14 20:30:10', 21, 'Delivered'),
('2023-03-15 09:18:05', 22, 'Delivered'),
('2023-03-15 15:30:45', 23, 'Delivered'),
('2023-03-16 08:45:22', 21, 'Delivered'),
('2023-03-16 14:20:10', 22, 'Delivered'),
('2023-03-17 09:55:33', 21, 'Delivered'),
('2023-03-17 17:10:48', 21, 'Delivered'),
('2023-03-18 13:25:15', 22, 'Delivered'),
('2023-03-18 18:40:30', 23, 'Delivered'),
('2023-03-20 10:58:42', 21, 'Delivered'),
('2023-03-20 16:15:55', 22, 'Delivered'),
('2023-03-20 11:30:20', 21, 'Delivered'),
('2023-03-20 19:42:37', 21, 'Delivered'),
('2023-03-21 14:05:55', 22, 'Delivered'),
('2023-03-21 20:30:10', 21, 'Delivered'),
('2023-03-22 09:18:05', 21, 'Delivered'),
('2023-03-22 15:30:45', 22, 'Delivered'),
('2023-03-23 08:45:22', 22, 'Delivered'),
('2023-03-23 14:20:10', 21, 'Delivered'),
('2023-03-24 09:55:33', 22, 'Delivered'),
('2023-03-24 17:10:48', 22, 'Delivered'),
('2023-03-25 13:25:15', 21, 'Delivered'),
('2023-03-25 18:40:30', 22, 'Delivered'),
('2023-03-27 10:58:42', 22, 'Delivered'),
('2023-03-27 16:15:55', 21, 'Delivered'),
('2023-03-27 11:30:20', 22, 'Delivered'),
('2023-03-27 19:42:37', 21, 'Delivered'),
('2023-03-28 14:05:55', 21, 'Delivered'),
('2023-03-28 20:30:10', 22, 'Delivered'),
('2023-03-29 09:18:05', 22, 'Delivered'),
('2023-03-29 15:30:45', 21, 'Delivered'),
('2023-03-30 08:45:22', 22, 'Delivered'),
('2023-03-30 14:20:10', 23, 'Delivered'),
('2023-03-31 09:55:33', 21, 'Delivered'),
('2023-03-31 17:10:48', 22, 'Delivered');

-- Insert queries for April 2023
INSERT INTO materialrequests (date, supervisorid, status) VALUES
('2023-04-01 23:26:33', 21, 'Delivered'),
('2023-04-03 20:16:15', 23, 'Delivered'),
('2023-04-03 20:16:15', 23, 'Delivered'),
('2023-04-04 22:15:33', 21, 'Cancelled'),
('2023-04-05 22:15:33', 21, 'Cancelled'),
('2023-04-06 23:26:56', 21, 'Cancelled'),
('2023-04-07 23:56:35', 21, 'Delivered'),
('2023-04-07 09:27:08', 21, 'Delivered'),
('2023-04-08 09:27:08', 21, 'Delivered'),
('2023-04-08 09:27:08', 21, 'Delivered'),
('2023-04-10 23:00:11', 23, 'Delivered'),
('2023-04-10 23:00:11', 23, 'Delivered'),
('2023-04-11 12:18:05', 21, 'Delivered'),
('2023-04-11 23:26:56', 21, 'Delivered'),
('2023-04-11 23:56:35', 21, 'Delivered'),
('2023-04-12 23:26:56', 21, 'Delivered'),
('2023-04-12 23:56:35', 21, 'Delivered'),
('2023-04-13 09:27:08', 21, 'Delivered'),
('2023-04-13 20:27:38', 22, 'Delivered'),
('2023-04-14 22:29:23', 22, 'Delivered'),
('2023-04-14 22:29:23', 23, 'Delivered'),
('2023-04-14 22:29:23', 23, 'Delivered'),
('2023-04-14 22:29:23', 22, 'Delivered'),
('2023-04-15 22:29:23', 23, 'Delivered'),
('2023-04-15 22:29:23', 23, 'Delivered'),
('2023-04-15 22:29:23', 22, 'Delivered'),
('2023-04-17 18:17:28', 22, 'Delivered'),
('2023-04-17 22:59:18', 22, 'Delivered'),
('2023-04-17 22:59:48', 23, 'Delivered'),
('2023-04-18 18:17:28', 22, 'Delivered'),
('2023-04-18 18:17:28', 21, 'Delivered'),
('2023-04-18 18:17:28', 21, 'Delivered'),
('2023-04-20 22:59:18', 22, 'Delivered'),
('2023-04-20 22:59:48', 23, 'Delivered'),
('2023-04-20 23:00:11', 23, 'Delivered'),
('2023-04-21 22:59:18', 22, 'Delivered'),
('2023-04-21 22:59:48', 23, 'Delivered'),
('2023-04-25 22:59:48', 23, 'Delivered'),
('2023-04-25 23:00:11', 23, 'Delivered'),
('2023-04-25 22:59:48', 23, 'Delivered'),
('2023-04-27 23:00:11', 21, 'Delivered'),
('2023-04-27 23:00:11', 21, 'Delivered'),
('2023-04-27 22:59:18', 29, 'Delivered'),
('2023-04-28 22:59:48', 30, 'Delivered'),
('2023-04-28 23:00:11', 31, 'Delivered'),
('2023-04-28 23:00:11', 32, 'Delivered');


-- Insert queries for May 2023
INSERT INTO materialrequests (date, supervisorid, status) VALUES
('2023-05-01 12:18:05', 21, 'Delivered'),
('2023-05-02 20:15:07', 22, 'Delivered'),
('2023-05-02 20:16:15', 23, 'Delivered'),
('2023-05-03 20:15:07', 22, 'Delivered'),
('2023-05-03 20:16:15', 23, 'Delivered'),
('2023-05-04 22:15:33', 21, 'Delivered'),
('2023-05-05 23:26:33', 21, 'Delivered'),
('2023-05-06 23:26:56', 21, 'Cancelled'),
('2023-05-06 23:26:56', 21, 'Delivered'),
('2023-05-08 20:27:38', 22, 'Delivered'),
('2023-05-08 22:29:23', 22, 'Delivered'),
('2023-05-08 18:17:28', 22, 'Delivered'),
('2023-05-09 22:59:18', 22, 'Delivered'),
('2023-05-09 22:59:48', 23, 'Delivered'),
('2023-05-09 23:00:11', 23, 'Delivered'),
('2023-05-10 22:59:48', 23, 'Delivered'),
('2023-05-10 23:00:11', 23, 'Delivered'),
('2023-05-11 12:18:05', 21, 'Delivered'),
('2023-05-11 23:26:56', 21, 'Delivered'),
('2023-05-11 23:56:35', 21, 'Delivered'),
('2023-05-12 20:15:07', 22, 'Delivered'),
('2023-05-12 20:16:15', 23, 'Delivered'),
('2023-05-12 22:15:33', 21, 'Cancelled'),
('2023-05-12 23:26:33', 21, 'Delivered'),
('2023-05-13 09:27:08', 21, 'Delivered'),
('2023-05-13 20:27:38', 22, 'Delivered'),
('2023-05-15 18:17:28', 22, 'Delivered'),
('2023-05-15 22:59:18', 22, 'Delivered'),
('2023-05-15 22:59:48', 23, 'Delivered'),
('2023-05-16 18:17:28', 22, 'Delivered'),
('2023-05-16 22:59:18', 22, 'Delivered'),
('2023-05-16 22:59:48', 23, 'Delivered'),
('2023-05-17 18:17:28', 22, 'Delivered'),
('2023-05-17 22:59:18', 22, 'Delivered'),
('2023-05-17 22:59:48', 23, 'Delivered'),
('2023-05-18 18:17:28', 22, 'Delivered'),
('2023-05-18 18:17:28', 21, 'Delivered'),
('2023-05-18 18:17:28', 21, 'Delivered'),
('2023-05-19 22:59:18', 21, 'Delivered'),
('2023-05-19 22:59:48', 23, 'Delivered'),
('2023-05-19 23:00:11', 23, 'Delivered'),
('2023-05-20 22:59:18', 22, 'Delivered'),
('2023-05-20 22:59:48', 25, 'Delivered'),
('2023-05-20 23:00:11', 23, 'Delivered'),
('2023-05-22 18:17:28', 21, 'Delivered'),
('2023-05-22 18:17:28', 26, 'Delivered'),
('2023-05-22 18:17:28', 30, 'Delivered'),
('2023-05-22 22:59:18', 21, 'Delivered'),
('2023-05-23 22:59:48', 23, 'Delivered'),
('2023-05-23 23:00:11', 23, 'Delivered'),
('2023-05-23 22:59:18', 21, 'Delivered'),
('2023-05-24 23:00:11', 23, 'Delivered'),
('2023-05-24 22:59:18', 21, 'Delivered'),
('2023-05-25 22:59:48', 23, 'Delivered'),
('2023-05-25 23:00:11', 23, 'Delivered'),
('2023-05-25 22:59:48', 23, 'Delivered'),
('2023-05-26 23:00:11', 23, 'Delivered'),
('2023-05-26 22:59:18', 22, 'Delivered'),
('2023-05-26 22:59:48', 21, 'Delivered'),
('2023-05-27 23:00:11', 21, 'Delivered'),
('2023-05-27 23:00:11', 21, 'Delivered'),
('2023-05-27 22:59:18', 22, 'Delivered'),
('2023-05-29 22:59:18', 22, 'Delivered'),
('2023-05-29 22:59:48', 21, 'Delivered'),
('2023-05-29 23:00:11', 21, 'Delivered'),
('2023-05-30 22:59:18', 22, 'Delivered'),
('2023-05-30 22:59:48', 23, 'Delivered'),
('2023-05-30 23:00:11', 23, 'Delivered');


-- Insert queries for June 2023
INSERT INTO materialrequests (date, supervisorid, status) VALUES
('2023-06-01 12:18:05', 21, 'Delivered'),
('2023-06-01 15:30:45', 21, 'Delivered'),
('2023-06-02 08:45:22', 21, 'Delivered'),
('2023-06-02 14:20:10', 21, 'Delivered'),
('2023-06-03 09:55:33', 22, 'Delivered'),
('2023-06-03 17:10:48', 22, 'Delivered'),
('2023-06-03 13:25:15', 22, 'Delivered'),
('2023-06-05 18:40:30', 22, 'Delivered'),
('2023-06-05 10:58:42', 22, 'Delivered'),
('2023-06-05 16:15:55', 21, 'Delivered'),
('2023-06-06 11:30:20', 22, 'Delivered'),
('2023-06-06 19:42:37', 21, 'Delivered'),
('2023-06-07 14:05:55', 21, 'Delivered'),
('2023-06-07 20:30:10', 22, 'Delivered'),
('2023-06-08 09:18:05', 22, 'Delivered'),
('2023-06-08 15:30:45', 21, 'Delivered'),
('2023-06-09 08:45:22', 22, 'Delivered'),
('2023-06-09 14:20:10', 23, 'Delivered'),
('2023-06-10 09:55:33', 21, 'Delivered'),
('2023-06-10 17:10:48', 21, 'Delivered'),
('2023-06-10 13:25:15', 23, 'Delivered'),
('2023-06-10 18:40:30', 21, 'Delivered'),
('2023-06-12 10:58:42', 22, 'Delivered'),
('2023-06-12 16:15:55', 22, 'Delivered'),
('2023-06-13 11:30:20', 21, 'Delivered'),
('2023-06-13 19:42:37', 22, 'Delivered'),
('2023-06-14 14:05:55', 21, 'Delivered'),
('2023-06-14 20:30:10', 21, 'Delivered'),
('2023-06-15 09:18:05', 22, 'Delivered'),
('2023-06-15 15:30:45', 22, 'Delivered'),
('2023-06-17 09:55:33', 22, 'Delivered'),
('2023-06-17 17:10:48', 21, 'Delivered'),
('2023-06-17 13:25:15', 22, 'Delivered'),
('2023-06-19 18:40:30', 21, 'Delivered'),
('2023-06-19 10:58:42', 21, 'Delivered'),
('2023-06-19 16:15:55', 22, 'Delivered'),
('2023-06-20 11:30:20', 22, 'Delivered'),
('2023-06-20 19:42:37', 21, 'Delivered'),
('2023-06-21 14:05:55', 22, 'Delivered'),
('2023-06-21 20:30:10', 22, 'Delivered'),
('2023-06-22 09:18:05', 22, 'Delivered'),
('2023-06-22 15:30:45', 22, 'Delivered'),
('2023-06-23 08:45:22', 22, 'Delivered'),
('2023-06-23 14:20:10', 21, 'Delivered'),
('2023-06-24 09:55:33', 22, 'Delivered'),
('2023-06-24 17:10:48', 21, 'Delivered'),
('2023-06-26 13:25:15', 21, 'Delivered'),
('2023-06-26 18:40:30', 22, 'Delivered'),
('2023-06-26 10:58:42', 21, 'Delivered'),
('2023-06-26 16:15:55', 21, 'Delivered'),
('2023-06-27 11:30:20', 22, 'Delivered'),
('2023-06-27 19:42:37', 22, 'Delivered'),
('2023-06-28 14:05:55', 21, 'Delivered'),
('2023-06-28 20:30:10', 22, 'Delivered'),
('2023-06-29 09:18:05', 23, 'Delivered'),
('2023-06-29 15:30:45', 21, 'Delivered'),
('2023-06-30 08:45:22', 22, 'Delivered'),
('2023-06-30 14:20:10', 23, 'Delivered');

-- Insert queries for July 2023
INSERT INTO materialrequests (date, supervisorid, status) VALUES
('2023-07-01 12:18:05', 21, 'Delivered'),
('2023-07-03 20:15:07', 22, 'Delivered'),
('2023-07-03 20:16:15', 23, 'Delivered'),
('2023-07-04 22:15:33', 21, 'Delivered'),
('2023-07-05 23:26:33', 21, 'Delivered'),
('2023-07-06 23:26:56', 21, 'Cancelled'),
('2023-07-06 23:26:56', 21, 'Delivered'),
('2023-07-07 23:26:56', 25, 'Delivered'),
('2023-07-08 20:27:38', 22, 'Delivered'),
('2023-07-08 22:29:23', 26, 'Delivered'),
('2023-07-08 18:17:28', 22, 'Delivered'),
('2023-07-10 22:59:48', 23, 'Delivered'),
('2023-07-10 23:00:11', 26, 'Delivered'),
('2023-07-11 12:18:05', 21, 'Delivered'),
('2023-07-11 23:26:56', 21, 'Delivered'),
('2023-07-11 23:56:35', 21, 'Delivered'),
('2023-07-12 20:15:07', 22, 'Delivered'),
('2023-07-12 20:16:15', 23, 'Delivered'),
('2023-07-12 22:15:33', 21, 'Cancelled'),
('2023-07-12 23:26:33', 21, 'Delivered'),
('2023-07-13 09:27:08', 21, 'Delivered'),
('2023-07-13 20:27:38', 22, 'Delivered'),
('2023-07-14 09:27:08', 21, 'Delivered'),
('2023-07-14 20:27:38', 22, 'Delivered'),
('2023-07-15 18:17:28', 22, 'Delivered'),
('2023-07-15 22:59:18', 22, 'Delivered'),
('2023-07-15 22:59:48', 23, 'Delivered'),
('2023-07-17 18:17:28', 22, 'Delivered'),
('2023-07-17 22:59:18', 22, 'Delivered'),
('2023-07-17 22:59:48', 23, 'Delivered'),
('2023-07-18 18:17:28', 22, 'Delivered'),
('2023-07-18 18:17:28', 21, 'Delivered'),
('2023-07-18 18:17:28', 21, 'Delivered'),
('2023-07-19 22:59:18', 21, 'Delivered'),
('2023-07-19 22:59:48', 23, 'Delivered'),
('2023-07-19 23:00:11', 23, 'Delivered'),
('2023-07-20 22:59:18', 22, 'Delivered'),
('2023-07-20 22:59:48', 25, 'Delivered'),
('2023-07-20 23:00:11', 23, 'Delivered'),
('2023-07-21 18:17:28', 21, 'Delivered'),
('2023-07-21 18:17:28', 26, 'Delivered'),
('2023-07-22 18:17:28', 30, 'Delivered'),
('2023-07-22 22:59:18', 21, 'Delivered'),
('2023-07-24 23:00:11', 23, 'Delivered'),
('2023-07-24 22:59:18', 21, 'Delivered'),
('2023-07-25 22:59:48', 23, 'Delivered'),
('2023-07-25 23:00:11', 23, 'Delivered'),
('2023-07-25 22:59:48', 23, 'Delivered'),
('2023-07-26 23:00:11', 23, 'Delivered'),
('2023-07-26 22:59:18', 22, 'Delivered'),
('2023-07-26 22:59:48', 21, 'Delivered'),
('2023-07-27 23:00:11', 21, 'Delivered'),
('2023-07-27 23:00:11', 21, 'Delivered'),
('2023-07-27 22:59:18', 22, 'Delivered'),
('2023-07-29 22:59:18', 22, 'Delivered'),
('2023-07-29 22:59:48', 21, 'Delivered'),
('2023-07-29 23:00:11', 21, 'Delivered'),
('2023-07-29 22:59:48', 21, 'Delivered'),
('2023-07-29 23:00:11', 21, 'Delivered');


-- Insert queries for August 2023
INSERT INTO materialrequests (date, supervisorid, status) VALUES
('2023-08-01 12:18:05', 21, 'Delivered'),
('2023-08-01 15:30:45', 22, 'Delivered'),
('2023-08-02 14:20:10', 21, 'Delivered'),
('2023-08-03 09:55:33', 21, 'Delivered'),
('2023-08-03 17:10:48', 22, 'Delivered'),
('2023-08-04 13:25:15', 21, 'Delivered'),
('2023-08-04 18:40:30', 22, 'Delivered'),
('2023-08-05 16:15:55', 21, 'Delivered'),
('2023-08-07 14:05:55', 21, 'Delivered'),
('2023-08-07 20:30:10', 22, 'Delivered'),
('2023-08-08 09:18:05', 22, 'Delivered'),
('2023-08-08 15:30:45', 21, 'Delivered'),
('2023-08-09 08:45:22', 22, 'Delivered'),
('2023-08-09 14:20:10', 22, 'Delivered'),
('2023-08-10 09:55:33', 22, 'Delivered'),
('2023-08-10 17:10:48', 22, 'Delivered'),
('2023-08-11 18:40:30', 21, 'Delivered'),
('2023-08-12 10:58:42', 22, 'Delivered'),
('2023-08-12 16:15:55', 21, 'Delivered'),
('2023-08-14 14:05:55', 23, 'Delivered'),
('2023-08-14 20:30:10', 21, 'Delivered'),
('2023-08-15 09:18:05', 22, 'Delivered'),
('2023-08-15 15:30:45', 21, 'Delivered'),
('2023-08-16 08:45:22', 21, 'Delivered'),
('2023-08-16 14:20:10', 22, 'Delivered'),
('2023-08-17 17:10:48', 21, 'Delivered'),
('2023-08-18 13:25:15', 22, 'Delivered'),
('2023-08-18 18:40:30', 23, 'Delivered'),
('2023-08-19 10:58:42', 21, 'Delivered'),
('2023-08-19 16:15:55', 22, 'Delivered'),
('2023-08-20 19:42:37', 21, 'Delivered'),
('2023-08-21 14:05:55', 22, 'Delivered'),
('2023-08-21 20:30:10', 21, 'Delivered'),
('2023-08-22 09:18:05', 21, 'Delivered'),
('2023-08-22 15:30:45', 22, 'Delivered'),
('2023-08-23 08:45:22', 22, 'Delivered'),
('2023-08-23 14:20:10', 21, 'Delivered'),
('2023-08-24 09:55:33', 22, 'Delivered'),
('2023-08-24 17:10:48', 21, 'Delivered'),
('2023-08-25 13:25:15', 21, 'Delivered'),
('2023-08-25 18:40:30', 22, 'Delivered'),
('2023-08-26 16:15:55', 21, 'Delivered'),
('2023-08-27 11:30:20', 22, 'Delivered'),
('2023-08-27 19:42:37', 23, 'Delivered'),
('2023-08-28 14:05:55', 21, 'Delivered'),
('2023-08-28 20:30:10', 22, 'Delivered'),
('2023-08-29 09:18:05', 23, 'Delivered'),
('2023-08-29 15:30:45', 21, 'Delivered'),
('2023-08-30 08:45:22', 22, 'Delivered'),
('2023-08-30 14:20:10', 23, 'Delivered'),
('2023-08-31 17:10:48', 22, 'Delivered');


INSERT INTO materialrequests (date, supervisorid, status) VALUES
('2023-09-01 12:18:05', 21, 'Delivered'),
('2023-09-02 20:15:07', 22, 'Delivered'),
('2023-09-02 20:16:15', 23, 'Delivered'),
('2023-09-04 22:15:33', 21, 'Cancelled'),
('2023-09-05 23:26:33', 21, 'Delivered'),
('2023-09-06 23:26:56', 21, 'Cancelled'),
('2023-09-07 23:56:35', 21, 'Delivered'),
('2023-09-07 09:27:08', 21, 'Delivered'),
('2023-09-08 20:27:38', 22, 'Delivered'),
('2023-09-08 22:29:23', 22, 'Delivered'),
('2023-09-08 18:17:28', 22, 'Delivered'),
('2023-09-09 22:59:18', 22, 'Delivered'),
('2023-09-09 22:59:48', 23, 'Delivered'),
('2023-09-09 23:00:11', 23, 'Delivered'),
('2023-09-11 12:18:05', 21, 'Delivered'),
('2023-09-11 23:26:56', 21, 'Delivered'),
('2023-09-11 23:56:35', 21, 'Delivered'),
('2023-09-12 20:15:07', 22, 'Delivered'),
('2023-09-12 20:16:15', 23, 'Delivered'),
('2023-09-12 22:15:33', 21, 'Cancelled'),
('2023-09-12 23:26:33', 21, 'Delivered'),
('2023-09-13 09:27:08', 21, 'Delivered'),
('2023-09-13 20:27:38', 22, 'Delivered'),
('2023-09-14 22:29:23', 22, 'Delivered'),
('2023-09-14 22:29:23', 23, 'Delivered'),
('2023-09-14 22:29:23', 23, 'Delivered'),
('2023-09-14 22:29:23', 22, 'Delivered'),
('2023-09-15 18:17:28', 22, 'Delivered'),
('2023-09-15 22:59:18', 22, 'Delivered'),
('2023-09-15 22:59:48', 23, 'Delivered'),
('2023-09-16 18:17:28', 22, 'Delivered'),
('2023-09-16 22:59:18', 22, 'Delivered'),
('2023-09-16 22:59:48', 23, 'Delivered'),
('2023-09-17 18:17:28', 22, 'Delivered'),
('2023-09-17 22:59:18', 22, 'Delivered'),
('2023-09-17 22:59:48', 23, 'Delivered'),
('2023-09-18 18:17:28', 22, 'Delivered'),
('2023-09-18 18:17:28', 21, 'Delivered'),
('2023-09-18 18:17:28', 21, 'Delivered'),
('2023-09-19 22:59:18', 21, 'Delivered'),
('2023-09-19 22:59:48', 23, 'Delivered'),
('2023-09-19 23:00:11', 23, 'Delivered'),
('2023-09-20 22:59:18', 22, 'Delivered'),
('2023-09-20 22:59:48', 23, 'Delivered'),
('2023-09-20 23:00:11', 23, 'Delivered'),
('2023-09-21 22:59:18', 22, 'Delivered'),
('2023-09-21 22:59:48', 23, 'Delivered'),
('2023-09-22 18:17:28', 21, 'Delivered'),
('2023-09-22 18:17:28', 21, 'Delivered'),
('2023-09-22 18:17:28', 22, 'Delivered'),
('2023-09-22 22:59:18', 21, 'Delivered'),
('2023-09-23 22:59:48', 23, 'Delivered'),
('2023-09-23 23:00:11', 23, 'Delivered'),
('2023-09-23 22:59:18', 21, 'Delivered'),
('2023-09-25 22:59:48', 23, 'Delivered'),
('2023-09-25 23:00:11', 23, 'Delivered'),
('2023-09-25 22:59:48', 23, 'Delivered'),
('2023-09-26 23:00:11', 23, 'Delivered'),
('2023-09-26 22:59:18', 22, 'Delivered'),
('2023-09-26 22:59:48', 21, 'Delivered'),
('2023-09-27 23:00:11', 21, 'Delivered'),
('2023-09-27 23:00:11', 21, 'Delivered'),
('2023-09-27 22:59:18', 22, 'Delivered'),
('2023-09-28 22:59:48', 21, 'Delivered'),
('2023-09-28 23:00:11', 21, 'Delivered'),
('2023-09-28 23:00:11', 21, 'Delivered'),
('2023-09-29 22:59:18', 22, 'Delivered'),
('2023-09-29 22:59:48', 21, 'Delivered'),
('2023-09-29 23:00:11', 21, 'Delivered'),
('2023-09-30 22:59:18', 22, 'Delivered'),
('2023-09-30 22:59:48', 23, 'Delivered'),
('2023-09-30 23:00:11', 23, 'Delivered');


--  INSERT queries for materialrequestitems
INSERT INTO materialrequestitems (materialid, materialrequestid, categoryid, quantity) VALUES
(1, 1, 1, 55),
(2, 2, 1, 60),
(3, 3, 1, 65),
(4, 4, 2, 70),
(5, 5, 2, 75),
(1, 6, 1, 80),
(2, 7, 1, 85),
(3, 8, 1, 90),
(4, 9, 2, 95),
(5, 10, 2, 100),
(1, 11, 1, 55),
(2, 12, 1, 60),
(3, 13, 1, 65),
(7, 14, 3, 70),
(8, 15, 3, 75),
(1, 16, 1, 80),
(2, 17, 1, 85),
(3, 18, 1, 90),
(10, 19, 4, 95),
(10, 20, 4, 100),
(11, 21, 4, 55),
(2, 22, 1, 60),
(3, 23, 1, 65),
(1, 24, 1, 70),
(1, 25, 1, 75),
(1, 26, 1, 80),
(2, 27, 1, 85),
(3, 28, 1, 90),
(4, 29, 2, 95),
(1, 30, 1, 100),
(1, 31, 1, 55),
(2, 32, 1, 60),
(3, 33, 1, 65),
(1, 34, 1, 70),
(1, 35, 1, 75),
(1, 36, 1, 80),
(2, 37, 1, 85),
(1, 38, 1, 90),
(1, 39, 1, 95),
(1, 40, 1, 100),
(1, 41, 1, 55),
(2, 42, 1, 60),
(3, 43, 1, 65),
(3, 44, 1, 70),
(3, 45, 1, 75),
(1, 46, 1, 80),
(2, 47, 1, 85),
(3, 48, 1, 90),
(2, 49, 1, 95),
(2, 50, 1, 100),
(1, 51, 1, 55),
(2, 52, 1, 60),
(3, 53, 1, 65),
(4, 54, 2, 70),
(5, 55, 2, 75),
(1, 56, 1, 80),
(2, 57, 1, 85),
(3, 58, 1, 90),
(4, 59, 2, 95),
(5, 60, 2, 100),
(1, 61, 1, 55),
(2, 62, 1, 60),
(3, 63, 1, 65),
(4, 64, 2, 70),
(5, 65, 2, 75),
(1, 66, 1, 80),
(2, 67, 1, 85),
(3, 68, 1, 90),
(4, 69, 2, 95),
(5, 70, 2, 100),
(2, 71, 1, 55),
(3, 72, 1, 60),
(1, 73, 1, 65),
(2, 74, 2, 70),
(5, 75, 2, 75),
(1, 76, 1, 80),
(2, 77, 1, 85),
(3, 78, 1, 90),
(2, 79, 1, 95),
(2, 80, 1, 100),
(1, 81, 1, 55),
(2, 82, 1, 60),
(3, 83, 1, 65),
(1, 84, 1, 70),
(1, 85, 1, 75),
(1, 86, 1, 80),
(2, 87, 1, 85),
(3, 88, 1, 90),
(1, 89, 1, 95),
(2, 90, 1, 100),
(1, 91, 1, 55),
(2, 92, 1, 60),
(3, 93, 1, 65),
(1, 94, 1, 70),
(1, 95, 1, 75),
(1, 96, 1, 80),
(2, 97, 1, 85),
(3, 98, 1, 90),
(4, 99, 2, 95),
(5, 100, 2, 100);

INSERT INTO materialrequestitems (materialid, materialrequestid, categoryid, quantity) VALUES
(2, 101, 1, 60),
(3, 102, 1, 65),
(1, 103, 1, 70),
(2, 104, 1, 75),
(3, 105, 1, 80),
(1, 106, 1, 85),
(2, 107, 1, 90),
(3, 108, 1, 95),
(1, 109, 1, 100),
(2, 110, 1, 55),
(3, 111, 1, 60),
(1, 112, 1, 65),
(2, 113, 1, 70),
(3, 114, 1, 75),
(1, 115, 1, 80),
(2, 116, 1, 85),
(3, 117, 1, 90),
(1, 118, 1, 95),
(2, 119, 1, 100),
(3, 120, 1, 55),
(1, 121, 1, 60),
(2, 122, 1, 65),
(3, 123, 1, 70),
(1, 124, 1, 75),
(2, 125, 1, 80),
(3, 126, 1, 85),
(1, 127, 1, 90),
(2, 128, 1, 95),
(3, 129, 1, 100),
(1, 130, 1, 55),
(2, 131, 1, 60),
(3, 132, 1, 65),
(1, 133, 1, 70),
(2, 134, 1, 75),
(3, 135, 1, 80),
(1, 136, 1, 85),
(2, 137, 1, 90),
(3, 138, 1, 95),
(1, 139, 1, 100),
(2, 140, 1, 55),
(3, 141, 1, 60),
(1, 142, 1, 65),
(2, 143, 1, 70),
(3, 144, 1, 75),
(1, 145, 1, 80),
(2, 146, 1, 85),
(3, 147, 1, 90),
(1, 148, 1, 95),
(2, 149, 1, 100),
(3, 150, 1, 55),
(1, 151, 1, 60),
(2, 152, 1, 65),
(3, 153, 1, 70),
(1, 154, 1, 75),
(2, 155, 1, 80),
(3, 156, 1, 85),
(1, 157, 1, 90),
(2, 158, 1, 95),
(3, 159, 1, 100),
(1, 160, 1, 55),
(2, 161, 1, 60),
(3, 162, 1, 65),
(1, 163, 1, 70),
(2, 164, 1, 75),
(3, 165, 1, 80),
(1, 166, 1, 85),
(2, 167, 1, 90),
(3, 168, 1, 95),
(1, 169, 1, 100),
(2, 170, 1, 55),
(3, 171, 1, 60),
(1, 172, 1, 65),
(2, 173, 1, 70),
(3, 174, 1, 75),
(1, 175, 1, 80),
(2, 176, 1, 85),
(3, 177, 1, 90),
(1, 178, 1, 95),
(2, 179, 1, 100),
(3, 180, 1, 55),
(1, 181, 1, 60),
(2, 182, 1, 65),
(3, 183, 1, 70),
(1, 184, 1, 75),
(2, 185, 1, 80),
(3, 186, 1, 85),
(1, 187, 1, 90),
(2, 188, 1, 95),
(3, 189, 1, 100),
(1, 190, 1, 55),
(2, 191, 1, 60),
(3, 192, 1, 65),
(1, 193, 1, 70),
(2, 194, 1, 75),
(3, 195, 1, 80),
(1, 196, 1, 85),
(2, 197, 1, 90),
(3, 198, 1, 95),
(1, 199, 1, 100),
(2, 200, 1, 55);

INSERT INTO materialrequestitems (materialid, materialrequestid, categoryid, quantity) VALUES
(2, 201, 2, 60),
(2, 202, 2, 65),
(2, 203, 2, 70),
(2, 204, 2, 75),
(2, 205, 2, 80),
(2, 206, 2, 85),
(2, 207, 2, 90),
(2, 208, 2, 95),
(2, 209, 2, 100),
(2, 210, 2, 55),
(2, 211, 2, 60),
(2, 212, 2, 65),
(2, 213, 2, 70),
(2, 214, 2, 75),
(2, 215, 2, 80),
(2, 216, 2, 85),
(2, 217, 2, 90),
(2, 218, 2, 95),
(2, 219, 2, 100),
(2, 220, 2, 55),
(2, 221, 2, 60),
(2, 222, 2, 65),
(2, 223, 2, 70),
(2, 224, 2, 75),
(2, 225, 2, 80),
(2, 226, 2, 85),
(2, 227, 2, 90),
(2, 228, 2, 95),
(2, 229, 2, 100),
(2, 230, 2, 55),
(2, 231, 2, 60),
(2, 232, 2, 65),
(2, 233, 2, 70),
(2, 234, 2, 75),
(2, 235, 2, 80),
(2, 236, 2, 85),
(2, 237, 2, 90),
(2, 238, 2, 95),
(2, 239, 2, 100),
(2, 240, 2, 55),
(2, 241, 2, 60),
(2, 242, 2, 65),
(2, 243, 2, 70),
(2, 244, 2, 75),
(2, 245, 2, 80),
(2, 246, 2, 85),
(2, 247, 2, 90),
(2, 248, 2, 95),
(2, 249, 2, 100),
(2, 250, 2, 55),
(2, 251, 2, 60),
(2, 252, 2, 65),
(2, 253, 2, 70),
(2, 254, 2, 75),
(2, 255, 2, 80),
(2, 256, 2, 85),
(2, 257, 2, 90),
(2, 258, 2, 95),
(2, 259, 2, 100),
(2, 260, 2, 55),
(2, 261, 2, 60),
(2, 262, 2, 65),
(2, 263, 2, 70),
(2, 264, 2, 75),
(2, 265, 2, 80),
(2, 266, 2, 85),
(2, 267, 2, 90),
(2, 268, 2, 95),
(2, 269, 2, 100),
(2, 270, 2, 55),
(2, 271, 2, 60),
(2, 272, 2, 65),
(2, 273, 2, 70),
(2, 274, 2, 75),
(2, 275, 2, 80),
(2, 276, 2, 85),
(2, 277, 2, 90),
(2, 278, 2, 95),
(2, 279, 2, 100),
(2, 280, 2, 55),
(2, 281, 2, 60),
(2, 282, 2, 65),
(2, 283, 2, 70),
(2, 284, 2, 75),
(2, 285, 2, 80),
(2, 286, 2, 85),
(2, 287, 2, 90),
(2, 288, 2, 95),
(2, 289, 2, 100),
(2, 290, 2, 55),
(2, 291, 2, 60),
(2, 292, 2, 65),
(2, 293, 2, 70),
(2, 294, 2, 75),
(2, 295, 2, 80),
(2, 296, 2, 85),
(2, 297, 2, 90),
(2, 298, 2, 95),
(2, 299, 2, 100),
(2, 300, 2, 55),
(2, 301, 2, 60),
(2, 302, 2, 65),
(2, 303, 2, 70),
(2, 304, 2, 75),
(2, 305, 2, 80),
(2, 306, 2, 85),
(2, 307, 2, 90),
(2, 308, 2, 95),
(2, 309, 2, 100),
(2, 310, 2, 55),
(2, 311, 2, 60),
(2, 312, 2, 65),
(2, 313, 2, 70),
(2, 314, 2, 75),
(2, 315, 2, 80),
(2, 316, 2, 85),
(2, 317, 2, 90),
(2, 318, 2, 95),
(2, 319, 2, 100),
(2, 320, 2, 55),
(2, 321, 2, 60),
(2, 322, 2, 65),
(2, 323, 2, 70),
(2, 324, 2, 75),
(2, 325, 2, 80),
(2, 326, 2, 85),
(2, 327, 2, 90),
(2, 328, 2, 95),
(2, 329, 2, 100),
(2, 330, 2, 55),
(2, 331, 2, 60),
(2, 332, 2, 65),
(2, 333, 2, 70),
(2, 334, 2, 75),
(2, 335, 2, 80),
(2, 336, 2, 85),
(2, 337, 2, 90),
(2, 338, 2, 95),
(2, 339, 2, 100),
(2, 340, 2, 55),
(2, 341, 2, 60),
(2, 342, 2, 65),
(2, 343, 2, 70),
(2, 344, 2, 75),
(2, 345, 2, 80),
(2, 346, 2, 85),
(2, 347, 2, 90),
(2, 348, 2, 95),
(2, 349, 2, 100),
(2, 350, 2, 55);



INSERT INTO materialrequestitems (materialid, materialrequestid, categoryid, quantity) VALUES
(2, 351, 2, 60),
(2, 352, 2, 65),
(2, 353, 2, 70),
(2, 354, 2, 75),
(2, 355, 2, 80),
(2, 356, 2, 85),
(2, 357, 2, 90),
(2, 358, 2, 95),
(2, 359, 2, 100),
(2, 360, 2, 55),
(2, 361, 2, 60),
(2, 362, 2, 65),
(2, 363, 2, 70),
(2, 364, 2, 75),
(2, 365, 2, 80),
(2, 366, 2, 85),
(2, 367, 2, 90),
(2, 368, 2, 95),
(2, 369, 2, 100),
(2, 370, 2, 55),
(2, 371, 2, 60),
(2, 372, 2, 65),
(2, 373, 2, 70),
(2, 374, 2, 75),
(2, 375, 2, 80),
(2, 376, 2, 85),
(2, 377, 2, 90),
(2, 378, 2, 95),
(2, 379, 2, 100),
(2, 380, 2, 55),
(2, 381, 2, 60),
(2, 382, 2, 65),
(2, 383, 2, 70),
(2, 384, 2, 75),
(2, 385, 2, 80),
(2, 386, 2, 85),
(2, 387, 2, 90),
(2, 388, 2, 95),
(2, 389, 2, 100),
(2, 390, 2, 55),
(2, 391, 2, 60),
(2, 392, 2, 65),
(2, 393, 2, 70),
(2, 394, 2, 75),
(2, 395, 2, 80),
(2, 396, 2, 85),
(2, 397, 2, 90),
(2, 398, 2, 95),
(2, 399, 2, 100),
(2, 400, 2, 55),
(1, 401, 1, 55),
(1, 402, 1, 60),
(1, 403, 1, 65),
(1, 404, 1, 70),
(1, 405, 1, 75),
(1, 406, 1, 80),
(1, 407, 1, 85),
(1, 408, 1, 90),
(1, 409, 1, 95),
(1, 410, 1, 100),
(1, 411, 1, 55),
(1, 412, 1, 60),
(1, 413, 1, 65),
(1, 414, 1, 70),
(1, 415, 1, 75),
(1, 416, 1, 80),
(1, 417, 1, 85),
(1, 418, 1, 90),
(1, 419, 1, 95),
(1, 420, 1, 100),
(1, 421, 1, 55),
(1, 422, 1, 60),
(1, 423, 1, 65),
(1, 424, 1, 70),
(1, 425, 1, 75),
(1, 426, 1, 80),
(1, 427, 1, 85),
(1, 428, 1, 90),
(1, 429, 1, 95),
(1, 430, 1, 100),
(1, 431, 1, 55),
(1, 432, 1, 60),
(1, 433, 1, 65),
(1, 434, 1, 70),
(1, 435, 1, 75),
(1, 436, 1, 80),
(1, 437, 1, 85),
(1, 438, 1, 90),
(1, 439, 1, 95),
(1, 440, 1, 100),
(1, 441, 1, 55),
(1, 442, 1, 60),
(1, 443, 1, 65),
(1, 444, 1, 70),
(1, 445, 1, 75),
(1, 446, 1, 80),
(1, 447, 1, 85),
(1, 448, 1, 90),
(1, 449, 1, 95),
(1, 450, 1, 100);

INSERT INTO materialrequestitems (materialid, materialrequestid, categoryid, quantity) VALUES
(1, 451, 1, 55),
(1, 452, 1, 60),
(1, 453, 1, 65),
(1, 454, 1, 70),
(1, 455, 1, 75),
(1, 456, 1, 80),
(1, 457, 1, 85),
(1, 458, 1, 90),
(1, 459, 1, 95),
(1, 460, 1, 100),
(1, 461, 1, 55),
(1, 462, 1, 60),
(1, 463, 1, 65),
(1, 464, 1, 70),
(1, 465, 1, 75),
(1, 466, 1, 80),
(1, 467, 1, 85),
(1, 468, 1, 90),
(1, 469, 1, 95),
(1, 470, 1, 100),
(1, 471, 1, 55),
(1, 472, 1, 60),
(1, 473, 1, 65),
(1, 474, 1, 70),
(1, 475, 1, 75),
(1, 476, 1, 80),
(1, 477, 1, 85),
(1, 478, 1, 90),
(1, 479, 1, 95),
(1, 480, 1, 100),
(1, 481, 1, 55),
(1, 482, 1, 60),
(1, 483, 1, 65),
(1, 484, 1, 70),
(1, 485, 1, 75),
(1, 486, 1, 80),
(1, 487, 1, 85),
(1, 488, 1, 90),
(1, 489, 1, 95),
(1, 490, 1, 100),
(1, 491, 1, 55),
(1, 492, 1, 60),
(1, 493, 1, 65),
(1, 494, 1, 70),
(1, 495, 1, 75),
(1, 496, 1, 80),
(1, 497, 1, 85),
(1, 498, 1, 90),
(1, 499, 1, 95),
(1, 500, 1, 100),
(1, 501, 1, 55),
(1, 502, 1, 60),
(1, 503, 1, 65),
(1, 504, 1, 70),
(1, 505, 1, 75),
(1, 506, 1, 80),
(1, 507, 1, 85),
(1, 508, 1, 90),
(1, 509, 1, 95),
(1, 510, 1, 100),
(1, 511, 1, 55),
(1, 512, 1, 60),
(1, 513, 1, 65),
(1, 514, 1, 70),
(1, 515, 1, 75),
(1, 516, 1, 80),
(1, 517, 1, 85),
(1, 518, 1, 90),
(1, 519, 1, 95),
(1, 520, 1, 100),
(1, 521, 1, 55),
(1, 522, 1, 60),
(1, 523, 1, 65),
(1, 524, 1, 70),
(1, 525, 1, 75),
(1, 526, 1, 80),
(1, 527, 1, 85),
(1, 528, 1, 90),
(1, 529, 1, 95),
(1, 530, 1, 100),
(1, 531, 1, 55),
(1, 532, 1, 60),
(1, 533, 1, 65),
(1, 534, 1, 70),
(1, 535, 1, 75),
(1, 536, 1, 80),
(1, 537, 1, 85),
(1, 538, 1, 90),
(1, 539, 1, 95),
(1, 540, 1, 100),
(1, 541, 1, 55),
(1, 542, 1, 60),
(1, 543, 1, 65),
(1, 544, 1, 70),
(1, 545, 1, 75),
(1, 546, 1, 80),
(1, 547, 1, 85),
(1, 548, 1, 90),
(1, 549, 1, 95),
(1, 550, 1, 100),
(1, 551, 1, 55),
(1, 552, 1, 60),
(1, 553, 1, 65),
(1, 554, 1, 70),
(1, 555, 1, 75),
(1, 556, 1, 80),
(1, 557, 1, 85),
(1, 558, 1, 90),
(1, 559, 1, 95),
(1, 560, 1, 100),
(1, 561, 1, 55),
(1, 562, 1, 60),
(1, 563, 1, 65),
(1, 564, 1, 70),
(1, 565, 1, 75),
(1, 566, 1, 80),
(1, 567, 1, 85),
(1, 568, 1, 90),
(1, 569, 1, 95),
(1, 570, 1, 100),
(1, 571, 1, 55),
(1, 572, 1, 60),
(1, 573, 1, 65),
(1, 574, 1, 70),
(1, 575, 1, 75),
(1, 576, 1, 80),
(1, 577, 1, 85),
(1, 578, 1, 90),
(1, 579, 1, 95),
(1, 580, 1, 100),
(1, 581, 1, 55),
(1, 582, 1, 60),
(1, 583, 1, 65),
(1, 584, 1, 70),
(1, 585, 1, 75),
(1, 586, 1, 80),
(1, 587, 1, 85),
(1, 588, 1, 90),
(1, 589, 1, 95),
(1, 590, 1, 100),
(1, 591, 1, 55),
(1, 592, 1, 60),
(1, 593, 1, 65),
(1, 594, 1, 70),
(1, 595, 1, 75),
(1, 596, 1, 80),
(1, 597, 1, 85),
(1, 598, 1, 90),
(1, 599, 1, 95),
(1, 600, 1, 100),
(1, 601, 1, 55),
(1, 601, 1, 60),
(1, 601, 1, 65),
(1, 602, 1, 70),
(1, 602, 1, 75),
(1, 602, 1, 80),
(1, 603, 1, 85),
(1, 603, 1, 90),
(1, 604, 1, 95),
(1, 604, 1, 100),
(1, 605, 1, 55),
(1, 605, 1, 60),
(1, 606, 1, 65),
(1, 606, 1, 70),
(1, 607, 1, 75),
(1, 607, 1, 80),
(1, 608, 1, 85),
(1, 608, 1, 90),
(1, 609, 1, 95),
(1, 609, 1, 100),
(1, 610, 1, 55),
(1, 611, 1, 60),
(1, 612, 1, 65),
(1, 612, 1, 70),
(1, 613, 1, 75),
(1, 613, 1, 80),
(1, 614, 1, 85),
(1, 614, 1, 90),
(1, 615, 1, 95),
(1, 616, 1, 100),
(1, 617, 1, 55),
(1, 617, 1, 60),
(1, 618, 1, 65),
(1, 618, 1, 70),
(1, 619, 1, 75),
(1, 619, 1, 80),
(1, 620, 1, 85),
(1, 620, 1, 90),
(1, 621, 1, 95),
(1, 621, 1, 100),
(1, 622, 1, 55),
(1, 622, 1, 60),
(1, 623, 1, 65),
(1, 624, 1, 70),
(1, 624, 1, 75),
(1, 625, 1, 80),
(1, 625, 1, 85),
(1, 626, 1, 90),
(1, 626, 1, 95),
(1, 627, 1, 100),
(1, 627, 1, 55),
(1, 628, 1, 60),
(1, 628, 1, 65),
(1, 629, 1, 70),
(1, 629, 1, 75),
(1, 630, 1, 80),
(1, 630, 1, 85),
(1, 631, 1, 90),
(1, 631, 1, 95),
(1, 632, 1, 100),
(1, 632, 1, 55),
(1, 633, 1, 60),
(1, 633, 1, 65),
(1, 634, 1, 70),
(1, 634, 1, 75),
(1, 635, 1, 80),
(1, 635, 1, 85),
(1, 636, 1, 90),
(1, 636, 1, 95),
(1, 637, 1, 100),
(1, 637, 1, 55),
(1, 637, 1, 60),
(1, 638, 1, 65),
(1, 638, 1, 70),
(1, 639, 1, 75),
(1, 639, 1, 80),
(1, 640, 1, 85),
(1, 640, 1, 90),
(1, 641, 1, 95),
(1, 641, 1, 100),
(1, 642, 1, 55),
(1, 643, 1, 60),
(1, 643, 1, 65),
(1, 644, 1, 70),
(1, 644, 1, 75),
(1, 645, 1, 80),
(1, 645, 1, 85),
(1, 646, 1, 90),
(1, 646, 1, 95),
(1, 647, 1, 100),
(1, 647, 1, 55),
(1, 648, 1, 60),
(1, 648, 1, 65),
(1, 648, 1, 70),
(1, 648, 1, 75),
(1, 649, 1, 80),
(1, 649, 1, 85),
(1, 649, 1, 90),
(1, 650, 1, 95),
(1, 650, 1, 100);

INSERT INTO credentials (contactnumber,password) VALUES ('1245987456','password');
INSERT INTO credentials (contactnumber,password) VALUES ('8456123654','password');
INSERT INTO credentials (contactnumber,password) VALUES ('8752312210','password');
INSERT INTO credentials (contactnumber,password) VALUES ('7758983095','password');
INSERT INTO credentials (contactnumber,password) VALUES ('8546123565','password');
INSERT INTO credentials (contactnumber,password) VALUES ('8923456790','password');
INSERT INTO credentials (contactnumber,password) VALUES ('8976231245','password');
INSERT INTO credentials (contactnumber,password) VALUES ('8767098245','password');
INSERT INTO credentials (contactnumber,password) VALUES ('9978234578','password');
INSERT INTO credentials (contactnumber,password) VALUES ('8841235696','password');
INSERT INTO credentials (contactnumber,password) VALUES ('9090909090','password');
INSERT INTO credentials (contactnumber,password) VALUES ('9089898989','password');
INSERT INTO credentials (contactnumber,password) VALUES ('8909090909','password');
INSERT INTO credentials (contactnumber,password) VALUES ('9889898989','password');
INSERT INTO credentials (contactnumber,password) VALUES ('9850250927','password');
INSERT INTO credentials (contactnumber,password) VALUES ('9860366152','password');
INSERT INTO credentials (contactnumber,password) VALUES ('7498035692','password');
INSERT INTO credentials (contactnumber,password) VALUES ('9887342780','password');
INSERT INTO credentials (contactnumber,password) VALUES ('9887354780','password');
INSERT INTO credentials (contactnumber,password) VALUES ('9777342780','password');
INSERT INTO credentials (contactnumber,password) VALUES ('9881571280','password');
INSERT INTO credentials (contactnumber,password) VALUES ('9881601268','password');
INSERT INTO credentials (contactnumber,password) VALUES ('9881501268','password');
INSERT INTO credentials (contactnumber,password) VALUES ('9981571280','password');
INSERT INTO credentials (contactnumber,password) VALUES ('9880601268','password');
INSERT INTO credentials (contactnumber,password) VALUES ('9866501268','password');
INSERT INTO credentials (contactnumber,password) VALUES ('9881572280','password');
INSERT INTO credentials (contactnumber,password) VALUES ('9881201268','password');
INSERT INTO credentials (contactnumber,password) VALUES ('9301501268','password');
INSERT INTO credentials (contactnumber,password) VALUES ('9856571280','password');
INSERT INTO credentials (contactnumber,password) VALUES ('9881011268','password');
INSERT INTO credentials (contactnumber,password) VALUES ('9881501028','password');
INSERT INTO credentials (contactnumber,password) VALUES ('9881021280','password');
INSERT INTO credentials (contactnumber,password) VALUES ('9881902368','password');
INSERT INTO credentials (contactnumber,password) VALUES ('9823001268','password');
INSERT INTO credentials (contactnumber,password) VALUES ('9850290927','password');
INSERT INTO credentials (contactnumber,password) VALUES ('9850250936','password');
INSERT INTO credentials (contactnumber,password) VALUES ('8801501234','password');
INSERT INTO credentials (contactnumber,password) VALUES ('8956571280','password');
INSERT INTO credentials (contactnumber,password) VALUES ('8681011268','password');
INSERT INTO credentials (contactnumber,password) VALUES ('7481501028','password');
INSERT INTO credentials (contactnumber,password) VALUES ('9181021280','password');
INSERT INTO credentials (contactnumber,password) VALUES ('9680543200','password');
INSERT INTO credentials (contactnumber,password) VALUES ('9767901280','password');




INSERT INTO users(imageurl,aadharid,firstname,lastname,birthdate,gender,email,contactnumber) VALUES("AkshayTanpure.jpg","580408011566","Pragati","Bangar","2000-12-18","Female","bangarpragati11@gmail.com","1245987456");
INSERT INTO users(imageurl,aadharid,firstname,lastname,birthdate,gender,email,contactnumber) VALUES("AkshayTanpure.jpg","580408011562","Abhay","Navale","2000-12-08","male","navaleabhay11@gmail.com","8456123654");
INSERT INTO users(imageurl,aadharid,firstname,lastname,birthdate,gender,email,contactnumber) VALUES("AkshayTanpure.jpg","58040801153","Akash","Ajab","2000-12-28","male","ajabakash11@gmail.com","8752312210");
INSERT INTO users(imageurl,aadharid,firstname,lastname,birthdate,gender,email,contactnumber) VALUES("AkshayTanpure.jpg","58040801154","Ashok","Bajare","1984-12-28","male","ashok311@gmail.com","7758983095");
INSERT INTO users(imageurl,aadharid,firstname,lastname,birthdate,gender,email,contactnumber) VALUES("AkshayTanpure.jpg","58040801155","Ganesh","Morde","1990-04-28","male","mordeganesh11@gmail.com","8546123565");
INSERT INTO users(imageurl,aadharid,firstname,lastname,birthdate,gender,email,contactnumber) VALUES("AkshayTanpure.jpg","58040801156","Datta","Fuge","1991-01-12","male","dattam@gmail.com","8923456790");
INSERT INTO users(imageurl,aadharid,firstname,lastname,birthdate,gender,email,contactnumber) VALUES("AkshayTanpure.jpg","58040801157","Ramesh","Kale","1980-04-07","male","rameshkale1@gmail.com","8976231245");
INSERT INTO users(imageurl,aadharid,firstname,lastname,birthdate,gender,email,contactnumber) VALUES("AkshayTanpure.jpg","58040801158","Ram","Bajare","1980-04-07","male","rambajare@gmail.com","8767098245");
INSERT INTO users(imageurl,aadharid,firstname,lastname,birthdate,gender,email,contactnumber) VALUES("AkshayTanpure.jpg","58040801159","Dadabhau","Navle","1980-04-07","male","dadabhaunavle@gmail.com","9978234578");
INSERT INTO users(imageurl,aadharid,firstname,lastname,birthdate,gender,email,contactnumber) VALUES("AkshayTanpure.jpg","58040801160","Maruti","Shinde","1980-04-07","male","marutidhinde@gmail.com","8841235696");
INSERT INTO users(imageurl,aadharid,firstname,lastname,birthdate,gender,email,contactnumber) VALUES("AkshayTanpure.jpg","76787954565","Vishal","Kudale","1960-04-07","male","vishalkudle@gmail.com","9090909090");
INSERT INTO users(imageurl,aadharid,firstname,lastname,birthdate,gender,email,contactnumber) VALUES("AkshayTanpure.jpg","76787923465","Vishal","Thorat","1969-04-07","male","vishalthorat@gmail.com","9089898989");
INSERT INTO users(imageurl,aadharid,firstname,lastname,birthdate,gender,email,contactnumber) VALUES("AkshayTanpure.jpg","76787912365","Vishal","Kale","1964-04-07","male","vishalkale@gmail.com","8909090909");
INSERT INTO users(imageurl,aadharid,firstname,lastname,birthdate,gender,email,contactnumber) VALUES("AkshayTanpure.jpg","76734554565","Vishal","Totre","1963-04-07","male","vishaltotre@gmail.com","9889898989");
INSERT INTO users(imageurl,aadharid,firstname,lastname,birthdate,gender,email,contactnumber) VALUES("AkshayTanpure.jpg","76744554565","Vishal","Totre","1963-04-07","male","vishaltotre@gmail.com","9850250927");
INSERT INTO users(imageurl,aadharid,firstname,lastname,birthdate,gender,email,contactnumber) VALUES("AkshayTanpure.jpg","76744564565","siddhesh","banger","1963-04-07","male","vishaltotre@gmail.com","9860366152");
INSERT INTO users(imageurl,aadharid,firstname,lastname,birthdate,gender,email,contactnumber) VALUES("AkshayTanpure.jpg","76794654565","siddharth","bhor","1963-04-07","male","vishaltotre@gmail.com","7498035692");
INSERT INTO users(imageurl,aadharid,firstname,lastname,birthdate,gender,email,contactnumber) VALUES("AkshayTanpure.jpg","76734578565","shweta","Totre","1963-04-07","male","vishaltotre@gmail.com","9887342780");
INSERT INTO users(imageurl,aadharid,firstname,lastname,birthdate,gender,email,contactnumber) VALUES("AkshayTanpure.jpg","76734578590","samrudhhi","Totre","1963-04-07","male","vishaltotre@gmail.com","9887354780");
INSERT INTO users(imageurl,aadharid,firstname,lastname,birthdate,gender,email,contactnumber) VALUES("AkshayTanpure.jpg","88734578565","siddhi","Totre","1963-04-07","male","vishaltotre@gmail.com","9777342780");
INSERT INTO users(imageurl,aadharid,firstname,lastname,birthdate,gender,email,contactnumber) VALUES("AkshayTanpure.jpg","88884578565","siddhesh","Totre","1963-04-07","male","vishaltotre@gmail.com","9881571280");
INSERT INTO users(imageurl,aadharid,firstname,lastname,birthdate,gender,email,contactnumber) VALUES("AkshayTanpure.jpg","88734578500","raghav","bangar","1963-04-07","male","vishaltotre@gmail.com","9881601268");
INSERT INTO users(imageurl,aadharid,firstname,lastname,birthdate,gender,email,contactnumber) VALUES("AkshayTanpure.jpg","88884578560","devesh","bhor","1963-04-07","male","vishaltotre@gmail.com","9881501268");
INSERT INTO users(imageurl,aadharid,firstname,lastname,birthdate,gender,email,contactnumber) VALUES("AkshayTanpure.jpg","767305785903","janavi","jore","1963-04-07","female","janavijore@gmail.com","9981571280");
INSERT INTO users(imageurl,aadharid,firstname,lastname,birthdate,gender,email,contactnumber) VALUES("AkshayTanpure.jpg","887345783002","jyosna","gore","1963-04-07","female","jyosnagore@gmail.com","9880601268");
INSERT INTO users(imageurl,aadharid,firstname,lastname,birthdate,gender,email,contactnumber) VALUES("AkshayTanpure.jpg","888845777654","jyoti","erande","1963-04-07","female","jyotierande@gmail.com","9866501268");
INSERT INTO users(imageurl,aadharid,firstname,lastname,birthdate,gender,email,contactnumber) VALUES("AkshayTanpure.jpg","887745785007","sarika","karande","1963-04-07","female","sarikakarande@gmail.com","9881572280");
INSERT INTO users(imageurl,aadharid,firstname,lastname,birthdate,gender,email,contactnumber) VALUES("AkshayTanpure.jpg","888465478569","aaditya","pokharkar","1963-04-07","female","aadityapokharkar@gmail.com","9881201268");
INSERT INTO users(imageurl,aadharid,firstname,lastname,birthdate,gender,email,contactnumber) VALUES("AkshayTanpure.jpg","767345787824","om","ajab","1963-04-07","female","omajab@gmail.com","9301501268");
INSERT INTO users(imageurl,aadharid,firstname,lastname,birthdate,gender,email,contactnumber) VALUES("AkshayTanpure.jpg","877340025377","sai","navale","1963-04-07","female","sainavale@gmail.com","9856571280");
INSERT INTO users(imageurl,aadharid,firstname,lastname,birthdate,gender,email,contactnumber) VALUES("AkshayTanpure.jpg","809284578565","ram","mankar","1963-04-07","female","rammankar@gmail.com","9881011268");
INSERT INTO users(imageurl,aadharid,firstname,lastname,birthdate,gender,email,contactnumber) VALUES("AkshayTanpure.jpg","880925578500","shubham","tanpure","1963-04-07","female","shubhamtanpure@gmail.com","9881501028");
INSERT INTO users(imageurl,aadharid,firstname,lastname,birthdate,gender,email,contactnumber) VALUES("AkshayTanpure.jpg","821094578560","rutuja","teli","1963-04-07","female","rutujateli@gmail.com","9881021280");
INSERT INTO users(imageurl,aadharid,firstname,lastname,birthdate,gender,email,contactnumber) VALUES("AkshayTanpure.jpg","889635678500","rohini","bangar","1963-04-07","female","rohinibangar@gmail.com","9880543200");
INSERT INTO users(imageurl,aadharid,firstname,lastname,birthdate,gender,email,contactnumber) VALUES("AkshayTanpure.jpg","821034878560","riddhi","argade","1963-04-07","female","riddhiargade@gmail.com","9867901280");

INSERT INTO users(imageurl,aadharid,firstname,lastname,birthdate,gender,email,contactnumber) VALUES("AkshayTanpure.jpg","817745785007","sarika","karande","1963-04-07","female","sarikakarande@gmail.com","9850290927");
INSERT INTO users(imageurl,aadharid,firstname,lastname,birthdate,gender,email,contactnumber) VALUES("AkshayTanpure.jpg","873412892746","aaditya","pokharkar","1963-04-07","female","aadityapokharkar@gmail.com","9850250936");
INSERT INTO users(imageurl,aadharid,firstname,lastname,birthdate,gender,email,contactnumber) VALUES("AkshayTanpure.jpg","762345342385","om","ajab","1963-04-07","female","omajab@gmail.com","8801501234");
INSERT INTO users(imageurl,aadharid,firstname,lastname,birthdate,gender,email,contactnumber) VALUES("AkshayTanpure.jpg","867485764584","sai","navale","1963-04-07","female","sainavale@gmail.com","8956571280");
INSERT INTO users(imageurl,aadharid,firstname,lastname,birthdate,gender,email,contactnumber) VALUES("AkshayTanpure.jpg","909284464578","ram","mankar","1963-04-07","female","rammankar@gmail.com","8681011268");
INSERT INTO users(imageurl,aadharid,firstname,lastname,birthdate,gender,email,contactnumber) VALUES("AkshayTanpure.jpg","880925535467","shubham","tanpure","1963-04-07","female","shubhamtanpure@gmail.com","7481501028");
INSERT INTO users(imageurl,aadharid,firstname,lastname,birthdate,gender,email,contactnumber) VALUES("AkshayTanpure.jpg","821094365758","rutuja","teli","1963-04-07","female","rutujateli@gmail.com","9181021280");
INSERT INTO users(imageurl,aadharid,firstname,lastname,birthdate,gender,email,contactnumber) VALUES("AkshayTanpure.jpg","889635678142","rohini","bangar","1963-04-07","female","rohinibangar@gmail.com","9680543200");
INSERT INTO users(imageurl,aadharid,firstname,lastname,birthdate,gender,email,contactnumber) VALUES("AkshayTanpure.jpg","821034847587","riddhi","argade","1963-04-07","female","riddhiargade@gmail.com","9767901280");

update users set imageurl='./assets/img/fEmp.jpeg' where gender="female";
update users set imageurl='./assets/img/mEmp.jpeg' where gender="male";

