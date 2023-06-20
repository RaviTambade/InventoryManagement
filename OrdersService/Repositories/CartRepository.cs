using System.Security.Cryptography.X509Certificates;
using System.Collections.Generic;
using System.IO;
using System.Runtime.InteropServices.ComTypes;
using System.Collections;
using System.Data;
using OrdersService.Models;
using OrdersService.Repositories.Interfaces;
using MySql.Data.MySqlClient;
namespace OrdersService.Repositories;
public class CartRepository : ICartRepository
{
    private IConfiguration _configuration;
    private string _conString;
    public CartRepository(IConfiguration configuration)
    {
        _configuration = configuration;
        _conString = this._configuration.GetConnectionString("DefaultConnection");
    }


    //get cart Items of supervisors by sending supervisor's id
    public IEnumerable<CartItem> GetAll(int empid)
    {
        List<CartItem> cartItems = new List<CartItem>();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "select cartitems.id, cartitems.cartid, carts.employeeid, cartitems.materialid, categories.category,cartitems.quantity from cartitems inner join carts on cartitems.cartid=carts.id inner join categories on categories.id=cartitems.categoryid where carts.employeeid =@empid";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@empid", empid);
            ;
            con.Open();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                int id = Int32.Parse(reader["id"].ToString());
                int cartid = Int32.Parse(reader["cartid"].ToString());
                int materialid = Int32.Parse(reader["materialid"].ToString());
                string category = reader["category"].ToString();
                int quantity = Int32.Parse(reader["quantity"].ToString());
                int employeeid = Int32.Parse(reader["employeeid"].ToString());

                CartItem item = new CartItem()
                {
                    Id = id,
                    CartId = cartid,
                    MaterialId = materialid,
                    Category = category,
                    Quantity = quantity,
                    EmployeeId = employeeid
                };

                cartItems.Add(item);

            }
            reader.Close();
        }
        catch (Exception e)
        {
            throw e;
        }
        finally
        {
            con.Close();
        }
        return cartItems;
    }

    //get cartitem details
    public CartItem GetCartItem(int cartId)
    {
        CartItem cartItem = null;
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "select c.id, c.cartid, c.materialid, categories.category, c.quantity from cartitems c inner join categories on categories.id=c.categoryid where c.id =@cartid";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@cartid", cartId);
            con.Open();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                int id = Int32.Parse(reader["id"].ToString());
                int cartid = Int32.Parse(reader["cartid"].ToString());
                int materialid = Int32.Parse(reader["materialid"].ToString());
                string category = reader["category"].ToString();
                int quantity = Int32.Parse(reader["quantity"].ToString());

                cartItem = new CartItem()
                {
                    Id = id,
                    CartId = cartid,
                    MaterialId = materialid,
                    Category = category,
                    Quantity = quantity,
                };
            }
            reader.Close();
        }
        catch (Exception e)
        {
            throw e;
        }
        finally
        {
            con.Close();
        }
        return cartItem;
    }


    public bool Delete(int id)
    {
        bool status = false;
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "DELETE FROM cartitems WHERE id=@id";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@id", id);
            con.Open();
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
            con.Close();
        }
        return status;
    }



    public bool AddItem(CartItem item)
    {
        bool status = false;
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {

            string query = "insert into cartitems(cartid,materialid,categoryid,quantity)values((select id from carts where employeeid=@empid),@materialid,(select id from categories where category=@category),@quantity);";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@category", item.Category);
            cmd.Parameters.AddWithValue("@empid", item.EmployeeId);
            cmd.Parameters.AddWithValue("@materialid", item.MaterialId);
            cmd.Parameters.AddWithValue("@quantity", item.Quantity);

            con.Open();

            int rowsAffected = cmd.ExecuteNonQuery();
            if (rowsAffected > 0)
            {
                status = true;
            }
            con.Close();

        }
        catch (Exception e)
        {
            throw e;
        }
        finally
        {
            con.Close();
        }
        return status;

    }

    public bool EmptyCart(int employeeid)
    {
        bool status = false;
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "	DELETE FROM cartitems WHERE cartid=(select id from carts where employeeid=@employeeid)";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@employeeid", employeeid);
            con.Open();
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
            con.Close();
        }
        return status;
    }

    public bool UpdateQuantity(CartItem item)
    {
        bool status = false;
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "update cartitems set quantity=@quantity where id=@id";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@id", item.Id);
            cmd.Parameters.AddWithValue("@quantity", item.Quantity);
            con.Open();
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
            con.Close();
        }
        return status;
    }


      public bool ChangeStatus(ChangeStatus changestatus)
    {
        bool status = false;
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "update orders set status=@status where id=@id";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@id", changestatus.OrderId);
            cmd.Parameters.AddWithValue("@status", changestatus.StatusId);
            con.Open();
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
            con.Close();
        }
        return status;
    }

}