using Microsoft.AspNetCore.Mvc;

namespace GroceryStoreApplicationDB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderDetailsController : ControllerBase
    {
        private readonly ApplicationDBContext _dbcontext;
        public OrderDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbcontext = applicationDBContext;
        }

        [HttpGet]
        public IActionResult GetOrder()
        {
            return Ok(_dbcontext.orderList.ToList());
        }

        [HttpGet("{id}")]
        public IActionResult GetOrder(int id)
        {
            var order = _dbcontext.orderList.FirstOrDefault(o => o.OrderID == id);
            if(order == null)
            {
                return NotFound();
            }
            return Ok(order);
        }

        [HttpPost]
        public IActionResult AddOrder([FromBody] OrderDetails order)
        {
            _dbcontext.Add(order);
            _dbcontext.SaveChanges();
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteOrder(int id)
        {
            var order = _dbcontext.orderList.FirstOrDefault(o => o.OrderID == id);
            if(order == null)
            {
                return NotFound();
            }
            _dbcontext.orderList.Remove(order);
            _dbcontext.SaveChanges();
            return Ok();
        }
    }
}