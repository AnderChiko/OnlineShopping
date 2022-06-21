using OnlineShopping.Models.Data.Users;
using OnlineShopping.Models.Security;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace OnlineShopping.Models.Data
{
    
    public class User  
    {
        [Key,DatabaseGenerated(DatabaseGeneratedOption.Identity),JsonIgnore]
        public long Id { get; set; }

        [Required]
        public string EmailAddress { get; set; }
              
        public string Password { get; set; }
        
        public string Name  { get; set; }
        
    }
}
