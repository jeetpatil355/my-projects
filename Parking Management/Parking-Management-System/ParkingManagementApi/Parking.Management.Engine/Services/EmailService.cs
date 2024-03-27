using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;


namespace Parking.Management.Engine.Services
{
    public class EmailService : IEmailService
    {
        private readonly string fromEmailAddress;
        private readonly string fromEmailPassword;
        private readonly string smtpHost;
        private readonly int smtpPort;
        public EmailService(IConfiguration configuration)
        {
            
            fromEmailAddress =  configuration.GetSection("EmailServiceOptions:FromEmailAddress").Value;
            fromEmailPassword = configuration.GetSection("EmailServiceOptions:FromEmailPassword").Value;
            smtpHost = configuration.GetSection("EmailServiceOptions:SmtpHost").Value;
            smtpPort = int.Parse( configuration.GetSection("EmailServiceOptions:SmtpPort").Value);
        }
        
        public void SendEmail(string toEmailAddress, string subject, string body)
        {
            try
            {
                var fromAddress = new MailAddress(fromEmailAddress, "Parking Management");
                var toAddress = new MailAddress(toEmailAddress);
             

                using (MailMessage mail = new MailMessage())
                {
                    mail.From = new MailAddress(fromEmailAddress);
                    mail.To.Add(toEmailAddress);
                    mail.Subject = subject;
                    mail.Body = body;

                    using (SmtpClient smtp = new SmtpClient())
                    {
                        smtp.Host = smtpHost;
                        smtp.Port = smtpPort;
                        smtp.EnableSsl = true;
                        smtp.UseDefaultCredentials = false;
                        smtp.Credentials = new NetworkCredential(fromAddress.Address, fromEmailPassword);
                        smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                        smtp.Send(mail);
                    }
                }

                Console.WriteLine("Email sent successfully to {0} with subject: {1}", toEmailAddress, subject);

            }
            catch (Exception ex)
            {
                 Console.WriteLine("Error occured while sending email to {0} with subject: {1} Error: {2}", toEmailAddress, subject, ex.Message);
            }
        }
    }
}
