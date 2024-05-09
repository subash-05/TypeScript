using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GroceryStoreApplicationDB;

[Table("ProductDetails", Schema = "public")]
public class ProductDetails
{
    [Key]
    public int ProdID {get; set;}
    public string ProductName {get; set;}
    public int QuantityAvailable {get; set;}
    public double UnitPrice {get; set;}
    public DateTime PurchaseDate {get; set;}
    public DateTime ExpiryDate {get; set;}
    public string[] ProductImage {get; set;}
}