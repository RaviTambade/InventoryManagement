using OrdersService.Models;
using OrdersService.Repositories.Interfaces;
using MySql.Data.MySqlClient;
namespace OrdersService.Repositories;
public class TaskRepository : ITaskRepository
{
    private IConfiguration _configuration;
    private string _conString;
    public TaskRepository(IConfiguration configuration)
    {
        _configuration = configuration;
        _conString = this._configuration.GetConnectionString("DefaultConnection");
    }


    // public Tasks Task()
    // {
    //      Tasks task =null;
    //      MySqlConnection con = new MySqlConnection(_conString);
    //     try
    //     {
    //         string query = "select orders.order_id, employees.empfirst_name,employees.emplast_name, orders.order_date, orders.status, materials.material_id, materials.material_name, materials.material_type, orderdetails.quantity from orders inner join materials on orders.orderdetails_id = materials.material_id inner join orderdetails on orders.orderdetails_id = orderdetails.orderdetails_id inner join employees on employees.employee_id = orders.employee_id ";
    //         MySqlCommand cmd = new MySqlCommand(query, con);
    //         con.Open();
    //         MySqlDataReader reader = cmd.ExecuteReader();
    //         while (reader.Read())
    //         {
    //             int orderid = Int32.Parse(reader["order_id"].ToString());
    //             string? firstname = reader["empfirst_name"].ToString();
    //             string? lastname = reader["emplast_name"].ToString();
    //             string? status = reader["status"].ToString();
    //             int mid = Int32.Parse(reader["material_id"].ToString());
    //             string? materialname = reader["material_name"].ToString();
    //             string? matrialtype = reader["material_type"].ToString();
    //             int quantity = Int32.Parse(reader["quantity"].ToString());
                
    //              task = new Tasks()
    //             {
    //                 FirstName=empfirstname,
    //                 LastName=emplastname,
    //                 MaterialId=materialid,
    //                 MaterialName=materialname,
    //                 MaterialType=matrialtype,
    //                 Quantity=quantity
    //             };

    //         }
    //         reader.Close();
    //     }
    //     catch (Exception e)
    //     {
    //         throw e;
    //     }
    //     finally
    //     {
    //         con.Close();
    //     }
    //     return task;
    // }

    // public IEnumerable<Tasks> GetAll(int id)
    // {
    //     List<Tasks> tasks =new List<Tasks>();
    //      MySqlConnection connection = new MySqlConnection(_conString);
    //     try
    //     {
    //         string query ="Select  employees.empfirst_name,employees.emplast_name, materials.material_id, materials.material_name, materials.material_type, orderdetails.quantity, orders.status from orderdetails    inner join materials on orderdetails.material_id = materials.material_id   inner join orders on orderdetails.orderdetails_id = orders.orderdetails_id inner join employees on orderdetails.assigned_worker_id = employees.employee_id where employees.employee_id=@employeeId";
    //         MySqlCommand command = new MySqlCommand(query, connection);
    //         command.Parameters.AddWithValue("@employeeId", id);
    //         connection.Open();
    //         MySqlDataReader reader = command.ExecuteReader();
    //         while (reader.Read())
    //         {
    //             string? empfirstname = reader["empfirst_name"].ToString();
    //             string? emplastname = reader["emplast_name"].ToString();
    //             int materialid = Int32.Parse(reader["material_id"].ToString());
    //             string? materialname = reader["material_name"].ToString();
    //             string? matrialtype = reader["material_type"].ToString();
    //             int quantity = Int32.Parse(reader["quantity"].ToString());
    //             string ? deliveryStatus=reader["status"].ToString();
                
    //             Tasks task = new Tasks()
    //             {
    //                 EmployeeFirstName=empfirstname,
    //                 EmployeeLastName=emplastname,
    //                 MaterialId=materialid,
    //                 MaterialName=materialname,
    //                 MaterialType=matrialtype,
    //                 Quantity=quantity,
    //                 status=deliveryStatus
    //             };
    //             tasks.Add(task);
    //         }
    //         reader.Close();
    //     }
    //     catch (Exception e)
    //     {
    //         throw e;
    //     }
    //     finally
    //     {
    //         connection.Close();
    //     }
    //     return tasks;
    // }
  

}