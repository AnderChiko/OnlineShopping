using OnlineShopping.Models.Communication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineShopping.Interfaces.Communication
{
    public interface IEmailSender
    {
        void SendEmail(string emailServerConfigName, EmailMessage message);
    }
}
