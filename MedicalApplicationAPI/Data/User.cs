using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedicalApplicationAPI;

[Table("userDetails", Schema = "public")]
public class User
{
    [Key]
    public int UserID {get; set;}
    public string UserName {get; set;}
    public string EmailID {get; set;}
    public string Phone {get; set;}
    public string Password {get; set;}
    public string ConfirmPassword {get; set;}
    public double Balance {get; set;}
}