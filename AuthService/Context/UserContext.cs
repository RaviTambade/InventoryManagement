using AuthService.Models;
using Microsoft.EntityFrameworkCore;
namespace AuthService.Context;
public class UserContext : DbContext
{
    private readonly IConfiguration _configuration;
    private readonly string _conString;
    public UserContext(IConfiguration configuration)
    {
        _configuration = configuration;
        _conString = _configuration.GetConnectionString("DefaultConnection");
    }

    public DbSet<Employee> employees { get; set; }
    public DbSet<Role> Roles { get; set; }
    public DbSet<UserRole> UserRoles { get; set; }


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseMySQL(_conString);
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasKey(e => e.EmployeeId);
            entity.HasKey(e => e.EmployeeFirstName);
            entity.HasKey(e => e.EmployeeLastName);
            entity.HasKey(e => e.Email);
            entity.HasKey(e => e.ContactNumber);
            entity.HasKey(e => e.Password);
            entity.HasKey(e => e.BirthDate);
            entity.HasKey(e => e.HireDate);
            entity.HasKey(e => e.ImgUrl);
            entity.HasKey(e => e.RoleId);
            entity.HasKey(e => e.GenderId);
            entity.HasKey(e => e.DepatmentId);
             modelBuilder.Entity<Employee>().ToTable("employees");
        });

         modelBuilder.Entity<Role>(entity =>
       {
           entity.HasKey(e => e.RoleId);
           entity.Property(e => e.RoleName);
           modelBuilder.Entity<Role>().ToTable("roles");
       });

        modelBuilder.Entity<UserRole>(entity =>
       {
           entity.HasKey(e => e.UserRoleId);
           entity.Property(e => e.UserId);
           entity.Property(e => e.RoleId);
           modelBuilder.Entity<UserRole>().ToTable("user_roles");
       });

    }
}