using Microsoft.AspNetCore.Mvc;
using OnlineLibraryManagementDB.Controllers;

namespace OnlineLibraryManagementDB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
     public class BookDetailsController : ControllerBase
    {
        private readonly ApplicationDBContext _dbcontext;
        public BookDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbcontext = applicationDBContext;
        }

        [HttpGet]
        public IActionResult GetBook()
        {
            return Ok(_dbcontext.bookList.ToList());
        }

        [HttpGet("{id}")]
        public IActionResult GetBook(int id)
        {
            var book = _dbcontext.bookList.FirstOrDefault(u => u.BookID == id);
            if(book == null)
            {
                return NotFound();
            }
            return Ok(book);
        }

        [HttpPost]
        public IActionResult AddBook([FromBody] BookDetails book)
        {
            _dbcontext.Add(book);
            _dbcontext.SaveChanges();
            return Ok();
        }

        [HttpPut]
        public IActionResult UpdateBook(int id, [FromBody] BookDetails book)
        {
            var bookOld = _dbcontext.bookList.FirstOrDefault(u => u.BookID == id);
            if(bookOld == null)
            {
                return NotFound();
            }
            bookOld.BookName = book.BookName;
            bookOld.AuthorName = book.AuthorName;
            bookOld.BookCount = book.BookCount;
            _dbcontext.SaveChanges();
            return Ok();
        }

        [HttpDelete]
        public IActionResult DeleteBook(int id)
        {
            var book = _dbcontext.bookList.FirstOrDefault(u => u.BookID == id);
            if(book == null)
            {
                return NotFound();
            }
            _dbcontext.bookList.Remove(book);
            _dbcontext.SaveChanges();
            return Ok();
        }
    }
}