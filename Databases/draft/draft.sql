
	DROP DATABASE if exists inventorymanagement;
	create database inventorymanagement;
	use inventorymanagement;

	-- Table Creation
CREATE TABLE roles(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                    role varchar(50));
create table departments(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
                        department varchar(50));

create table categories(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                        category varchar(50));

create table employees(id INT NOT NULL auto_increment primary KEY,
                        userid int NOT NULL UNIQUE,
                        departmentid  int not null,
                        constraint fk_departmentid foreign key(departmentid) references departments(id) on update cascade on delete cascade,
                        roleid int not null,constraint fk_roleid foreign key(roleid) references roles(id) on update cascade on delete cascade,
                        hiredate date);
    
create table workerstatus(id INT NOT NULL AUTO_INCREMENT primary KEY,
                        workerid INT NOT NULL,constraint fk_workerid foreign key(workerid) references employees(id) on update cascade on delete cascade,
                        status boolean not null default 0);

CREATE TABLE materials(id INT NOT NULL AUTO_INCREMENT primary KEY,
                        title VARCHAR(100),
                        categoryid INT NOT NULL, constraint fk_category_id FOREIGN KEY(categoryid) REFERENCES categories(id) on UPDATE cascade on delete cascade,
                        quantity INT NOT NULL,
                        unitprice INT NOT NULL,
                        imageurl varchar (50));
    

create table Warehousestaff(id INT NOT NULL AUTO_INCREMENT primary KEY,
                        section VARCHAR(20), 
                        categoryid int not null,constraint fk_category_id1 foreign key(categoryid) references categories(id) on update cascade on delete cascade,
                        employeeid int not null,constraint fk_employeeid foreign key(employeeid) references employees(id) on update cascade on delete cascade);


CREATE TABLE initialrequest(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                    employeeid INT NOT NULL,
                    CONSTRAINT fk_employee_id4 FOREIGN KEY (employeeid) REFERENCES employees(id) ON UPDATE CASCADE ON DELETE CASCADE);



CREATE TABLE initialrequestitems(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                        initialrequestid INT NOT NULL,
                        CONSTRAINT fk_initialrequest FOREIGN KEY (initialrequestid) REFERENCES initialrequest(id)ON UPDATE CASCADE ON DELETE CASCADE,
                        materialid INT NOT NULL,CONSTRAINT fk_material_id4 FOREIGN KEY (materialid) REFERENCES materials(id) ON UPDATE CASCADE ON DELETE CASCADE,
                        categoryid INT NOT NULL, constraint fk_categoryid2 FOREIGN KEY(categoryid) REFERENCES categories(id) on UPDATE cascade on delete cascade,
                        quantity INT NOT NULL ); 



CREATE TABLE materialrequests(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                              date DATETIME DEFAULT CURRENT_TIMESTAMP,
							  supervisorid INT NOT NULL,
                              CONSTRAINT fk_supervisor_id5 FOREIGN KEY (supervisorid) REFERENCES employees(id) ON UPDATE CASCADE ON DELETE CASCADE,
                        status ENUM('inprogress' ,'Ready To Dispatch', 'Picked','Delivered', 'Cancelled') NOT NULL);


                    
CREATE TABLE materialrequestitems(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                            storemanagerid INT NOT NULL,CONSTRAINT fk_employee_id FOREIGN KEY (storemanagerid) REFERENCES employees(id) ON UPDATE CASCADE ON DELETE CASCADE,
                            materialid INT NOT NULL,CONSTRAINT fk_materialid FOREIGN KEY (materialid) REFERENCES materials(id) ON UPDATE CASCADE ON DELETE CASCADE,
                            materialrequestid INT NOT NULL,CONSTRAINT fk_materialrequestid FOREIGN KEY (materialrequestid) REFERENCES materialrequests(id) ON UPDATE CASCADE ON DELETE CASCADE ,
                            categoryid INT NOT NULL, constraint fk_categoryid FOREIGN KEY(categoryid) REFERENCES categories(id) on UPDATE cascade on delete cascade,
                            quantity INT NOT NULL);
                

                            
CREATE TABLE shipments(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                        date DATETIME DEFAULT CURRENT_TIMESTAMP,
                        supervisorid INT NOT NULL,CONSTRAINT fk_employee_id6 FOREIGN KEY (supervisorid) REFERENCES employees(id) ON UPDATE CASCADE ON DELETE CASCADE,
                        materialrequestid INT NOT NULL,CONSTRAINT fk_materialrequest_id FOREIGN KEY (materialrequestid) REFERENCES materialrequests(id) ON UPDATE CASCADE ON DELETE CASCADE, 
                        shipperid INT NOT NULL, CONSTRAINT fk_shipperid FOREIGN KEY (shipperid) REFERENCES employees(id) ON UPDATE CASCADE ON DELETE CASCADE);


CREATE TABLE shippingdetails(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                            storemanagerid INT NOT NULL,CONSTRAINT fk_employee_id7 FOREIGN KEY (storemanagerid) REFERENCES employees(id) ON UPDATE CASCADE ON DELETE CASCADE,
                            materialid INT NOT NULL,CONSTRAINT fk_materialid_4 FOREIGN KEY (materialid) REFERENCES materials(id) ON UPDATE CASCADE ON DELETE CASCADE,
                            categoryid INT NOT NULL, constraint fk_categoryid_5 FOREIGN KEY(categoryid) REFERENCES categories(id) on UPDATE cascade on delete cascade,
                            shipmentid INT NOT NULL, constraint fk_shipmentid FOREIGN KEY(shipmentid) REFERENCES shipments(id) on UPDATE cascade on delete cascade,
                            itemid INT NOT NULL, constraint fk_itemid FOREIGN KEY(itemid) REFERENCES materialrequestitems(id) on UPDATE cascade on delete cascade,
                           status boolean DEFAULT false,
                            quantity INT NOT NULL);

   DELIMITER !!
CREATE TRIGGER newshipment
after INSERT
ON materialrequests FOR EACH ROW
BEGIN
DECLARE workers INT;
DECLARE status BOOLEAN;
DECLARE lastworker INT;
DECLARE worker INT;    
DECLARE noMoreRow INT default 0; 
DECLARE shipper_cursor CURSOR  FOR SELECT w.workerid,w.status FROM workerstatus w ; 
DECLARE CONTINUE HANDLER FOR NOT FOUND SET noMoreRow = 1;
set lastworker=( SELECT workerid FROM workerstatus ORDER BY workerid DESC LIMIT 1);

open shipper_cursor;
worker_status:LOOP
    FETCH shipper_cursor INTO workers,status;
    IF noMoreRow=1 THEN 
		LEAVE worker_status;
    END IF;
    if status=0 and workers<>lastworker then
    update workerstatus set status=1 where workerid=workers;
    set worker=workers;
   		LEAVE worker_status;
    end if;
    if status=0 and workers=lastworker then
	set worker=workers;
	UPDATE workerstatus SET status = 0;
	LEAVE worker_status;
    end If;
END LOOP worker_status;
CLOSE shipper_cursor;
		INSERT INTO shipments(supervisorid,materialrequestid,shipperid)VALUES(new.supervisorid,new.id,worker);
	END !!
	DELIMITER ;
     

   DELIMITER !!
CREATE TRIGGER newshipmentdetails
after INSERT
ON materialrequestitems FOR EACH ROW
BEGIN
	INSERT INTO shippingdetails(storemanagerid,materialid,categoryid,quantity,shipmentid,itemid)
    VALUES(new.storemanagerid,new.materialid,new.categoryid,new.quantity,(select id from shipments s where s.materialrequestid=new.materialrequestid ),new.id); 
    end !!
	DELIMITER ;
    
      DELIMITER !!
CREATE TRIGGER updatestatus
after Update
ON shippingdetails FOR EACH ROW
BEGIN
declare totalcount INT;
declare shipmentid INT;
declare status int;
declare val INT;
DECLARE shipping_cursor CURSOR  FOR SELECT  s.status FROM shippingdetails s WHERE s.shipmentid=new.shipmentid; 
SELECT COUNT(*) into totalcount FROM shippingdetails s where s.shipmentid=new.shipmentid;

 update materials set quantity=quantity-new.quantity where id=new.materialid;
 
set val=0;
OPEN shipping_cursor ;
begin
DECLARE exit_flag INT DEFAULT 0;
 DECLARE CONTINUE HANDLER FOR SQLSTATE '02000' SET exit_flag = 1;
shipment:LOOP
    FETCH shipping_cursor INTO status;
    IF exit_flag THEN 
		LEAVE shipment;
    END IF;
        if status=0  then
		LEAVE shipment;
	end if;
        set val=val+1;
    end loop shipment;
    end;
    close shipping_cursor;  
    if val=totalcount then 
		update shipments s set s.date=NOW() where s.id = new.shipmentid;
        update materialrequests r set r.status=3 where r.id=new.shipmentid;
        end if;
    end !!
    DELIMITER ;
    
    
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
    
 select * from employees;
 select * from roles;
 select * from departments;

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
   
   
   select * from shipments;
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

INSERT INTO materialrequestitems (storemanagerid, materialid, materialrequestid, categoryid, quantity) VALUES
(1, 2, 1, 1, 20),
(1, 2, 2, 1, 40),
(3, 5, 3, 3, 20),
(3, 5, 3, 3, 30),
(1, 1, 3, 1, 40),
(1, 1, 4, 1, 50),
(1, 2, 4, 1, 10),
(1, 1, 5, 1, 77),
(1, 3, 5, 1, 30),
(1, 1, 7, 1, 50),
(1, 2, 7, 1, 51),
(1, 1, 9, 1, 11),
(1, 3, 9, 1, 20),
(1, 2, 10, 1, 10),
(1, 2, 11, 1, 10),
(1, 2, 12, 1, 10),
(1, 2, 13, 1, 10),
(1, 2, 14, 1, 10),
(1, 1, 14, 1, 50),
(2, 2, 15, 1, 51),
(3, 3, 15,1, 11),
(4, 4, 16, 1, 20),
(5, 5, 16, 1, 10),
(6, 6, 16, 1, 10),
(7, 7, 17, 1, 10),
(8, 8, 17, 1, 10),
(9, 9, 18, 1, 10),
(2, 10, 19, 1, 50),
(1, 11, 20, 1, 51),
(6, 12, 21, 1, 11),
(2, 13, 22, 1, 20),
(3, 14, 23, 1, 10),
(4, 15, 23, 1, 10),
(6, 16, 24, 1, 10),
(5, 17, 24, 1, 10),
(7, 18, 25, 1, 10),

(1, 2, 26, 1, 20),
(1, 2, 26, 1, 40),
(3, 5, 26, 3, 20),
(3, 5, 27, 3, 30),
(1, 1, 28, 1, 40),
(1, 1, 28, 1, 50),
(1, 2, 29, 1, 10),
(1, 1, 30, 1, 77),
(1, 3, 30, 1, 30),
(1, 1, 31, 1, 50),
(1, 2, 32, 1, 51),
(1, 1, 33, 1, 11),
(1, 3, 34, 1, 20),
(1, 2, 34, 1, 10),
(1, 2, 35, 1, 10),
(1, 2, 35, 1, 10),
(1, 2, 36, 1, 10),
(1, 2, 36, 1, 10),
(1, 1, 37, 1, 50),
(2, 2, 38, 1, 51),
(3, 3, 39, 1, 11),
(4, 4, 40, 1, 20),
(5, 5, 41, 1, 10),
(6, 6, 42, 1, 10),
(7, 7, 43, 1, 10),
(8, 8, 44, 1, 10),
(9, 9, 45, 1, 10),
(2, 10, 46, 1, 50),
(1, 11, 47, 1, 51),
(6, 12, 48, 1, 11),
(2, 13, 49, 1, 20),
(3, 14, 50, 1, 10),
(4, 15, 51, 1, 10),
(6, 16, 52, 1, 10),
(5, 17, 53, 1, 10),
(7, 18, 54, 1, 10),

(3, 5, 57, 3, 20),
(3, 5, 56, 3, 30),
(1, 1, 56, 1, 40),
(1, 1, 58, 1, 50),
(1, 2, 59, 1, 10),
(1, 1, 60, 1, 77),
(1, 3, 61, 1, 30),
(1, 1, 62, 1, 50),
(1, 2, 63, 1, 51),
(1, 1, 64, 1, 11),
(1, 3, 65, 1, 20),
(1, 2, 65, 1, 10),
(1, 2, 66, 1, 10),
(1, 2, 67, 1, 10),
(1, 2, 68, 1, 10),
(1, 2, 68, 1, 10),
(1, 1, 69, 1, 50),
(2, 2, 70, 1, 51),
(3, 3, 70, 1, 11),
(4, 4, 71, 1, 20),
(5, 5, 62, 1, 10),
(6, 6, 63, 1, 10),
(7, 7, 65, 1, 10),
(8, 8, 66, 1, 10),
(9, 9, 67, 1, 10);



 

-- Add more rows as needed
-- INSERT INTO shipments (date, supervisorid, materialrequestid, shipperid) VALUES
-- ('2023-07-12 19:56:10', 11, 1, 16),
-- ('2023-07-20 00:48:27', 12, 2, 17),
-- ('2023-07-19 23:00:39', 11, 3, 18),
-- ('2023-07-20 00:48:56', 11, 4, 15),
-- ('2023-07-12 22:49:29', 11, 5, 17),
-- ('2023-07-12 23:27:57', 11, 6, 15),
-- ('2023-07-20 01:24:56', 11, 7, 16),
-- ('2023-09-07 11:53:52', 11, 8, 17),
-- ('2023-09-07 11:53:47', 11, 9, 18),
-- ('2023-07-13 20:31:22', 11, 10, 15),
-- ('2023-07-14 22:29:34', 12, 11, 16),
-- ('2023-07-18 18:18:36', 12, 12, 17),
-- ('2023-07-19 23:01:29', 12, 13, 18),
-- ('2023-09-07 11:53:40', 11, 14, 15);

-- Add more rows as needed
-- INSERT INTO shippingdetails (storemanagerid, materialid, categoryid, shipmentid, itemid, status, quantity) VALUES
-- (1, 1, 1, 1, 1, 1, 20),
-- (1, 2, 1, 2, 2, 1, 20),
-- (3, 3, 3, 3, 3, 1, 20),
-- (3, 3, 3, 3, 4, 1, 20),
-- (1, 1, 3, 3, 5, 1, 40),
-- (1, 1, 4, 4, 6, 1, 50),
-- (1, 2, 4, 4, 7, 1, 10),
-- (1, 1, 5, 5, 8, 1, 77),
-- (1, 3, 5, 5, 9, 1, 18),
-- (1, 1, 7, 7, 10, 1, 66),
-- (1, 2, 7, 7, 11, 1, 66),
-- (1, 1, 9, 9, 12, 1, 66),
-- (1, 3, 9, 9, 13, 1, 66),
-- (1, 2, 10, 10, 14, 1, 10),
-- (1, 2, 7, 11, 15, 1, 66),
-- (1, 1, 9, 12, 16, 1, 66),
-- (1, 3, 9, 13, 17, 1, 66),
-- (1, 2, 10, 14, 18, 1, 10);


INSERT INTO initialrequestitems (initialrequestid, materialid, categoryid,quantity) VALUES
(1, 2,1,3),
(2,3,4,1),
(5,3,2,3),
(2,1,3,5);

select rt.id, rt.initialrequestid, initialrequest.employeeid, rt.materialid, categories.category,rt.quantity from InitialRequestItems rt inner join initialrequest on rt.initialrequestid=initialrequest.id  
inner join categories on categories.id=rt.categoryid where initialrequest.employeeid=11;

select rt.id, rt.initialrequestid,materials.imageurl, initialrequest.employeeid, rt.materialid, categories.category,rt.quantity from InitialRequestItems rt 
inner join initialrequest on rt.initialrequestid=initialrequest.id  
inner join categories on categories.id=rt.categoryid 
inner join materials on categories.id=materials.categoryid 
where initialrequest.employeeid=11;

select min(r.id) as id,r.date,r.status, employees.userid from materialrequests r inner join materialrequestitems ri on r.id=ri.materialrequestid
inner join shippingdetails s on ri.id =s.itemid inner join employees on r.supervisorid=employees.id
where r.status=1 and s.status=0 and ri.storemanagerid=@empid group by r.id;
   
select r.id,r.date,r.status,r.supervisorid as userid from materialrequests r  inner join materialrequestitems ri on ri.id=r.id where ri.storemanagerid=1;   

select s.id,s.date,r.status from shipments s 
inner join employees on employees.id=s.supervisorid 
inner join departments on employees.departmentid=departments.id
 inner join materialrequests r on s.materialrequestid=r.id 
 where s.shipperid=18 ORDER BY s.id DESC LIMIT 1
 
 select * from shipments






        DELIMITER $$
CREATE PROCEDURE CreateOrder(in cartId int)
BEGIN 
DECLARE employeeId INT;
DECLARE materialId INT;
DECLARE categoryId INT;
DECLARE reqid INT;
DECLARE quantity INT;
DECLARE status BOOLEAN;
DECLARE superviosrid INT;
DECLARE noMoreRow1 INT default 0;
DECLARE initialrequestitems_cursor CURSOR  FOR SELECT ct.materialid, ct.categoryid, ct.quantity FROM initialrequestitems ct WHERE ct.initialrequestid=cartId;
insert into materialrequests(supervisorid,status)values((select ir.employeeid from initialrequest ir where ir.id=cartId),1);
set reqid=(SELECT id FROM materialrequests ORDER BY ID DESC LIMIT 1);
   OPEN initialrequestitems_cursor ;
    begin
    DECLARE exit_flag INT DEFAULT 0;
     DECLARE CONTINUE HANDLER FOR SQLSTATE '02000' SET exit_flag = 1;
    initialrequestitems:loop
    	FETCH initialrequestitems_cursor INTO materialId,categoryId,quantity;
    IF exit_flag=1 THEN 
		LEAVE initialrequestitems;
    END IF;
	INSERT INTO materialrequestitems(storemanagerid,materialrequestid,materialid,categoryid,quantity)
    VALUES((select w.employeeid from warehousestaff w  where w.categoryid=categoryId),reqid,materialId,categoryId,quantity); 

END LOOP initialrequestitems;
end;
CLOSE initialrequestitems_cursor;
-- empty cart
DELETE FROM initialrequestitems c WHERE c.initialrequestid=cartId;

END $$
DELIMITER ;
	DELIMITER $$
 
 
 

	DELIMITER ;

select * from shippingdetails;
  DELIMITER $$
    Create procedure Approved(requestid int,itemid INT,quantity int)
    begin
DECLARE status BOOLEAN;
declare totalcount INT;
declare shipmentid INT;
declare val INT;
DECLARE shipping_cursor CURSOR  FOR SELECT  s.status FROM shippingdetails s WHERE s.shipmentid=(select id from shipments  where shipments.materialrequestid=requestid); 
set shipmentid=(select id from shipments  where shipments.materialrequestid=requestid);

SELECT COUNT(*) into totalcount FROM shippingdetails s where s.shipmentid=shipmentid;
update shippingdetails s set s.quantity=quantity, status=1 where s.itemid=itemid;
set val=0;
OPEN shipping_cursor ;
begin
DECLARE exit_flag INT DEFAULT 0;
 DECLARE CONTINUE HANDLER FOR SQLSTATE '02000' SET exit_flag = 1;
shipment:LOOP
    FETCH shipping_cursor INTO  status;
    IF exit_flag THEN 
		LEAVE shipment;
    END IF;
        if status=0  then
		LEAVE shipment;
	end if;
        set val=val+1;
        
    end loop shipment;
    end;
    close shipping_cursor;   
        if val=totalcount then 
		update shipments s set s.date=NOW() where s.materialrequestid=requestid;
        update materialrequests r set r.status=3 where r.id= requestid;
        end if;
    END $$
DELIMITER ;
	DELIMITER $$
   