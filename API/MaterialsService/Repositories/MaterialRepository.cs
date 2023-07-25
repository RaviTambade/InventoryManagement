using System.Security.AccessControl;
using System.Collections.Generic;
using System.Collections.Specialized;
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

    public async Task<IEnumerable<Material>> GetAll()
    {
        List<Material> materials = new List<Material>();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = " select materials.id, materials.title, materials.quantity, materials.unitprice, materials.imageurl, categories.category  from materials inner join categories on categories.id=materials.categoryid";
            MySqlCommand cmd = new MySqlCommand(query, con);
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
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

        return materials;
    }

    public async Task<Material> Get(int Mid)
    {
        Material Thematerial = null;
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "select materials.id, materials.title, materials.quantity, materials.unitprice, materials.imageurl, categories.category from materials inner join categories on categories.id =materials.categoryid where materials.id =@materialId";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@materialId", Mid);
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
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
        return Thematerial;
    }

    public async Task<string> GetImage(int Mid)
    {
        string? imgUrl = null;
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "select imageurl from materials where id =@materialId";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@materialId", Mid);
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                string? imgurl = reader["imageurl"].ToString();
                imgUrl=imgurl;
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
        return imgUrl;
    }

    public async Task<bool> Insert(Material material) {
        bool status = false;
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            Console.WriteLine(material.Type);
            string query = "INSERT INTO Materials(title,categoryid,quantity,unitprice,imageurl)VALUES(@materialName,(select id from categories where category=@materialType),@quantity,@unitPrice,@imgurl)";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@materialName", material.Name);
            cmd.Parameters.AddWithValue("@materialType", material.Type);
            cmd.Parameters.AddWithValue("@quantity", material.Quantity);
            cmd.Parameters.AddWithValue("@unitPrice", material.UnitPrice);
            cmd.Parameters.AddWithValue("@imgurl", material.ImgUrl);
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
    
    public async Task<bool> Update(int id, int quantity)
    {
        bool status = false;
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "UPDATE materials SET  quantity=quantity+@quantity  WHERE id=@materialId";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@materialId", id);
            cmd.Parameters.AddWithValue("@quantity", quantity);
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
   
    public async Task<bool> Delete(int id){
        bool status = false;
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "DELETE FROM materials WHERE id=@materialId";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@materialId", id);
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

    public async Task<IEnumerable<Material>> GetMaterials(int categoryid)
    {
        List<Material> materials = new List<Material>();    
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "select materials.id, materials.title, materials.quantity, materials.unitprice, materials.imageurl, categories.category from materials inner join categories on categories.id =materials.categoryid where materials.categoryid =@categoryId";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@categoryId", categoryid);
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
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
        return materials;
    }

    public async Task<IEnumerable<Material>> GetOutOfStockMaterials(){
        List<Material> materials =new  List<Material>();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "select  materials.id, materials.title, materials.quantity, materials.unitprice, materials.imageurl, categories.category from materials inner join categories on categories.id =materials.categoryid  where quantity = 0";
            MySqlCommand cmd = new MySqlCommand(query, con);
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
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
        return materials;
    }

    public async Task<IEnumerable<Location>> GetLocations()
    {
        List<Location> locations = new List<Location>();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "select  warehouse.section,  categories.category, materials.title as materialname, materials.quantity, employees.id FROM warehouse  INNER JOIN materials ON  materials.categoryid=warehouse.categoryid  inner join categories on warehouse.categoryid = categories.id inner join employees on employees.id=warehouse.employeeid" ;
            MySqlCommand cmd = new MySqlCommand(query, con);
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                string? section = reader["section"].ToString();
                string? name = reader["materialname"].ToString();
                string? category = reader["category"].ToString();
                int quantity = int.Parse(reader["quantity"].ToString());
                int empid = int.Parse(reader["id"].ToString());

                Location loc  = new Location()
                {
                    Section = section,
                    Name = name,
                    category = category,
                    Quantity=quantity,
                    EmployeeId=empid
                };
                locations.Add(loc);
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
        return locations;
    }
    
     public async Task<Location> GetLocation(int materialId)
    {
        Location location = null;
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "select  warehouse.section,  categories.category, materials.title as materialname, materials.quantity, employees.id FROM warehouse  INNER JOIN materials ON  materials.categoryid=warehouse.categoryid  inner join categories on warehouse.categoryid = categories.id inner join employees on employees.id=warehouse.employeeid where materials.id =@materialid" ;
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@materialid", materialId);
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                string? section = reader["section"].ToString();
                string? name = reader["materialname"].ToString();
                string? category = reader["category"].ToString();
                int quantity = int.Parse(reader["quantity"].ToString());
                int empid = int.Parse(reader["id"].ToString());

                location  = new Location()
                {
                    Section = section,
                    Name = name,
                    category = category,
                    Quantity=quantity,
                    EmployeeId=empid
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
        return location;
    }

    public async Task<IEnumerable<Material>> GetCategories()
    {
        List<Material> materials=new List<Material>();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "select category from categories" ;
            MySqlCommand cmd = new MySqlCommand(query, con);
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                string? category = reader["category"].ToString();
                Material material  = new Material()
                {
                    Type=category
                };
                materials.Add(material);
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
        return materials;
    }
        
}
