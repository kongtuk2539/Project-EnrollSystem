namespace Project.Models.Authorize
{
    public class AuthenticateResponse
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Username { get; set; }
        public string Token { get; set; }


        public AuthenticateResponse(UserClass user, string token)
        {
            Id = user.Id;
            FullName = user.FullName;
            Username = user.Username;
            Token = token;
        }
    }
}
