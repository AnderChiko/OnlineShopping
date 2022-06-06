using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineShopping.Models.Configuration
{
    public class EmailServerOptions
    {
        public string Name { get; set; }

        public string SmtpServer { get; set; }

        public int Port { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }
    }

    public class EmailServerOptionsList : List<EmailServerOptions>
    {
    }
}
