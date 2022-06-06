using OnlineShopping.Interfaces.Data;
using OnlineShopping.Models.Data;
using OnlineShopping.Models.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineShopping.Interfaces.Services
{
    public interface IProductManager : ICrudManager<Product, long>
    {
    }
}
