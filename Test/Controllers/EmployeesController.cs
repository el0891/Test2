using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;


namespace Test.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmployeesController : Controller
    {
        private ApplicationContext db;
        private readonly ILogger<EmployeesController> _logger;

        public EmployeesController(ILogger<EmployeesController> logger, ApplicationContext context)
        {
            _logger = logger;
            db = context;
        }
        [HttpGet]
        public JsonResult Get()
        {
            var emps = (from e in db.Employees
                              join d in db.Departments on e.DepartmentId equals d.Id
                            
                        select new {
                                  DepartmentId = d.Id,
                                  DepartmentName = d.Name + ": count: " + d.Employees.Count + " avg:"+ d.Employees.Average(s=>s.Salary),
                                  EmployeeId = e.Id,
                                  EmployeeName = e.Name,
                                  EmployeeSalary = e.Name + " Salary: " + e.Salary,
                                  EmployeeDepartment = e.DepartmentId
                              }).ToList();
            
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };
            return Json(emps,options);
        }
    }
}
