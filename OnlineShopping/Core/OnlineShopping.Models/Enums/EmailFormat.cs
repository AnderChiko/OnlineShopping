using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineShopping.Models.Enums
{
    public enum EmailFormat
    {
        //
        // Summary:
        //     The plain text format.
        Plain = 0,
        //
        // Summary:
        //     An alias for the plain text format.
        Text = 0,
        //
        // Summary:
        //     The flowed text format (as described in rfc3676).
        Flowed = 1,
        //
        // Summary:
        //     The HTML text format.
        Html = 2,
        //
        // Summary:
        //     The enriched text format.
        Enriched = 3,
        //
        // Summary:
        //     The compressed rich text format.
        CompressedRichText = 4,
        //
        // Summary:
        //     The rich text format.
        RichText = 5
    }

}
