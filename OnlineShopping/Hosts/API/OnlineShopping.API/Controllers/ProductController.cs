using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using OnlineShopping.Interfaces.Services;
using OnlineShopping.Models.Data;
using OnlineShopping.Models.Enums;
using OnlineShopping.Models.Http;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace OnlineShopping.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {

        private IProductManager _productManager;
        private readonly ILogger<ProductController> _logger;
        public ProductController(IProductManager productManager, ILogger<ProductController> logger)
        {
            this._productManager = productManager;
            this._logger = logger;
        }

        [HttpGet("[action]")]
        public async Task<ActionResult<ApiResponse<List<Product>>>> Get()
        {
            try
            {
                var result = await _productManager.Get();
                return new ApiResponse<List<Product>>(HttpStatusCode.OK,result ); ;                 
            }
            catch (Exception ex)
            {
                // application error  
                return new ApiResponse<List<Product>>(HttpStatusCode.InternalServerError, ex.Message );
            }
        }

    }
}
