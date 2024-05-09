using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineLibraryManagementDB;

[Table("BorrowDetails", Schema = "public")]
public class BorrowDetails
{
    [Key]
    public int BorrowID {get; set;}
    public int BookID {get; set;}
    public int UserID {get; set;}
    public DateTime BorrowedDate {get; set;}
    public int Count {get; set;}
    public string Status {get; set;}
    public double PaidFineAmount {get; set;}
}