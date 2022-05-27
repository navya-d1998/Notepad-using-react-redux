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
    public class employeeloginTest
    {
        [TestMethod]
        public void Get()
        {
            // Arrange
            employeeloginController controller = new employeeloginController();

            // Act
            IHttpActionResult result = controller.Getdetails();


            var contentResult = result as  StatusCodeResult;

            // Assert
            //   Assert.IsNotNull(contentResult);

            //    Assert.IsNotNull(contentResult.Content);

       //     Assert.AreEqual("samp", contentResult.Content.name);

            //     Assert.IsInstanceOfType(result, typeof(Ok());


            // Assert.AreEqual(2, result.Count());
            //  Assert.AreEqual("value1", result.ElementAt(0));
            //  Assert.AreEqual("value2", result.ElementAt(1));
        }


     


        [TestMethod]
        public void post()
        {
            // Arrange
            employeeloginController controller = new employeeloginController();

            timesheetsubmission th = new timesheetsubmission() {id=18,hours=5,description="kkk" };

            // Act
            var result = controller.Posttimesheetedit(th) as StatusCodeResult;


            Assert.AreEqual(HttpStatusCode.NotFound, result.StatusCode);

        }

    }
    }
