using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace MedicalApplicationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        /*
        private static List<User> _User = new List<User>
        {
            new User {UserID = 1, Name = "Subash", Mail = "subash@gmail.com", Phone = "9876543210", NewPass = "abcd", ConfirmPass = "abcd", Balance = 200},
            new User {UserID = 2, Name = "Sally", Mail = "sally@gmail.com", Phone = "8976543210", NewPass = "xyz", ConfirmPass = "xyz", Balance = 250}
        };
        */

        private readonly ApplicationDBContext _dbcontext;
        public UserController(ApplicationDBContext applicationDBContext)
        {
            _dbcontext = applicationDBContext;
        }

        //GET: api/User
        [HttpGet]
        public IActionResult GetUser()
        {
            return Ok(_dbcontext.userList.ToList());
        }

        //GET: api/User/1
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

        //Adding new user
        //POST: api/User
        [HttpPost]
        public IActionResult AddUser([FromBody] User user) //post request
        {
            _dbcontext.Add(user);
            _dbcontext.SaveChanges();
            //You might want to return CreatedAtAction or another appropriate response
            return Ok();
        }

        //Updating an existing medicine
        //PUT: api/User/1
        [HttpPut("{id}")]
        public IActionResult PutUser(int id, [FromBody] User user)
        {
            var userOld = _dbcontext.userList.FirstOrDefault(u => u.UserID == id);
            if(userOld == null)
            {
                return NotFound();
            }
            userOld.UserName = user.UserName;
            userOld.EmailID = user.EmailID;
            userOld.Phone = user.Phone;
            userOld.Password = user.Password;
            userOld.ConfirmPassword = user.ConfirmPassword;
            userOld.Balance = user.Balance;
            _dbcontext.SaveChanges();
            //You might want to return NoContent or another appropriate response
            return Ok();
        }

        //Deleting an existing user
        //DELETE: api/user
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
            //You might want to return NoContent or another appropriate response
            return Ok();
        }
    }
}