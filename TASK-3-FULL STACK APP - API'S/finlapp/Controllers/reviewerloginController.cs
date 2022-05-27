using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Microsoft.AspNet.Identity;
using finlapp.Models;
using System.Text;
using System.Configuration;

namespace finlapp.Controllers
{

    [Authorize]

    public class reviewerloginController : ApiController
    {

        private UsersDBEntities2 db = new UsersDBEntities2();



        // GET: api/reviewerlogin/activeprojectcount                        // to get activeprojectcount

        [HttpGet]

        [Route("api/reviewerlogin/activeprojectcount")]


        public IHttpActionResult Getactiveprojectcount()
        {

            string userid = User.Identity.GetUserId();

            var projectslist = db.projects.Where(x => x.reviewr_id == userid && x.project_status == "in progress").ToList().Count;

            DateTime today = DateTime.Today;

            var projectlist1 = db.projects.Where(x => x.reviewr_id == userid && x.fromdate == today && x.project_status != "in progress").Select(x => x.id).ToList().Count;


            return Ok(projectslist + projectlist1);

        }



        // GET: api/reviewerlogin/projectstatuscount                        // to get projecttimesheetcount

        [HttpGet]

        [Route("api/reviewerlogin/projectstatuscount")]


        public IHttpActionResult Getprojectstatuscount()
        {

            string userid = User.Identity.GetUserId();


         //   var created = db.projects.Where(x => x.manager_id == userid && x.project_status == "created").ToList().Count;

            var notalloted = db.projects.Where(x => x.reviewr_id == userid && x.project_status == "not alloted").ToList().Count;

            var alloted = db.projects.Where(x => x.reviewr_id == userid && x.project_status == "alloted").ToList().Count;

            var inprogress = db.projects.Where(x => x.reviewr_id == userid && x.project_status == "in progress").ToList().Count;

            var approved = db.projects.Where(x => x.reviewr_id == userid && x.project_status == "approved").ToList().Count;

            var pending = db.projects.Where(x => x.reviewr_id == userid && x.project_status == "pending").ToList().Count;


            DateTime today = DateTime.Today;


            inprogress = inprogress + db.projects.Where(x => x.reviewr_id == userid && x.project_status == "alloted" && x.fromdate == today).ToList().Count;


            int[] array1 = new int[6];

         //   array1[0] = created;
            array1[0] = notalloted;
            array1[1] = alloted;
            array1[2] = inprogress;
            array1[3] = approved;
            array1[4] = pending;


            return Ok(array1);

        }
        // GET: api/reviewerlogin/viewtimesheets                        // to view submitted timesheest related to reviewer

        [Route("api/reviewerlogin/viewtimesheets")]
        public IHttpActionResult Getviewtimesheets()
        {

            string userid = User.Identity.GetUserId();





            var timesheets1 = db.timesheets.Where(x => x.Project_members.project.reviewr_id == userid && x.status== "submitted" && x.resubmit_flag==0).ToList();

            if (timesheets1.Count == 0)
            {
                 return StatusCode(HttpStatusCode.NotFound);
            }
            else
            {



           

                if (timesheets1.Count == 0)
                {
                    return StatusCode(HttpStatusCode.NotFound);
                }
            }

            bindingtimesheet bindingtimesheet = new bindingtimesheet();

            var bindingtimesheets2 = bindingtimesheet.bindtemp(timesheets1);

            return Ok(bindingtimesheets2);

        }




        // Post: api/reviewerlogin/timesheetedit                   // to approve/reject timesheet
        [HttpPost]
        [ResponseType(typeof(void))]
        [Route("api/reviewerlogin/timesheetedit")]
        public IHttpActionResult Posttimesheetedit(timesheetreview timesht)
        {
            var name = "Employee";

            if (db.timesheets.Find(timesht.id) != null)
            {

                db.timesheets.Find(timesht.id).status = timesht.status;
                db.timesheets.Find(timesht.id).comments_reviwer = timesht.comments;

                var employeename = db.timesheets.FirstOrDefault(x => x.id == timesht.id).Project_members.employee_id;

                 name = db.employees.FirstOrDefault(x => x.user_id == employeename).name;

                helperclass helperclass = new helperclass();

                helperclass.updatingtimesheetanalysreviewer(timesht, User.Identity.GetUserName());



            }
            else
            {
                return StatusCode(HttpStatusCode.NotFound);
            }

            try
            {

                db.SaveChanges();

                helperclass.mailbody(1, name, Convert.ToString(db.timesheets.Find(timesht.id).date), timesht.status);


            }
            catch (DbUpdateConcurrencyException)
            {

                if (!timesheetExists(timesht.id))
                {
                    helperclass.err(User.Identity.GetUserId(), DateTime.UtcNow, 2);

                    return NotFound();
                }
                else
                {
                    helperclass.err(User.Identity.GetUserId(), DateTime.UtcNow, 7);

                    throw;
                }

            }

            return StatusCode(HttpStatusCode.OK);
        }



        // GET: api/reviewerlogin/details                        // to get reviewer details

        [HttpGet]
        // [AcceptVerbs("GET")]
        [Route("api/reviewerlogin/details")]

        [ResponseType(typeof(employee))]
        public IHttpActionResult Getdetails()
        {


            string userid = User.Identity.GetUserId();

    

            var reviewer =  db.employees.Where(x => x.user_id == userid).ToList();

            if (reviewer.Count == 0)
            {
              //  return NotFound();
            }


            bindingemployee bindingemployee = new bindingemployee();

            var employee1 = bindingemployee.bindemp(reviewer);


            return Ok(employee1[0]);


        }





        // GET: api/reviewerlogin/projects                   // // to get not alloted project  details assigned to reviewer

        [HttpGet]
        // [AcceptVerbs("GET")]
        [Route("api/reviewerlogin/projects")]
        public IHttpActionResult Getprojects()
        {

            string userid = User.Identity.GetUserId();


            var projectslist = db.projects.Where(x => x.reviewr_id == userid && x.project_status == "not alloted").ToList();



            if (projectslist.Count == 0)
            {
                return NotFound();
            }


            bindingproject bindingproject = new bindingproject();

            var projects1 = bindingproject.bindproject(projectslist);


            return Ok(projects1);

        }

        // GET: api/reviewerlogin/projectshistory                   // // to get alloted project  details assigned to reviewer

        [HttpGet]
      
        [Route("api/reviewerlogin/projectshistory")]
        public IHttpActionResult Getprojectshistory()
        {

            string userid = User.Identity.GetUserId();

        

            var projectslist = db.projects.Where(x => x.reviewr_id == userid && x.project_status != "created" && x.project_status != "not alloted").ToList();



            if (projectslist.Count == 0)
            {
                return NotFound();
            }

            bindingproject bindingproject = new bindingproject();

            var projects1 = bindingproject.bindproject(projectslist);


            return Ok(projects1);

        }


        // GET: api/reviewerlogin/allemployees             // view all employees present

        [HttpGet]
   
        [Route("api/reviewerlogin/allemployees")]
        public IHttpActionResult Getallemployees()
        {
            

            var Employee = db.employees.Where(x => x.designation == "employee").ToList();

            if (Employee.Count == 0)
            {
                return NotFound();
            }

            bindingemployee bindingemployee = new bindingemployee();

            var employee1 = bindingemployee.bindemp(Employee);


            return Ok(employee1);
        }




        // Post: api/reviewerlogin/Project_members                        // to assign project members

        [HttpPost]
       
        [Route("api/reviewerlogin/Project_members")]
        [ResponseType(typeof(Project_members))]
        public IHttpActionResult PostProject_members(Project_members project_members)
        {
            if (!ModelState.IsValid)
            {
                helperclass.err(User.Identity.GetUserId(), DateTime.UtcNow, 8);

                return BadRequest(ModelState);

            }

            db.Project_members.Add(project_members);
            db.SaveChanges();

         

            return StatusCode(HttpStatusCode.OK);
        }



        // Post: api/reviewerlogin/projectedit/1                   // to change project status after assigning  project members
        [HttpPost]
        [ResponseType(typeof(void))]
        [Route("api/reviewerlogin/projectedit/{id:int}")]
        public IHttpActionResult Postprojectedit(int id )
        {

            if (db.projects.Find(id) != null)
            {

                db.projects.Find(id).project_status = "alloted";

                helperclass helperclass = new helperclass();

                var timesheets = helperclass.creatingtimesheets(id);             // send id of the project if project status is employes assinigned


                


                foreach (var timesheet1 in timesheets)
                {

                    db.timesheets.Add(timesheet1);

                    db.SaveChanges();

                }

                

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
                helperclass.err(User.Identity.GetUserId(), DateTime.UtcNow, 7);
                return NotFound();
              
            }

            return StatusCode(HttpStatusCode.NoContent);
        }


        // GET: api/reviewerlogin/projecthours                        // to get projecthours

        [HttpGet]

        [Route("api/reviewerlogin/projecthours")]


        public IHttpActionResult Getprojecthours()
        {

            string userid = User.Identity.GetUserId();


            var projectids = db.projects.Where(x => x.reviewr_id == userid).Select(x => x.id).ToArray();


            var projectnames = db.projects.Where(x => x.reviewr_id == userid).Select(x => x.nameofservice).ToArray();

            int[] hours = new int[projectids.Length];

            var projecthours = new Array[projectids.Length];

            int i = 0;

            foreach (var id in projectids)
            {
                var sheets = db.timesheets.Where(x => x.Project_members.project_id == id).Select(x => x.hours).ToArray();

                if (sheets.Length != 0)
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

            var projectdetails = bindingproject.bindemp(hours, projectnames);


            return Ok(projectdetails);

        }



        // GET: api/reviewerlogin/projectcount                        // to get projectcount

        [HttpGet]

        [Route("api/reviewerlogin/projectcount")]


        public IHttpActionResult Getprojectcount()
        {

            string userid = User.Identity.GetUserId();


            var projectids = db.projects.Where(x => x.reviewr_id == userid).Select(x => x.id).ToArray();


            var projectnames = db.projects.Where(x => x.reviewr_id == userid).Select(x => x.nameofservice).ToArray();

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




        // GET: api/reviewerlogin/projecttimesheetcount                        // to get projecttimesheetcount

        [HttpGet]

        [Route("api/reviewerlogin/projecttimesheetcount")]


        public IHttpActionResult Getprojecttimesheetcount()
        {

            string userid = User.Identity.GetUserId();


            var reviewed = db.timesheets.Where(x => x.Project_members.project.reviewr_id == userid && (x.status == "manager accepted" || x.status == "manager rejected" || x.status == "manager reviewed" || x.status == "reviewer accepted" || x.status == "reviewer rejected")).Count();

            var pending = db.timesheets.Where(x => x.Project_members.project.reviewr_id == userid && x.status == "submitted" && x.resubmit_flag != 1  && x.status != "created").Count();

        

            int[] array1 = new int[3];

            array1[0] = reviewed;
            array1[1] = pending;
            array1[2] = reviewed + pending;


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

        private bool timesheetExists(int id)
        {
            return db.timesheets.Count(e => e.id == id) > 0;
        }
    }
}