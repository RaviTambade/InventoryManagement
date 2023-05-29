using System;
using MaterialsService.Models;
using MaterialsService.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
namespace MaterialsService.Repositories;

[ApiController]
[Route("/api/[controller]")]
public class MaterialRepository : IMaterialRepository
{
    private IConfiguration _configuration;
    private string _conString;
    public MaterialRepository(IConfiguration configuration)
    {
        _configuration = configuration;
        _conString = this._configuration.GetConnectionString("DefaultConnection");
    }

    public IEnumerable<Material> GetAll()
    {
        List<Material> materials = new List<Material>();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = " select materials.id, materials.title, materials.quantity, materials.unitprice, materials.imageurl, categories.category  from materials inner join categories on categories.id=materials.categoryid";
            MySqlCommand cmd = new MySqlCommand(query, con);
            con.Open();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                int id = Int32.Parse(reader["id"].ToString());
                string? name = reader["title"].ToString();
                string? type = reader["category"].ToString();
                int quantity = Int32.Parse(reader["quantity"].ToString());
                int price = int.Parse(reader["unitprice"].ToString());
                string? imgUrl = reader["imageurl"].ToString();

                Material TheMaterial = new Material
                {
                    Id = id,
                    Name = name,
                    Type = type,
                    Quantity = quantity,
                    UnitPrice = price,
                    ImgUrl = imgUrl,
                };

                materials.Add(TheMaterial);
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

        return materials;
    }


    public Material Get(int Mid)
    {
        Material Thematerial = null;
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "select materials.id, materials.title, materials.quantity, materials.unitprice, materials.imageurl, categories.category from materials inner join categories on categories.id =materials.categoryid where materials.id =@materialId";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@materialId", Mid);
            con.Open();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                int id = Int32.Parse(reader["id"].ToString());
                string? name = reader["title"].ToString();
                string? type = reader["category"].ToString();
                int quantity = Int32.Parse(reader["quantity"].ToString());
                int price = int.Parse(reader["unitprice"].ToString());
                string? imgUrl = reader["imageurl"].ToString();

                Thematerial = new Material()
                {
                    Id = id,
                    Name = name,
                    Type = type,
                    Quantity = quantity,
                    UnitPrice = price,
                    ImgUrl = imgUrl,
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
        return Thematerial;
    }

    public bool Insert(Material material) {
        bool status = false;
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "INSERT INTO Materials(name,categoryid,quantity,unitprice,imageurl)VALUES(@materialName,@materialType,@quantity,@unitPrice,@imgurl)";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@materialName", material.Name);
            cmd.Parameters.AddWithValue("@materialType", material.Type);
            cmd.Parameters.AddWithValue("@quantity", material.Quantity);
            cmd.Parameters.AddWithValue("@unitPrice", material.UnitPrice);
            cmd.Parameters.AddWithValue("@imgurl", material.ImgUrl);
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
   

    public bool Update(Material material)
    {
        bool status = false;
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "UPDATE materials SET  quantity=@quantity  WHERE id=@materialId";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@materialId", material.Id);
            cmd.Parameters.AddWithValue("@quantity", material.Quantity);
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
   
 
    public bool Delete(int id){
        bool status = false;
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "DELETE FROM materials WHERE id=@materialId";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@materialId", id);
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


    public IEnumerable<Material> GetMaterials(int cid)
    {
        List<Material> materials = new List<Material>();    
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "select materials.id, materials.title, materials.quantity, materials.unitprice, materials.imageurl, categories.category from materials inner join categories on categories.id =materials.categoryid where materials.categoryid =@categoryId";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@categoryId", cid);
            con.Open();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                int id = Int32.Parse(reader["id"].ToString());
                string? materialname = reader["title"].ToString();
                string? materialtype = reader["category"].ToString();
                int quantity = Int32.Parse(reader["quantity"].ToString());
                int price = int.Parse(reader["unitprice"].ToString());
                string? imgUrl = reader["imageurl"].ToString();

                Material TheMaterial = new Material
                {
                    Id = id,
                    Name = materialname,
                    Type = materialtype,
                    Quantity = quantity,
                    UnitPrice = price,
                    ImgUrl = imgUrl,

                };
                materials.Add(TheMaterial);
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
        return materials;
    }

  
    public IEnumerable<Material>GetOutOfStockMaterials(){
        List<Material> materials =new  List<Material>();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "select  materials.id, materials.title, materials.quantity, materials.unitprice, materials.imageurl, categories.category from materials inner join categories on categories.id =materials.categoryid  where quantity = 0";
            MySqlCommand cmd = new MySqlCommand(query, con);
            con.Open();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                int id = Int32.Parse(reader["id"].ToString());
                string? name = reader["title"].ToString();
                string? type = reader["category"].ToString();
                int quantity = Int32.Parse(reader["quantity"].ToString());
                int price = int.Parse(reader["unitprice"].ToString());
                string? imgUrl = reader["imageurl"].ToString();

                Material TheMaterial = new Material
                {
                    Id = id,
                    Name = name,
                    Type = type,
                    Quantity = quantity,
                    UnitPrice = price,
                    ImgUrl = imgUrl,

                };
                materials.Add(TheMaterial);
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
        return materials;
    }


    public IEnumerable<Order> OrderedMaterialsInADay(){
        List<Order> orders =new  List<Order>();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
                string query = "select orders.id, materials.id, materials.title, categories.category, orderdetails.quantity, orders.status  from orders  inner join materials on orders.orderdetailid = materials.id inner join categories on materials.categoryid = categories.id  inner join orderdetails on orders.orderdetailid=orderdetails.id WHERE orders.date >= CAST(CURRENT_TIMESTAMP AS date)";
            MySqlCommand cmd = new MySqlCommand(query, con);
            con.Open();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                int id = Int32.Parse(reader["id"].ToString());
                int materialId = Int32.Parse(reader["id"].ToString());
                string? name = reader["title"].ToString();
                string? type = reader["category"].ToString();
                int quantity = Int32.Parse(reader["quantity"].ToString());
                string status =  reader["status"].ToString();
 
                Order theOrder = new Order
                {
                    Id = id,
                    MaterialId = materialId,
                    Name=name,
                    Type = type,
                    Quantity = quantity,
                    Status =status
                };
                orders.Add(theOrder);
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
        return orders;
    }

    public IEnumerable<Order> GetOrders(Period date){
        string fromDate = date.FromDate.ToString("yyyy-MM-dd");   
        string toDate = date.ToDate.ToString("yyyy-MM-dd");   
        List<Order> orders =new  List<Order>();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "select orders.id, employees.firstname,employees.lastname, orders.date, orders.status, materials.id, materials.title, categories.category, orderdetails.quantity from orders inner join materials on orders.orderdetailid = materials.id  inner join employees on employees.id = orders.employeeid   inner join categories on categories.id = materials.categoryid  inner join orderdetails on orders.orderdetailid = orderdetails.id  WHERE (date BETWEEN @fromDate AND @ToDate)";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@FromDate", fromDate);
            cmd.Parameters.AddWithValue("@ToDate", toDate);

            con.Open();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                int id = Int32.Parse(reader["id"].ToString());
                int materialId = Int32.Parse(reader["id"].ToString());
                string? name = reader["title"].ToString();
                string? type = reader["category"].ToString();
                int quantity = Int32.Parse(reader["quantity"].ToString());
                string status =  reader["status"].ToString();
 
                Order theOrder = new Order
                {
                    Id = id,
                    MaterialId = materialId,
                    Name=name,
                    Type = type,
                    Quantity = quantity,
                    Status =status
                };
                orders.Add(theOrder);
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
        return orders;
    }

    public Location GetLocation(int id)
    {
        Location loc =null;
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "select  warehouses.name, sections.name,floors.name, materials.name, materials.type FROM warehouses INNER JOIN sections ON  warehouses.sectionid=sections.id INNER JOIN floors ON  sections.floorid= floors.materialid INNER JOIN materials ON  floors.materialid=materials.id where  materials.id=@materialid";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@materialid", id);
            con.Open();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                string? warehouse = reader["name"].ToString();
                string? sectionname = reader["title"].ToString();
                string? floor = reader["level"].ToString();
                string? materialtype = reader["category"].ToString();

                loc = new Location()
                {
                    WarehouseName = warehouse,
                    SectionName = sectionname,
                    Floor = floor,
                    MaterialType = materialtype
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
        return loc;
    }
    
}
