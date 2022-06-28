using Microsoft.Extensions.DependencyInjection;
using OnlineShopping.Core.Tests.Functional.TestData.TheoryData;
using OnlineShopping.Interfaces.Services;
using OnlineShopping.Models.Data;
using OnlineShopping.Testing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace OnlineShopping.Core.Tests.Functional.Data
{
    public class OrderManagerTests : TestHarnessBase
    {

        public OrderManagerTests()
        {
            _services.AddCore();
            _services.AddDALServices();

            ReBuildServices();
        }


        [Theory]
        [ClassData(typeof(OrderTestTheoryData))]
        public void CreateOrder(Order entry)
        {
            var result = RunInScope<IOrderManager, Order>(
                    (IOrderManager instance, IServiceScope scope) =>
                    {
                        var results = instance.Create(entry).Result;
                        return results;
                    });
            Assert.NotEqual(0, result.Id);
        }
    }
}
