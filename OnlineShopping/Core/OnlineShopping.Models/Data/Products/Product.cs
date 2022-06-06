using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineShopping.Models.Data
{
    public class Product : IdKeyBase
    {
        
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageUrl  { get; set; }
        public bool IsActive { get; set; } = true;
        public bool IsDeleted { get; set; } = false;
        public DateTime DateCreated { get; set; } = DateTime.Now;

    }
}
