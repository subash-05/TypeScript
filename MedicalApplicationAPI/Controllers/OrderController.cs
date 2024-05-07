using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace MedicalApplicationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        /*
        private static List<Order> _Order = new List<Order>
        {
            new Order {OrderID = 201, MedicineID = 301, MedicineName = "Paracetamol", Count = 4, TotalAmount = 26},
            new Order {OrderID = 202, MedicineID = 302, MedicineName = "Stepsils", Count = 3, TotalAmount = 14}
        };
        */

        private readonly ApplicationDBContext _dbcontext;
        public OrderController(ApplicationDBContext applicationDBContext)
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
        public IActionResult PostOrder([FromBody] Order order)
        {
            _dbcontext.orderList.Add(order);
            _dbcontext.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult PutOrder(int id, [FromBody] Order order)
        {
            var orderOld = _dbcontext.orderList.FirstOrDefault(o => o.OrderID == id);
            if(orderOld == null)
            {
                return NotFound();
            }
            orderOld.MedicineID = order.MedicineID;
            orderOld.MedicineName = order.MedicineName;
            orderOld.Count = order.Count;
            orderOld.TotalAmount = order.TotalAmount;
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