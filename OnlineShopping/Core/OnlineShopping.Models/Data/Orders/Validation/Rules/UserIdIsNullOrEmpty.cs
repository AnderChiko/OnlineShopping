using DomainValidation.Interfaces.Specification;
using OnlineShopping.Models.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineShopping.Models.Data.Orders.Validation.Rules
{
    internal class UserIdIsNullOrEmpty : ISpecification<Order>
    {
        public bool IsSatisfiedBy(Order entity)
        {
            return !entity.UserId.IsNullOrZero();
        }
    }
}