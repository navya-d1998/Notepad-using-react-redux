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
using finlapp.Models;

namespace finlapp.Controllers
{
    public class timesheet_analysisController : ApiController
    {
        private UsersDBEntities2 db = new UsersDBEntities2();

        // GET: api/timesheet_analysis
        public IQueryable<timesheet_analysis> Gettimesheet_analysis()
        {
            return db.timesheet_analysis;
        }

        // GET: api/timesheet_analysis/5
        [ResponseType(typeof(timesheet_analysis))]
        public IHttpActionResult Gettimesheet_analysis(int id)
        {
            timesheet_analysis timesheet_analysis = db.timesheet_analysis.Find(id);
            if (timesheet_analysis == null)
            {
                return NotFound();
            }

            return Ok(timesheet_analysis);
        }

        // PUT: api/timesheet_analysis/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Puttimesheet_analysis(int id, timesheet_analysis timesheet_analysis)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != timesheet_analysis.id)
            {
                return BadRequest();
            }



            //     db.Entry(timesheet_analysis).State = EntityState.Modified;

            db.MarkAsModified(timesheet_analysis);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!timesheet_analysisExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/timesheet_analysis
        [ResponseType(typeof(timesheet_analysis))]
        public IHttpActionResult Posttimesheet_analysis(timesheet_analysis timesheet_analysis)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.timesheet_analysis.Add(timesheet_analysis);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = timesheet_analysis.id }, timesheet_analysis);
        }

        // DELETE: api/timesheet_analysis/5
        [ResponseType(typeof(timesheet_analysis))]
        public IHttpActionResult Deletetimesheet_analysis(int id)
        {
            timesheet_analysis timesheet_analysis = db.timesheet_analysis.Find(id);
            if (timesheet_analysis == null)
            {
                return NotFound();
            }

            db.timesheet_analysis.Remove(timesheet_analysis);
            db.SaveChanges();

            return Ok(timesheet_analysis);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool timesheet_analysisExists(int id)
        {
            return db.timesheet_analysis.Count(e => e.id == id) > 0;
        }
    }
}