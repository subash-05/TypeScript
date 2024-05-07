using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MetroCardManagementDB;

[Table("TicketDetails", Schema = "public")]
public class TicketDetails
{
    [Key]
    public int TicketID {get; set;}
    public string FromLocation {get; set;}
    public string ToLocation {get; set;}
    public double TicketPrice {get; set;}
}