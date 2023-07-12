       DELIMITER $$
CREATE PROCEDURE CreateOrder(in cartId int)
BEGIN
DECLARE employeeId INT;
DECLARE materialId INT;
DECLARE categoryId INT;
DECLARE requestId INT;
DECLARE quantity INT;
DECLARE status BOOLEAN;
DECLARE superviosrid INT;
DECLARE noMoreRow1 INT default 0;
DECLARE initialrequestitems_cursor CURSOR  FOR SELECT ct.materialid, ct.categoryid, ct.quantity FROM initialrequestitems ct WHERE ct.cartid=cartId; 

INSERT INTO materialrequests (supervisorid,status) VALUES ((select c.employeeid from initialrequest c where c.id=cartId ),1);
set requestId=LAST_INSERT_ID();
    OPEN initialrequestitems_cursor ;
    begin
    DECLARE exit_flag INT DEFAULT 0;
     DECLARE CONTINUE HANDLER FOR SQLSTATE '02000' SET exit_flag = 1;
    initialrequestitems:loop
    	FETCH initialrequestitems_cursor INTO materialId,categoryId,quantity;
    IF exit_flag=1 THEN 
		LEAVE initialrequestitems;
    END IF;
	INSERT INTO materialrequestitems(storemanagerid,requestid,materialid,categoryid,quantity)
    VALUES((select w.employeeid from warehousestaff w  where w.categoryid=categoryId),requestId,materialId,categoryId,quantity); 

END LOOP initialrequestitems;
end;
CLOSE initialrequestitems_cursor;
-- empty cart
 DELETE FROM initialrequestitems c WHERE c.cartid=cartId;

END $$
DELIMITER ;
	DELIMITER $$
  
  
  
  
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
		INSERT INTO shipments(supervisorid,requestid,shipperid)VALUES(new.supervisorid,new.id,worker);
	END !!
	DELIMITER ;
     

   DELIMITER !!
CREATE TRIGGER newshipmentdetails
after INSERT
ON materialrequestitems FOR EACH ROW
BEGIN
	INSERT INTO shippingdetails(storemanagerid,materialid,categoryid,quantity,shipmentid)
    VALUES(new.storemanagerid,new.materialid,new.categoryid,new.quantity,(select id from shipments s where s.materialrequestid=new.materialrequestid )); 
    end !!
	DELIMITER ;
    
    



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
		update shipments s set s.date=CURRENT_TIMESTAMP where s.materialrequestid=requestid;
        update materialrequests r set r.status=3 where r.id= requestid;
        end if;
    END $$
DELIMITER ;
	DELIMITER $$
    
  call Approved(4,9,20)





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
		update shipments s set s.date=CURRENT_TIMESTAMP where s.id = new.shipmentid;
        update materialrequests r set r.status=3 where r.id=new.shipmentid;
        end if;
    end !!
	DELIMITER ;
