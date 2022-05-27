using System;
using System.Data.Entity;
using System.Linq;
using finlapp.Models;

namespace finlapp.Tests
{
    public class TestfinlappContext : IUsersDBEntities2Context
    {
        public TestfinlappContext()
        {
            this.employees = new TestProductDbSet();
        }



        public virtual DbSet<C__MigrationHistory> C__MigrationHistory { get; set; }
        public virtual DbSet<AspNetRole> AspNetRoles { get; set; }
        public virtual DbSet<AspNetUserClaim> AspNetUserClaims { get; set; }
        public virtual DbSet<AspNetUserLogin> AspNetUserLogins { get; set; }
        public virtual DbSet<AspNetUser> AspNetUsers { get; set; }
        public virtual DbSet<employee> employees { get; set; }
        public virtual DbSet<kkk> kkks { get; set; }
        public virtual DbSet<Project_members> Project_members { get; set; }
        public virtual DbSet<project_tasks> project_tasks { get; set; }
        public virtual DbSet<project> projects { get; set; }
        public virtual DbSet<timesheet> timesheets { get; set; }
        public virtual DbSet<timesheet_analysis> timesheet_analysis { get; set; }
        public int SaveChanges()
        {
            return 0;
        }

        public void MarkAsModified(employee item) { }
        public void Dispose() { }

        public void MarkAsModified(C__MigrationHistory item)
        {
            throw new NotImplementedException();
        }

        public void MarkAsModified(AspNetUser item)
        {
            throw new NotImplementedException();
        }

        public void MarkAsModified(AspNetRole item)
        {
            throw new NotImplementedException();
        }

        public void MarkAsModified(AspNetUserClaim item)
        {
            throw new NotImplementedException();
        }

        public void MarkAsModified(AspNetUserLogin item)
        {
            throw new NotImplementedException();
        }

        public void MarkAsModified(project item)
        {
            throw new NotImplementedException();
        }

        public void MarkAsModified(project_tasks item)
        {
            throw new NotImplementedException();
        }

        public void MarkAsModified(Project_members item)
        {
            throw new NotImplementedException();
        }

        public void MarkAsModified(timesheet item)
        {
            throw new NotImplementedException();
        }

        public void MarkAsModified(timesheet_analysis item)
        {
            throw new NotImplementedException();
        }
    }
}
