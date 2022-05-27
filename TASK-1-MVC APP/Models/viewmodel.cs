


using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication1.Models;

namespace WebApplication1.ViewModels
{
    public class EmployeeViewModel
    {
        public IEnumerable<Department> Department { get; set; }
        public employee Employee { get; set; }
    }
}