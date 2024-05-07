using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace MetroCardManagementDB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketDetailsController : ControllerBase
    {
        private readonly ApplicationDBContext _dbcontext;
        public TicketDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbcontext = applicationDBContext;
        }

        [HttpGet]
        public IActionResult GetTicket()
        {
            return Ok(_dbcontext.ticketList.ToList());
        }
        
        [HttpGet("{id}")]
        public IActionResult GetTicket(int id)
        {
            var ticket = _dbcontext.ticketList.FirstOrDefault(t => t.TicketID == id);
            if(ticket == null)
            {
                return NotFound();
            }
            return Ok(ticket);
        }

        [HttpPost]
        public IActionResult AddTicket([FromBody] TicketDetails ticket) //post request
        {
            _dbcontext.Add(ticket);
            _dbcontext.SaveChanges();
            //You might want to return CreatedAtAction or another appropriate response
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult PutTicket(int id, [FromBody] TicketDetails ticket)
        {
            var ticketOld = _dbcontext.ticketList.FirstOrDefault(t => t.TicketID == id);
            if(ticketOld == null)
            {
                return NotFound();
            }
            ticketOld.TicketID = ticket.TicketID;
            ticketOld.FromLocation = ticket.FromLocation;
            ticketOld.ToLocation = ticket.ToLocation;
            ticketOld.TicketPrice = ticket.TicketPrice;
            _dbcontext.SaveChanges();
            //You might want to return NoContent or another appropriate response
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTicket(int id)
        {
            var ticket = _dbcontext.ticketList.FirstOrDefault(t => t.TicketID == id);
            if(ticket == null)
            {
                return NotFound();
            }
            _dbcontext.ticketList.Remove(ticket);
            _dbcontext.SaveChanges();
            //You might want to return NoContent or another appropriate response
            return Ok();
        }
    }
}