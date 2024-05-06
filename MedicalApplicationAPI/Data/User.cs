using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedicalApplicationAPI;

[Table("userDetails", Schema = "public")]
public class User
{
    [Key]
    public int UserID {get; set;}
    public string Name {get; set;}
    public string Mail {get; set;}
    public string Phone {get; set;}
    public string NewPass {get; set;}
    public string ConfirmPass {get; set;}
    public double Balance {get; set;}
}