using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineShopping.Models.Extensions
{
    public static class LongExtension
    {

        public static bool IsNullOrZero(this long value)
        {
            return (value == 0) ;
        }
    }
}
