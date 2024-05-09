using Microsoft.AspNetCore.Mvc;
using OnlineLibraryManagementDB.Controllers;

namespace OnlineLibraryManagementDB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserDetailsController : ControllerBase
    {
        private readonly ApplicationDBContext _dbcontext;
        public UserDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbcontext = applicationDBContext;
        }

        [HttpGet]
        public IActionResult GetUser()
        {
            return Ok(_dbcontext.userList.ToList());
        }

        [HttpGet("{id}")]
        public IActionResult GetUser(int id)
        {
            var user = _dbcontext.userList.FirstOrDefault(u => u.UserID == id);
            if(user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost]
        public IActionResult AddUser([FromBody] UserDetails user)
        {
            _dbcontext.Add(user);
            _dbcontext.SaveChanges();
            return Ok();
        }

        [HttpPut]
        public IActionResult UpdateUser(int id, [FromBody] UserDetails user)
        {
            var userOld = _dbcontext.userList.FirstOrDefault(u => u.UserID == id);
            if(userOld == null)
            {
                return NotFound();
            }
            userOld.UserName = user.UserName;
            userOld.Gender = user.Gender;
            userOld.Department = user.Department;
            userOld.Phone = user.Phone;
            userOld.MailID = user.MailID;
            userOld.Balance = user.Balance;
            _dbcontext.SaveChanges();
            return Ok();
        }

        [HttpDelete]
        public IActionResult DeleteUser(int id)
        {
            var user = _dbcontext.userList.FirstOrDefault(u => u.UserID == id);
            if(user == null)
            {
                return NotFound();
            }
            _dbcontext.userList.Remove(user);
            _dbcontext.SaveChanges();
            return Ok();
        }
    }
}