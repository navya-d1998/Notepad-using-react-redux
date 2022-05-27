using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class employeeController : Controller
    {
        // GET: employee
        public ActionResult details(int id)
        {

            employeecontext employeeContext = new employeecontext();
            employee employee = employeeContext.employees.Single(x => x.id == id);

            return View(employee);

        }

        public ActionResult Index()
        {

            employeecontext employeeContext = new employeecontext();

            //  employee employee = employeeContext.employees.Single(x => x.id == id);

         List< employee> employee = employeeContext.employees.ToList();

            return View(employee);

        }

        public ActionResult Index1(int id)
        {
           

            employeecontext employeeContext = new employeecontext();

            //  employee employee = employeeContext.employees.Single(x => x.id == id);

        List<employee> employee = employeeContext.employees.Where(x=> x.DepartmentId == id).ToList();

            return View(employee);

        }
    }
}