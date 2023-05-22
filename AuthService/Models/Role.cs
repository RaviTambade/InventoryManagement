using System.ComponentModel.DataAnnotations.Schema;
namespace AuthService.Models;
public class Role
{
    [Column("role_id")]
    public int RoleId { get; set; }

    [Column("role_name")]
    public string? RoleName { get; set; }
}