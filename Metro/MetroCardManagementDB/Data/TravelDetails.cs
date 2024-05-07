using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MetroCardManagementDB;

[Table("TravelDetails", Schema = "public")]
public class TravelDetails
{
    [Key]
    public int TravelID {get; set;}
    public int CardNumber {get; set;}
    public string FromLocation {get; set;}
    public string ToLocation {get; set;}
    public DateTime Date {get; set;}
    public double TravelCost {get; set;}
}