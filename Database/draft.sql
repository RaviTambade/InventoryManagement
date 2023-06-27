-- Active: 1678859769284@@127.0.0.1@3306@inventorymanagement
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
							departmentid  int not null,
                            constraint fk_departmentid foreign key(departmentid) references departments(id) on update cascade on delete cascade,
							roleid int not null,constraint fk_roleid foreign key(roleid) references roles(id) on update cascade on delete cascade);
		
	create table workerstatus(id INT NOT NULL AUTO_INCREMENT primary KEY,
							workerid INT NOT NULL,constraint fk_workerid foreign key(workerid) references employees(id) on update cascade on delete cascade,
                            status boolean not null default 0);

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


	CREATE TABLE orders(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
						date DATETIME DEFAULT CURRENT_TIMESTAMP,
						requestid INT NOT NULL, constraint fk_reqid FOREIGN KEY(requestid) REFERENCES requests(id) on UPDATE cascade on delete cascade,
-- 						orderdetailid INT NOT NULL,CONSTRAINT fk_orderdetailsid FOREIGN KEY (orderdetailid) REFERENCES orderdetails(id) ON UPDATE CASCADE ON DELETE CASCADE ,
						supervisorid INT NOT NULL,CONSTRAINT fk_employees_id FOREIGN KEY (supervisorid) REFERENCES employees(id) ON UPDATE CASCADE ON DELETE CASCADE ,
						status ENUM('inprogress', 'initiated','delivered','cancelled') NOT NULL);
                        
	CREATE TABLE orderdetails(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
								storemanagerid INT NOT NULL,CONSTRAINT fk_employee_id FOREIGN KEY (storemanagerid) REFERENCES employees(id) ON UPDATE CASCADE ON DELETE CASCADE,
								materialid INT NOT NULL,CONSTRAINT fk_materialid FOREIGN KEY (materialid) REFERENCES materials(id) ON UPDATE CASCADE ON DELETE CASCADE,
                                orderid INT NOT NULL,CONSTRAINT fk_orderid FOREIGN KEY (orderid) REFERENCES orders(id) ON UPDATE CASCADE ON DELETE CASCADE ,
								categoryid INT NOT NULL, constraint fk_categoryid FOREIGN KEY(categoryid) REFERENCES categories(id) on UPDATE cascade on delete cascade,
								quantity INT NOT NULL);
                  

	CREATE TABLE carts(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
					   employeeid INT NOT NULL,
					   CONSTRAINT fk_employee_id4 FOREIGN KEY (employeeid) REFERENCES employees(id) ON UPDATE CASCADE ON DELETE CASCADE);



	CREATE TABLE cartitems(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
							cartid INT NOT NULL,
							CONSTRAINT fk_cartid FOREIGN KEY (cartid) REFERENCES carts(id)ON UPDATE CASCADE ON DELETE CASCADE,
							materialid INT NOT NULL,CONSTRAINT fk_material_id4 FOREIGN KEY (materialid) REFERENCES materials(id) ON UPDATE CASCADE ON DELETE CASCADE,
							categoryid INT NOT NULL, constraint fk_categoryid2 FOREIGN KEY(categoryid) REFERENCES categories(id) on UPDATE cascade on delete cascade,
							quantity INT NOT NULL ); 


                               
CREATE TABLE shipments(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
						     date DATETIME DEFAULT CURRENT_TIMESTAMP,
							 supervisorid INT NOT NULL,
--                              shippingdetailsid INT NOT NULL,CONSTRAINT fk_shipmentdetails_id FOREIGN KEY (shippingdetailsid) REFERENCES shippingdetails(id) ON UPDATE CASCADE ON DELETE CASCADE,
					        CONSTRAINT fk_employee_id6 FOREIGN KEY (supervisorid) REFERENCES employees(id) ON UPDATE CASCADE ON DELETE CASCADE,
                            orderid INT NOT NULL,CONSTRAINT fk_order_id FOREIGN KEY (orderid) REFERENCES orders(id) ON UPDATE CASCADE ON DELETE CASCADE, 
							shipperid INT NOT NULL, CONSTRAINT fk_shipperid FOREIGN KEY (shipperid) REFERENCES employees(id) ON UPDATE CASCADE ON DELETE CASCADE,
							status ENUM('Pending', 'Ready To Dispatch', 'Picked','In Transit','Delivered', 'Cancelled') NOT NULL);


	CREATE TABLE shippingdetails(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
								storemanagerid INT NOT NULL,CONSTRAINT fk_employee_id7 FOREIGN KEY (storemanagerid) REFERENCES employees(id) ON UPDATE CASCADE ON DELETE CASCADE,
								materialid INT NOT NULL,CONSTRAINT fk_materialid_4 FOREIGN KEY (materialid) REFERENCES materials(id) ON UPDATE CASCADE ON DELETE CASCADE,
								categoryid INT NOT NULL, constraint fk_categoryid_5 FOREIGN KEY(categoryid) REFERENCES categories(id) on UPDATE cascade on delete cascade,
								shipmentid INT NOT NULL, constraint fk_shipmentid FOREIGN KEY(shipmentid) REFERENCES shipments(id) on UPDATE cascade on delete cascade,
								quantity INT NOT NULL);
                                

       DELIMITER $$
CREATE PROCEDURE CreateOrder(in cartId int)
BEGIN
DECLARE employeeId INT;
DECLARE materialId INT;
DECLARE categoryId INT;
DECLARE quantity INT;
DECLARE requestId INT;
DECLARE status BOOLEAN;
DECLARE superviosrid INT;
DECLARE noMoreRow1 INT default 0;
DECLARE cart_cursor CURSOR  FOR SELECT  c.employeeid FROM carts c WHERE c.id=cartId; 
DECLARE cartitem_cursor CURSOR  FOR SELECT ct.materialid, ct.categoryid, ct.quantity FROM cartitems ct WHERE ct.cartid=cartId; 



INSERT INTO requests (employeeid,status) VALUES ((select c.employeeid from carts c where c.id=cartId ),'initiated');
set requestId=( SELECT id FROM requests ORDER BY ID DESC LIMIT 1);

OPEN cart_cursor ;
begin
DECLARE exit_flag INT DEFAULT 0;
 DECLARE CONTINUE HANDLER FOR SQLSTATE '02000' SET exit_flag = 1;
cart:LOOP
    FETCH cart_cursor INTO superviosrid;
    IF exit_flag THEN 
		LEAVE cart;
    END IF;
	INSERT INTO orders(supervisorid,requestid,status)VALUES(superviosrid,requestId,1); 
    end loop cart;
    end;
    close cart_cursor;
    
    OPEN cartitem_cursor ;
    begin
    DECLARE exit_flag INT DEFAULT 0;
     DECLARE CONTINUE HANDLER FOR SQLSTATE '02000' SET exit_flag = 1;
    cartitems:loop
    	FETCH cartitem_cursor INTO materialId,categoryId,quantity;
    IF exit_flag=1 THEN 
		LEAVE cartitems;
    END IF;
	INSERT INTO orderdetails(storemanagerid,orderid,materialid,categoryid,quantity)
    VALUES((select warehouse.employeeid from warehouse  where warehouse.categoryid=categoryId),(select id from orders where requestid=requestId  ORDER BY ID DESC LIMIT 1),materialId,categoryId,quantity); 
--  	INSERT INTO shippingdetails(storemanagerid,shipmentid,materialid,categoryid,quantity)VALUES(employeeId,new.shipments.id,materialId,categoryId,quantity); 

END LOOP cartitems;
end;
CLOSE cartitem_cursor;

 DELETE FROM cartitems c WHERE c.cartid=cartId;

END $$
DELIMITER ;
	DELIMITER $$
  

   DELIMITER !!
CREATE TRIGGER newshipment
after INSERT
ON orders FOR EACH ROW
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
		INSERT INTO shipments(supervisorid,orderid,shipperid,status)VALUES(new.supervisorid,new.id,worker,1);
	END !!
	DELIMITER ;
     

   DELIMITER !!
CREATE TRIGGER newshipmentdetails
after INSERT
ON orderdetails FOR EACH ROW
BEGIN
	INSERT INTO shippingdetails(storemanagerid,materialid,categoryid,quantity,shipmentid)
    VALUES(new.storemanagerid,new.materialid,new.categoryid,new.quantity,(select id from shipments s where s.orderid=new.orderid )); 
    end !!
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
	insert into
	    materials(
	        title,
	        categoryid,
	        quantity,
	        unitprice,
	        imageurl
	    )
	values (
	        'Needle Bearing',
	        1,
	        784,
	        20,
	        '/assets/img/Bearing.jpeg'
	    );
	insert into
	    materials(
	        title,
	        categoryid,
	        quantity,
	        unitprice,
	        imageurl
	    )
	values (
	        'Ball Bearing',
	        1,
	        800,
	        30,
	        '/assets/img/Bearing.jpeg'
	    );
	insert into
	    materials(
	        title,
	        categoryid,
	        quantity,
	        unitprice,
	        imageurl
	    )
	values (
	        'Bush Bearing',
	        1,
	        4500,
	        15,
	        '/assets/img/Bearing.jpeg'
	    );
	insert into
	    materials(
	        title,
	        categoryid,
	        quantity,
	        unitprice,
	        imageurl
	    )
	values (
	        '2nd Gear of ratio 3.4',
	        3,
	        450,
	        85,
	        '/assets/img/2gear.jpeg'
	    );
	insert into
	    materials(
	        title,
	        categoryid,
	        quantity,
	        unitprice,
	        imageurl
	    )
	values (
	        '2nd Gear of ratio 3.6',
	        3,
	        400,
	        85,
	        '/assets/img/2gear.jpeg'
	    );
	insert into
	    materials(
	        title,
	        categoryid,
	        quantity,
	        unitprice,
	        imageurl
	    )
	values (
	        '2nd Gear of ratio 4.2',
	        3,
	        800,
	        85,
	        '/assets/img/2gear.jpeg'
	    );
	insert into
	    materials(
	        title,
	        categoryid,
	        quantity,
	        unitprice,
	        imageurl
	    )
	values (
	        '1st Gear of ratio 8.81',
	        2,
	        450,
	        90,
	        '/assets/img/1gear.jpeg'
	    );
	insert into
	    materials(
	        title,
	        categoryid,
	        quantity,
	        unitprice,
	        imageurl
	    )
	values (
	        '1st Gear of ratio 9.23',
	        2,
	        400,
	        90,
	        '/assets/img/1gear.jpeg'
	    );
	insert into
	    materials(
	        title,
	        categoryid,
	        quantity,
	        unitprice,
	        imageurl
	    )
	values (
	        '1st Gear of ratio 7.72',
	        2,
	        800,
	        90,
	        '/assets/img/1gear.jpeg'
	    );
	insert into
	    materials(
	        title,
	        categoryid,
	        quantity,
	        unitprice,
	        imageurl
	    )
	values (
	        '3rd Gear of ratio 3.4',
	        4,
	        450,
	        85,
	        '/assets/img/3gear.jpeg'
	    );
	insert into
	    materials(
	        title,
	        categoryid,
	        quantity,
	        unitprice,
	        imageurl
	    )
	values (
	        '3rd Gear of ratio 3.6',
	        4,
	        400,
	        85,
	        '/assets/img/3gear.jpeg'
	    );
	insert into
	    materials(
	        title,
	        categoryid,
	        quantity,
	        unitprice,
	        imageurl
	    )
	values (
	        '3rd Gear of ratio 4.2',
	        4,
	        0,
	        85,
	        '/assets/img/3gear.jpeg'
	    );
	insert into
	    materials(
	        title,
	        categoryid,
	        quantity,
	        unitprice,
	        imageurl
	    )
	values (
	        'Reverse Gear of ratio 3.4',
	        5,
	        450,
	        85,
	        '/assets/img/Rgear.jpeg'
	    );
	insert into
	    materials(
	        title,
	        categoryid,
	        quantity,
	        unitprice,
	        imageurl
	    )
	values (
	        'Reverse Gear of ratio 3.6',
	        5,
	        400,
	        85,
	        '/assets/img/Rgear.jpeg'
	    );
	insert into
	    materials(
	        title,
	        categoryid,
	        quantity,
	        unitprice,
	        imageurl
	    )
	values (
	        'Reverse Gear of ratio 4.2',
	        5,
	        800,
	        85,
	        '/assets/img/Rgear.jpeg'
	    );
	insert into
	    materials(
	        title,
	        categoryid,
	        quantity,
	        unitprice,
	        imageurl
	    )
	values (
	        'GB500 Main Shaft',
	        6,
	        0,
	        200,
	        '/assets/img/ms.jpeg'
	    );
	insert into
	    materials(
	        title,
	        categoryid,
	        quantity,
	        unitprice,
	        imageurl
	    )
	values (
	        'GB400 Main Shaft',
	        6,
	        87,
	        250,
	        '/assets/img/ms.jpeg'
	    );
	insert into
	    materials(
	        title,
	        categoryid,
	        quantity,
	        unitprice,
	        imageurl
	    )
	values (
	        'GB540 Main Shaft',
	        6,
	        79,
	        400,
	        '/assets/img/ms.jpeg'
	    );
	insert into
	    materials(
	        title,
	        categoryid,
	        quantity,
	        unitprice,
	        imageurl
	    )
	values (
	        'GB500 Counter Shaft',
	        7,
	        80,
	        450,
	        '/assets/img/cs.jpeg'
	    );
	insert into
	    materials(
	        title,
	        categoryid,
	        quantity,
	        unitprice,
	        imageurl
	    )
	values (
	        'GB400 Counter Shaft',
	        7,
	        89,
	        200,
	        '/assets/img/cs.jpeg'
	    );
	insert into
	    materials(
	        title,
	        categoryid,
	        quantity,
	        unitprice,
	        imageurl
	    )
	values (
	        'Gb540 Counter Shaft',
	        7,
	        0,
	        500,
	        '/assets/img/cs.jpeg'
	    );
	insert into
	    materials(
	        title,
	        categoryid,
	        quantity,
	        unitprice,
	        imageurl
	    )
	values (
	        'GB500 Housing',
	        8,
	        50,
	        2000,
	        '/assets/img/housing.jpeg'
	    );
	insert into
	    materials(
	        title,
	        categoryid,
	        quantity,
	        unitprice,
	        imageurl
	    )
	values (
	        'GB400 Housing',
	        8,
	        8,
	        2500,
	        '/assets/img/housing.jpeg'
	    );
	insert into
	    materials(
	        title,
	        categoryid,
	        quantity,
	        unitprice,
	        imageurl
	    )
	values (
	        'Gb540 Housing',
	        8,
	        0,
	        3500,
	        '/assets/img/housing.jpeg'
	    );
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
	INSERT INTO
	    employees(
	        firstname,
	        lastname,
	        birthdate,
	        hiredate,
	        contactnumber,
	        departmentid,
	        roleid,
	        email,
	        password,
	        imageurl,
	        gender
	    )
	VALUES (
	        'Sahil',
	        'Mankar',
	        '1997-05-19',
	        '2021-07-07',
	        '8756789158',
	        2,
	        2,
	        'Sahil22@gmail.com',
	        'SM569654',
	        '/assets/img/mEmp.jpeg',
	        'male'
	    );
	INSERT INTO
	    employees(
	        firstname,
	        lastname,
	        birthdate,
	        hiredate,
	        contactnumber,
	        departmentid,
	        roleid,
	        email,
	        password,
	        imageurl,
	        gender
	    )
	VALUES (
	        'Rahul',
	        'Desai',
	        '1995-08-11',
	        '2021-08-04',
	        '9856789157',
	        2,
	        2,
	        'RD@gmail.com',
	        'RD854466',
	        '/assets/img/mEmp.jpeg',
	        'male'
	    );
	INSERT INTO
	    employees(
	        firstname,
	        lastname,
	        birthdate,
	        hiredate,
	        contactnumber,
	        departmentid,
	        roleid,
	        email,
	        password,
	        imageurl,
	        gender
	    )
	VALUES (
	        'Siddhesh',
	        'Pandit',
	        '1996-01-02',
	        '2021-09-12',
	        '7845967845',
	        2,
	        2,
	        'SP@gmail.com',
	        'SP789956',
	        '/assets/img/mEmp.jpeg',
	        'male'
	    );
	INSERT INTO
	    employees(
	        firstname,
	        lastname,
	        birthdate,
	        hiredate,
	        contactnumber,
	        departmentid,
	        roleid,
	        email,
	        password,
	        imageurl,
	        gender
	    )
	VALUES (
	        'Tejaswini',
	        'Salvi',
	        '1992-11-19',
	        '2020-09-01',
	        '9888754415',
	        2,
	        2,
	        'TS22@gmail.com',
	        'TS337845',
	        '/assets/img/fEmp.jpeg',
	        'female'
	    );
	INSERT INTO
	    employees(
	        firstname,
	        lastname,
	        birthdate,
	        hiredate,
	        contactnumber,
	        departmentid,
	        roleid,
	        email,
	        password,
	        imageurl,
	        gender
	    )
	VALUES (
	        'samiksha',
	        'raut',
	        '1992-11-19',
	        '2020-09-01',
	        '7844726596',
	        2,
	        2,
	        'TS22@gmail.com',
	        'TS337845',
	        '/assets/img/fEmp.jpeg',
	        'female'
	    );
	INSERT INTO
	    employees(
	        firstname,
	        lastname,
	        birthdate,
	        hiredate,
	        contactnumber,
	        departmentid,
	        roleid,
	        email,
	        password,
	        imageurl,
	        gender
	    )
	VALUES (
	        'Vedant',
	        'Yadav',
	        '1987-01-07',
	        '2009-03-11',
	        '99887564123',
	        2,
	        2,
	        'VY@gmail.com',
	        'VY788814',
	        '/assets/img/mEmp.jpeg',
	        'male'
	    );
	INSERT INTO
	    employees(
	        firstname,
	        lastname,
	        birthdate,
	        hiredate,
	        contactnumber,
	        departmentid,
	        roleid,
	        email,
	        password,
	        imageurl,
	        gender
	    )
	VALUES (
	        'sameer',
	        'jadhav',
	        '1999-05-12',
	        '2018-03-11',
	        '8455786547',
	        2,
	        2,
	        'SM@gmail.com',
	        'VY788815',
	        '/assets/img/mEmp.jpeg',
	        'male'
	    );
	INSERT INTO
	    employees(
	        firstname,
	        lastname,
	        birthdate,
	        hiredate,
	        contactnumber,
	        departmentid,
	        roleid,
	        email,
	        password,
	        imageurl,
	        gender
	    )
	VALUES (
	        'kalpesh',
	        'joshi',
	        '1998-01-14',
	        '2018-03-11',
	        '9987458745',
	        2,
	        2,
	        'KJgmail.com',
	        'KG788816',
	        '/assets/img/mEmp.jpeg',
	        'male'
	    );
	INSERT INTO
	    employees(
	        firstname,
	        lastname,
	        birthdate,
	        hiredate,
	        contactnumber,
	        departmentid,
	        roleid,
	        email,
	        password,
	        imageurl,
	        gender
	    )
	VALUES (
	        'suraj',
	        'Yadav',
	        '1998-02-07',
	        '2018-03-11',
	        '8755469321',
	        3,
	        3,
	        'SY@gmail.com',
	        'SY88817',
	        '/assets/img/mEmp.jpeg',
	        'male'
	    );
	INSERT INTO
	    employees(
	        firstname,
	        lastname,
	        birthdate,
	        hiredate,
	        contactnumber,
	        departmentid,
	        roleid,
	        email,
	        password,
	        imageurl,
	        gender
	    )
	VALUES (
	        'manoj',
	        'sharma',
	        '1998-04-20',
	        '2018-03-11',
	        '9766132597',
	        3,
	        3,
	        'MS@gmail.com',
	        'MS788818',
	        '/assets/img/mEmp.jpeg',
	        'male'
	    );
	INSERT INTO
	    employees(
	        firstname,
	        lastname,
	        birthdate,
	        hiredate,
	        contactnumber,
	        departmentid,
	        roleid,
	        email,
	        password,
	        imageurl,
	        gender
	    )
	VALUES (
	        'sahil',
	        'dhumak',
	        '1998-08-14',
	        '2018-03-11',
	        '9877452163',
	        4,
	        3,
	        'SDgmail.com',
	        'SD788819',
	        '/assets/img/mEmp.jpeg',
	        'male'
	    );
	INSERT INTO
	    employees(
	        firstname,
	        lastname,
	        birthdate,
	        hiredate,
	        contactnumber,
	        departmentid,
	        roleid,
	        email,
	        password,
	        imageurl,
	        gender
	    )
	VALUES (
	        'siddhesh',
	        'pandit',
	        '1998-11-22',
	        '2018-03-11',
	        '9987554412',
	        4,
	        3,
	        'VSPgmail.com',
	        'VSP788810',
	        '/assets/img/mEmp.jpeg',
	        'male'
	    );
	INSERT INTO
	    employees(
	        firstname,
	        lastname,
	        birthdate,
	        hiredate,
	        contactnumber,
	        departmentid,
	        roleid,
	        email,
	        password,
	        imageurl,
	        gender
	    )
	VALUES (
	        'shankar',
	        'kambale',
	        '1998-10-26',
	        '2018-03-11',
	        '7877455512',
	        5,
	        3,
	        'SK@gmail.com',
	        'SK788811',
	        '/assets/img/mEmp.jpeg',
	        'male'
	    );
	INSERT INTO
	    employees(
	        firstname,
	        lastname,
	        birthdate,
	        hiredate,
	        contactnumber,
	        departmentid,
	        roleid,
	        email,
	        password,
	        imageurl,
	        gender
	    )
	VALUES (
	        'sumit',
	        'malap',
	        '1998-01-02',
	        '2018-03-11',
	        '9989745624',
	        5,
	        3,
	        'SM@gmail.com',
	        'SM788812',
	        '/assets/img/mEmp.jpeg',
	        'male'
	    );
	INSERT INTO
	    employees(
	        firstname,
	        lastname,
	        birthdate,
	        hiredate,
	        contactnumber,
	        departmentid,
	        roleid,
	        email,
	        password,
	        imageurl,
	        gender
	    )
	VALUES (
	        'shubham',
	        'ghanekar',
	        '1998-03-22',
	        '2018-03-11',
	        '8955746251',
	        6,
	        4,
	        'SGgmail.com',
	        'SG788813',
	        '/assets/img/mEmp.jpeg',
	        'male'
	    );
	INSERT INTO
	    employees(
	        firstname,
	        lastname,
	        birthdate,
	        hiredate,
	        contactnumber,
	        departmentid,
	        roleid,
	        email,
	        password,
	        imageurl,
	        gender
	    )
	VALUES (
	        'vinaya',
	        'satpute',
	        '1997-01-01',
	        '2018-03-11',
	        '9287994765',
	        6,
	        4,
	        'VS@gmail.com',
	        'VS7888122',
	        '/assets/img/fEmp.jpeg',
	        'female'
	    );
	INSERT INTO
	    employees(
	        firstname,
	        lastname,
	        birthdate,
	        hiredate,
	        contactnumber,
	        departmentid,
	        roleid,
	        email,
	        password,
	        imageurl,
	        gender
	    )
	VALUES (
	        'shivam',
	        'kelkar',
	        '1999-03-22',
	        '2018-03-11',
	        '9955746251',
	        6,
	        4,
	        'Skgmail.com',
	        'SG788813',
	        '/assets/img/mEmp.jpeg',
	        'male'
	    );
	INSERT INTO
	    employees(
	        firstname,
	        lastname,
	        birthdate,
	        hiredate,
	        contactnumber,
	        departmentid,
	        roleid,
	        email,
	        password,
	        imageurl,
	        gender
	    )
	VALUES (
	        'tejas',
	        'khapre',
	        '1998-07-02',
	        '2018-03-11',
	        '977994765',
	        6,
	        4,
	        'TK@gmail.com',
	        'VS7888122',
	        '/assets/img/fEmp.jpeg',
	        'male'
	    );
	INSERT INTO
	    employees(
	        firstname,
	        lastname,
	        birthdate,
	        hiredate,
	        contactnumber,
	        departmentid,
	        roleid,
	        email,
	        password,
	        imageurl,
	        gender
	    )
	VALUES (
	        'sanket',
	        'rewale',
	        '1998-11-25',
	        '2018-03-11',
	        '7855746251',
	        6,
	        4,
	        'SRgmail.com',
	        'SG788813',
	        '/assets/img/mEmp.jpeg',
	        'male'
	    );
	INSERT INTO
	    employees(
	        firstname,
	        lastname,
	        birthdate,
	        hiredate,
	        contactnumber,
	        departmentid,
	        roleid,
	        email,
	        password,
	        imageurl,
	        gender
	    )
	VALUES (
	        'aditya',
	        'rawnag',
	        '1999-11-16',
	        '2018-03-11',
	        '7787994765',
	        6,
	        4,
	        'AR@gmail.com',
	        'VS7888122',
	        '/assets/img/fEmp.jpeg',
	        'male'
	    );
	INSERT INTO
	    employees(
	        firstname,
	        lastname,
	        birthdate,
	        hiredate,
	        contactnumber,
	        departmentid,
	        roleid,
	        email,
	        password,
	        imageurl,
	        gender
	    )
	VALUES (
	        'rohit',
	        'ghanekar',
	        '1995-05-12',
	        '2018-03-11',
	        '7455746251',
	        6,
	        4,
	        'SGgmail.com',
	        'SG788813',
	        '/assets/img/mEmp.jpeg',
	        'male'
	    );
	INSERT INTO
	    employees(
	        firstname,
	        lastname,
	        birthdate,
	        hiredate,
	        contactnumber,
	        departmentid,
	        roleid,
	        email,
	        password,
	        imageurl,
	        gender
	    )
	VALUES (
	        'tejas',
	        'harekar',
	        '1994-09-23',
	        '2018-03-11',
	        '7487994765',
	        6,
	        4,
	        'VS@gmail.com',
	        'VS7888122',
	        '/assets/img/fEmp.jpeg',
	        'male'
	    );
	INSERT INTO
	    employees(
	        firstname,
	        lastname,
	        birthdate,
	        hiredate,
	        contactnumber,
	        departmentid,
	        roleid,
	        email,
	        password,
	        imageurl,
	        gender
	    )
	VALUES (
	        'abhi',
	        'horambe',
	        '1996-07-14',
	        '2018-03-11',
	        '7955746251',
	        6,
	        4,
	        'SGgmail.com',
	        'SG788813',
	        '/assets/img/mEmp.jpeg',
	        'male'
	    );
	INSERT INTO
	    employees(
	        firstname,
	        lastname,
	        birthdate,
	        hiredate,
	        contactnumber,
	        departmentid,
	        roleid,
	        email,
	        password,
	        imageurl,
	        gender
	    )
	VALUES (
	        'shila',
	        'joshi',
	        '1998-01-06',
	        '2018-03-11',
	        '9787994765',
	        6,
	        4,
	        'VS@gmail.com',
	        'VS7888122',
	        '/assets/img/fEmp.jpeg',
	        'female'
	    );
	INSERT INTO workerstatus(workerid)VALUES(21);
	INSERT INTO workerstatus(workerid)VALUES(22);
	INSERT INTO workerstatus(workerid)VALUES(23);
	INSERT INTO workerstatus(workerid)VALUES(24);
	-- Insertion for Sections
	insert into
	    warehouse(
	        section,
	        categoryid,
	        employeeid
	    )
	values('Section 1', 1, 1);
	insert into
	    warehouse(
	        section,
	        categoryid,
	        employeeid
	    )
	values('Section 2', 2, 2);
	insert into
	    warehouse(
	        section,
	        categoryid,
	        employeeid
	    )
	values('Section 3', 3, 3);
	insert into
	    warehouse(
	        section,
	        categoryid,
	        employeeid
	    )
	values('Section 4', 4, 4);
	insert into
	    warehouse(
	        section,
	        categoryid,
	        employeeid
	    )
	values('Section 5', 5, 5);
	insert into
	    warehouse(
	        section,
	        categoryid,
	        employeeid
	    )
	values('Section 6', 6, 6);
	insert into
	    warehouse(
	        section,
	        categoryid,
	        employeeid
	    )
	values('Section 7', 7, 7);
	insert into
	    warehouse(
	        section,
	        categoryid,
	        employeeid
	    )
	values('Section 8', 8, 8);
	INSERT INTO carts(employeeid) VALUES (9);
	INSERT INTO carts(employeeid) VALUES (10);
	INSERT INTO carts(employeeid) VALUES (11);
	INSERT INTO carts(employeeid) VALUES (12);
	INSERT INTO carts(employeeid) VALUES (13);
	INSERT INTO carts(employeeid) VALUES (14);
	-- select * from carts;
	-- -- get cart items of supervisors by request id
	-- select cartitems.id, cartitems.cartid, carts.employeeid, cartitems.materialid, categories.category,cartitems.quantity  from cartitems inner join carts on cartitems.cartid=carts.id inner join categories on categories.id=cartitems.categoryid inner join requests on cartitems.requestid=requests.id where requests.id =3;
	-- -- get requests
	-- select * from requests where employeeid=12;
	-- select requests.id as requestid, cartitems.id, cartitems.cartid, carts.employeeid, cartitems.materialid, categories.category,cartitems.quantity
	-- from cartitems
	--  inner join carts on cartitems.cartid=carts.id
	--  inner join categories on categories.id=cartitems.categoryid
	--  inner join requests on cartitems.requestid= requests.id
	--  inner join employees on requests.employeeid=employees.id where employees.id=12;
	-- -- add to cart
	-- insert into cartitems( cartid,materialid,categoryid,quantity) values ((select id from carts where employeeid=12),1, (select id from categories where category='Counter Shaft'),12) ;
	-- -- get cartitems of employee
	-- insert into cartitems( cartid,categoryid,materialid,quantity) values ((select id from carts where employeeid=12),(select id from categories where category='Bearings'),2,23);
	-- -- remove item from cart
	-- DELETE FROM cartitems WHERE id=16;
	-- -- get material by id
	-- select materials.id, materials.title, materials.quantity, materials.unitprice, materials.imageurl, categories.category from materials inner join categories on categories.id =materials.categoryid where materials.id = 5;
	--  -- get all materials
	--  select materials.id, materials.title, materials.quantity, materials.unitprice, materials.imageurl, categories.category  from materials inner join categories on categories.id =materials.categoryid;
	-- -- get material by category
	-- select materials.id, materials.title, materials.quantity, materials.unitprice, materials.imageurl, categories.category from materials inner join categories on categories.id =materials.categoryid where materials.categoryid =7;
	-- -- employees and their role and department
	-- select   employees.id, employees.birthdate, employees.hiredate, employees.firstname, employees.lastname, employees.email,employees.contactnumber, employees.gender, employees.imageurl, departments.department, roles.role from employees  inner join departments on employees.departmentid=departments.id   inner join roles on employees.roleid=roles.id where employees.gender ='male';
	-- -- get employee by id
	-- select  employees.id, employees.birthdate, employees.hiredate, employees.firstname, employees.lastname, employees.email,employees.contactnumber, employees.imageurl, employees.gender ,departments.department, roles.role   from employees   inner join departments on employees.departmentid=departments.id  inner join roles on employees.roleid=roles.id  where employees.id = 2;
	-- -- get orders from date - to date
	-- select orders.id, employees.firstname,employees.lastname, orders.date, orders.status, materials.id, materials.title, categories.category, orderdetails.quantity
	-- from orders
	-- inner join materials on orders.orderdetailid = materials.id
	-- inner join employees on orderdetails.employeeid  = employees.id
	-- inner join categories on categories.id = materials.categoryid
	-- inner join orderdetails on orders.orderdetailid = orderdetails.id  WHERE (date BETWEEN '2023-03-01' AND '2023-05-05' );
	-- -- get all orders
	-- select orders.id, employees.firstname,employees.lastname, orders.date, orders.status, materials.id, materials.title, categories.category, orderdetails.quantity from orders inner join materials on orders.orderdetailid = materials.id  inner join employees on employees.id = orders.employeeid   inner join categories on categories.id = materials.categoryid  inner join orderdetails on orders.orderdetailid = orderdetails.id;
	-- -- get orders ordered today
	-- select orders.id,employees.firstname,employees.lastname, materials.id, materials.title, categories.category, orderdetails.quantity, orders.status  from orders  inner join materials on orders.orderdetailid = materials.id inner join categories on materials.categoryid = categories.id inner join employees on employees.id = orders.employeeid  inner join orderdetails on orders.orderdetailid=orderdetails.id WHERE orders.date >= CAST(CURRENT_TIMESTAMP AS date);
	-- -- out of stock material
	-- select  materials.id, materials.title, materials.quantity, materials.unitprice, materials.imageurl, categories.category from materials inner join categories on categories.id =materials.categoryid  where quantity = 0
	-- ;
	-- -- order history
	-- select orders.id,employees.firstname,employees.lastname,orders.date, materials.id, materials.title, categories.category, orderdetails.quantity, orders.status  from orders  inner join materials on orders.orderdetailid = materials.id inner join categories on materials.categoryid = categories.id inner join employees on employees.id = orders.employeeid  inner join orderdetails on orders.orderdetailid=orderdetails.id where orders.id =2
	-- ;
	-- select orders.id, employees.firstname,employees.lastname, orders.date, orders.status, materials.id as materialid, materials.title, categories.category, orderdetails.quantity
	-- from orders
	-- inner join materials on orders.orderdetailid = materials.id
	-- inner join employees on employees.id = orders.employeeid   inner join categories on categories.id = materials.categoryid
	--  inner join orderdetails on orders.orderdetailid = orderdetails.id  WHERE (date between'2022-06-01' and '2023-06-06'  );
	-- select * from orders;
	-- select  warehouse.section,  categories.category, materials.title as materialname, materials.quantity, employees.id
	-- FROM warehouse  INNER JOIN materials ON  materials.categoryid=warehouse.categoryid  inner join categories on warehouse.categoryid = categories.id inner join employees on employees.id=warehouse.employeeid where materials.id=8;
	-- -- order history
	-- select * from orders,orderdetails;
	--  -- order history of supervisors
	--  select orderdetails.id, orders.date,orders.status, orderdetails.quantity, materials.title, categories.category from orders inner join orderdetails on orders.orderdetailid = orderdetails.id inner join materials on orderdetails.materialid=materials.id inner join categories on materials.categoryid=categories.id inner join employees on orderdetails.employeeid = employees.id where employees.id =12;
	-- select orders.id,employees.firstname,employees.lastname, materials.id, materials.title, categories.category, orderdetails.quantity, orders.status
	-- from orders
	--  inner join materials on orders.orderdetailid = materials.id
	--  inner join categories on materials.categoryid = categories.id
	--  inner join employees on employees.id = orders.employeeid
	--  inner join orderdetails on orders.orderdetailid=orderdetails.id WHERE orders.date >= CAST(CURRENT_TIMESTAMP AS date);
	-- select * from orders;
	-- insert into orderdetails(employeeid,materialid,quantity,categoryid)values(14,22,77,(select id from categories where category='Counter Shaft'))
	-- select * from orders ;
	-- select * from orderdetails;
	-- 	select orders.id,orders.date, materials.id as materialid, materials.title, categories.category, orderdetails.quantity, orders.status
	--     from orders  inner join materials on orders.orderdetailid = materials.id
	--     inner join categories on materials.categoryid = categories.id
	--     inner join employees on employees.id = orders.employeeid
	--     inner join orderdetails on orders.orderdetailid=orderdetails.id where orders.id = 25;
	-- insert into orderdetails(employeeid,materialid,quantity,categoryid)values(14,22,77,(select id from categories where category='Counter Shaft'))
	-- ;
	-- 	INSERT INTO cartitems(cartid,materialid,categoryid,quantity) VALUES (2,1,1,7);
	-- delete from requests where id=1;
	-- select orders.id, orders.date,orders.status, orderdetails.quantity, materials.title, categories.category
	--  from orders
	--  inner join orderdetails on orders.orderdetailid = orderdetails.id
	--  inner join materials on orderdetails.materialid=materials.id
	--  inner join categories on materials.categoryid=categories.id
	--  inner join employees on orderdetails.employeeid = employees.id where employees.id =12;
	--     select * from requests;
	--     select * from orders;
	--      select * from orderdetails;
	-- select orders.id, orders.date,orders.status, orderdetails.quantity,materials.title, categories.category,departments.department,employees.firstname, employees.lastname
	--  from orders
	--  inner join orderdetails on orders.orderdetailid = orderdetails.id
	--  inner join materials on orderdetails.materialid=materials.id
	--  inner join categories on materials.categoryid=categories.id
	--  inner join employees on orderdetails.employeeid = employees.id
	--  inner join departments on departments.id= employees.departmentid
	--  inner join employees e2 on orders.employeeid = e2.id where  orders.id=36;
	-- select requests.*
	-- from requests
	-- inner join  (SELECT  d.requestid FROM orderdetails d GROUP BY d.requestid) as  r  on d.requestid=r.id
	-- inner join orders o on orderdetails.id= o.orderdetailid
	-- inner join employees e on o.employeeid=e.id where e.id=6;
	-- SELECT DISTINCT C.requestid from orderdetails C inner join orders o on C.id= o.orderdetailid inner join employees e on o.employeeid=e.id where e.id=1;
	-- select orders.id, orders.date,orders.status,orderdetails.materialid,materials.quantity as availablequntity, orderdetails.quantity,materials.title, categories.category,departments.department,employees.firstname, employees.lastname,materials.imageurl
	-- from orders
	--  inner join orderdetails on orders.orderdetailid = orderdetails.id
	--  inner join materials on materials.id = orderdetails.materialid
	--  inner join employees on orderdetails.employeeid = employees.id
	--  inner join categories on categories.id = materials.categoryid
	--  inner join departments on departments.id= employees.departmentid
	--  inner join requests on requests.id = orderdetails.requestid where  requestid=24;
	-- select orders.id, orders.date,orders.status, orderdetails.quantity,materials.title, categories.category,departments.department,employees.firstname, employees.lastname,materials.imageurl
	-- from orders
	-- inner join orderdetails on orders.orderdetailid = orderdetails.id
	--  inner join materials on orderdetails.materialid=materials.id
	--  inner join categories on materials.categoryid=categories.id
	--  inner join employees on orderdetails.employeeid = employees.id
	--  inner join departments on departments.id= employees.departmentid
	--  inner join requests  on orderdetails.requestid = requests.id where requests.id=24;
	--     select * from requests;
	--     select * from orders ;
	--      select * from orderdetails;

       DELIMITER $$
CREATE PROCEDURE CreateOrder(in cartId int)
BEGIN
DECLARE employeeId INT;
DECLARE materialId INT;
DECLARE categoryId INT;
DECLARE quantity INT;
DECLARE requestId INT;
DECLARE status BOOLEAN;
DECLARE superviosrid INT;
DECLARE noMoreRow1 INT default 0;
DECLARE cart_cursor CURSOR  FOR SELECT  c.employeeid FROM carts c WHERE c.id=cartId; 
DECLARE cartitem_cursor CURSOR  FOR SELECT ct.materialid, ct.categoryid, ct.quantity FROM cartitems ct WHERE ct.cartid=cartId; 



INSERT INTO requests (employeeid,status) VALUES ((select c.employeeid from carts c where c.id=cartId ),'initiated');
set requestId=( SELECT id FROM requests ORDER BY ID DESC LIMIT 1);

OPEN cart_cursor ;
begin
DECLARE exit_flag INT DEFAULT 0;
 DECLARE CONTINUE HANDLER FOR SQLSTATE '02000' SET exit_flag = 1;
cart:LOOP
    FETCH cart_cursor INTO superviosrid;
    IF exit_flag THEN 
		LEAVE cart;
    END IF;
	INSERT INTO orders(supervisorid,requestid,status)VALUES(superviosrid,requestId,1); 
    end loop cart;
    end;
    close cart_cursor;
    
    OPEN cartitem_cursor ;
    begin
    DECLARE exit_flag INT DEFAULT 0;
     DECLARE CONTINUE HANDLER FOR SQLSTATE '02000' SET exit_flag = 1;
    cartitems:loop
    	FETCH cartitem_cursor INTO materialId,categoryId,quantity;
    IF exit_flag=1 THEN 
		LEAVE cartitems;
    END IF;
	INSERT INTO orderdetails(storemanagerid,orderid,materialid,categoryid,quantity)
    VALUES((select warehouse.employeeid from warehouse  where warehouse.categoryid=categoryId),(select id from orders where requestid=requestId  ORDER BY ID DESC LIMIT 1),materialId,categoryId,quantity); 
--  	INSERT INTO shippingdetails(storemanagerid,shipmentid,materialid,categoryid,quantity)VALUES(employeeId,new.shipments.id,materialId,categoryId,quantity); 

END LOOP cartitems;
end;
CLOSE cartitem_cursor;

 DELETE FROM cartitems c WHERE c.cartid=cartId;

END $$
DELIMITER ;
	DELIMITER $$
  

   DELIMITER !!
CREATE TRIGGER newshipment
after INSERT
ON orders FOR EACH ROW
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
		INSERT INTO shipments(supervisorid,orderid,shipperid,status)VALUES(new.supervisorid,new.id,worker,1);
	END !!
	DELIMITER ;