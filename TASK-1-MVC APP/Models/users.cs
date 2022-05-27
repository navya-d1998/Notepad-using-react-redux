using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Web.Security;

namespace WebApplication1.Models
{
    public class Users
    {


        [Required]
        public string username { get; set; }

        [Required]
     //   [DataType(DataType.Password)]
     //   [Display(Name = "Password")]
     [MembershipPassword(
    MinRequiredNonAlphanumericCharacters = 1,
    MinNonAlphanumericCharactersError = "Your password needs to contain at least one symbol (!, @, #, etc).",
    ErrorMessage = "Your password must be 6 characters long and contain at least one symbol (!, @, #, etc).",
    MinRequiredPasswordLength = 6
)]
[DataType(DataType.Password)]
        public string password { get; set; }


    }
}