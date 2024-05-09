using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GroceryStoreApplicationDB;

[Table("UserDetails", Schema = "public")]
public class UserDetails
{
    [Key]
    public int UserID {get; set;}
    public string UserName {get; set;}
    public string EmailID {get; set;}
    public string Password {get; set;}
    public double Balance {get; set;}
    public string Phone {get; set;}
    public string Address {get; set;}
}