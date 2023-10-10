
	
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


--  get count of requests of particular supervisorid (todays,yesterdays,week,month)
        DELIMITER $$
CREATE PROCEDURE GetrequestsByDate
(
    IN supervisorId INT,
    IN given_date DATE,
    OUT todaysRequests INT,
    OUT yesterdaysRequests INT,
    OUT weekRequests INT,
    OUT monthRequests INT
)
BEGIN
    SELECT count(*) INTO todaysRequests
    FROM materialrequests
    WHERE DATE(date) = given_date and supervisorid=supervisorId;
    SELECT count(*) INTO yesterdaysRequests
    FROM materialrequests
    WHERE DATE(date) = DATE_SUB(given_date, INTERVAL 1 DAY) and supervisorid=supervisorId;
    SELECT count(*) INTO weekRequests
    FROM materialrequests
    WHERE DATE(date) BETWEEN DATE_SUB(given_date, INTERVAL (DAYOFWEEK(given_date) - 1) DAY)  -- 2023-09-08
    AND DATE_ADD(given_date, INTERVAL (7 - DAYOFWEEK(given_date)) DAY) and supervisorid=supervisorId; -- //2023-09-14
     SELECT count(*) INTO monthRequests
    FROM materialrequests
    WHERE DATE(date) BETWEEN DATE_SUB(given_date, INTERVAL DAY(given_date) - 1 DAY)
    AND LAST_DAY(given_date) and supervisorid=supervisorId;
END $$
DELIMITER ;
DELIMITER $$



--  get count of tasks of particular shipperid (todays,yesterdays,week,month)
 DELIMITER $$
CREATE PROCEDURE GetTasksByDate
(
    IN shipperId INT,
    IN given_date DATE,
    OUT todaysTasks INT,
    OUT yesterdaysTasks INT,
    OUT weekTasks INT,
    OUT monthTasks INT
)
BEGIN
    SELECT count(*) INTO todaysTasks
    FROM shipments
    WHERE DATE(date) = given_date and shipperid=shipperId;
    SELECT count(*) INTO yesterdaysTasks
    FROM shipments
    WHERE DATE(date) = DATE_SUB(given_date, INTERVAL 1 DAY) and shipperid=shipperId;
    SELECT count(*) INTO weekTasks
    FROM shipments
    WHERE DATE(date) BETWEEN DATE_SUB(given_date, INTERVAL (DAYOFWEEK(given_date) - 1) DAY)  
    AND DATE_ADD(given_date, INTERVAL (7 - DAYOFWEEK(given_date)) DAY) and shipperid=shipperId; 
     SELECT count(*) INTO monthTasks
    FROM shipments
    WHERE DATE(date) BETWEEN DATE_SUB(given_date, INTERVAL DAY(given_date) - 1 DAY)
    AND LAST_DAY(given_date) and shipperid=shipperId;
    END $$
	DELIMITER ;
	DELIMITER $$
    
    
   
--  get count of orders of particular storemanagerid (todays,yesterdays,week,month)
 DELIMITER $$
CREATE PROCEDURE GetOrdersByDate
(
    IN storeManagerId INT,
    IN given_date DATE,
    OUT todaysOrders INT,
    OUT yesterdaysOrders INT,
    OUT weekOrders INT,
    OUT monthOrders INT
)
BEGIN
    SELECT count(*) INTO todaysOrders
    FROM materialrequestitems 
    inner join materialrequests on materialrequests.id =materialrequestitems.materialrequestid
    WHERE DATE(date) = given_date and materialrequestitems.storemanagerid=storeManagerId;
    SELECT count(*) INTO yesterdaysOrders
    FROM materialrequestitems
    inner join materialrequests on materialrequests.id =materialrequestitems.materialrequestid
    WHERE DATE(date) = DATE_SUB(given_date, INTERVAL 1 DAY) and materialrequestitems.storemanagerid=storeManagerId;
    SELECT count(*) INTO weekOrders
    FROM materialrequestitems
    inner join materialrequests on materialrequests.id =materialrequestitems.materialrequestid
    WHERE DATE(date) BETWEEN DATE_SUB(given_date, INTERVAL (DAYOFWEEK(given_date) - 1) DAY)  
    AND DATE_ADD(given_date, INTERVAL (7 - DAYOFWEEK(given_date)) DAY) and materialrequestitems.storemanagerid=storeManagerId; 
    SELECT count(*) INTO monthOrders
    FROM materialrequestitems
    inner join materialrequests on materialrequests.id =materialrequestitems.materialrequestid
    WHERE DATE(date) BETWEEN DATE_SUB(given_date, INTERVAL DAY(given_date) - 1 DAY)
    AND LAST_DAY(given_date) and materialrequestitems.storemanagerid=storeManagerId;
END $$
DELIMITER ;
DELIMITER $$
    
    

   
