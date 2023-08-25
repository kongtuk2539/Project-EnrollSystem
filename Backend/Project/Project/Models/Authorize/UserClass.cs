using System.Text.Json.Serialization;

namespace Project.Models.Authorize
{
    public class UserClass
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Username { get; set; }
        public string Role { get; set; }

        [JsonIgnore]
        public string Password { get; set; }
    }
}
