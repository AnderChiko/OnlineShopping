using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using OnlineShopping.Core.Interfaces.Logging;
using OnlineShopping.Interfaces.Services;
using OnlineShopping.Models.Data;
using OnlineShopping.Models.Data.Orders;
using OnlineShopping.Models.Http;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace OnlineShopping.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderManager _orderManager; 
        private readonly ILoggingManager<OrderController> _logger;

        public OrderController(IOrderManager orderManager, ILoggingManager<OrderController> logger)
        {
            this._orderManager = orderManager;
            this._logger = logger;
        }

        [HttpPost("[action]")]
        public async Task<ActionResult<ApiResponse<Order>>> Place([FromBody] Order order)
        {
            try
            {
                var result = await _orderManager.Create(order);
                return new ApiResponse<Order>(HttpStatusCode.Created,result); ;

            }
            catch (Exception ex)
            {
                // application error  
                return new ApiResponse<Order>(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

    }
}
