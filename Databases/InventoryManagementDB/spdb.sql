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
    
    