using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineShopping.Models.Data.Users
{
    public class UserToken : IdKeyBase
    {
                       
        public long UserId{ get; set; }
        public string Token { get; set; }
        public DateTime? TokenExpireTime { get; set; }
        public DateTime DateTimeCreated { get; set; } = DateTime.Now;

        [ForeignKey("UserId")]
        public User User { get; set; }

    }
}
