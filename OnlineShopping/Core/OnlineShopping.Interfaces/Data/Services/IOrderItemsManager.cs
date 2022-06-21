using OnlineShopping.Models.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineShopping.Interfaces.Data.Services
{
    public interface IOrderItemsManager : ICrudManager<OrderItems, long>
    {
    }
}
