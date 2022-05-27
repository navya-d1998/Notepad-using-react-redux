using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using System.Web.Http.Description;
using finlapp.Models;
using Microsoft.AspNet.Identity;

namespace finlapp.Controllers
{
       [Authorize]
    public class managerloginController : ApiController
    {

        private UsersDBEntities2 db = new UsersDBEntities2();

        private IUsersDBEntities2Context db1 = new UsersDBEntities2();

        public managerloginController() { }





        // GET: api/managerlogin/projecttasks/1                        // to get projecttasks

        [HttpGet]

        [Route("api/managerlogin/projecttasks/{id:int}")]


        public IHttpActionResult Getprojecttasks(int id)
        {

            string userid = User.Identity.GetUserId();


            var tasks = db.project_tasks.Where(x => x.project_id == id).ToList();

            bindingproject_tasks bindingproject = new bindingproject_tasks();

            var projects1 = bindingproject.bindemp(tasks);

            return Ok(projects1);

        }


        // GET: api/managerlogin/activeprojectcount                        // to get activeprojectcount

        [HttpGet]

        [Route("api/managerlogin/activeprojectcount")]


        public IHttpActionResult Getactiveprojectcount()
        {

            string userid = User.Identity.GetUserId();

            DateTime today = DateTime.Today;

           

            var projectslist = db.projects.Where(x => x.manager_id == userid && x.project_status == "in progress" ).ToList().Count;


            var projectlist1 = db.projects.Where(x => x.manager_id == userid && x.fromdate == today && x.project_status != "in progress").Select(x=>x.id).ToList().Count;



            return Ok(projectslist+ projectlist1);

        }









        // GET: api/managerlogin/details                        // to get manager details

        [HttpGet]
    
        [Route("api/managerlogin/details")]

        [ResponseType(typeof(employee))]
        public employee Getdetails()
        {

            string userid = User.Identity.GetUserId();


            var projectslist = db.projects.Where(x => x.manager_id == userid && x.project_status == "created").ToList();


            return db.employees.FirstOrDefault(x => x.user_id == userid);

        }





        // GET: api/managerlogin/projects                   // // to get project  details created by manager

        [HttpGet]
       // [AcceptVerbs("GET")]
        [Route("api/managerlogin/projects")]
        public IHttpActionResult Getprojects()
        {

            string userid = User.Identity.GetUserId();


            var projectslist = db.projects.Where(x => x.manager_id == userid && x.project_status == "created").ToList();

            if (projectslist.Count == 0)
            {
                return StatusCode(HttpStatusCode.NotFound);

            }

            bindingproject bindingproject = new bindingproject();

            var projects1 = bindingproject.bindproject(projectslist);


            return Ok(projects1);
        }



        // GET: api/managerlogin/createdprojects                   // // to get project  details after created by manager
                                                                     //       (to    add   tasks    )
        [HttpGet]
        // [AcceptVerbs("GET")]
        [Route("api/managerlogin/createdprojects")]
        public IHttpActionResult Getcreatedprojects()
        {

            string userid = User.Identity.GetUserId();

            // && x.project_status!= "alloted"

            var projectslist = db.projects.Where(x => x.manager_id == userid && x.project_status!= "created"  && x.project_status!= "not alloted" ).ToList();

            if (projectslist.Count == 0)
            {
                return StatusCode(HttpStatusCode.NotFound);

            }

            bindingproject bindingproject = new bindingproject();

            var projects1 = bindingproject.bindproject(projectslist);


            return Ok(projects1);
        }


        // GET: api/managerlogin/allreviewers              // view all reviewers present

        [HttpGet]
        // [AcceptVerbs("GET")]
        [Route("api/managerlogin/allreviewers")]
        public IHttpActionResult Getallreviewers()
        {
            

            var reviewers = db.employees.Where(x=>x.designation == "reviewer").ToList();

            if (reviewers.Count == 0)
            {
                helperclass.err(User.Identity.GetUserId(), DateTime.UtcNow, 4);
                return StatusCode(HttpStatusCode.NotFound);
            }

            bindingemployee bindingemployee = new bindingemployee();

            var reviewers1 = bindingemployee.bindemp(reviewers);


            return Ok(reviewers1);


        }





        // POST: api/managerlogin/project1                      // to create a project 

        [HttpPost]
       // [AcceptVerbs("POST")]
        [Route("api/managerlogin/project1")]
        [ResponseType(typeof(project))]
        public IHttpActionResult Postproject1(project project)
        {
            if (!ModelState.IsValid)
            {
                helperclass.err(User.Identity.GetUserId(), DateTime.UtcNow, 5);

                return StatusCode(HttpStatusCode.BadRequest);

               // return BadRequest(ModelState);
            }

              project.manager_id = User.Identity.GetUserId().ToString();



            project.project_status = "created";

            try
            {

                db.projects.Add(project);
                db.SaveChanges();
            }
            catch(DbUpdateConcurrencyException )
            {
                return StatusCode(HttpStatusCode.BadRequest);
            }

           

            return StatusCode(HttpStatusCode.OK);
        }



        // POST: api/managerlogin/project_tasks                     // to create a project _ tasks

        [HttpPost]
        //[AcceptVerbs("POST")]
        [Route("api/managerlogin/project_tasks")]
        [ResponseType(typeof(project_tasks))]
        public IHttpActionResult Postproject_tasks(project_tasks project_tasks)
        {
            if (!ModelState.IsValid)
            {

                helperclass.err(User.Identity.GetUserId(), DateTime.UtcNow, 5);

                return BadRequest(ModelState);
            }

            if (ModelState.IsValid)
            {
                db.project_tasks.Add(project_tasks);
                db.SaveChanges();
            }

         

            return StatusCode(HttpStatusCode.OK);
        }



        // POST: api/managerlogin/creatingtimesheets/1                     // to create all timesheets for project

        [HttpGet, HttpPost]
        [Route("api/managerlogin/creatingtimesheets/{id:int}")]
       // [ResponseType(typeof(project_tasks))]
        public IHttpActionResult Postcreatingtimesheets(int id)    
        {


            helperclass helperclass = new helperclass();

            var timesheets = helperclass.creatingtimesheets(id);             // send id of the project if project status is employes assinigned


            if (!ModelState.IsValid)
            {
                helperclass.err(User.Identity.GetUserId(), DateTime.UtcNow, 5);

                return BadRequest(ModelState);
            }


            foreach (var timesheet1 in timesheets)
            {

                db.timesheets.Add(timesheet1);
                db.SaveChanges();

            }

                return Ok();
            
        }





        // Post: api/managerlogin/projectedit        // to change project status after creating timesheets or after completion of the project       
        [HttpPost]
        [ResponseType(typeof(void))]
        [Route("api/managerlogin/projectedit")]
        public IHttpActionResult Postprojectedit(projectstatus projectstatus)
        {

            if (db.projects.Find(projectstatus.id) != null)
            {

                db.projects.Find(projectstatus.id).project_status = projectstatus.status;
            }
            else
            {
                return NotFound();
            }

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                helperclass.err(User.Identity.GetUserId(), DateTime.UtcNow, 6);
                return NotFound();

            }

            return StatusCode(HttpStatusCode.OK);
        }








        [HttpGet]                                       // to view all timsheets related to  that manager after reviewer accepted
        // [AcceptVerbs("GET")]
        [Route("api/managerlogin/viewtimesheets")]
        public IHttpActionResult Getviewtimesheets()
        {

            string userid = User.Identity.GetUserId();

       

            var timesheets1 = db.timesheets.Where(x => x.Project_members.project.manager_id == userid).ToList() ;

            timesheets1 = timesheets1.Where(x => x.status == "reviewer accepted").ToList() ;

            if (timesheets1.Count == 0)
            {
                return StatusCode(HttpStatusCode.NotFound);
            }

            bindingtimesheet bindingtimesheet = new bindingtimesheet();

            var bindingtimesheets1 = bindingtimesheet.bindtemp(timesheets1);



            return Ok(bindingtimesheets1);

          
        }


        [HttpGet]                                       // to view all resubmitted timsheets related to  that manager after submitted
        // [AcceptVerbs("GET")]
        [Route("api/managerlogin/viewresubmittedtimesheets")]
        public IHttpActionResult Getviewresubmittedtimesheets()
        {

            string userid = User.Identity.GetUserId();
 

            var timesheets1 = db.timesheets.Where(x => x.Project_members.project.manager_id == userid).ToList();

            timesheets1 = timesheets1.Where(x => x.resubmit_flag == 1  && x.status== "submitted").ToList();

            if (timesheets1.Count == 0)
            {
                return NotFound();
            }

            bindingtimesheet bindingtimesheet = new bindingtimesheet();

            var bindingtimesheets2 = bindingtimesheet.bindtemp(timesheets1);

            return Ok(bindingtimesheets2);

        }



        // Post: api/managerlogin/timesheetedit                   // to approve/reject timesheet including resubmission
        [HttpPost]
        [ResponseType(typeof(void))]
        [Route("api/managerlogin/timesheetedit")]
        public IHttpActionResult Posttimesheetedit(managertimesheetreview timesht)
        {
            var name = "Employee";
            try
            {
                if (db.timesheets.Find(timesht.id) != null)
            {

                db.timesheets.Find(timesht.id).status = timesht.status;
                db.timesheets.Find(timesht.id).comments_manager = timesht.comments;
                db.timesheets.Find(timesht.id).resubmit_flag = timesht.flag;

                    var employeename = db.timesheets.FirstOrDefault(x => x.id == timesht.id).Project_members.employee_id;

                     name = db.employees.FirstOrDefault(x => x.user_id == employeename).name;

                helperclass helperclass = new helperclass();

                helperclass.updatingtimesheetanalysis(timesht, User.Identity.GetUserName());

            }
            else
            {
                return StatusCode(HttpStatusCode.NotFound);
            }
             
                db.SaveChanges();

                helperclass.mailbody(2, name, Convert.ToString(  db.timesheets.Find(timesht.id).date), timesht.status);
            }
            catch (DbUpdateConcurrencyException)
            {
                helperclass.err(User.Identity.GetUserId(), DateTime.UtcNow, 6);

                return StatusCode(HttpStatusCode.BadRequest);

            }

            return StatusCode(HttpStatusCode.OK);
        }



        [HttpGet]                                       // to view all reject count of employee
        // [AcceptVerbs("GET")]
        [Route("api/managerlogin/viewanalysisreject/{id}")]
        public IHttpActionResult Getviewanalysisreject(string id)
        {

            string userid = User.Identity.GetUserId();

            var sheets = db.timesheet_analysis.Where(x => x.timesheet.Project_members.employee_id == id).Select(x=>x.reject_count).ToList();

            int rejectcount =0;

            if (sheets.Count == 0)
            {
                return NotFound();
            }
            else
            {
                rejectcount = Convert.ToInt32(sheets.Sum());
            }

            return Ok(rejectcount);

        }

        [HttpGet]                                       // to view all reject count of employee
        // [AcceptVerbs("GET")]
        [Route("api/managerlogin/viewanalysisresubmit/{id}")]
        public IHttpActionResult Getviewanalysisresubmit(string id)
        {

            string userid = User.Identity.GetUserId();

            var sheets = db.timesheet_analysis.Where(x => x.timesheet.Project_members.employee_id == id).Select(x => x.resubmit_count).ToList();

            int resubmitcount = 0;

            if (sheets.Count == 0)
            {
                return NotFound();
            }
            else
            {
                resubmitcount = Convert.ToInt32(sheets.Sum());
            }

            return Ok(resubmitcount);

        }


        // GET: api/managerlogin/projectdetails/1                        // to get projectdetails details

        [HttpGet]

        [Route("api/managerlogin/projectdetails/{id:int}")]


        public IHttpActionResult Getprojectdetails(int id)
        {

            string userid = User.Identity.GetUserId();

            if (db.projects.Find(id) != null)
            {

                var project = db.projects.FirstOrDefault(x => x.id == id);

                var projectstatus = project.project_status;

                var managername = project.manager_id;
                var reviewer = project.reviewr_id;

                var projectname = project.nameofservice;
                var fromdate = project.fromdate;

                DateTime today = DateTime.Today;

                //  string date = today.ToString("MM/dd/yyyy");

                var lastdate1 = db.timesheets.Where(x => x.Project_members.project_id == id).ToList();


                var lastsheet = lastdate1[lastdate1.Count - 1];

                DateTime lastdate = lastsheet.date;

                var daysleft = "0";
                int totalDays = 0;

                if (today < lastdate)
                {

                    totalDays = Convert.ToInt32((lastdate - DateTime.UtcNow.Date).TotalDays);

                    daysleft = (lastdate - today).TotalDays.ToString();
                }


                var timesheetstotal = db.timesheets.Where(x => x.Project_members.project_id == id).Count();

                int acceptedcount = db.timesheets.Where(x => x.Project_members.project_id == id && x.status == "manager accepted").Count();

                int rejectedcount = db.timesheets.Where(x => x.Project_members.project_id == id && (x.status == "manager rejected" || x.status == "reviewer rejected")).Count();

                int pending = timesheetstotal - acceptedcount - rejectedcount;

                projectdetails bindingproject = new projectdetails();

                var projectdetails = bindingproject.projectdetailsbind(id, projectname, fromdate, totalDays, acceptedcount, rejectedcount, pending, projectstatus);

                return Ok(projectdetails);
            }
            else
            {
                return StatusCode(HttpStatusCode.NotFound);
            }

        }



        // GET: api/managerlogin/projecthours                        // to get projecthours

        [HttpGet]

        [Route("api/managerlogin/projecthours")]


        public IHttpActionResult Getprojecthours()
        {

            string userid = User.Identity.GetUserId();


            var projectids = db.projects.Where(x => x.manager_id == userid).Select(x => x.id).ToArray();


            var projectnames = db.projects.Where(x => x.manager_id == userid).Select(x => x.nameofservice).ToArray();

            int[] hours = new int[projectids.Length];

            var projecthours = new Array[projectids.Length];

            int i = 0;

            foreach(var id in projectids)
            {
                var sheets = db.timesheets.Where(x => x.Project_members.project_id == id).Select(x=>x.hours).ToArray();

                if(sheets.Length !=0)
                {

                    hours[i] = sheets.Sum();
                }
                else
                {
                    hours[i] = 0;
                }


                i++;

            }

            bindingarrays bindingproject = new bindingarrays();

            var projectdetails = bindingproject.bindemp(hours,projectnames);


            return Ok(projectdetails);

        }


        // GET: api/managerlogin/projectcount                        // to get projectcount

        [HttpGet]

        [Route("api/managerlogin/projectcount")]


        public IHttpActionResult Getprojectcount()
        {

            string userid = User.Identity.GetUserId();


            var projectids = db.projects.Where(x => x.manager_id == userid && x.project_status!= "approved").Select(x => x.id).ToArray();


            var projectnames = db.projects.Where(x => x.manager_id == userid && x.project_status != "approved").Select(x => x.nameofservice).ToArray();

            int[] employeecount = new int[projectids.Length];

            var projecthours = new Array[projectids.Length];

            int i = 0;

            foreach (var id in projectids)
            {
                var sheets = db.Project_members.Where(x => x.project_id == id).Select(x => x.employee_id).ToArray();

                if (sheets.Length != 0)
                {

                    employeecount[i] = sheets.Length;
                }
                else
                {
                    employeecount[i] = 0;
                }


                i++;

            }

            bindingarrays bindingproject = new bindingarrays();

            var projectdetails = bindingproject.bindemp(employeecount, projectnames);


            return Ok(projectdetails);

        }




        // GET: api/managerlogin/projecttimesheetcount                        // to get projecttimesheetcount

        [HttpGet]

        [Route("api/managerlogin/projecttimesheetcount")]


        public IHttpActionResult Getprojecttimesheetcount()
        {

            string userid = User.Identity.GetUserId();


            var reviewed = db.timesheets.Where(x => x.Project_members.project.manager_id == userid && (x.status == "manager accepted" || x.status == "manager rejected" || x.status == "manager reviewed")).Count();

            var total = db.timesheets.Where(x => x.Project_members.project.manager_id == userid && x.status != "manager accepted" && x.status != "manager rejected" && x.status != "manager reviewed" && x.status != "submitted" && x.resubmit_flag != 1 && x.status != "created" && x.status != "reviewer rejected").Count();

            var total1 = db.timesheets.Where(x => x.Project_members.project.manager_id == userid && x.status == "submitted" && x.resubmit_flag == 1 ).Count();


            int pending = 0;

          

            int[] array1 = new int[3];

            array1[0] = reviewed;
            array1[1] = total + total1;
            array1[2] = reviewed+total;


            return Ok(array1);

        }




        // GET: api/managerlogin/projectstatuscount                        // to get projecttimesheetcount

        [HttpGet]

        [Route("api/managerlogin/projectstatuscount")]


        public IHttpActionResult Getprojectstatuscount()
        {

            string userid = User.Identity.GetUserId();


            var created = db.projects.Where(x => x.manager_id == userid && x.project_status == "created").ToList().Count;

            var notalloted = db.projects.Where(x => x.manager_id == userid && x.project_status == "not alloted").ToList().Count;

            var alloted = db.projects.Where(x => x.manager_id == userid && x.project_status == "alloted").ToList().Count;

            var inprogress = db.projects.Where(x => x.manager_id == userid && x.project_status == "in progress").ToList().Count;

            var approved = db.projects.Where(x => x.manager_id == userid && x.project_status == "approved").ToList().Count;

            var pending = db.projects.Where(x => x.manager_id == userid && x.project_status == "pending").ToList().Count;


            DateTime today = DateTime.Today;


            inprogress = inprogress + db.projects.Where(x => x.manager_id == userid && x.project_status == "alloted" && x.fromdate == today).ToList().Count;


            int[] array1 = new int[6];

            array1[0] = created;
            array1[1] = notalloted;
            array1[2] = alloted;
            array1[3] = inprogress;
            array1[4] = approved;
            array1[5] = pending;
       

            return Ok(array1);

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