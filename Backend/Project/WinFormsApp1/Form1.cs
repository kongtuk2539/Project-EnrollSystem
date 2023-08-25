using FastReport;
using Newtonsoft.Json;
using Project.Models.Response;

namespace WinFormsApp1
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            Report report = new Report();
            var responseModel = JsonConvert.DeserializeObject<ResponseDataModel>(File.ReadAllText(@"D:\restoreProject\zip\Project\Project\Models\Response\Data.json"));
            var data = new List<ResponseDataModel> { responseModel };
            report.Load(@"D:\testreport.frx");
            report.RegisterData(data, "ResponseData");
        }
    }
}