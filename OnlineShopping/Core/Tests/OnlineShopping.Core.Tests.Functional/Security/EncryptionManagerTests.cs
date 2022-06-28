using OnlineShopping.Testing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineShopping.Core.Tests.Functional.Security
{
    public class EncryptionManagerTests :  TestHarnessBase
    {
        public EncryptionManagerTests()            
        {
            _services.AddCore();
            _services.AddDALServices();

            ReBuildServices();
        }



    }
}
