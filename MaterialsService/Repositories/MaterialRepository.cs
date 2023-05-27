using System;
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
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "SELECT * FROM materials";
            MySqlCommand cmd = new MySqlCommand(query, con);
            con.Open();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                int id = Int32.Parse(reader["id"].ToString());
                string? name = reader["name"].ToString();
                string? type = reader["type"].ToString();
                int quantity = Int32.Parse(reader["quantity"].ToString());
                int price = int.Parse(reader["unitprice"].ToString());
                string? imgUrl = reader["photo"].ToString();

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
            string query = "SELECT * FROM materials where id=@materialId";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@materialId", Mid);
            con.Open();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                int id = Int32.Parse(reader["id"].ToString());
                string? name = reader["name"].ToString();
                string? type = reader["type"].ToString();
                int quantity = Int32.Parse(reader["quantity"].ToString());
                int price = int.Parse(reader["unitprice"].ToString());
                string? imgUrl = reader["photo"].ToString();

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
            string query = "INSERT INTO Materials(name,type,quantity,unitprice,photo)VALUES(@materialName,@materialType,@quantity,@unitPrice,@imgurl)";
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
    public Location GetLocation(int id)
    {
        Location loc =null;
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "select  warehouses.warehouse_name, sections.section_name,floors.floor_number, materials.name, materials.type FROM warehouses INNER JOIN sections ON  warehouses.sections_id=sections.section_id INNER JOIN floors ON  sections.floors_id= floors.floor_id INNER JOIN materials ON  floors.mid=materials.id where  materials.id=@materialid";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@materialid", id);
            con.Open();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                string? warehouse = reader["warehouse_name"].ToString();
                string? sectionname = reader["section_name"].ToString();
                string? floor = reader["floor_number"].ToString();
                string? materialname = reader["name"].ToString();
                string? materialtype = reader["type"].ToString();

                loc = new Location()
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
            con.Close();
        }
        return loc;
    }
    public IEnumerable<Material> GetByType(string type)
    {
        List<Material> materials = new List<Material>();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "SELECT * FROM materials where type=@materialtype";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@materialtype", type);
            con.Open();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                int id = Int32.Parse(reader["material_id"].ToString());
                string? materialname = reader["material_name"].ToString();
                string? materialtype = reader["material_type"].ToString();
                int quantity = Int32.Parse(reader["quantity"].ToString());
                int price = int.Parse(reader["unit_price"].ToString());
                string? imgUrl = reader["photo"].ToString();

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
            string query = "select * from materials where quantity = 0";
            MySqlCommand cmd = new MySqlCommand(query, con);
            con.Open();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                int id = Int32.Parse(reader["id"].ToString());
                string? materialname = reader["name"].ToString();
                string? materialtype = reader["type"].ToString();
                int quantity = Int32.Parse(reader["quantity"].ToString());
                int price = int.Parse(reader["unitprice"].ToString());
                string? imgUrl = reader["photo"].ToString();

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
    public IEnumerable<Order> OrderedMaterialsInADay(){
        List<Order> orders =new  List<Order>();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "select orders.order_id, materials.material_id, materials.material_name, materials.material_type, orderdetails.quantity, orders.status from orders inner join materials on orders.orderdetails_id = materials.material_id inner join orderdetails on orders.orderdetails_id=orderdetails.orderdetails_id WHERE order_date >= CAST(CURRENT_TIMESTAMP AS date)";
            MySqlCommand cmd = new MySqlCommand(query, con);
            con.Open();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                int id = Int32.Parse(reader["order_id"].ToString());
                int materialId = Int32.Parse(reader["material_id"].ToString());
                string? name = reader["material_name"].ToString();
                string? type = reader["material_type"].ToString();
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

       public IEnumerable<Order> OrderedFromDateToDate(OrderDate date){
        string fromDate = date.FromDate.ToString("yyyy-MM-dd");   
        string toDate = date.ToDate.ToString("yyyy-MM-dd");   
        List<Order> orders =new  List<Order>();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            string query = "select orders.order_id, employees.empfirst_name,employees.emplast_name, orders.order_date, orders.status, materials.id, materials.name, materials.type, orderdetails.quantity from orders inner join materials on orders.orderdetails_id = materials.id inner join employees on employees.employee_id = orders.employee_id  inner join orderdetails on orders.orderdetails_id = orderdetails.orderdetails_id  WHERE (order_date BETWEEN @FromDate AND @ToDate)";
            MySqlCommand cmd = new MySqlCommand(query, con);
            cmd.Parameters.AddWithValue("@FromDate", fromDate);
            cmd.Parameters.AddWithValue("@ToDate", toDate);

            con.Open();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                int id = Int32.Parse(reader["order_id"].ToString());
                int materialId = Int32.Parse(reader["id"].ToString());
                string? name = reader["name"].ToString();
                string? type = reader["type"].ToString();
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



}
