using OnlineShopping.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace OnlineShopping.Models.Http
{
    public class ApiResponse<T> : HttpResponseMessage
    {
        public HttpStatusCode HttpResponseCode { get; set; }
        public string ResponseMessage { get; set; }

        public Status Status { get; set; } = Status.Success;

        public T ResponseObject { get; set; }

        public ApiResponse(HttpStatusCode httpResponseCode)
        {
            HttpResponseCode = httpResponseCode;
        }

        public ApiResponse(HttpStatusCode httpResponseCode, T obj)
        {
            HttpResponseCode = httpResponseCode;
            ResponseObject = obj;
        }

        public ApiResponse(HttpStatusCode httpResponseCode, string responseMessage)
        {
            HttpResponseCode = httpResponseCode;
            ResponseMessage = responseMessage;  
        }
    }
}
