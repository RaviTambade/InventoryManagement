

CALL GetrequestsByDate(21,'2023-02-15',@todaysOrders,@yesterdaysOrders,@weekOrders,@monthOrders);

SELECT @todaysOrders,@yesterdaysOrders,@weekOrders,@monthOrders ;
  
call GetTasksByDate(37,'2023-10-07',@todaysTasks,@yesterdaysTasks,@weekTasks,@monthTasks);
   
select @todaysTasks,@yesterdaysTasks,@weekTasks,@monthTasks;

call getordersbydate(1,'2023-10-10',@todaysOrders,@yesterdaysOrders,@weekOrders,@monthOrders);

select @todaysOrders,@yesterdaysOrders,@weekOrders,@monthOrders;

 call GetRequests(@totalRequests,@todaysRequests,@cancelledRequests,@pendingRequests,@deliveredRequests);

select @totalRequests,@todaysRequests,@cancelledRequests,@pendingRequests,@deliveredRequests;
   