using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedicalApplicationAPI;
 
[Table("medicineDetails", Schema = "public")]
public class Medicine
{
    [Key]  //tag
    public int MedicineID {get; set;}
    public string MedicineName {get; set;}
    public int Price {get; set;}
    public int Quantity {get; set;}
}   