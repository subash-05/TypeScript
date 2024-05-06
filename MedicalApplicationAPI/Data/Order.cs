using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedicalApplicationAPI;

[Table("orderDetails", Schema = "public")]
public class Order
{
    [Key]
    public int OrderID {get; set;}
    public int MedicineID {get; set;}
    public string MedicineName {get; set;}
    public int Count {get; set;}
    public int TotalAmount {get; set;}
}