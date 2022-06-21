using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace OnlineShopping.Models.Data
{
    public class Product : IdKeyBase
    {
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageUrl  { get; set; }

        [Required]
        public decimal Price { get; set; }
        public bool IsActive { get; set; } = true;

        [JsonIgnore]
        public bool IsDeleted { get; set; } = false;

        [JsonIgnore]
        public DateTime DateTimeCreated { get; set; } = DateTime.Now;

    }
}
