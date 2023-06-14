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

 
    //order history of supervisors id
    public IEnumerable<CartItem> GetAll(int empid)
    {
        List<CartItem> cartItems = new List<CartItem>();
          MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "select cartitems.cartid, cartitems.materialid,cartitems.categoryid,cartitems.quantity from cartitems inner join carts on cartitems.cartid=carts.id where carts.employeeid =@empid";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@empid", empid);
;
            con.Open();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                int cartid = Int32.Parse(reader["cartid"].ToString());
                int materialid = Int32.Parse(reader["materialid"].ToString());
                int categoryid = Int32.Parse(reader["categoryid"].ToString());
                int quantity = Int32.Parse(reader["quantity"].ToString());
                
                CartItem item = new CartItem()
                {
                    CartId=cartid,
                    MaterialId=materialid,
                    CategoryId=categoryid,
                    Quantity=quantity
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


    public bool AddItem(CartItem item){
        bool status =false;
         MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            
            string query = "insert into cartitems( cartid,materialid,categoryid,quantity) values ((select id from carts where employeeid=@empid),@materialid,@category,@quantity);";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@empid", item.EmployeeId);
            cmd.Parameters.AddWithValue("@materialid", item.MaterialId);
            cmd.Parameters.AddWithValue("@quantity", item.Quantity);
            cmd.Parameters.AddWithValue("@category", item.CategoryId);
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
}