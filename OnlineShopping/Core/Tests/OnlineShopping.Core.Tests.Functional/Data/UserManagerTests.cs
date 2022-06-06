using Microsoft.Extensions.DependencyInjection;
using OnlineShopping.Interfaces.Data;
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
    public class UserManagerTests : TestHarnessBase
    {

        private User testUser = new User()
        {
            EmailAddress = "chikoanderson@gmail.com",
            Password = "ander"// wrong password
        };


        public UserManagerTests()
            : base()
        {
        }


        [Fact]
        public void Register()
        {
            var result = RunInScope<IUserManager, User>(
                    (IUserManager instance, IServiceScope scope) =>
                    {
                        var results = instance.Create(testUser).Result;
                        return results;
                    });
            Assert.NotNull(result);            
        }


    }
}
