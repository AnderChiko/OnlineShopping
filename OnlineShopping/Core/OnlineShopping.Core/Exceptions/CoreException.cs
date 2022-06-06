using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace OnlineShopping.Core.Exceptions
{
    public class CoreException : Exception
    {
        public CoreException(string message, string label, params object[] dataObjects) : base(message)
        {
            Label = label;
            DataObjects = dataObjects;
        }
        public CoreException(Exception exception, string message, string label, params object[] dataObjects) : base(message, exception)
        {
            Label = label;
            DataObjects = dataObjects;
        }

        public string Label { get; set; }

        public object[] DataObjects { get; set; }

        public HttpStatusCode? HttpStatusCode { get; set; }
    }
}
