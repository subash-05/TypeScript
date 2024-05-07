using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace MetroCardManagementDB.Controllers
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
            var user = _dbcontext.userList.FirstOrDefault(u => u.CardNumber == id);
            if(user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost]
        public IActionResult AddUser([FromBody] UserDetails user) //post request
        {
            _dbcontext.Add(user);
            _dbcontext.SaveChanges();
            //You might want to return CreatedAtAction or another appropriate response
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult PutUser(int id, [FromBody] UserDetails user)
        {
            var userOld = _dbcontext.userList.FirstOrDefault(u => u.CardNumber == id);
            if(userOld == null)
            {
                return NotFound();
            }
            userOld.UserName = user.UserName;
            userOld.Phone = user.Phone;
            userOld.Balance = user.Balance;
            _dbcontext.SaveChanges();
            //You might want to return NoContent or another appropriate response
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            var user = _dbcontext.userList.FirstOrDefault(u => u.CardNumber == id);
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