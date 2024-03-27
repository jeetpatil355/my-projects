using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Parking.Management.Engine
{
    public class EmailServiceOptions
    {
        public string FromEmailAddress { get; set; }
        public string FromEmailPassword { get; set; }
        public string SmtpHost { get; set; }
        public int SmtpPort { get; set; }

    }
}
