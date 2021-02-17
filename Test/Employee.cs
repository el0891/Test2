using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Test
{
    public class Employee
    {   
        public int Id { get; set; }
        public string Name { get; set; }
        public int Salary { get; set; }

        public int DepartmentId { get; set; }

        public Department Department;
    }
}
