using Transflower.Materials.Models;
using Transflower.Materials.Repositories.Interfaces;
using MySql.Data.MySqlClient;
namespace Transflower.Materials.Repositories;

public class MaterialRepository : IMaterialRepository
{
    private readonly IConfiguration _configuration;
    private readonly string _connectionString;
    public MaterialRepository(IConfiguration configuration)
    {
        _configuration = configuration;
        _connectionString = _configuration.GetConnectionString("DefaultConnection");
    }

    public async Task<IEnumerable<Material>> GetAll()
    {
        List<Material> materials = new();
        MySqlConnection con = new (_connectionString);
        try
        {
            string query = " select materials.id, materials.title, materials.quantity, materials.unitprice, materials.imageurl, categories.category  from materials inner join categories on categories.id=materials.categoryid";
            MySqlCommand cmd = new (query, con);
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                int id = int.Parse(reader["id"].ToString());
                string? name = reader["title"].ToString();
                string? type = reader["category"].ToString();
                int quantity = int.Parse(reader["quantity"].ToString());
                int price = int.Parse(reader["unitprice"].ToString());
                string? imageUrl = reader["imageurl"].ToString();

                Material TheMaterial = new ()
                {
                    Id = id,
                    Name = name,
                    Type = type,
                    Quantity = quantity,
                    UnitPrice = price,
                    ImageUrl = imageUrl,
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

    public async Task<Material> Get(int materialId)
    {
        Material material = null;
        MySqlConnection con = new (_connectionString);
        try
        {
            string query = "select materials.id, materials.title, materials.quantity, materials.unitprice, materials.imageurl, categories.category from materials inner join categories on categories.id =materials.categoryid where materials.id =@materialId";
            MySqlCommand cmd = new (query, con);
            cmd.Parameters.AddWithValue("@materialId", materialId);
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                int id = int.Parse(reader["id"].ToString());
                string? name = reader["title"].ToString();
                string? type = reader["category"].ToString();
                int quantity = int.Parse(reader["quantity"].ToString());
                int price = int.Parse(reader["unitprice"].ToString());
                string? imageUrl = reader["imageurl"].ToString();

                material = new Material()
                {
                    Id = id,
                    Name = name,
                    Type = type,
                    Quantity = quantity,
                    UnitPrice = price,
                    ImageUrl = imageUrl,
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
        return material;
    }

    public async Task<string> GetImage(int materialId)
    {
        string? imageUrl = null;
        MySqlConnection con = new (_connectionString);
        try
        {
            string query = "select imageurl from materials where id =@materialId";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@materialId", materialId);
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                string? imageurl = reader["imageurl"].ToString();
                imageUrl = imageurl;
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
        return imageUrl;
    }

    public async Task<bool> Insert(Material material)
    {
        bool status = false;
        MySqlConnection con = new (_connectionString);
        try
        {
            string query = "INSERT INTO Materials(title,categoryid,quantity,unitprice,imageurl)VALUES(@materialName,(select id from categories where category=@materialType),@quantity,@unitPrice,@imgurl)";
            MySqlCommand cmd = new (query, con);
            cmd.Parameters.AddWithValue("@materialName", material.Name);
            cmd.Parameters.AddWithValue("@materialType", material.Type);
            cmd.Parameters.AddWithValue("@quantity", material.Quantity);
            cmd.Parameters.AddWithValue("@unitPrice", material.UnitPrice);
            cmd.Parameters.AddWithValue("@imgurl", material.ImageUrl);
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

    public async Task<bool> Update(int id, Material material)
    {
        bool status = false;
        MySqlConnection con = new (_connectionString);
        try
        {
            string query = "UPDATE materials SET title=@name, categoryid=(select id from categories where category=@category),unitprice=@unitPrice WHERE id=@materialId";
            MySqlCommand cmd = new (query, con);
            cmd.Parameters.AddWithValue("@materialId", id);
            cmd.Parameters.AddWithValue("@name", material.Name);
            cmd.Parameters.AddWithValue("@category", material.Type);
            cmd.Parameters.AddWithValue("@unitPrice", material.UnitPrice);
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

    public async Task<bool> UpdateStock(int id, int quantity)
    {
        bool status = false;
        MySqlConnection con = new (_connectionString);
        try
        {
            string query = "UPDATE materials SET quantity=@quantity WHERE id=@materialId";
            MySqlCommand cmd = new (query, con);
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


    public async Task<bool> Delete(int id)
    {
        bool status = false;
        MySqlConnection con = new (_connectionString);
        try
        {
            string query = "DELETE FROM materials WHERE id=@materialId";
            MySqlCommand cmd = new (query, con);
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

    public async Task<IEnumerable<Material>> GetMaterials(int categoryId)
    {
        List<Material> materials = new ();
        MySqlConnection con = new (_connectionString);
        try
        {
            string query = "select materials.id, materials.title, materials.quantity, materials.unitprice, materials.imageurl, categories.category from materials inner join categories on categories.id =materials.categoryid where materials.categoryid =@categoryId";
            MySqlCommand cmd = new (query, con);
            cmd.Parameters.AddWithValue("@categoryId", categoryId);
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                int id = int.Parse(reader["id"].ToString());
                string? name = reader["title"].ToString();
                string? type = reader["category"].ToString();
                int quantity = int.Parse(reader["quantity"].ToString());
                int price = int.Parse(reader["unitprice"].ToString());
                string? imageUrl = reader["imageurl"].ToString();

                Material TheMaterial = new ()
                {
                    Id = id,
                    Name = name,
                    Type = type,
                    Quantity = quantity,
                    UnitPrice = price,
                    ImageUrl = imageUrl,

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

    public async Task<IEnumerable<Material>> GetOutOfStockMaterials()
    {
        List<Material> materials = new ();
        MySqlConnection con = new (_connectionString);
        try
        {
            string query = "select  materials.id, materials.title, materials.quantity, materials.unitprice, materials.imageurl, categories.category from materials inner join categories on categories.id =materials.categoryid  where quantity = 0";
            MySqlCommand cmd = new (query, con);
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                int id = int.Parse(reader["id"].ToString());
                string? name = reader["title"].ToString();
                string? type = reader["category"].ToString();
                int quantity = int.Parse(reader["quantity"].ToString());
                int price = int.Parse(reader["unitprice"].ToString());
                string? imageUrl = reader["imageurl"].ToString();

                Material TheMaterial = new ()
                {
                    Id = id,
                    Name = name,
                    Type = type,
                    Quantity = quantity,
                    UnitPrice = price,
                    ImageUrl = imageUrl,

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

    public async Task<List<string>> GetCategories()
    {
        List<string> categories = new ();
        MySqlConnection con = new (_connectionString);
        try
        {
            string query = "select category from categories";
            MySqlCommand cmd = new (query, con);
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                string? category = reader["category"].ToString();
                
                categories.Add(category);
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
        return categories;
    }
    public async Task<IEnumerable<StockReport>> GetStockReports(int employeeId)
    {
        List<StockReport> stocks = new ();
        MySqlConnection con = new MySqlConnection(_connectionString);
        try
        {
            string query = "select m.title,m.quantity,c.category from warehousestaff w inner join materials m on m.categoryid=w.categoryid  inner join categories c on c.id=m.categoryid where w.employeeid=@empid";
            MySqlCommand cmd = new (query, con);
            await con.OpenAsync();
            cmd.Parameters.AddWithValue("@empid", employeeId);
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                string? name = reader["title"].ToString();
                int quantity = int.Parse(reader["quantity"].ToString());


                StockReport stock = new ()
                {
                    Name = name,
                    Quantity = quantity,


                };
                stocks.Add(stock);
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
        return stocks;
    }

    public async Task<IEnumerable<StockReport>> GetAllStockReports()
    {
        List<StockReport> stocks = new ();
        MySqlConnection con = new (_connectionString);
        try
        {
            string query = "SELECT SUM(m.quantity) AS quantity, c.category FROM warehousestaff w INNER JOIN materials m ON m.categoryid = w.categoryid INNER JOIN categories c ON c.id = m.categoryid GROUP BY c.category;";
            MySqlCommand cmd = new (query, con);
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                string? category = reader["category"].ToString();
                int quantity = int.Parse(reader["quantity"].ToString());


                StockReport stock = new ()
                {
                    Category = category,
                    Quantity = quantity,
                };
                stocks.Add(stock);
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
        return stocks;
    }

}
