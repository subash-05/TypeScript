using Microsoft.EntityFrameworkCore;

namespace GroceryStoreApplicationDB.Controllers
{
    public class ApplicationDBContext : DbContext, IDisposable
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
        {   
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
        }

        public DbSet<UserDetails> userList {get; set;}
        public DbSet<ProductDetails> productList {get; set;}
        public DbSet<OrderDetails> orderList {get; set;}
    }
}