
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
                        userid int NOT NULL UNIQUE,
                        departmentid  int not null, constraint fk_departmentid foreign key(departmentid) references departments(id) on update cascade on delete cascade,
                        roleid int not null,constraint fk_roleid foreign key(roleid) references roles(id) on update cascade on delete cascade,
                        imageurl varchar(50));
    
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
                        status ENUM('inprogress', 'initiated' ,'Ready To Dispatch', 'Picked','In Transit','Delivered', 'Cancelled') NOT NULL);


                    
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
                            status boolean DEFAULT false,
                            quantity INT NOT NULL);
                