using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using DataAnnotationsExtensions;

namespace WebApplication1.Models
{

    public class employee
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]

        [Column("EmployeeId")]
        public int id { get; set; }

        [Required(ErrorMessage = "Name is required")]
        public string name { get; set; }

        [Required]
        public string gender { get; set; }

        [Required]
        public string city { get; set; }

        [Required]
        //   [DataType(DataType.EmailAddress)]
        //   [Email]
        [RegularExpression(@"^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-‌​]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$", ErrorMessage = "Email is not valid")]
        public string email { get; set; }

        [Required]
        public int DepartmentId { get; set; }

    }
   


        
    
}