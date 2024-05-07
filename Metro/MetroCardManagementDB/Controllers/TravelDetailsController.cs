using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace MetroCardManagementDB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TravelDetailsController : ControllerBase
    {
        private readonly ApplicationDBContext _dbcontext;
        public TravelDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbcontext = applicationDBContext;
        }

        [HttpGet]
        public IActionResult GetTravel()
        {
            return Ok(_dbcontext.travelList.ToList());
        }
        
        [HttpGet("{id}")]
        public IActionResult GetTravel(int id)
        {
            var travel = _dbcontext.travelList.FirstOrDefault(t => t.TravelID == id);
            if(travel == null)
            {
                return NotFound();
            }
            return Ok(travel);
        }

        [HttpPost]
        public IActionResult AddTravel([FromBody] TravelDetails travel) //post request
        {
            _dbcontext.Add(travel);
            _dbcontext.SaveChanges();
            //You might want to return CreatedAtAction or another appropriate response
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult PutTravel(int id, [FromBody] TravelDetails travel)
        {
            var travelOld = _dbcontext.travelList.FirstOrDefault(t => t.TravelID == id);
            if(travelOld == null)
            {
                return NotFound();
            }
            travelOld.CardNumber = travel.CardNumber;
            travelOld.FromLocation = travel.FromLocation;
            travelOld.ToLocation = travel.ToLocation;
            travelOld.Date = travel.Date;
            travelOld.TravelCost = travel.TravelCost;
            _dbcontext.SaveChanges();
            //You might want to return NoContent or another appropriate response
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTravel(int id)
        {
            var travel = _dbcontext.travelList.FirstOrDefault(t => t.TravelID == id);
            if(travel == null)
            {
                return NotFound();
            }
            _dbcontext.travelList.Remove(travel);
            _dbcontext.SaveChanges();
            //You might want to return NoContent or another appropriate response
            return Ok();
        }
    }
}