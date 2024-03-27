using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Parking.Management.Engine
{
    public interface IEmailService
    {
        void SendEmail(string toEmailAddress, string subject, string body);
    }
}
