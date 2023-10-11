namespace Transflower.Productions.Models;
public class ProductionStaff
{
    public int Id { get; set; }
    public string? Department { get; set; }
    public int FirstSupervisor{ get; set; }
    public int SecondSupervisor{get;set;}
}