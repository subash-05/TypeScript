using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GroceryStoreApplicationDB;

[Table("OrderDetails", Schema = "public")]
public class OrderDetails
{
    [Key]
    public int OrderID {get; set;}
    public string ProductName {get; set;}
    public DateTime DateOfPurchase {get; set;}
    public int Quantity {get; set;}
    public double UnitPrice {get; set;}
    public double TotalPrice {get; set;}
}