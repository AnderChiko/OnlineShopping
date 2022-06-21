using Microsoft.Extensions.DependencyInjection;
using OnlineShopping.Interfaces.Security;
using OnlineShopping.Models.Enums;
using OnlineShopping.Models.Http;
using OnlineShopping.Models.Security;
using OnlineShopping.Testing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace OnlineShopping.Core.Tests.Functional.Security
{
    public class SecurityManagerTests : TestHarnessBase
    {

        private Login testLogin = new Login()
        {            
            EmailAddress = "chikoanderson@gmail.com",
            Password = "ander"// wrong password
        };


        public SecurityManagerTests() 
            : base()
        {



        }

        [Fact]
        public void Login()
        {

            var result = RunInScope<ISecurityManager, LoginResult>(
                    (ISecurityManager instance, IServiceScope scope) =>
                    {
                        var results = instance.Login(testLogin).Result;
                        return results;
                    });
            Assert.NotNull(result.Token);
            //Assert.Equal(result.ExpireDateTime, Status.Success.ToString());
        }


    }
}
