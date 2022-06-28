using OnlineShopping.Core.BaseClasses;
using OnlineShopping.DAL;
using OnlineShopping.Interfaces.Communication;
using OnlineShopping.Interfaces.Data.Services;
using OnlineShopping.Interfaces.Services;
using OnlineShopping.Models.Data;
using OnlineShopping.Models.Data.Orders;
using OnlineShopping.Models.Data.Orders.Validation;
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
        private readonly IOrderItemsManager _orderItemsManager;   
        public OrderManager(IEmailSender emailSender, IServiceProvider serviceProvider, IOrderItemsManager orderItemsManager)
           : base(serviceProvider)
        {
            this._emailSender = emailSender;  
            this._orderItemsManager = orderItemsManager;    
        }

        public async override Task<Order> Create(Order order)
        {
            // do validation check
            var validation = new IsOrderValid().Validate(order);
            if (!validation.IsValid)
                throw new Exception(validation.Message);

            // create order
            var insertedOrder =  await base.Create(order);

            // update orderId with returned id
            order.OderItems.ForEach(x => x.OrderId = insertedOrder.Id);

            // add range orderitems
            var insertedOrderItems = await _orderItemsManager.Create(order.OderItems);

            order.OderItems = insertedOrderItems;
            
            return order;
        }


    }
}
