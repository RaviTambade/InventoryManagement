

CALL GetrequestsByDate(21,'2023-02-15',@todaysRequests,@yesterdaysRequests,@weekRequests,@monthRequests);

SELECT @todaysRequests,@yesterdaysRequests,@weekRequests,@monthRequests ;
  
call GetTasksByDate(37,'2023-10-07',@todaysTasks,@yesterdaysTasks,@weekTasks,@monthTasks);
   
select @todaysTasks,@yesterdaysTasks,@weekTasks,@monthTasks;

call getordersbydate(1,'2023-05-10',@todaysOrders,@yesterdaysOrders,@weekOrders,@monthOrders);

select @todaysOrders,@yesterdaysOrders,@weekOrders,@monthOrders;

 call GetRequests(@totalRequests,@todaysRequests,@cancelledRequests,@pendingRequests,@deliveredRequests);

select @totalRequests,@todaysRequests,@cancelledRequests,@pendingRequests,@deliveredRequests;
    
call GetSupervisors(@totalSupervisors,@topSupervisors);

select @totalSupervisors,@topSupervisors;
 