using OnlineShopping.Core.BaseClasses;
using OnlineShopping.DAL;
using OnlineShopping.Interfaces.Services;
using OnlineShopping.Models.Data;
using OnlineShopping.Models.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineShopping.Core.Data
{
    public class ProductManager : EntityFrameworkDataManagerBase<Product, long, ApplicationDbContext>, IProductManager
    {           
        public ProductManager( IServiceProvider serviceProvider)
            : base( serviceProvider)
        {            
        }               
    }
}
