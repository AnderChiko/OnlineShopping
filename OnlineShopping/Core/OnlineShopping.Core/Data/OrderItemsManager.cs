using OnlineShopping.Core.BaseClasses;
using OnlineShopping.DAL;
using OnlineShopping.Interfaces.Data.Services;
using OnlineShopping.Models.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineShopping.Core.Data
{
    public class OrderItemsManager : EntityFrameworkDataManagerBase<OrderItems, long, ApplicationDbContext>, IOrderItemsManager
    {
        public OrderItemsManager(IServiceProvider serviceProvider)
          : base(serviceProvider)
        {            
        }
    }
}
