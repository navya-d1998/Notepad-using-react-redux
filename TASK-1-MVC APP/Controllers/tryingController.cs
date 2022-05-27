using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class tryingController : Controller
    {
        // GET: trying
        public ActionResult details(int id)
        {


            employeecontext employeeContext = new employeecontext();
            employee employee = employeeContext.employees.Single(x => x.id == id);

            return View(employee);



        }

        public string Index()
        {
            return
           "a"
             
            ;
        }
    }
}