using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MetroCardManagementDB;

[Table("UserDetails", Schema = "public")]
public class UserDetails
{
    [Key]
    public int CardNumber {get; set;}
    public string UserName {get; set;}
    public string Phone {get; set;}
    public double Balance {get; set;}
}