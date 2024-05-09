using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineLibraryManagementDB;

[Table("BookDetails", Schema = "public")]
public class BookDetails
{
    [Key]
    public int BookID {get; set;}
    public string BookName {get; set;}
    public string AuthorName {get; set;}
    public int BookCount {get; set;}
}