using OnlineShopping.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineShopping.Models.Communication
{
    public class EmailMessage
    {
        public string From { get; set; }
        public List<string> To { get; set; }

        public string Subject { get; set; }

        public string Content { get; set; }

        /// <summary>
        /// Email format.
        /// Default: Html
        /// </summary>
        public EmailFormat EmailFormat { get; set; } = EmailFormat.Html;

        public EmailMessage(string from, IEnumerable<string> to, string subject, string content)
        {
            To = new List<string>();

            From = from;
            To.AddRange(to.Select(x => x));
            Subject = subject;
            Content = content;
        }
    }
}
