using System.IO;
using System.Runtime.InteropServices.ComTypes;
using System.Collections;
using System.Data;
using MaterialsService.Models;
using MaterialsService.Repositories.Interfaces;
using MySql.Data.MySqlClient;
namespace MaterialsService.Repositories;
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
        MySqlConnection connection = new MySqlConnection(_conString);
        try
        {
            string query = "SELECT * FROM materials";
            MySqlCommand command = new MySqlCommand(query, connection);
            connection.Open();
            MySqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {

                int id = Int32.Parse(reader["material_id"].ToString());
                string? materialname = reader["material_name"].ToString();
                string? materialtype = reader["material_type"].ToString();
                int quantity = Int32.Parse(reader["quantity"].ToString());
                int price = int.Parse(reader["unit_price"].ToString());
                string? imgUrl = reader["photo"].ToString();

                Material material = new Material
                {
                    MaterialId = id,
                    MaterialName = materialname,
                    MaterialType = materialtype,
                    MaterialQuantity = quantity,
                    MaterialUnitPrice = price,
                    MaterialImgUrl = imgUrl,

                };

                materials.Add(material);
            }
            reader.Close();
        }
        catch (Exception e)
        {
            throw e;
        }
        finally
        {
            connection.Close();
        }

        return materials;
    }
    public Material GetById(int materialId)
    {
        Material material = new Material();
        MySqlConnection connection = new MySqlConnection(_conString);
        try
        {
            string query = "SELECT * FROM materials where material_id=@materialId";
            MySqlCommand command = new MySqlCommand(query, connection);
            command.Parameters.AddWithValue("@materialId", materialId);
            connection.Open();
            MySqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                int id = Int32.Parse(reader["material_id"].ToString());
                string? materialname = reader["material_name"].ToString();
                string? materialtype = reader["material_type"].ToString();
                int quantity = Int32.Parse(reader["quantity"].ToString());
                int price = int.Parse(reader["unit_price"].ToString());
                string? imgUrl = reader["photo"].ToString();

                material = new Material()
                {
                    MaterialId = id,
                    MaterialName = materialname,
                    MaterialType = materialtype,
                    MaterialQuantity = quantity,
                    MaterialUnitPrice = price,
                    MaterialImgUrl = imgUrl,
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
            connection.Close();
        }
        return material;
    }
    public bool Insert(Material material)
    {
        bool status = false;
        MySqlConnection connection = new MySqlConnection();
        connection.ConnectionString = _conString;
        try
        {
            string query = "INSERT INTO Materials(material_name,material_type,quantity,unit_price,photo)VALUES(@materialName,@materialType,@quantity,@unitPrice,@imgurl)";
            MySqlCommand command = new MySqlCommand(query, connection);
            command.Parameters.AddWithValue("@materialName", material.MaterialName);
            command.Parameters.AddWithValue("@materialType", material.MaterialType);
            command.Parameters.AddWithValue("@quantity", material.MaterialQuantity);
            command.Parameters.AddWithValue("@unitPrice", material.MaterialUnitPrice);
            command.Parameters.AddWithValue("@imgurl", material.MaterialImgUrl);
            connection.Open();
            int rowsAffected = command.ExecuteNonQuery();
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
            connection.Close();
        }
        return status;
    }
    public bool Update(Material material)
    {
        bool status = false;
        MySqlConnection connection = new MySqlConnection(_conString);
        try
        {
            string query = "UPDATE materials SET  quantity=@quantity  WHERE material_id=@materialId";
            MySqlCommand command = new MySqlCommand(query, connection);
            command.Parameters.AddWithValue("@materialId", material.MaterialId);
            command.Parameters.AddWithValue("@quantity",  material.MaterialQuantity);
            connection.Open();
            int rowsAffected = command.ExecuteNonQuery();
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
            connection.Close();
        }
        return status;
    }

    public bool Delete(int materialId)
    {
        bool status = false;
        MySqlConnection connection = new MySqlConnection(_conString);
        try
        {
            string query = "DELETE FROM materials WHERE material_id=@materialId";
            MySqlCommand command = new MySqlCommand(query, connection);
            command.Parameters.AddWithValue("@materialId", materialId);
            connection.Open();
            int rowsAffected = command.ExecuteNonQuery();
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
            connection.Close();
        }
        return status;
    }

    public Location GetLocation(int id)
    {
        Location location = new Location();
        MySqlConnection connection = new MySqlConnection(_conString);
        try
        {
            string query = "select  warehouses.warehouse_name, sections.section_name,floors.floor_number, materials.material_name, materials.material_type FROM warehouses INNER JOIN sections ON  warehouses.sections_id=sections.section_id INNER JOIN floors ON  sections.floors_id= floors.floor_id INNER JOIN materials ON  floors.mid=materials.material_id where  materials.material_id=@materialid";
            MySqlCommand command = new MySqlCommand(query, connection);
            Console.WriteLine("q"+query);
            Console.WriteLine("id"+id);
            command.Parameters.AddWithValue("@materialid", id);
            connection.Open();
            MySqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                string? warehouse = reader["warehouse_name"].ToString();
                string? sectionname = reader["section_name"].ToString();
                string? floor = reader["floor_number"].ToString();
                string? materialname = reader["material_name"].ToString();
                string? materialtype = reader["material_type"].ToString();

                Console.WriteLine(warehouse,sectionname,floor,materialname,materialtype);
                location = new Location()
                {
                    WarehouseName = warehouse,
                    SectionName = sectionname,
                    Floor = floor,
                    MaterialName = materialname,
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
            connection.Close();
        }
        return location;
    }

}