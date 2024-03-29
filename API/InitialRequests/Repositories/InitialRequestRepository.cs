using System.Threading.Tasks;
using System.Security.Cryptography.X509Certificates;
using System.Collections.Generic;
using System.IO;
using System.Runtime.InteropServices.ComTypes;
using System.Collections;
using System.Data;
using Transflower.InventoryManagement.InitialRequests.Models;
using Transflower.InventoryManagement.InitialRequests.Repositories.Interfaces;
using MySql.Data.MySqlClient;
namespace Transflower.InventoryManagement.InitialRequests.Repositories;
public class InitialRequestRepository : IInitialRequestRepository
{
    private IConfiguration _configuration;
    private string _conString;
    public InitialRequestRepository(IConfiguration configuration)
    {
        _configuration = configuration;
        _conString = this._configuration.GetConnectionString("DefaultConnection");
    }


    //get cart Items of supervisors by sending supervisor's id
    public async Task<List<InitialRequestItem>> GetAll(int empid)
    {
        List<InitialRequestItem> items = new List<InitialRequestItem>();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "select rt.id, rt.initialrequestid,initialrequest.employeeid,m.imageurl, m.title, categories.category,rt.quantity from InitialRequestItems rt inner join initialrequest on rt.initialrequestid=initialrequest.id inner join materials m on  m.id= rt.materialid  inner join categories on categories.id=m.categoryid where initialrequest.employeeid=@empid";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@empid", empid);
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                int id = Int32.Parse(reader["id"].ToString());
                int initialrequestid = Int32.Parse(reader["initialrequestid"].ToString());
                string name = reader["title"].ToString();
                string category = reader["category"].ToString();
                int quantity = Int32.Parse(reader["quantity"].ToString());
                int employeeid = Int32.Parse(reader["employeeid"].ToString());
                string imgUrl = reader["imageurl"].ToString();

                InitialRequestItem item = new InitialRequestItem()
                {
                    Id = id,
                    RequestId = initialrequestid,
                    Name = name,
                    Category = category,
                    Quantity = quantity,
                    EmployeeId = employeeid,
                    ImageUrl=imgUrl
                    
                };

                items.Add(item);

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
        return items;
    }

    //get cartitem details
    public async Task<InitialRequestItem> GetById(int requestid)
    {
        InitialRequestItem item = null;
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "select rt.id, rt.initialrequestid,  rt.materialid, categories.category,rt.quantity from InitialRequestItems rt inner join materials m on  m.id= rt.materialid inner join categories on categories.id=m.categoryid where rt.id=@requestid";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@requestid", requestid);
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                int id = Int32.Parse(reader["id"].ToString());
                int initialrequestid = Int32.Parse(reader["initialrequestid"].ToString());
                string name = reader["title"].ToString();
                string category = reader["category"].ToString();
                int quantity = Int32.Parse(reader["quantity"].ToString());
                
                item = new InitialRequestItem()
                {
                    Id = id,
                    RequestId = initialrequestid,
                    Name = name,
                    Category = category,
                    Quantity = quantity,
                    
                };
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
        return item;
    }

    public async Task<bool> Delete(int id)
    {
        bool status = false;
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "DELETE FROM InitialRequestItems WHERE id=@id";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@id", id);
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

    public async Task<bool> Insert(InitialRequestItem item)
    {
        bool status = false;
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {

            string query = "insert into InitialRequestItems(initialrequestid,materialid,quantity )values((select id from initialrequest where employeeid=@empid), (select id from materials where title=@name),@quantity)";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@empid", item.EmployeeId);
            cmd.Parameters.AddWithValue("@name", item.Name);
            cmd.Parameters.AddWithValue("@quantity", item.Quantity);
            await con.OpenAsync();

            int rowsAffected = cmd.ExecuteNonQuery();
            if (rowsAffected > 0)
            {
                status = true;
            }
            await con.CloseAsync();

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

    public async Task<bool> RemoveAll(int employeeid)
    {
        bool status = false;
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "DELETE FROM InitialRequestItems WHERE initialrequestid=(select id from initialrequest  where employeeid=@employeeid)";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@employeeid", employeeid);
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

    public async Task<bool> UpdateQuantity(InitialRequestItem item)
    {
        bool status = false;
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "update InitialRequestItems set quantity=@quantity where id=@id";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@id", item.Id);
            cmd.Parameters.AddWithValue("@quantity", item.Quantity);
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

    public async Task<bool> ChangeStatus(ChangeStatus changestatus)
    {
        bool status = false;
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "update orders set status=@status where id=@id";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@id", changestatus.OrderId);
            cmd.Parameters.AddWithValue("@status", changestatus.StatusId);
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