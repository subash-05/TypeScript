using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace MedicalApplicationAPI.Controllers
{
    [Route("api/[controller]")] //route to reach the controller
    [ApiController]
    public class MedicineController : ControllerBase
    {
        /*
        private static List<Medicine> _Medicine = new List<Medicine>
        {
            new Medicine {MedicineID = 301, MedicineName = "Paracetamol", Price = 12, Quantity = 30},
            new Medicine {MedicineID = 302, MedicineName = "Stepsils", Price = 8, Quantity = 20},
            new Medicine {MedicineID = 303, MedicineName = "Vicks", Price = 15, Quantity = 25}
        };
        */
        private readonly ApplicationDBContext _dbcontext;
        public MedicineController(ApplicationDBContext applicationDBContext)
        {
            _dbcontext = applicationDBContext;
        }

        //GET: api/Medicine
        [HttpGet]
        public IActionResult GetMedicine()
        {
            return Ok(_dbcontext.medicineList.ToList());
        }

        //GET: api/Medicine/1
        [HttpGet("{id}")]
        public IActionResult GetMedicine(int id)
        {
            var medicine = _dbcontext.medicineList.FirstOrDefault(m => m.MedicineID == id);
            if(medicine == null)
            {
                return NotFound();
            }
            return Ok(medicine);
        }

        //Adding new medicine
        //POST: api/Medicine
        [HttpPost]
        public IActionResult PostMedicine([FromBody] Medicine medicine)  //post request
        {
            _dbcontext.medicineList.Add(medicine);
            //You might want to return CreatedAtAction or another appropriate response
            return Ok();
        }

        //Updating an existing medicine
        // PUT: api/Contacts/1
        [HttpPut("{id}")]
        public IActionResult PutMedicine(int id, [FromBody] Medicine medicine)
        {
            var medicineOld = _dbcontext.medicineList.FirstOrDefault(m => m.MedicineID == id);
            if(medicineOld == null)
            {
                return NotFound();
            }
            medicineOld.MedicineName = medicine.MedicineName;
            medicineOld.Price = medicine.Price;
            medicineOld.Quantity = medicine.Quantity;
            _dbcontext.SaveChanges();
            //You might want to return NoContent or another appropriate response
            return Ok();
        }

        //Deleting an existing medicine
        // DELETE: api/contacts/1
        [HttpDelete("{id}")]
        public IActionResult DeleteContact(int id)
        {
            var medicine = _dbcontext.medicineList.FirstOrDefault(m => m.MedicineID == id);
            if(medicine == null)
            {
                return NotFound();
            }
            _dbcontext.medicineList.Remove(medicine);
            _dbcontext.SaveChanges();
            //You might want to return NoContent or another appropriate response
            return Ok();
        }
    }
}