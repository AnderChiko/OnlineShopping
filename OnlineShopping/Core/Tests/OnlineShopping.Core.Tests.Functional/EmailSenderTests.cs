using Microsoft.Extensions.Options;
using OnlineShopping.Core.Communication;
using OnlineShopping.Interfaces.Communication;
using OnlineShopping.Models.Communication;
using OnlineShopping.Models.Configuration;
using System;
using System.Collections.Generic;
using Xunit;

namespace OnlineShopping.Core.Tests.Functional
{
    public class EmailSenderTests
    {
        IEmailSender _emailSender;
        IOptions<List<EmailServerOptions>> _emailConfiguration;
        public EmailSenderTests()
        {
            _emailConfiguration = Options.Create(new List<EmailServerOptions>() {
                new EmailServerOptions()
            {
                Name = "ForgotPassword",
                Password = "Hst@TestEmail1",
                Port = 465,
                SmtpServer = "smtp.gmail.com",
                Username = "hst.test.noreply@gmail.com"
            }
            });
        }

        [Fact]
        public void SendEmail()
        {
            _emailSender = new EmailSender(_emailConfiguration);

            var message = new EmailMessage("hst.test.noreply@gmail.com", new string[] { "hst.test.noreply@gmail.com" },
                "Test email", "This is the content from our email.");
            _emailSender.SendEmail("ForgotPassword", message);
        }
    }
}

