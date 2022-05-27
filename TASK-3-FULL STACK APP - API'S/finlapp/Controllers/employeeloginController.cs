using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using finlapp.Models;
using Microsoft.AspNet.Identity;

namespace finlapp.Controllers
{
    [Authorize]

 //   [EnableCors("*","*","*")]
     public class employeeloginController : ApiController
    {
         private UsersDBEntities2 db = new UsersDBEntities2();

       private IUsersDBEntities2Context db1 = new UsersDBEntities2();


        public employeeloginController() { }


        // GET: api/employeelogin/details         // main api to get details of the user logged in 


        [HttpGet]
    
        [Route("api/employeelogin/details")]
        public IHttpActionResult Getdetails()
        {
            string userid = User.Identity.GetUserId();

          

            var Employee =  db.employees.Where(x=>x.user_id == userid).ToList();


            if (Employee.Count == 0)
            {
                return StatusCode(HttpStatusCode.NotFound);
            }

            bindingemployee bindingemployee = new bindingemployee();

            var employee1 = bindingemployee.bindemp(Employee);


            return Ok(employee1[0]);

        }

        // GET: api/employeelogin/activeprojectcount                        // to get activeprojectcount

        [HttpGet]

        [Route("api/employeelogin/activeprojectcount")]


        public IHttpActionResult Getactiveprojectcount()
        {

            string userid = User.Identity.GetUserId();

            DateTime today = DateTime.Today;


           

            var projectslist = db.Project_members.Where(x => x.employee_id == userid   && x.project.project_status == "in progress").ToList().Count;


            var projectslist1 = db.Project_members.Where(x => x.employee_id == userid && x.project.project_status != "in progress" && x.project.fromdate  == today).ToList().Count;



            return Ok(projectslist+ projectslist1);

        }

        // GET: api/employeelogin/projectstatuscount                        // to get projecttimesheetcount

        [HttpGet]

        [Route("api/employeelogin/projectstatuscount")]


        public IHttpActionResult Getprojectstatuscount()
        {

            string userid = User.Identity.GetUserId();


            //   var created = db.projects.Where(x => x.manager_id == userid && x.project_status == "created").ToList().Count;

            //var notalloted = db.Project_members.Where(x => x.employee_id == userid && x.project_status == "not alloted").ToList().Count;

            var alloted = db.Project_members.Where(x => x.employee_id == userid && x.project.project_status == "alloted").ToList().Count;

            var inprogress = db.Project_members.Where(x => x.employee_id == userid && x.project.project_status == "in progress").ToList().Count;

            var approved = db.Project_members.Where(x => x.employee_id == userid && x.project.project_status == "approved").ToList().Count;

            var pending = db.Project_members.Where(x => x.employee_id == userid && x.project.project_status == "pending").ToList().Count;


            DateTime today = DateTime.Today;


            inprogress = inprogress + db.Project_members.Where(x => x.employee_id == userid && x.project.project_status == "alloted" && x.project.fromdate == today).ToList().Count;


            int[] array1 = new int[6];

            //   array1[0] = created;
          //  array1[0] = notalloted;
            array1[0] = alloted;
            array1[1] = inprogress;
            array1[2] = approved;
            array1[3] = pending;


            return Ok(array1);

        }


        // GET: api/employeelogin/projects           to get all project where emp is involved

        [HttpGet]
   
        [Route("api/employeelogin/projects")]
        public IHttpActionResult Getprojects()
        {

            string userid = User.Identity.GetUserId();

        

            var projects = db.Project_members.Where(x => x.employee_id == userid).Select(x=>x.project).ToList();

         


            if (projects.Count == 0)
            {
                return NotFound();
            }


            bindingproject bindingproject = new bindingproject();

            var projects1 = bindingproject.bindproject(projects);

            return Ok(projects1);
        }



        // GET: api/employeelogin/timesheets          to get all timesheets after created

        [HttpGet]
  
        [Route("api/employeelogin/timesheets")]
        public IHttpActionResult Gettimesheets()
        {

            string userid = User.Identity.GetUserId();

         

        

            var timesheets = db.timesheets.Where(x => x.Project_members.employee_id == userid).ToList();


            timesheets = timesheets.Where(x => x.status == "created").ToList();

            if (timesheets.Count == 0)
            {
                helperclass.err(User.Identity.GetUserId(), DateTime.UtcNow, 4);
                return NotFound();
            }


            bindingtimesheet bindingtimesheet = new bindingtimesheet();

            var bindingtimesheets1 = bindingtimesheet.bindtemp(timesheets);

            return Ok(bindingtimesheets1);


        }



        // GET: api/employeelogin/timesheets1          to get all timesheets after created on current date

        [HttpGet]

        [Route("api/employeelogin/timesheets1")]
        public IHttpActionResult Gettimesheets1()
        {

            string userid = User.Identity.GetUserId();

    

            DateTime today = DateTime.Today;

            string date = today.ToString("MM/dd/yyyy");

            var timesheets = db.timesheets.Where(x => x.Project_members.employee_id == userid & x.status== "created" && x.date == today).ToList();


         

            if (timesheets.Count == 0)
            {
                helperclass.err(User.Identity.GetUserId(), DateTime.UtcNow, 4);
                return NotFound();
            }


            bindingtimesheet bindingtimesheet = new bindingtimesheet();

            var bindingtimesheets1 = bindingtimesheet.bindtemp(timesheets);

            return Ok(bindingtimesheets1);


        }


        // Post: api/employeelogin/timesheetedit                   // to submit timesheet
        [HttpPost]
        [ResponseType(typeof(void))]
        [Route("api/employeelogin/timesheetedit")]
        public IHttpActionResult Posttimesheetedit(timesheetsubmission timesht)
        {
            var name = "Employee";

            if (db.timesheets.Find(timesht.id) != null)
            {

                db.timesheets.Find(timesht.id).hours = timesht.hours;
                db.timesheets.Find(timesht.id).description = timesht.description;
                db.timesheets.Find(timesht.id).status = "submitted";

                var employeename = db.timesheets.FirstOrDefault(x => x.id == timesht.id).Project_members.employee_id;

                 name = db.employees.FirstOrDefault(x => x.user_id == employeename).name;

                var timesheetid = timesht.id;

                var projctid = db.timesheets.FirstOrDefault(x => x.id == timesheetid).project_members_id;

                var projectid = db.Project_members.FirstOrDefault(x => x.id == projctid).project_id;

                db.projects.Find(projectid).project_status = "in progress";




            }
            else
            {
                helperclass.err(User.Identity.GetUserId(), DateTime.UtcNow, 4);
                return StatusCode(HttpStatusCode.NotFound);


            }

            try
            {
               

                db.SaveChanges();

                helperclass.mailbody(0, name, Convert.ToString(db.timesheets.Find(timesht.id).date), "submitted");


            }
            catch (DbUpdateConcurrencyException)
            {
                helperclass.err(User.Identity.GetUserId(), DateTime.UtcNow, 2);
                return StatusCode(HttpStatusCode.NotFound);

            }

            return StatusCode(HttpStatusCode.NoContent);
        }




        // GET: api/employeelogin/pendingtimesheets          to get all pendingtimesheets after submission

        [HttpGet]
        // [AcceptVerbs("GET")]
        [Route("api/employeelogin/pendingtimesheets")]
        public IHttpActionResult Getpendingtimesheets()
        {

            string userid = User.Identity.GetUserId();



            var timesheets = db.timesheets.Where(x => x.Project_members.employee_id == userid &&x.status!= "manager accepted" && x.status!= "manager rejected" && x.status != "created" && x.status != "reviewer rejected").ToList();


     

            if (timesheets.Count == 0)
            {
                helperclass.err(User.Identity.GetUserId(), DateTime.UtcNow, 4);
                return NotFound();
            }


            bindingtimesheet bindingtimesheet = new bindingtimesheet();

            var bindingtimesheets1 = bindingtimesheet.bindtemp(timesheets);

            return Ok(bindingtimesheets1);


        }



        // GET: api/employeelogin/timesheetshistory          to get all timesheets after submission

        [HttpGet]
        // [AcceptVerbs("GET")]
        [Route("api/employeelogin/timesheetshistory")]
        public IHttpActionResult Gettimesheetshistory()
        {

            string userid = User.Identity.GetUserId();

         

            var timesheets = db.timesheets.Where(x => x.Project_members.employee_id == userid &&( x.status == "manager accepted" || x.status == "manager rejected" || x.status=="reviewer rejected") && x.resubmit_flag == 0).ToList();


         

            if (timesheets.Count == 0)
            {
                helperclass.err(User.Identity.GetUserId(), DateTime.UtcNow, 4);
                return NotFound();
            }


            bindingtimesheet bindingtimesheet = new bindingtimesheet();

            var bindingtimesheets1 = bindingtimesheet.bindtemp(timesheets);

            return Ok(bindingtimesheets1);


        }



        // GET: api/employeelogin/resubmittimesheets            // to view timesheets for resubmission

        [HttpGet]
       
        [Route("api/employeelogin/resubmittimesheets")]
        public IHttpActionResult Getresubmittimesheets()
        {

            string userid = User.Identity.GetUserId();

      
      

            var timesheets = db.timesheets.Where(x => x.Project_members.employee_id == userid && x.resubmit_flag == 1 && x.status == "manager reviewed").ToList();

    

            if (timesheets.Count == 0)
            {
                helperclass.err(User.Identity.GetUserId(), DateTime.UtcNow, 4);
                return NotFound();
            }


            bindingtimesheet bindingtimesheet = new bindingtimesheet();

            var bindingtimesheets1 = bindingtimesheet.bindtemp(timesheets);

            return Ok(bindingtimesheets1);

        }





        // GET: api/employeelogin/weekhours            // to view timesheets for resubmission

        [HttpGet]

        [Route("api/employeelogin/weekhours")]
        public IHttpActionResult Getweekhours()
        {

            string userid = User.Identity.GetUserId();


            DayOfWeek day = DateTime.Now.DayOfWeek;
            int days = day - DayOfWeek.Monday;
            DateTime start = DateTime.Now.AddDays(-days);

            DateTime end = start.AddDays(4);




            string[] daysofweek = { "Monday", "Tuesday", "wednesday", "Thursday", "Friday" };

            string[] dates = new string[5];

            int i = 0;

            foreach (var dd in daysofweek)
            {

                DateTime start1 = start.AddDays(i);

                dates[i] = start1.ToString("MM/dd/yyyy");

                i++;
            }


            CultureInfo provider = CultureInfo.InvariantCulture;

            int[] hours = new int[5];

            int j = 0;

            foreach (var dd in dates)
            {

                DateTime df = DateTime.ParseExact(dd, "MM-dd-yyyy", provider);


                DateTime myDate = DateTime.ParseExact(dd, "MM-dd-yyyy",
                                       System.Globalization.CultureInfo.InvariantCulture);

                var workinghours = db.timesheets.Where(x => x.Project_members.employee_id == userid && x.date == df).Select(x => x.hours).ToList();


                if (workinghours.Count != 0)
                {

                    hours[j] = workinghours.Sum();

                }
                else
                {
                    hours[j] = 0;
                }

                j++;
            }


            bindingarrays bindingproject = new bindingarrays();

            var projectdetails = bindingproject.bindemp(hours, daysofweek);

            return Ok(projectdetails);
        }

        // GET: api/employeelogin/projecttimesheetcount                        // to get manager details

        [HttpGet]

            [Route("api/employeelogin/projecttimesheetcount")]


            public IHttpActionResult Getprojecttimesheetcount()
            {

                string userid = User.Identity.GetUserId();


            DateTime today = DateTime.Today;

            string date = today.ToString("MM/dd/yyyy");

            var todatsheet = db.timesheets.Where(x => x.Project_members.employee_id == userid & x.status == "created" && x.date == today).ToList();

            var pending = db.timesheets.Where(x => x.Project_members.employee_id == userid && x.status != "manager accepted" && x.status != "manager rejected" && x.status != "created").ToList();

            var history = db.timesheets.Where(x => x.Project_members.employee_id == userid && (x.status == "manager accepted" || x.status == "manager rejected") && x.resubmit_flag == 0).ToList();

            var resubmit = db.timesheets.Where(x => x.Project_members.employee_id == userid && x.resubmit_flag == 1 && x.status == "manager reviewed").ToList();



                int[] array1 = new int[3];

                array1[0] = history.Count+pending.Count;
                array1[1] = todatsheet.Count+resubmit.Count;
                array1[2] = array1[0]+array1[1];


                return Ok(array1);

            }




        // GET: api/employeelogin/bardata                        // to get manager details

        [HttpGet]

        [Route("api/employeelogin/bardata")]


        public IHttpActionResult Getbardata()
        {

            string userid = User.Identity.GetUserId();


            DateTime today = DateTime.Today;

            string date = today.ToString("MM/dd/yyyy");


            var dates = new[] { DateTime.Now, DateTime.Now, DateTime.Now };

            int month = today.Month;

            int  year = today.Year;

            string[] months = { "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" };


            string[] labels = new string[month];


            int[] reject = new int[month];

            int[] resubmit = new int[month];


            int i = 0;

            for(int k=0;k<month;k++ )
            {
                labels[i] = months[i] ;

                int j = i + 1;

                var  sheets = db.timesheet_analysis.Where(x => x.timesheet.Project_members.employee_id == userid && x.timesheet.date.Month == j && x.timesheet.date.Year==year).Select(x => x.reject_count).ToArray();
         
                if (sheets.Length != 0)
                {

                    reject[i] = Convert.ToInt32(sheets.Sum());
                }
                else
                {
                    reject[i] = 0;
                }

                var sheets1 = db.timesheet_analysis.Where(x => x.timesheet.Project_members.employee_id == userid && x.timesheet.date.Month == j && x.timesheet.date.Year == year).Select(x => x.resubmit_count).ToArray();

               
                if (sheets1.Length != 0)
                {

                    resubmit[i] = Convert.ToInt32(sheets1.Sum());
                }
                else
                {
                    resubmit[i] = 0;
                }

                i++;
            }

            reject[0] = 5;
            resubmit[0] = 2;
            reject[1] = 4;
            resubmit[1] = 7;
            reject[2] = 4;
            resubmit[2] = 2;
            binding2darrays bindingproject = new binding2darrays();

            var projectdetails = bindingproject.bindemp(reject,resubmit, labels);




            return Ok(projectdetails);

        }







        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool employeeExists(int id)
        {
            return db.employees.Count(e => e.id == id) > 0;
        }
    }
}