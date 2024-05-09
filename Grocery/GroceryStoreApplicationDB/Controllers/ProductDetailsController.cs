using Microsoft.AspNetCore.Mvc;

namespace GroceryStoreApplicationDB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductDetailsController : ControllerBase
    {
        private readonly ApplicationDBContext _dbcontext;
        public ProductDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbcontext = applicationDBContext;
        }

        [HttpGet]
        public IActionResult GetProduct()
        {
            return Ok(_dbcontext.productList.ToList());
        }

        [HttpGet("{id}")]
        public IActionResult GetProduct(int id)
        {
            var product = _dbcontext.productList.FirstOrDefault(p => p.ProdID == id);
            if(product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }
    }
}