using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace finlapp.Models
{
    public class bindingemployee
    {


        public string id { get; set; }
        public string title { get; set; }
        public string designation { get; set; }
        public string user_id { get; set; }
        public string address { get; set; }
        public string gender { get; set; }


        public List<bindingemployee> bindemp(List<employee> emp)
        {

            List<bindingemployee> emps = new List<bindingemployee>();


            foreach(employee ee in emp)
            {

                emps.Add(

                    new bindingemployee()
                    {

                        id = ee.user_id,
                        title = ee.name,
                        designation = ee.designation,
                        user_id = ee.user_id,
                        address = ee.address,
                        gender = ee.gender


                    }



                    );


            }





            return emps;

        }




        }

    public class bindingproject
    {


        public int id { get; set; }
        public string nameofservice { get; set; }
        public string fromdate { get; set; }
        public string todate { get; set; }
        public string reviewr_id { get; set; }
        public string project_status { get; set; }
        public string manager_id { get; set; }
        public string Project_details { get; set; }





        public List<bindingproject> bindproject(List<project> emp)
        {

            List<bindingproject> emps = new List<bindingproject>();


            foreach (project ee in emp)
            {

                emps.Add(

                    new bindingproject()
                    {

                        id = ee.id,
                        nameofservice = ee.nameofservice,
                        fromdate = ee.fromdate.ToString("MM/dd/yyyy"),
                        todate = ee.todate.ToString("MM/dd/yyyy"),
                        project_status = ee.project_status,
                        Project_details = ee.Project_details,
                        manager_id = ee.manager_id,
                        reviewr_id = ee.reviewr_id


                    }
                    );


            }

            return emps;

        }


    }



    public class projectdetails
    {


        public int id { get; set; }
        public string nameofservice { get; set; }
        public string fromdate { get; set; }
        public int daysleft { get; set; }
        public int acceptedcount { get; set; }
        public int rejectedcount { get; set; }
        public int pendingcount { get; set; }

        public string projectstatus { get; set; }



        public projectdetails projectdetailsbind(int id,string  nameofservice,DateTime fromdate,int daysleft,int  acceptedcount,int rejectedcount,int  pendingcount, string projectstatus)
        {


            projectdetails projctdts = new projectdetails();


            projctdts.id = id;

            projctdts.id = id;
            projctdts.nameofservice = nameofservice;
            projctdts.fromdate = fromdate.ToString("dd/MM/yyyy");
            projctdts.daysleft = daysleft;
            projctdts.acceptedcount = acceptedcount;
            projctdts.rejectedcount = rejectedcount;
            projctdts.pendingcount = pendingcount;
            projctdts.projectstatus = projectstatus;

            return projctdts;

        }
    }


    
    public class bindingproject_tasks
    {



        public int id { get; set; }
        public int project_id { get; set; }

        
        public string taskname { get; set; }
        public Nullable<double> duration { get; set; }




        public List<bindingproject_tasks> bindemp(List<project_tasks> emp)
        {

            List<bindingproject_tasks> emps = new List<bindingproject_tasks>();


            foreach (project_tasks ee in emp)
            {

                emps.Add(

                    new bindingproject_tasks()
                    {

                        id = ee.id,
                        project_id = ee.project_id,
                        taskname = ee.taskname,
                        duration = ee.duration

                    }
                    );


            }

            return emps;

        }


    }
    public class bindingproject_members
    {
        public int id { get; set; }
        public string employee_id { get; set; }
        public int project_id { get; set; }

        public List<bindingproject_members> bindemp(List<Project_members> emp)
        {

            List<bindingproject_members> emps = new List<bindingproject_members>();


            foreach (Project_members ee in emp)
            {

                emps.Add(

                    new bindingproject_members()
                    {

                        id = ee.id,
                        project_id = ee.project_id,
                        employee_id = ee.employee_id

                    }
                    );


            }

            return emps;

        }


    }

    public class bindingarrays
    {
        public int[] hours { get; set; }
        public string[] names { get; set; }

        public bindingarrays bindemp(int[] hrs, string[] names)
        {

            bindingarrays emps = new bindingarrays();

            emps.hours = hrs;
            emps.names = names;




            return emps;

        }


    }

    public class binding2darrays
    {
        public int[] reject { get; set; }
        public int[] resubmit { get; set; }
        public string[] lables { get; set; }

        public binding2darrays bindemp(int[] rejectt, int[] resubmitt, string[] names)
        {

            binding2darrays emps = new binding2darrays();

            emps.reject = rejectt;
            emps.resubmit = resubmitt;
            emps.lables = names;



            return emps;

        }


    }
    public class bindingtimesheet
    {

        private UsersDBEntities2 db = new UsersDBEntities2();


        public int id { get; set; }
        public string employeename { get; set; }
        public string projecttname { get; set; }
        public string taskname { get; set; }
        public string date { get; set; }
        public int hours { get; set; }
        public string description { get; set; }
        public string status { get; set; }
        public string comments_reviwer { get; set; }
        public string comments_manager { get; set; }
        public Nullable<int> resubmit_flag { get; set; }
       // public Nullable<int> projecttask_id { get; set; }







        public List<bindingtimesheet> bindtemp(List<timesheet> emp)
        {

            List<bindingtimesheet> emps = new List<bindingtimesheet>();


            foreach (timesheet ee in emp)
            {

                var proj_emp_id = ee.project_members_id;

               
                var task_id = ee.projecttask_id;

                var projectname = db.project_tasks.FirstOrDefault(x => x.id == task_id).project.nameofservice;

                var taskname = db.project_tasks.FirstOrDefault(x => x.id == task_id).taskname;


                var emp_id = db.Project_members.FirstOrDefault(x => x.id == proj_emp_id).employee_id;

                var emp_name = db.employees.FirstOrDefault(x => x.user_id == emp_id).name;


                emps.Add(

                    new bindingtimesheet()
                    {

                        id = ee.id,
                        date =  ( ee.date.ToString("MM/dd/yyyy")) ,
                        employeename = emp_name,
                        projecttname = projectname,
                        taskname = taskname,
                        description = ee.description,
                        hours = ee.hours,
                        status = ee.status,
                        comments_manager = ee.comments_manager,
                        comments_reviwer = ee.comments_reviwer,
                        resubmit_flag = ee.resubmit_flag,
                       // projecttask_id = ee.projecttask_id


                    }
                    );


            }

            return emps;

        }


    }






}