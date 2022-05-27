using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class empController : Controller
    {
      
     //   private List<employee> employees { get; set; }

      // public empController()
      //  {
       //     employeesdd employeeBusinessLayer = new employeesdd();
       //     this.employees = employeeBusinessLayer.employees.ToList();
      //  }

        // GET: emp
        public ActionResult Index()
        {
            employeesdd employeeBusinessLayer = new employeesdd();

         List<employee> employees = employeeBusinessLayer.employees.ToList();


            if(employees==null)
            {
                return RedirectToAction("Index");
            }

            return View(employees);
        }



        public ActionResult Index1()
        {
            employeesdd employeeBusinessLayer =
             new employeesdd();

            List<Department> dpts = employeeBusinessLayer.departments.ToList();


            return View(dpts);
        }


        public ActionResult Details(int id)
        {
            employeesdd employeeBusinessLayer =
               new employeesdd();

            List<employee> employees = employeeBusinessLayer.employees.Where(emp => emp.DepartmentId == id).ToList();

            return View(employees);
        }

        public ActionResult details1(int id)
        {
            employeesdd employeeBusinessLayer =
              new employeesdd();

            employee employees = employeeBusinessLayer.employees.Single(x => x.id == id);

            return View(employees);

        }

        public ActionResult details2(int id)
        {
            employeesdd employeeBusinessLayer =
              new employeesdd();

            employee employees = employeeBusinessLayer.employees.SingleOrDefault(x => x.id == id);


            return View(employees);

        }



        [HttpGet]
        [ActionName("login")]
        public ActionResult login_Get()
        {

            return View();

        }


        [HttpPost]
        [ActionName("login")]
        public ActionResult login_Post(Users user)
        {
            employeesdd employeeBusinessLayer =
         new employeesdd();
            List<Users> us = employeeBusinessLayer.users.ToList();

            if (ModelState.IsValid)
            {
              //  if(user.username=="admin")


                switch(user.username)
                {
                    case "admin":
                        {
                            Users pss = us.Single(x => x.username == "0");
                            if(pss.password==user.password)
                            {
                                return RedirectToAction("homepage", new { id = 0 });
                            }
                            else
                            {
                                ViewBag.invalid = "wrong password";
                                return View();
                            }

                            break;
                        }
                    default:
                        {
                            Users pss = us.SingleOrDefault(x =>  x.username == user.username);
                            if (pss != null)
                            {
                                if (pss.password == user.password)
                                {
                                    return RedirectToAction("homepage", new { id =Convert.ToInt32(user.username) });
                                }
                                else
                                {
                                    ViewBag.invalid = "wrong password";
                                    return View();
                                }
                            }
                            else
                            {
                                ViewBag.invalid = "Invalid user";
                                return View();
                            }
                            break;
                        }
                }


              //  employeeBusinessLayer.AddEmmployee(user);
              //  return RedirectToAction("Index");
            }
            else
            {
                return View();
            }
           // return View();
        }


        public ActionResult homepage(int id)
        {

            if(id==0)     // for admin
            {
                return RedirectToAction("adminhomepage");

            }
            else         // for employee
            {
              // return  details2(id);
               return RedirectToAction("details2", new { id = id });
             
            }
           

        }

        public ActionResult adminhomepage()
        {


            return View();
        }


        [HttpGet]
        [ActionName("Create")]
        public ActionResult Create_Get()
        {
            
            return View();
        }

        [HttpPost]
        [ActionName("Create")]
        public ActionResult Create_Post(employee employee)
        {
            employeesdd employeeBusinessLayer =
           new employeesdd();

          //  employee employee = new employee();
         //   TryUpdateModel(employee);

            if (ModelState.IsValid)
            {
                employeeBusinessLayer.AddEmmployee(employee);
                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }
        }


        [HttpGet]
        public ActionResult Edit(int id)
        {
            employeesdd employeeBusinessLayer =
          new employeesdd();
            employee employee =
                   employeeBusinessLayer.employees.Single(emp => emp.id == id);

            return View(employee);
        }


        [HttpPost]
        public ActionResult Edit(employee employee)
        {
            if (ModelState.IsValid)
            {
                employeesdd employeeBusinessLayer =
              new employeesdd();

                employeeBusinessLayer.SaveEmmployee(employee);

                return RedirectToAction("Index");
            }
            return View(employee);
        }

        [HttpPost]
        public ActionResult Delete(int id)
        {
            employeesdd employeeBusinessLayer =
              new employeesdd();

            employeeBusinessLayer.DeleteEmployee(id);

            return RedirectToAction("Index");
        }
    }
}