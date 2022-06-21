using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineShopping.Models.Data
{
    public class OrderItems : IdKeyBase
    {
        [ForeignKey("Order")]
        public long OrderId { get; set; }

        [ForeignKey("Product")]
        public long ProductId { get; set; }

        public decimal UnitPrice { get; set; }

        public int Quantity { get; set; } 
    }
}
