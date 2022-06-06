using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using MimeKit.Text;
using OnlineShopping.Core.Exceptions;
using OnlineShopping.Interfaces.Communication;
using OnlineShopping.Models.Communication;
using OnlineShopping.Models.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;

using System.Text;
using System.Threading.Tasks;

namespace OnlineShopping.Core.Communication
{
    public class EmailSender : IEmailSender
    {
        private readonly List<EmailServerOptions> _emailConfig;

        public EmailSender(IOptions<List<EmailServerOptions>> emailConfig)
        {
            _emailConfig = emailConfig.Value;
        }

        public void SendEmail(string emailServerConfigName, EmailMessage message)
        {
            var emailMessage = CreateEmailMessage(message);

            Send(emailServerConfigName, emailMessage);
        }

        private MimeMessage CreateEmailMessage(EmailMessage message)
        {
            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress(message.From));
            emailMessage.To.AddRange(message.To.Select(x => new MailboxAddress(x)));
            emailMessage.Subject = message.Subject;
            emailMessage.Body = new TextPart((TextFormat)message.EmailFormat) { Text = message.Content };

            return emailMessage;
        }

        private void Send(string emailServerConfigName, MimeMessage mailMessage)
        {
            var serverConfig = _emailConfig.Where(o => o.Name == emailServerConfigName).FirstOrDefault();

            if (serverConfig == null)
                throw new CoreException($"Invalid e-mail server configuration name: {emailServerConfigName}, not found.",
                    "Invalid e-mail server configuration name, not found.");

            using (var client = new SmtpClient())
            {
                try
                {
                    client.Timeout = 30000;
                    client.Connect(serverConfig.SmtpServer, serverConfig.Port, SecureSocketOptions.Auto);
                    client.AuthenticationMechanisms.Remove("XOAUTH2");
                    client.Authenticate(serverConfig.Username, serverConfig.Password);
                    client.Send(mailMessage);
                }
                catch (Exception ex)
                {
                    throw new CoreException(ex, "Failed to send mail message", "Send Mail Failure", mailMessage);
                }
                finally
                {
                    client.Disconnect(true);
                    client.Dispose();
                }
            }
        }
    }
}
