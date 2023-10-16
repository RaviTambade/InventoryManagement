                           
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
		INSERT INTO shipments(materialrequestid,shipperid)VALUES(new.id,worker);
	END !!
	DELIMITER ;
     

   DELIMITER !!
CREATE TRIGGER newshipmentdetails
after INSERT
ON materialrequestitems FOR EACH ROW
BEGIN
	INSERT INTO shippingdetails(storemanagerid,quantity,shipmentid,itemid)
    VALUES((select w.employeeid from warehousestaff w  where w.categoryid=new.categoryId),new.quantity,(select id from shipments s where s.materialrequestid=new.materialrequestid ),new.id); 
    end !!
	DELIMITER ;
    
    drop trigger updatestatus;
    
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

UPDATE materials
SET quantity = quantity - new.quantity
WHERE id = (SELECT m.materialid
             FROM materialrequestitems m where m.id=new.itemId); 
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
        update materialrequests r set r.status=2 where r.id=new.shipmentid;
        end if;
    end !!
    DELIMITER ;
    

drop procedure createorder;

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
DECLARE initialrequestitems_cursor CURSOR  FOR SELECT ct.materialid, ct.quantity FROM initialrequestitems ct WHERE ct.initialrequestid=cartId;
insert into materialrequests(supervisorid,status)values((select ir.employeeid from initialrequest ir where ir.id=cartId),1);
set reqid= LAST_INSERT_ID();
   OPEN initialrequestitems_cursor ;
    begin
    DECLARE exit_flag INT DEFAULT 0;
     DECLARE CONTINUE HANDLER FOR SQLSTATE '02000' SET exit_flag = 1;
    initialrequestitems:loop
    	FETCH initialrequestitems_cursor INTO materialId,quantity;
    IF exit_flag=1 THEN 
		LEAVE initialrequestitems;
    END IF;
	INSERT INTO materialrequestitems(materialrequestid,materialid,categoryid,quantity)
    VALUES(reqid,materialId,(select m.categoryid from materials m where m.id=materialId),quantity); 

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
   



   --BI



DELIMITER $$

CREATE PROCEDURE GetMaterialRequestStatsBySupervisor(
    IN supervisor_id INT,
    OUT TotalRequestCount INT,
    OUT FrequentlyRequestedMaterial VARCHAR(255),
    OUT HighestRequestInADay INT
)
BEGIN
    -- Total request count
    SELECT COUNT(*) INTO TotalRequestCount
    FROM materialrequests
    WHERE supervisorid = supervisor_id;

    -- Frequently requested material
    SELECT
        m.title INTO FrequentlyRequestedMaterial
    FROM (
        SELECT materialid, COUNT(materialid) AS MaterialCount
        FROM materialrequests AS mr
        JOIN materialrequestitems AS mri ON mr.id = mri.materialrequestid
        WHERE mr.supervisorid = supervisor_id
        GROUP BY materialid
        ORDER BY MaterialCount DESC
        LIMIT 1
    ) AS Subquery
    JOIN materials AS m ON Subquery.materialid = m.id;

    -- Highest request raised in a day
    SELECT MAX(RequestsInADay) INTO HighestRequestInADay
    FROM (
        SELECT DATE(date) AS RequestDate, COUNT(*) AS RequestsInADay
        FROM materialrequests
        WHERE supervisorid = supervisor_id
        GROUP BY RequestDate
    ) AS RequestStats;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE GetMaterialRequestStatsBySupervisor(
    IN supervisor_id INT,
    OUT TotalRequestCount INT,
    OUT TopFrequentlyRequestedMaterials TEXT,
    OUT HighestRequestInADay INT
)
BEGIN
    -- Total request count
    SELECT COUNT(*) INTO TotalRequestCount
    FROM materialrequests
    WHERE supervisorid = supervisor_id;

    -- Top 3 frequently requested materials
    SELECT
        GROUP_CONCAT(m.title ORDER BY MaterialCount DESC SEPARATOR ', ') INTO TopFrequentlyRequestedMaterials
    FROM (
        SELECT materialid, COUNT(materialid) AS MaterialCount
        FROM materialrequests AS mr
        JOIN materialrequestitems AS mri ON mr.id = mri.materialrequestid
        WHERE mr.supervisorid = supervisor_id
        GROUP BY materialid
        ORDER BY MaterialCount DESC
        LIMIT 3
    ) AS Subquery
    JOIN materials AS m ON Subquery.materialid = m.id;

    -- Highest request raised in a day
    SELECT MAX(RequestsInADay) INTO HighestRequestInADay
    FROM (
        SELECT DATE(date) AS RequestDate, COUNT(*) 
        AS RequestsInADay  FROM materialrequests WHERE supervisorid = supervisor_id 
        GROUP BY RequestDate) AS RequestStats;
END$$

DELIMITER ;


CALL GetMaterialRequestStatsBySupervisor(
    11,
    @TotalRequestCount,
    @FrequentlyRequestedMaterial,
    @HighestRequestInADay
);

-- Retrieve the values from the OUT parameters
SELECT @TotalRequestCount AS TotalRequestCount,
       @FrequentlyRequestedMaterial AS FrequentlyRequestedMaterial,
       @HighestRequestInADay AS HighestRequestInADay;




   DELIMITER $$
CREATE PROCEDURE GetRequests
(
    OUT totalRequests INT,
    OUT todaysRequests INT,
    OUT cancelledRequests INT,
    OUT pendingRequests INT,
    OUT deliveredRequests INT
    
)
BEGIN
    -- total requests count
    SELECT count(*) INTO totalRequests
    FROM materialrequests;
    -- todays requests count
    SELECT count(*) INTO todaysRequests
    FROM materialrequests
    where DATE(date)='2023-10-10';
    -- total cancelled requests
    SELECT count(*) INTO cancelledRequests
    FROM materialrequests
    WHERE status="Cancelled";
    -- total pending requests
	SELECT count(*) INTO pendingRequests
    FROM materialrequests
    WHERE status = "inprogress";
    -- total delivered requests
    SELECT count(*) INTO deliveredRequests
    FROM materialrequests
    WHERE status = "Delivered";
    
    END $$
	DELIMITER ;
	DELIMITER $$
    
   
 DELIMITER $$
CREATE PROCEDURE GetSupervisors
(
    OUT totalSupervisors INT,
    OUT topSupervisors varchar(10)
)
BEGIN
    --  total supervisors
    select count(*) INTO totalSupervisors
    from employees inner join roles on employees.roleid=roles.id where role="supervisor";
    -- top 3 supervisorid
    SELECT
        GROUP_CONCAT(subquery.supervisorid ) INTO topSupervisors
    FROM (
     SELECT supervisorid,COUNT(supervisorid)
        FROM materialrequests
        GROUP BY supervisorid
        ORDER BY COUNT(supervisorid) DESC
        LIMIT 3
   )
   AS Subquery;
    END $$
	DELIMITER ;
	DELIMITER $$




-- all order details for store incharge 
DELIMITER //

CREATE PROCEDURE GetOrdersCounts()
BEGIN
    DECLARE allOrders INT;
    DECLARE todaysOrders INT;
    DECLARE pendingOrders INT;
    DECLARE completedOrders INT;
    DECLARE cancelledOrders INT;

    -- Count for all orders
    SELECT COUNT(*) INTO allOrders FROM materialrequests;
    SELECT COUNT(*) INTO todaysOrders FROM materialrequests WHERE DATE(date) = CURDATE();
    SELECT COUNT(*) INTO pendingOrders FROM materialrequests WHERE status = 'inprogress';
    SELECT COUNT(*) INTO completedOrders FROM materialrequests WHERE status NOT IN ('inprogress', 'cancelled');
    SELECT COUNT(*) INTO cancelledOrders FROM materialrequests WHERE status = 'cancelled';

    -- Return the results
    SELECT allOrders AS 'All Orders',
           todaysOrders AS 'Today\'s Orders',
           pendingOrders AS 'Pending Orders',
           completedOrders AS 'completed Orders',
           cancelledOrders AS 'Cancelled Orders';

END //

DELIMITER ;


CALL GetOrdersCounts();





-- warehouse details for store incharge
DELIMITER //
CREATE PROCEDURE GetTotalsAndCounts()
BEGIN
    DECLARE totalStocks INT;
    DECLARE totalCategories INT;
    DECLARE totalMaterials INT;
    DECLARE materialsToReorder INT;
    DECLARE outOfStockMaterials INT;

    -- Total Stocks
    SELECT SUM(quantity) INTO totalStocks FROM materials;

    -- Total Categories
    SELECT COUNT(*) INTO totalCategories FROM categories;

    -- Total Materials
    SELECT COUNT(*) INTO totalMaterials FROM materials;

    -- Materials to Reorder (quantity under 500)
    SELECT COUNT(*) INTO materialsToReorder FROM materials WHERE quantity < 500;

    -- Out of Stock Materials (quantity is 0)
    SELECT COUNT(*) INTO outOfStockMaterials FROM materials WHERE quantity = 0;

    -- Return the results
    SELECT totalStocks AS 'Total Stocks',
           totalCategories AS 'Total Categories',
           totalMaterials AS 'Total Materials',
           materialsToReorder AS 'Materials to Reorder',
           outOfStockMaterials AS 'Out of Stock Materials';

END //
DELIMITER ;

-- Call the stored procedure
CALL GetTotalsAndCounts();
