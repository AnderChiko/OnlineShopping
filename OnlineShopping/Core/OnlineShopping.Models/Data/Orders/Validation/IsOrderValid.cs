using DomainValidation.Validation;
using OnlineShopping.Models.Data.Orders.Validation.Rules;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineShopping.Models.Data.Orders.Validation
{
    /// <summary>
    /// Validating business logic in C# with specification pattern
    /// https://medium.com/trainingcenter/validating-business-logic-in-c-with-specification-pattern-35dfe9593856
    /// </summary>
    public class IsOrderValid : Validator<Order>
    {
        public IsOrderValid()
        {
            Add("UserIdIsNotNullOrZero", new Rule<Order>(new UserIdIsNullOrEmpty(), "UserId field is missing"));           
        }
    }
}
