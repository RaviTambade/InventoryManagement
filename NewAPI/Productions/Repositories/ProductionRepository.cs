using Transflower.Productions.Models;
using Transflower.Productions.Repositories.Interfaces;
using MySql.Data.MySqlClient;
namespace Transflower.Productions.Repositories;
public class ProductionRepository : IProductionRepository
{
    private readonly IConfiguration _configuration;
    private readonly string _connectionString;
    public ProductionRepository(IConfiguration configuration)
    {
        _configuration = configuration;
        _connectionString = _configuration.GetConnectionString("DefaultConnection");
    }
    public async Task<IEnumerable<ProductionStaff>> GetAll()
    {
        List<ProductionStaff> productionStaffs = new();
        MySqlConnection con = new(_connectionString);
        try
        {
            string query = "select * from productionstaff";
            MySqlCommand cmd = new(query, con);
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                int id = int.Parse(reader["id"].ToString());
                string? department = reader["department"].ToString();
                int firstSupervisor = int.Parse(reader["firstsupervisor"].ToString());
                int secondSupervisor = int.Parse(reader["secondsupervisor"].ToString());
                ProductionStaff productionStaff = new()
                {
                    Id = id,
                    Department = department,
                    FirstSupervisor = firstSupervisor,
                    SecondSupervisor = secondSupervisor,
                };
                productionStaffs.Add(productionStaff);
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
        return productionStaffs;
    }
}