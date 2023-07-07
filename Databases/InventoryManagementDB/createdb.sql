DROP DATABASE IF EXISTS CorporateDB;

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
                        supervisorid INT NOT NULL,
                        CONSTRAINT fk_supervisor_id5 FOREIGN KEY (supervisorid) REFERENCES employees(id) ON UPDATE CASCADE ON DELETE CASCADE,
                        status ENUM('inprogress', 'initiated' ,'Ready To Dispatch', 'Picked','In Transit','Delivered', 'Cancelled') NOT NULL);


                    
CREATE TABLE orderdetails(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                            storemanagerid INT NOT NULL,CONSTRAINT fk_employee_id FOREIGN KEY (storemanagerid) REFERENCES employees(id) ON UPDATE CASCADE ON DELETE CASCADE,
                            materialid INT NOT NULL,CONSTRAINT fk_materialid FOREIGN KEY (materialid) REFERENCES materials(id) ON UPDATE CASCADE ON DELETE CASCADE,
                            requestid INT NOT NULL,CONSTRAINT fk_requestid FOREIGN KEY (requestid) REFERENCES requests(id) ON UPDATE CASCADE ON DELETE CASCADE ,
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
                            supervisorid INT NOT NULL,CONSTRAINT fk_employee_id6 FOREIGN KEY (supervisorid) REFERENCES employees(id) ON UPDATE CASCADE ON DELETE CASCADE,
                        requestid INT NOT NULL,CONSTRAINT fk_request_id FOREIGN KEY (requestid) REFERENCES requests(id) ON UPDATE CASCADE ON DELETE CASCADE, 
                        shipperid INT NOT NULL, CONSTRAINT fk_shipperid FOREIGN KEY (shipperid) REFERENCES employees(id) ON UPDATE CASCADE ON DELETE CASCADE);


CREATE TABLE shippingdetails(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                            storemanagerid INT NOT NULL,CONSTRAINT fk_employee_id7 FOREIGN KEY (storemanagerid) REFERENCES employees(id) ON UPDATE CASCADE ON DELETE CASCADE,
                            materialid INT NOT NULL,CONSTRAINT fk_materialid_4 FOREIGN KEY (materialid) REFERENCES materials(id) ON UPDATE CASCADE ON DELETE CASCADE,
                            categoryid INT NOT NULL, constraint fk_categoryid_5 FOREIGN KEY(categoryid) REFERENCES categories(id) on UPDATE cascade on delete cascade,
                            shipmentid INT NOT NULL, constraint fk_shipmentid FOREIGN KEY(shipmentid) REFERENCES shipments(id) on UPDATE cascade on delete cascade,
                            status boolean DEFAULT false,
                            quantity INT NOT NULL);
                            
