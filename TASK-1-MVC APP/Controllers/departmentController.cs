using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Models;


namespace WebApplication1.Controllers
{
    public class departmentController : Controller
    {
        // GET: department
        public ActionResult Index()
        {

           employeecontext employeeContext = new employeecontext();
       //    List<dept> departments = employeeContext.depts.ToList();

            return View() ;

        }
    }
}