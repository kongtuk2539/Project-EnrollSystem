using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Report.Model
{
    internal class Enroll
    {
        public int stu_ID { get; set; }
        public string stu_Name { get; set; }
        public int cou_ID { get; set; }
        public string sub_Name { get; set; }
        public string pay_billpay { get; set; }
        public string pay_billdue { get; set; }
        public string amount_pay { get; set; }
    }
}
