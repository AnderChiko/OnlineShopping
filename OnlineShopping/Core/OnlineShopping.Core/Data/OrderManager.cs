using OnlineShopping.Core.BaseClasses;
using OnlineShopping.DAL;
using OnlineShopping.Interfaces.Communication;
using OnlineShopping.Interfaces.Services;
using OnlineShopping.Models.Data;
using OnlineShopping.Models.Data.Orders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineShopping.Core.Data
{
    public class OrderManager :EntityFrameworkDataManagerBase<Order, long, ApplicationDbContext>, IOrderManager
    {
        private readonly IEmailSender _emailSender;
        public OrderManager(IEmailSender emailSender, IServiceProvider serviceProvider)
           : base(serviceProvider)
        {
            this._emailSender = emailSender;       
        }               
    }
}
