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
        public JsonResult GetInfo()
        {
            var emps = (from e in db.Employees
                              join d in db.Departments on e.DepartmentId equals d.Id
                            
                        select new {
                                  DepartmentId = d.Id,
                                  DepartmentName = d.Name + ": count: " + d.Employees.Count + " avg:"+ d.Employees.Average(s=>s.Salary),
                                  EmployeeId = e.Id,
                                  EmployeeName = e.Name,
                                  EmployeeSalary = e.Salary,
                                  EmployeeDepartment = e.DepartmentId
                              }).ToList();
            
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };
            return Json(emps,options);
        }
        [HttpGet]
        public JsonResult Add(string name, string salary, string department_id)
        {
            try
            {
                Department dep= db.Departments.SingleOrDefault(d => d.Id.Equals(Int32.Parse(department_id)));
                db.Employees.Add(new Employee { Name = name, Salary = Int32.Parse(salary), DepartmentId = Int32.Parse(department_id) });
                db.SaveChanges();
            }
            catch (Exception exp)
            {
                return Json(exp.Message);
            }
            return Json("Saved");
        }
        [HttpGet]
        public JsonResult Delete(string id)
        {
            try
            {
                Employee emp = db.Employees.SingleOrDefault(e => e.Id.Equals(Int32.Parse(id)));
                db.Employees.Remove(emp);
                db.SaveChanges();
            }
            catch (Exception exp)
            {
                return Json(exp.Message);
            }
            return Json("Deleted");
        }
        public JsonResult Edit(string name, string salary, string department_id,string id)
        {
            try
            {
                Employee emp = db.Employees.SingleOrDefault(e => e.Id.Equals(Int32.Parse(id)));
                emp.DepartmentId = Int32.Parse(department_id);
                emp.Name = name;
                emp.Salary = Int32.Parse(salary);
                db.SaveChanges();
            }
            catch (Exception exp)
            {
                return Json(exp.Message);
            }
            return Json("Edited");
        }


    }
}
