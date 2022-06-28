using OnlineShopping.Models.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineShopping.Core.Tests.Functional.TestData
{
   public static class OrderTestData
    {
        public static Order GetOrderTestData()
        {

            return new Order()
            {
                 Id=0,
                 UserId = 1,
                 OderItems = GetOrderItemsTestData()
            };
        }

        public static List<OrderItems> GetOrderItemsTestData()
        {

            return new List<OrderItems>()
            {
               new OrderItems(){ Id = 0, ProductId = 1, Quantity= 10 , UnitPrice = 25 },
               new OrderItems(){ Id = 0, ProductId = 2, Quantity= 6 , UnitPrice = 55 },
               new OrderItems(){ Id = 0, ProductId = 3, Quantity= 37 , UnitPrice = 85 }
            };
        }


    }
}
