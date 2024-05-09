using Microsoft.AspNetCore.Mvc;

namespace GroceryStoreApplicationDB.Controllers
{
    [Route("api/[controller]")] //path to api
    [ApiController]
    public class UserDetailsController : ControllerBase
    {
        private readonly ApplicationDBContext _dbcontext;
        public UserDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbcontext = applicationDBContext;
        }

        //function to get user list
        [HttpGet]
        public IActionResult GetUser()
        {
            return Ok(_dbcontext.userList.ToList());
        }

        //function to get using id
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

        //function to add user
        [HttpPost]
        public IActionResult AddUser([FromBody] UserDetails user)
        {
            _dbcontext.Add(user);
            _dbcontext.SaveChanges();
            return Ok();
        }

        //function to update
        [HttpPut("{id}")]
        public IActionResult UpdateUser(int id, [FromBody] UserDetails user)
        {
            var oldUser = _dbcontext.userList.FirstOrDefault(u => u.UserID == id);
            if(oldUser == null)
            {
                return NotFound();
            }
            oldUser.UserID = user.UserID;
            oldUser.UserName = user.UserName;
            oldUser.EmailID = user.EmailID;
            oldUser.Password = user.Password;
            oldUser.Balance = user.Balance;
            oldUser.Phone = user.Phone;
            oldUser.Address = user.Address;
            _dbcontext.SaveChanges();
            return Ok();
        }

        //function to delete
        [HttpDelete("{id}")]
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

