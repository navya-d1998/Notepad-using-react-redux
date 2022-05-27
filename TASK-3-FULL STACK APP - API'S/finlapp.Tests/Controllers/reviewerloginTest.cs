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
    public class reviewerloginTest
    {

        [TestMethod]
        public void Get()
        {
            // Arrange
            reviewerloginController controller = new reviewerloginController();

            // Act
            IHttpActionResult result = controller.Getviewtimesheets();


            var contentResult = result as OkNegotiatedContentResult<List<timesheet>>;

            var result1 = controller.Getviewtimesheets() as StatusCodeResult;


            // Assert
            Assert.IsNull(contentResult);

            Assert.AreEqual(HttpStatusCode.NotFound, result1.StatusCode);



        }





        [TestMethod]
        public void post()
        {
            // Arrange
            reviewerloginController controller = new reviewerloginController();

            timesheetreview th = new timesheetreview()
            {
                id = 3,
                status = "reviewer accepted",
                comments ="can proceed further"

            };

            // Act
            var result = controller.Posttimesheetedit(th) as StatusCodeResult;


           Assert.AreEqual(HttpStatusCode.NotFound, result.StatusCode);

         

        }

    }
}
