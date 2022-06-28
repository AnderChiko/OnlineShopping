using Microsoft.Extensions.DependencyInjection;
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
    public class ProductManagerTests : TestHarnessBase
    {
           public ProductManagerTests()
           {
            _services.AddCore();
            _services.AddDALServices();
            
            ReBuildServices();
        }

        [Fact]
        public void GetAllProducts()
        {

            var result = RunInScope<IProductManager, List<Product>>(
                    (IProductManager instance, IServiceScope scope) =>
                    {
                        var results = instance.Get().Result;
                        return results;
                    });
            Assert.NotNull(result);
            Assert.Equal(3, result.Count());            
        }

    }
}
