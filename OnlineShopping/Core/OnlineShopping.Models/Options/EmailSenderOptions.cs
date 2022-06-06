using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineShopping.Models.Configuration
{
    public class EmailSenderOptions
    {
        public string Name { get; set; }

        public string FromAddress { get; set; }

        public int TokenExpirationMinutes { get; set; }
    }

    public class EmailSenderOptionsList : List<EmailSenderOptions>
    {
    }
}
