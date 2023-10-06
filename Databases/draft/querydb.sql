
CALL GetrequestsByDate(21,'2023-02-15',@todaysOrders,@yesterdaysOrders,@weekOrders,@monthOrders);

SELECT @todaysOrders,@yesterdaysOrders,@weekOrders,@monthOrders ;
  