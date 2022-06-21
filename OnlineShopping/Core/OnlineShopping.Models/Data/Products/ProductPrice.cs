using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineShopping.Models.Data.Products
{
    public class ProductPrice : IdKeyBase
    {
        [ForeignKey("Product")]
        public long ProductId { get; set; }

        [Required]
        public decimal UnitPrice { get; set; }


        [Required]
        public DateTime StartDate { get; set; }

        public DateTime? EndDate  { get; set; }

        public bool IsDeleted { get; set; }

    }
}
