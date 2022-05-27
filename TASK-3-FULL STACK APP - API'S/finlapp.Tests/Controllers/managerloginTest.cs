using finlapp;
using finlapp.Controllers;
using finlapp.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using System.Web.Http.Results;

namespace finlapp.Tests.Controllers
{
    [TestClass]
    public class managerloginTest
    {
        [TestMethod]
        public void Get()
        {
            // Arrange
            managerloginController controller = new managerloginController();

            // Act
            IHttpActionResult result = controller.Getviewtimesheets();


            var contentResult = result as StatusCodeResult;


            Assert.AreEqual(HttpStatusCode.NotFound, contentResult.StatusCode);

   
        }


     


        [TestMethod]
        public void post()
        {
            // Arrange
            managerloginController controller = new managerloginController();

            project th = new project() { nameofservice = " application development", fromdate =  Convert.ToDateTime( "2021-03-22"),
                todate = Convert.ToDateTime("2021-03-22"), reviewr_id = "ab771e76-beea-4819-9b35-6c42b3823426", project_status="not alloted",
                manager_id = "774a8edb-6554-46d4-85d1-1d4f6911af7d", Project_details = "create app for ticket booking app"

            };

            // Act
            var result = controller.Postproject1(th) as StatusCodeResult;



            Assert.AreEqual(HttpStatusCode.OK, result.StatusCode);

        }

    }
}
