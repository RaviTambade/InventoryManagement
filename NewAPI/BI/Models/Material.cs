namespace Transflower.InventoryManagement.BIService.Models;

public class Material
{
    public int TotalStocks{ get; set; }
    public int TotalCategories { get; set; }
    public int TotalMaterials { get; set; }
    public int MaterialsToReorder { get; set; }
    public int OutOFStockMaterials { get; set; }
}