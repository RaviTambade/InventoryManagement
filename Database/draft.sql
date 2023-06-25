-- Active: 1678859769284@@127.0.0.1@3306@inventorymanagement


DROP DATABASE inventorymanagement;
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
							firstname VARCHAR(100),
							lastname VARCHAR(50),
							birthdate DATETIME,hiredate DATETIME,
							contactnumber VARCHAR(20),email VARCHAR(50),password VARCHAR(15) NOT NULL,
							imageurl varchar (50),
							gender ENUM('male','female','other') NOT NULL,
							departmentid  int not null,constraint fk_departmentid foreign key(departmentid) references departments(id) on update cascade on delete cascade,
							roleid int not null,constraint fk_roleid foreign key(roleid) references roles(id) on update cascade on delete cascade);


	CREATE TABLE materials(id INT NOT NULL AUTO_INCREMENT primary KEY,
							title VARCHAR(100),
							categoryid INT NOT NULL, constraint fk_category_id FOREIGN KEY(categoryid) REFERENCES categories(id) on UPDATE cascade on delete cascade,
							quantity INT NOT NULL,
							unitprice INT NOT NULL,
							imageurl varchar (50));
	 

	create table Warehouse(id INT NOT NULL AUTO_INCREMENT primary KEY,
						 section VARCHAR(20), 
						 categoryid int not null,constraint fk_category_id1 foreign key(categoryid) references categories(id) on update cascade on delete cascade,
						 employeeid int not null,constraint fk_employeeid foreign key(employeeid) references employees(id) on update cascade on delete cascade);

CREATE TABLE requests(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
						     date DATETIME DEFAULT CURRENT_TIMESTAMP,
							employeeid INT NOT NULL,
					        CONSTRAINT fk_employee_id5 FOREIGN KEY (employeeid) REFERENCES employees(id) ON UPDATE CASCADE ON DELETE CASCADE,
							status ENUM('delivered', 'initiated','inprogress','cancelled') NOT NULL);

	CREATE TABLE orderdetails(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
								employeeid INT NOT NULL,CONSTRAINT fk_employee_id FOREIGN KEY (employeeid) REFERENCES employees(id) ON UPDATE CASCADE ON DELETE CASCADE,
								materialid INT NOT NULL,CONSTRAINT fk_materialid FOREIGN KEY (materialid) REFERENCES materials(id) ON UPDATE CASCADE ON DELETE CASCADE,
								categoryid INT NOT NULL, constraint fk_categoryid FOREIGN KEY(categoryid) REFERENCES categories(id) on UPDATE cascade on delete cascade,
								requestid INT NOT NULL, constraint fk_reqid FOREIGN KEY(requestid) REFERENCES requests(id) on UPDATE cascade on delete cascade,
								quantity INT NOT NULL);

	CREATE TABLE orders(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
						date DATETIME DEFAULT CURRENT_TIMESTAMP,
						orderdetailid INT NOT NULL,CONSTRAINT fk_orderdetailsid FOREIGN KEY (orderdetailid) REFERENCES orderdetails(id) ON UPDATE CASCADE ON DELETE CASCADE ,
						employeeid INT NOT NULL,CONSTRAINT fk_employees_id FOREIGN KEY (employeeid) REFERENCES employees(id) ON UPDATE CASCADE ON DELETE CASCADE ,
						status ENUM('delivered', 'initiated','inprogress','cancelled') NOT NULL);


	CREATE TABLE carts(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
					   employeeid INT NOT NULL,
					   CONSTRAINT fk_employee_id4 FOREIGN KEY (employeeid) REFERENCES employees(id) ON UPDATE CASCADE ON DELETE CASCADE);



	CREATE TABLE cartitems(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
							cartid INT NOT NULL,
							CONSTRAINT fk_cartid FOREIGN KEY (cartid) REFERENCES carts(id)ON UPDATE CASCADE ON DELETE CASCADE,
							materialid INT NOT NULL,CONSTRAINT fk_material_id4 FOREIGN KEY (materialid) REFERENCES materials(id) ON UPDATE CASCADE ON DELETE CASCADE,
							categoryid INT NOT NULL, constraint fk_categoryid2 FOREIGN KEY(categoryid) REFERENCES categories(id) on UPDATE cascade on delete cascade,
							quantity INT NOT NULL ); 


CREATE TABLE shippment(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
						     date DATETIME DEFAULT CURRENT_TIMESTAMP,
							employeeid INT NOT NULL,
					        CONSTRAINT fk_employee_id6 FOREIGN KEY (employeeid) REFERENCES employees(id) ON UPDATE CASCADE ON DELETE CASCADE,
                            shipperid INT NOT NULL, CONSTRAINT fk_shipperid FOREIGN KEY (shipperid) REFERENCES employees(id) ON UPDATE CASCADE ON DELETE CASCADE,
							status ENUM('Ready To Dispatch', 'Picked','In Transit','Delivered', 'Cancelled') NOT NULL);


	CREATE TABLE shippingdetails(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
								employeeid INT NOT NULL,CONSTRAINT fk_employee_id7 FOREIGN KEY (employeeid) REFERENCES employees(id) ON UPDATE CASCADE ON DELETE CASCADE,
								materialid INT NOT NULL,CONSTRAINT fk_materialid_4 FOREIGN KEY (materialid) REFERENCES materials(id) ON UPDATE CASCADE ON DELETE CASCADE,
								categoryid INT NOT NULL, constraint fk_categoryid_5 FOREIGN KEY(categoryid) REFERENCES categories(id) on UPDATE cascade on delete cascade,
								shippingid INT NOT NULL,CONSTRAINT fk_shipping_id FOREIGN KEY (shippingid) REFERENCES shippment(id) ON UPDATE CASCADE ON DELETE CASCADE,
								quantity INT NOT NULL);


-- TRIGGER (insert new entry in orders table find storemanagers id according to orderdetails and update the material quantity)

DELIMITER $$
CREATE TRIGGER neworder
AFTER INSERT
ON orderdetails FOR EACH ROW
BEGIN
        INSERT INTO orders (orderdetailid,employeeid, status)
        VALUES(new.id, (select warehouse.employeeid from warehouse  where warehouse.categoryid=new.categoryid),'inprogress');
        UPDATE materials SET quantity=quantity-new.quantity where materials.id= new.materialid ;
END$$
DELIMITER ;


-- Insertion for material
INSERT INTO categories(category) VALUES ("Bearings");
INSERT INTO categories(category) VALUES ("1st Gear");
INSERT INTO categories(category) VALUES ("2nd Gear");
INSERT INTO categories(category) VALUES ("3rd Gear");
INSERT INTO categories(category) VALUES ("Reverse Gear");
INSERT INTO categories(category) VALUES ("Main Shaft");
INSERT INTO categories(category) VALUES ("Counter Shaft");
INSERT INTO categories(category) VALUES ("Housing");
select * from materials;
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



-- Insertion for Sections
insert into warehouse(section,  categoryid,employeeid)values('Section 1', 1,1);
insert into warehouse(section, categoryid,employeeid)values('Section 2', 2,2);
insert into warehouse(section, categoryid,employeeid)values('Section 3', 3,3);
insert into warehouse(section, categoryid,employeeid)values('Section 4', 4,4);
insert into warehouse(section, categoryid,employeeid)values('Section 5', 5,5);
insert into warehouse(section, categoryid,employeeid)values('Section 6', 6,6);
insert into warehouse(section, categoryid,employeeid)values('Section 7', 7,7);
insert into warehouse(section, categoryid,employeeid)values('Section 8', 8,8);

select * from employees;


-- insertion for orderdetails
insert into orderdetails(employeeid, materialid, quantity)values(9,1,100);
insert into orderdetails(employeeid, materialid, quantity)values(14,2,50);
insert into orderdetails(employeeid, materialid, quantity)values(10,3,30);
insert into orderdetails(employeeid, materialid, quantity)values(10,4,74);
insert into orderdetails(employeeid, materialid, quantity)values(14,5,40);
insert into orderdetails(employeeid, materialid, quantity)values(9,6,7);
insert into orderdetails(employeeid, materialid, quantity)values(11,7,89);
insert into orderdetails(employeeid, materialid, quantity)values(12,8,30);
insert into orderdetails(employeeid, materialid, quantity)values(13,9,74);
insert into orderdetails(employeeid, materialid, quantity)values(14,10,40);
insert into orderdetails(employeeid, materialid, quantity)values(14,11,78);
insert into orderdetails(employeeid, materialid, quantity)values(12,12,89);
insert into orderdetails(employeeid, materialid, quantity)values(12,13,30);


-- insertion for orders
INSERT INTO orders(date, orderdetailid, employeeid,status)VALUES ('2023-02-04  08:35:25',1 , 1,'delivered');
INSERT INTO orders(date, orderdetailid, employeeid,status)VALUES ('2023-01-16  09:35:25',2 ,1,'delivered');
INSERT INTO orders(date, orderdetailid, employeeid,status)VALUES ('2023-04-12  12:35:25',3 , 1,'cancelled');
INSERT INTO orders(date, orderdetailid, employeeid,status)VALUES ('2023-04-25  06:35:25',4,2, 'delivered');
INSERT INTO orders(date, orderdetailid, employeeid,status)VALUES ('2023-01-04  08:35:25',5 , 2,'delivered');
INSERT INTO orders(date, orderdetailid, employeeid,status)VALUES ('2023-01-16  09:35:25',6,2,'delivered');
INSERT INTO orders(date, orderdetailid, employeeid,status)VALUES ('2023-04-12  12:35:25',7, 3,'cancelled');
INSERT INTO orders(date, orderdetailid, employeeid,status)VALUES ('2023-04-12  12:35:25',8 , 3,'cancelled');
INSERT INTO orders(date, orderdetailid, employeeid,status)VALUES ('2023-01-25  06:35:25',9,3, 'delivered');
INSERT INTO orders(date, orderdetailid, employeeid,status)VALUES ('2023-03-04  08:35:25',10 , 4,'delivered');
INSERT INTO orders(date, orderdetailid, employeeid,status)VALUES ('2023-01-16  09:35:25',11,4,'delivered');
INSERT INTO orders(date, orderdetailid, employeeid,status)VALUES ('2023-04-12  12:35:25',12, 4,'delivered');
INSERT INTO orders(date, orderdetailid, employeeid,status)VALUES ('2023-05-26  12:35:25',13, 5,'delivered');


INSERT INTO carts(employeeid) VALUES (9);
INSERT INTO carts(employeeid) VALUES (10);
INSERT INTO carts(employeeid) VALUES (11);
INSERT INTO carts(employeeid) VALUES (12);
INSERT INTO carts(employeeid) VALUES (13);
INSERT INTO carts(employeeid) VALUES (14);

INSERT INTO cartitems(cartid,materialid,categoryid,quantity) VALUES (1,2,1,50);
INSERT INTO cartitems(cartid,materialid,categoryid,quantity) VALUES (4,4,2,5);
INSERT INTO cartitems(cartid,materialid,categoryid,quantity) VALUES (4,5,2,15);
INSERT INTO cartitems(cartid,materialid,categoryid,quantity) VALUES (4,2,1,16);
INSERT INTO cartitems(cartid,materialid,categoryid,quantity) VALUES (6,2,1,17);
INSERT INTO cartitems(cartid,materialid,categoryid,quantity) VALUES (6,4,2,18);
INSERT INTO cartitems(cartid,materialid,categoryid,quantity) VALUES (6,1,1,20);

-- get material by id
select materials.id, materials.title, materials.quantity, materials.unitprice, materials.imageurl, categories.category from materials inner join categories on categories.id =materials.categoryid where materials.id = 5;
 
 -- get all materials
 select materials.id, materials.title, materials.quantity, materials.unitprice, materials.imageurl, categories.category  from materials inner join categories on categories.id =materials.categoryid;

-- get material by category
select materials.id, materials.title, materials.quantity, materials.unitprice, materials.imageurl, categories.category from materials inner join categories on categories.id =materials.categoryid where materials.categoryid =7;

-- employees and their role and department
select  employees.id, employees.firstname,employees.lastname,employees.email,employees.contactnumber, departments.department, roles.role
 from employees 
 inner join departments on employees.departmentid=departments.id  
 inner join roles on employees.roleid=roles.id;


-- get employee by id
select  employees.id, employees.birthdate, employees.hiredate, employees.firstname, employees.lastname, employees.email,employees.contactnumber, employees.imageurl, employees.gender ,departments.department, roles.role   from employees   inner join departments on employees.departmentid=departments.id  inner join roles on employees.roleid=roles.id  where employees.id = 2;


-- get orders from date - to date
select orders.id, employees.firstname,employees.lastname, orders.date, orders.status, materials.id, materials.title, categories.category, orderdetails.quantity from orders inner join materials on orders.orderdetailid = materials.id  inner join employees on employees.id = orders.employeeid   inner join categories on categories.id = materials.categoryid  inner join orderdetails on orders.orderdetailid = orderdetails.id  WHERE (date BETWEEN '2023-03-01' AND '2023-05-05' );

-- get orders ordered today
select orders.id, materials.id, materials.title, categories.category, orderdetails.quantity, orders.status  from orders  inner join materials on orders.orderdetailid = materials.id inner join categories on materials.categoryid = categories.id  inner join orderdetails on orders.orderdetailid=orderdetails.id WHERE orders.date >= CAST(CURRENT_TIMESTAMP AS date);

-- out of stock material
select  materials.id, materials.title, materials.quantity, materials.unitprice, materials.imageurl, categories.category from materials inner join categories on categories.id =materials.categoryid  where quantity = 0





    DELIMITER $$
CREATE PROCEDURE CreateOrder(in cartId int)
BEGIN
DECLARE noMoreRow INT default 0; 
DECLARE employeeId INT;
DECLARE materialId INT;
DECLARE categoryId INT;
DECLARE quantity INT;
DECLARE requestId INT;
DECLARE cart_cursor CURSOR  FOR SELECT (select c.employeeid from carts c where c.id=cartId),ct.materialid, ct.categoryid, ct.quantity FROM cartitems ct WHERE ct.cartid=cartId; 
DECLARE CONTINUE HANDLER FOR NOT FOUND SET noMoreRow = 1;
OPEN cart_cursor ;
INSERT INTO requests (employeeid,status) VALUES ((select c.employeeid from carts c where c.id=cartId),'initiated');
set requestId=( SELECT id FROM requests ORDER BY ID DESC LIMIT 1);
cart_items:LOOP
    FETCH cart_cursor INTO employeeId,materialId,categoryId,quantity;
    IF noMoreRow=1 THEN 
		LEAVE cart_items;
    END IF;
	INSERT INTO orderdetails(employeeid,materialid,categoryid,quantity,requestid)VALUES(employeeId,materialId,categoryId,quantity,requestId); 
END LOOP cart_items;
DELETE FROM cartitems c WHERE c.cartid=cartId;
CLOSE cart_cursor;
END $$
DELIMITER ;

-- add table catagories  -
-- enum for gender    -
-- material name = title  -
-- material types = categoryid  -
-- photo to imageurl         -
-- floor name to level add employee id -
-- inside floor store material category-
-- section name = title add emplyeeid -
-- worker id = employeeid -