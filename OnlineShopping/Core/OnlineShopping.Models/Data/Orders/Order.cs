using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace OnlineShopping.Models.Data
{
    public class Order : IdKeyBase
    {
        [ForeignKey("User")]
        public long UserId { get; set; }

        [JsonIgnore]
        public DateTime DateCreated { get; set; } = DateTime.Now;// default date to today

        public List<OrderItems> OderItems { get; set; }

    }
}
