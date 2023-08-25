namespace Project.Models.Response
{
    public class ResponseDataModel
    {
        public string Header { get; set; }
        public string Footer { get; set; }
        public string Contene { get; set; }
        public List<OneMoreDataModel> Collection { get; set; }
    }
}
