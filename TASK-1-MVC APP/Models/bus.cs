using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;



namespace WebApplication1.Models
{

    public class employeesdd
    {
        public IEnumerable<employee> employees
        {
            get

            {
               

                List<employee> employees = new List<employee>();

                string connectionString = ConfigurationManager.ConnectionStrings["employeecontext"].ConnectionString;

                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spGetAllEmployees", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        employee employee = new employee();

                        employee.id = Convert.ToInt32(rdr["EmployeeId"]);
                        employee.name = rdr["Name"].ToString();
                        employee.gender = rdr["Gender"].ToString();
                        employee.city = rdr["City"].ToString();
                        employee.email = rdr["email"].ToString();
                        employee.DepartmentId = Convert.ToInt32(rdr["DepartmentId"]);

                        employees.Add(employee);
                    }
                }

                return employees;
            }


        }




        public IEnumerable<Department> departments
        {
            get

            {
                string connectionString =
                    ConfigurationManager.ConnectionStrings["employeecontext"].ConnectionString;

                List<Department> departments = new List<Department>();

                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spGetAllDepartments", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();

                    while (rdr.Read())
                    {
                        Department department = new Department();

                        department.DepartmentId = Convert.ToInt32(rdr["Id"]);
                        department.DepartmentName = rdr["Name"].ToString();


                        departments.Add(department);
                    }
                }

                return departments;
            }


        }

        public IEnumerable<Users> users
        {
            get

            {
                string connectionString =
                    ConfigurationManager.ConnectionStrings["employeecontext"].ConnectionString;

                List<Users> users = new List<Users>();

                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spGetAllpasswords", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();

                    while (rdr.Read())
                    {
                        Users userss = new Users();

                        userss.username = Convert.ToString(rdr["username"]);
                        userss.password = rdr["password"].ToString();


                        users.Add(userss);
                    }
                }

                return users;
            }

        }

        public void AddEmmployee(employee employee)
        {
            string connectionString =
                    ConfigurationManager.ConnectionStrings["employeecontext"].ConnectionString;

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                SqlCommand cmd = new SqlCommand("spAddEmployee1", con);
                cmd.CommandType = CommandType.StoredProcedure;

                SqlParameter paramName = new SqlParameter();
                paramName.ParameterName = "@Name";
                paramName.Value = employee.name;
                cmd.Parameters.Add(paramName);

                SqlParameter paramGender = new SqlParameter();
                paramGender.ParameterName = "@Gender";
                paramGender.Value = employee.gender;
                cmd.Parameters.Add(paramGender);

                SqlParameter paramCity = new SqlParameter();
                paramCity.ParameterName = "@City";
                paramCity.Value = employee.city;
                cmd.Parameters.Add(paramCity);

                SqlParameter paramemail = new SqlParameter();
                paramemail.ParameterName = "@email";
                paramemail.Value = employee.email;
                cmd.Parameters.Add(paramemail);



                SqlParameter paramDateOfBirth = new SqlParameter();
                paramDateOfBirth.ParameterName = "@DepartmentId";
                paramDateOfBirth.Value = employee.DepartmentId;
                cmd.Parameters.Add(paramDateOfBirth);

                con.Open();
                cmd.ExecuteNonQuery();
            }


            
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                SqlCommand cmd = new SqlCommand("spAddEmployee4", con);
                cmd.CommandType = CommandType.StoredProcedure;

              

                SqlParameter paramGender = new SqlParameter();
                paramGender.ParameterName = "@password";
                paramGender.Value = "Abcd@1234";
                cmd.Parameters.Add(paramGender);

                con.Open();
                cmd.ExecuteNonQuery();
            }

        }

        public void SaveEmmployee(employee employee)
        {
            string connectionString =
                    ConfigurationManager.ConnectionStrings["employeecontext"].ConnectionString;

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                SqlCommand cmd = new SqlCommand("spSaveEmployee", con);
                cmd.CommandType = CommandType.StoredProcedure;

                SqlParameter paramId = new SqlParameter();
                paramId.ParameterName = "@Id";
                paramId.Value = employee.id;
                cmd.Parameters.Add(paramId);

                SqlParameter paramName = new SqlParameter();
                paramName.ParameterName = "@Name";
                paramName.Value = employee.name;
                cmd.Parameters.Add(paramName);

                SqlParameter paramGender = new SqlParameter();
                paramGender.ParameterName = "@Gender";
                paramGender.Value = employee.gender;
                cmd.Parameters.Add(paramGender);

                SqlParameter paramCity = new SqlParameter();
                paramCity.ParameterName = "@City";
                paramCity.Value = employee.city;
                cmd.Parameters.Add(paramCity);

                SqlParameter paramemail = new SqlParameter();
                paramemail.ParameterName = "@email";
                paramemail.Value = employee.email;
                cmd.Parameters.Add(paramemail);

                SqlParameter paramDateOfBirth = new SqlParameter();
                paramDateOfBirth.ParameterName = "@DepartmentId";
                paramDateOfBirth.Value = employee.DepartmentId;
                cmd.Parameters.Add(paramDateOfBirth);

                con.Open();
                cmd.ExecuteNonQuery();
            }
        }

        public void DeleteEmployee(int id)
        {
            string connectionString =
                    ConfigurationManager.ConnectionStrings["employeecontext"].ConnectionString;

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                SqlCommand cmd = new SqlCommand("spDeleteEmployee", con);
                cmd.CommandType = CommandType.StoredProcedure;

                SqlParameter paramId = new SqlParameter();
                paramId.ParameterName = "@Id";
                paramId.Value = id;
                cmd.Parameters.Add(paramId);

                con.Open();
                cmd.ExecuteNonQuery();
            }


            using (SqlConnection con = new SqlConnection(connectionString))
            {
                SqlCommand cmd = new SqlCommand("spDeletepassword", con);
                cmd.CommandType = CommandType.StoredProcedure;

                SqlParameter paramId = new SqlParameter();
                paramId.ParameterName = "@Id";
                paramId.Value = id;
                cmd.Parameters.Add(paramId);

                con.Open();
                cmd.ExecuteNonQuery();
            }
        }
    }
}