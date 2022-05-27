using finlapp.Models;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace finlapp.Controllers
{
    public class helperController : ApiController
    {
        private UsersDBEntities2 db = new UsersDBEntities2();

        [Authorize]

        [HttpGet]

        [Route("api/helper/role")]
        public IHttpActionResult Getrole()
        {
            string userid = User.Identity.GetUserId();

           // userid = "085cf851-bdd6-4895-a6c7-7fdcbe791e22";

            var Employee = db.employees.FirstOrDefault(x => x.user_id == userid);

            var desig = Employee.designation;
            var name = Employee.name;

            string[] arry = new string[2];

            arry[0] = desig;
            arry[1] = name;


            return Ok(arry);

        }







    }
}
