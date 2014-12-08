using System.ComponentModel.DataAnnotations;

namespace OnlineHospital.Models
{
    public class Patient
    {
        public int PatientId { get; set; }

        [Required]
        [Display(Name = "First name")]
        public string FirstName { get; set; }

        [Required]
        [Display(Name = "Middle name")]
        public string MiddleName { get; set; }

        [Required]
        [Display(Name = "Last name")]
        public string LastName { get; set; }

        [Required]
        [Display(Name = "CPR number")]
        public int CprNumber { get; set; }

        [Required]
        [Display(Name = "Birth date")]
        public string Birthday { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [Display(Name = "Mobile phone")]
        public int Mobilephone { get; set; }
    }
}