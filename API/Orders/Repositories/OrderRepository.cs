using Transflower.Orders.Models;
using Transflower.Orders.Repositories.Interfaces;
using MySql.Data.MySqlClient;
namespace Transflower.Orders.Repositories;
public class OrderRepository : IOrderRepository
{

    private readonly IConfiguration _configuration;
    private readonly string _connectionString;
    public OrderRepository(IConfiguration configuration)
    {
        _configuration = configuration;
        _connectionString = _configuration.GetConnectionString("DefaultConnection");
    }
    public async Task<IEnumerable<Order>> GetOrders(int employeeId)
    {
        List<Order> orders = new ();
        MySqlConnection con = new (_connectionString);
        try
        {
            string query = "select min(r.id) as id,r.date,r.status, employees.userid from materialrequests r inner join materialrequestitems ri on r.id=ri.materialrequestid inner join shippingdetails s on ri.id =s.itemid inner join employees on r.supervisorid=employees.id  where r.status=1 and s.status=0 and ri.storemanagerid=@employeeId group by r.id;";
            MySqlCommand cmd = new (query, con);
            cmd.Parameters.AddWithValue("@employeeId", employeeId);
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                int id = int.Parse(reader["id"].ToString());
                int userId = int.Parse(reader["userid"].ToString());
                DateTime date = DateTime.Parse(reader["date"].ToString());
                string status = reader["status"].ToString();

                Order order = new ()
                {
                    Id = id,
                    Date = date,
                    Status = status,
                    UserId = userId
                };
                orders.Add(order);
            }
            await reader.CloseAsync();
        }
        catch (Exception e)
        {
            throw e;
        }
        finally
        {
            await con.CloseAsync();
        }
        return orders;
    }

        public async Task<IEnumerable<Order>> GetCompletedOrders(int employeeId)
    {

        List<Order> orders = new ();
        MySqlConnection con = new (_connectionString);
        try
        {
            string query = "select min(r.id) as id,s.date,r.status, employees.userid   from materialrequests r inner join materialrequestitems ri on r.id=ri.materialrequestid  inner join shipments s on s.id= r.id  inner join employees on r.supervisorid=employees.id  where r.status<>1 and ri.storemanagerid=@employeeId group by r.id ORDER BY r.id DESC";
            MySqlCommand cmd = new (query, con);
            cmd.Parameters.AddWithValue("@employeeId", employeeId);
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                int id = int.Parse(reader["id"].ToString());
                int userId = int.Parse(reader["userid"].ToString());
                DateTime date = DateTime.Parse(reader["date"].ToString());
                string status = reader["status"].ToString();

                Order order = new ()
                {
                    Id = id,
                    Date = date,
                    Status = status,
                    UserId = userId
                };
                orders.Add(order);
            }
            await reader.CloseAsync();
        }
        catch (Exception e)
        {
            throw e;
        }
        finally
        {
            await con.CloseAsync();
        }
        return orders;
    }

   
    public async Task<IEnumerable<OrderDetails>> GetOrderDetails(int requestId,int storemanagerId)
    {
        List<OrderDetails> orderdetails = new ();
        MySqlConnection con = new (_connectionString);
         try
        {
            string query = " select ri.id, s.status as itemstatus, r.date,r.status, materials.quantity as availablequantity, ri.quantity,materials.title, categories.category,departments.department,employees.userid,materials.imageurl  from materialrequestitems ri inner join materialrequests r on r.id = ri.materialrequestid  inner join materials on ri.materialid=materials.id  inner join categories on materials.categoryid=categories.id  inner join employees  on r.supervisorid = employees.id  inner join employees e on ri.storemanagerid= e.id  inner join shippingdetails s on ri.id = s.itemid inner join departments on departments.id= employees.departmentid  where r.id=@requestId and ri.storemanagerid=@storeManagerId";
            MySqlCommand cmd = new (query, con);
            cmd.Parameters.AddWithValue("@requestId", requestId);
            cmd.Parameters.AddWithValue("@storeManagerId", storemanagerId);
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                int id = int.Parse(reader["id"].ToString());
                DateTime orderDate = DateTime.Parse(reader["date"].ToString());
                string? status = reader["status"].ToString();
                bool itemStatus = bool.Parse(reader["itemstatus"].ToString());
                string? materialName = reader["title"].ToString();
                string? category = reader["category"].ToString();
                int quantity = int.Parse(reader["quantity"].ToString());
                int availableQuantity = int.Parse(reader["availablequantity"].ToString());
                string department = reader["department"].ToString();
                int userId = int.Parse(reader["userid"].ToString());
                string imageUrl = reader["imageurl"].ToString();

                OrderDetails order = new ()
                {
                    Id = id,
                    OrderDate = orderDate,
                    Status = status,
                    Name = materialName,
                    Category = category,
                    Quantity = quantity,
                    Department=department,
                    UserId=userId,
                    ImageUrl=imageUrl,
                    AvailableQuantity=availableQuantity,
                    ItemStatus=itemStatus
                };
                orderdetails.Add(order);
            }
            await reader.CloseAsync();
        }
        catch (Exception e)
        {
            throw e;
        }
        finally
        {
            await con.CloseAsync();
        }
        return orderdetails;
    }

 
     public async Task<bool> Approve(int id,int quantity)
    {
        bool status = false;
        MySqlConnection con = new (_connectionString);
        try
        {
            string query = " update shippingdetails set status=1,quantity=@quantity where itemid=@itemId";
            MySqlCommand cmd = new (query, con);
            cmd.Parameters.AddWithValue("@quantity", quantity);
            cmd.Parameters.AddWithValue("@itemId", id);
            await con.OpenAsync();
            int rowsAffected = cmd.ExecuteNonQuery();
            if (rowsAffected > 0)
            {
                status = true;
            }
        }
           
        catch (Exception e)
        {
            throw e;
        }
        finally
        {
            await con.CloseAsync();
        }
        return status;
    }

}