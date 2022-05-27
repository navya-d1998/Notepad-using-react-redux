using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Security.AccessControl;
using System.Threading;
using System.Web;

namespace WebApplication1.Models
{
    public class employeeDbContext : DbContext
    {
        public employeeDbContext()
        {

        }

        public DbSet<employee> employee { get; set; }
        public DbSet<Department> Department { get; set; }
    }
}