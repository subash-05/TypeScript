using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineLibraryManagementDB
{
    [Table("UserDetails", Schema = "public")] //to specify the database table that a class is mapped to
    public class UserDetails
    {
        [Key]
        public int UserID {get; set;}
        public string UserName {get; set;}
        public string Gender {get; set;}
        public string Department {get; set;}
        public string Phone {get; set;}
        public string MailID {get; set;}
        public double Balance {get; set;}
    }
}