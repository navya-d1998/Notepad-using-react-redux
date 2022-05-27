using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity.Infrastructure;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Web;
using System.Web.Http;

namespace finlapp.Models
{
    public class helperclass
    {
        private UsersDBEntities2 db = new UsersDBEntities2();



        public  void addingemployees(string username, string namee, string designationn, string addresss, string genderr )
        {

            AspNetUser useremp = db.AspNetUsers.FirstOrDefault(x => x.UserName == username);

            string id = useremp.Id;

            employee emp = new employee()
            {
                 
               name = namee,
               designation = designationn,
               user_id = id,
                address = addresss,
                  gender = genderr
            };

            try
            {
                db.employees.Add(emp);
                db.SaveChanges();
            }
            catch
            {
                throw;
            }

        }

        private void Ok()
        {
            throw new NotImplementedException();
        }

        public List<timesheet> creatingtimesheets(int id)
        {

            List<timesheet> sheets = new List<timesheet>();

            List < Project_members > projectmembers = db.Project_members.Where(x => x.project_id == id).ToList();

            List<project_tasks> projecttasks = db.project_tasks.Where(x => x.project_id == id).ToList();

            int taskcount = projecttasks.Count();

          //  DateTime fromdate = db.projects.FirstOrDefault(x => x.id == id).fromdate;

            foreach(Project_members pm in projectmembers)
            {
               DateTime fromdate =     Convert.ToDateTime( db.projects.FirstOrDefault(x => x.id == id).fromdate);

             //   DateTime fromdate = new DateTime(2021, 03, 23);

                foreach (project_tasks pt in projecttasks)
                {

                    double durtn = Convert.ToDouble( pt.duration) ;

                    double y = 1;

                    int hh = (int)(durtn / y);                  // quotient

                    double hh1 = (double)(durtn % y);           // remainder

                    if (hh1 != 0)
                    {
                        hh = hh + 1;
                    }

                    int i;
                    string s = "nill";
                    for (i=0;i<hh;i++)
                    {

                        DateTime dt = fromdate.AddDays(i);

                        if(dt.DayOfWeek == DayOfWeek.Saturday)
                        {
                             s = "sat";
                           dt =  dt.AddDays(2);
                        }
                        else if (dt.DayOfWeek == DayOfWeek.Sunday)
                        {
                           dt =  dt.AddDays(1);
                            s = "sat";

                        }


                        sheets.Add(new timesheet()
                        {

                               project_members_id= pm.id,

                                date= dt,

                                 hours=0 ,

                                 description= s,

                                 status= "created",

                                 comments_reviwer= "",

                                 comments_manager= "",

                                 resubmit_flag= 0,

                                 projecttask_id= pt.id



                        });
                    }

                    if(hh1!=0)
                    {
                        fromdate = fromdate.AddDays(hh - 1);
                    }
                    else
                    {
                        fromdate = fromdate.AddDays(hh);
                    }


                }
            }

            return sheets;

        }






        public void updatingtimesheetanalysreviewer(timesheetreview timesht, string usernme)
        {
            try
            {

                if ( timesht.status == "reviewer rejected")
                {

                    if (db.timesheet_analysis.FirstOrDefault(x => x.timesheet_id == timesht.id) != null)
                    {
                        int rejectcount = Convert.ToInt32(db.timesheet_analysis.FirstOrDefault(x => x.timesheet_id == timesht.id).reject_count);

                     
                     if (timesht.status == "reviewer rejected")
                        {
                            rejectcount = rejectcount + 1;
                            db.timesheet_analysis.FirstOrDefault(x => x.timesheet_id == timesht.id).reject_count = rejectcount;

                        }

                    }
                    else
                    {
                        int resubmitcount1 = 0;
                        int rejectcount1 = 0;

                        if (timesht.status == "reviewer rejected")
                        {
                            rejectcount1 = 1;
                        }

                        timesheet_analysis tn = new timesheet_analysis()
                        {
                            timesheet_id = timesht.id,
                            resubmit_count = resubmitcount1,
                            reject_count = rejectcount1
                        };


                        db.timesheet_analysis.Add(tn);



                    }


                }

                db.SaveChanges();

            }
            catch (DbUpdateConcurrencyException)
            {

                helperclass.err(usernme, DateTime.UtcNow, 7);

                throw new DbUpdateConcurrencyException();

            }


        }















        public void updatingtimesheetanalysis(managertimesheetreview timesht , string usernme)
        {
            try
            {

                if (timesht.flag == 1 || timesht.status == "manager rejected")
                {

                    if (db.timesheet_analysis.FirstOrDefault(x => x.timesheet_id == timesht.id) != null)
                    {
                        int rejectcount = Convert.ToInt32(db.timesheet_analysis.FirstOrDefault(x => x.timesheet_id == timesht.id).reject_count);

                        int resubmitcount = Convert.ToInt32(db.timesheet_analysis.FirstOrDefault(x => x.timesheet_id == timesht.id).resubmit_count);

                        if (timesht.flag == 1)
                        {
                            resubmitcount = resubmitcount + 1;
                            db.timesheet_analysis.FirstOrDefault(x => x.timesheet_id == timesht.id).resubmit_count = resubmitcount;


                        }
                        else if (timesht.status == "manager rejected")
                        {
                            rejectcount = rejectcount + 1;
                            db.timesheet_analysis.FirstOrDefault(x => x.timesheet_id == timesht.id).reject_count = rejectcount;

                        }

                    }
                    else
                    {
                        int resubmitcount1 = 0;
                        int rejectcount1 = 0;

                        if (timesht.flag == 1)
                        {
                            resubmitcount1 = 1;

                        }
                        else if (timesht.status == "manager rejected")
                        {
                            rejectcount1 = 1;
                        }

                        timesheet_analysis tn = new timesheet_analysis()
                        {
                            timesheet_id = timesht.id,
                            resubmit_count = resubmitcount1,
                            reject_count = rejectcount1
                        };


                        db.timesheet_analysis.Add(tn);


                       
                    }


                }

                db.SaveChanges();

            }
            catch (DbUpdateConcurrencyException)
            {

                helperclass.err(usernme, DateTime.UtcNow, 6);

                throw new DbUpdateConcurrencyException();

            }


                }

            



        


        public static void  mailbody(int opt, string username, string date, string timesheetstatus )
        {
           




            StringBuilder sbExceptionMessage = new StringBuilder();


            switch(opt)
            {
                case 0:
                    {
                        sbExceptionMessage.Append("Dear   " + username + ","+Environment.NewLine+ Environment.NewLine);

                        sbExceptionMessage.Append("You have successfully submitted the timesheet  " + Environment.NewLine + Environment.NewLine);


                        sbExceptionMessage.Append("Timesheet Date:  "  + date  + Environment.NewLine + Environment.NewLine);

                        sbExceptionMessage.Append("Soon your Timesheet will be reviewed   " + Environment.NewLine + Environment.NewLine);

              

                        sbExceptionMessage.Append("Regards   "+ Environment.NewLine + "Admin Desk"+Environment.NewLine +"Track It!" + Environment.NewLine );

                        sbExceptionMessage.Append("Note:This is an auto-generated mail. Please do not reply. ");
                        break;
                    }
                case 1:
                    {

                        sbExceptionMessage.Append("Dear   " + username + "," + Environment.NewLine + Environment.NewLine);

                        sbExceptionMessage.Append("Your Timesheet has been updated by the Reviewer " + Environment.NewLine + Environment.NewLine);


                        sbExceptionMessage.Append("Timesheet Date:  " + date + Environment.NewLine + Environment.NewLine);

                        sbExceptionMessage.Append("Timesheet Status: "+timesheetstatus + Environment.NewLine);


                        sbExceptionMessage.Append("To know more about it, Please login into your account on Track-It! App " + Environment.NewLine + Environment.NewLine);



                        sbExceptionMessage.Append("Regards   " + Environment.NewLine + "Admin Desk" + Environment.NewLine +  "Track It!" + Environment.NewLine );

                        sbExceptionMessage.Append("Note:This is an auto-generated mail. Please do not reply. ");
                        break;


                    }
                case 2:
                    {
                        sbExceptionMessage.Append("Dear   " + username + "," + Environment.NewLine + Environment.NewLine);

                        sbExceptionMessage.Append("Your Timesheet has been updated by the Manager " + Environment.NewLine + Environment.NewLine);


                        sbExceptionMessage.Append("Timesheet Date:  " + date + Environment.NewLine + Environment.NewLine);

                        sbExceptionMessage.Append("Timesheet Status: " + timesheetstatus + Environment.NewLine);


                        sbExceptionMessage.Append("To know more about it, Please login into your account on Track-It! App " + Environment.NewLine + Environment.NewLine);



                        sbExceptionMessage.Append("Regards   " + Environment.NewLine + "Admin Desk" + Environment.NewLine + "Track It!" + Environment.NewLine );

                        sbExceptionMessage.Append("Note:This is an auto-generated mail. Please do not reply. ");
                        break;


                    }
            }


            string bdy = "Update on the status of Timesheet ";

            switch (opt)
            {
                case 0:
                    {

                        bdy = "Your Timesheet Has Been Submitted ";
                        break;
                    }

                case 1:
                    {
                        bdy = " Timesheet updated by the reviewer";
                        break;
                    }

                case 2:
                    {
                        bdy = " Timesheet updated by the manager";
                        break;
                    }
            }






            string sendEmail = ConfigurationManager.AppSettings["SendEmail"];

            if (sendEmail.ToLower() == "true")
            {
                SendEmail(sbExceptionMessage.ToString(),bdy);


            }


        }



        public static void SendEmail(string emailbody, string bdy)
        {
            // Specify the from and to email address
            MailMessage mailMessage = new MailMessage("navyassncollege@gmail.com", "navyassncollege@gmail.com");
            // Specify the email body
            mailMessage.Body = emailbody;
            // Specify the email Subject
            mailMessage.Subject = bdy;

            // Specify the SMTP server name and post number
            SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 587);
            // Specify your gmail address and password
            smtpClient.Credentials = new System.Net.NetworkCredential()
            {
                UserName = "navyassncollege@gmail.com",
                Password = "tpbhefmwbrygnjmr"
            };
            // Gmail works on SSL, so set this property to true
            smtpClient.EnableSsl = true;
            // Finall send the email message using Send() method
            smtpClient.Send(mailMessage);
        }

        public static void err(string id, System.DateTime date, int opt)
        {


            string path = @"C:\Users\navya.dommalapati\source\repos\nw\pahse03\finaltask\finlapp\finlapp\error.csv";

            switch (opt)
            {
                case 0:             // not valid input
                    {
                        string total = id + "  employee entered input wasn't valid, attempt made on " + date+ "\n";
                        File.AppendAllText(path, total);
                        break;
                    }
                case 1:             // id not found  
                    {
                        string total = id + "  employee id wasn't found while updating on " + date+"\n" ;
                        File.AppendAllText(path, total);
                        break;
                    }
                case 2:             //    DbUpdateConcurrencyException
                    {
                        string total = id + "  employee update failed due to datbase exception on" + date + "\n";
                        File.AppendAllText(path, total);
                        break;
                    }

                case 3:             // not valid input
                    {
                        string total = id + "  Admin entered input while registering wasn't valid, attempt made on " + date + "\n";
                        File.AppendAllText(path, total);
                        break;
                    }
                case 4:
                    {

                        string total = id + "  faced a not found on " + date + "\n";
                        File.AppendAllText(path, total);
                        break;
                    }

                case 5:             // not valid input
                    {
                        string total = id + "  manager entered input wasn't valid, attempt made on " + date + "\n";
                        File.AppendAllText(path, total);
                        break;
                    }
                case 6:             //    DbUpdateConcurrencyException
                    {
                        string total = id + "  manager update failed due to datbase exception on" + date + "\n";
                        File.AppendAllText(path, total);
                        break;
                    }
                case 7:             //    DbUpdateConcurrencyException
                    {
                        string total = id + "  reviewer update failed due to datbase exception on" + date + "\n";
                        File.AppendAllText(path, total);
                        break;
                    }
                case 8:             //    not valid input
                    {
                        string total = id + "  reviewer entered input wasn't valid, attempt made on " + date + "\n";
                        File.AppendAllText(path, total);
                        break;
                    }
            }
        }






    }
}