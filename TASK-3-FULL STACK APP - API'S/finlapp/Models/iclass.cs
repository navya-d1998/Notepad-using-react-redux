using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace finlapp.Models
{
    public interface IUsersDBEntities2Context : IDisposable
    {
      
        DbSet<C__MigrationHistory> C__MigrationHistory { get; set; }
        DbSet<AspNetRole> AspNetRoles { get; set; }
        DbSet<AspNetUserClaim> AspNetUserClaims { get; set; }
        DbSet<AspNetUserLogin> AspNetUserLogins { get; set; }
         DbSet<AspNetUser> AspNetUsers { get; set; }
         DbSet<employee> employees { get; set; }
        DbSet<kkk> kkks { get; set; }
         DbSet<Project_members> Project_members { get; set; }
         DbSet<project_tasks> project_tasks { get; set; }
         DbSet<project> projects { get; set; }
         DbSet<timesheet> timesheets { get; set; }
         DbSet<timesheet_analysis> timesheet_analysis { get; set; }




        int SaveChanges();

        void MarkAsModified(C__MigrationHistory item);
        void MarkAsModified(AspNetUser item);

        void MarkAsModified(AspNetRole item);
        void MarkAsModified(AspNetUserClaim item);

        void MarkAsModified(AspNetUserLogin item);
        void MarkAsModified(employee item);

        void MarkAsModified(project item);
        void MarkAsModified(project_tasks item);

        void MarkAsModified(Project_members item);
        void MarkAsModified(timesheet item);

        void MarkAsModified(timesheet_analysis item);




    }
}