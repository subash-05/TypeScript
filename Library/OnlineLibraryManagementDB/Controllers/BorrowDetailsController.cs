using Microsoft.AspNetCore.Mvc;
using OnlineLibraryManagementDB.Controllers;

namespace OnlineLibraryManagementDB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BorrowDetailsController : ControllerBase
    {
        private readonly ApplicationDBContext _dbcontext;
        public BorrowDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbcontext = applicationDBContext;
        }

        [HttpGet]
        public IActionResult GetBorrow()
        {
            return Ok(_dbcontext.borrowList.ToList());
        }

        [HttpGet("{id}")]
        public IActionResult GetBorrow(int id)
        {
            var borrow = _dbcontext.borrowList.FirstOrDefault(u => u.BorrowID == id);
            if(borrow == null)
            {
                return NotFound();
            }
            return Ok(borrow);
        }

        [HttpPost]
        public IActionResult AddBorrow([FromBody] BorrowDetails borrow)
        {
            _dbcontext.Add(borrow);
            _dbcontext.SaveChanges();
            return Ok();
        }

        [HttpPut]
        public IActionResult UpdateBorrow(int id, [FromBody] BorrowDetails borrow)
        {
            var borrowOld = _dbcontext.borrowList.FirstOrDefault(u => u.BorrowID == id);
            if(borrowOld == null)
            {
                return NotFound();
            }
            borrowOld.BookID = borrow.BookID;
            borrowOld.UserID = borrow.UserID;
            borrowOld.BorrowedDate = borrow.BorrowedDate;
            borrowOld.Count = borrow.Count;
            borrowOld.Status = borrow.Status;
            borrowOld.PaidFineAmount = borrow.PaidFineAmount;
            _dbcontext.SaveChanges();
            return Ok();
        }

        [HttpDelete]
        public IActionResult DeleteBorrow(int id)
        {
            var borrow = _dbcontext.borrowList.FirstOrDefault(u => u.BorrowID == id);
            if(borrow == null)
            {
                return NotFound();
            }
            _dbcontext.borrowList.Remove(borrow);
            _dbcontext.SaveChanges();
            return Ok();
        }
    }
}