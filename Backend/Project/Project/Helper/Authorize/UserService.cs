using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Project.Models.Authorize;
using Project.Repository;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Project.Helper.Authorize
{
    public interface IUserService
    {
        AuthenticateResponse Authenticate(AuthenticateRequest model);

        UserClass GetById(string id);
    }

    public class UserService : IUserService
    {
        LoginRepository login = new LoginRepository();

        private readonly AppSettings _appSettings;

        public UserService(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        public AuthenticateResponse Authenticate(AuthenticateRequest model)
        {
            var user = login.Login(model.Username, model.Password);

            // return null if user not found
            if (user == null) return null;

            // authentication successful so generate jwt token
            var token = generateJwtToken(user);

            return new AuthenticateResponse(user, token);
        }

        // helper methods

        private string generateJwtToken(UserClass user)
        {

            //var claims = new List<Claim>();
            //claims.Add(new Claim("id", user.Id.ToString()));
            //claims.Add(new Claim(ClaimTypes.Role, user.Role.ToString()));
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()), 
                    new Claim(ClaimTypes.Role, user.Role),
                    new Claim("Username", user.Username),
                    new Claim("FullName", user.FullName) }),
                Expires = DateTime.UtcNow.AddDays(7),
                //Subject = claims.ToArray(),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
        
            return tokenHandler.WriteToken(token);
        }

        public UserClass GetById(string id)
        {
            string FindID = id.Substring(0, 1);
 
            if (FindID == "3")
            {
                var queryItem = login.getStudent(id)[0];
                return new UserClass()
                {
                    Id = queryItem.stu_ID,
                    Username = queryItem.stu_ID.ToString(),
                    FullName = queryItem.stu_Name,
                    Role = queryItem.role

                };
            }
            else if (FindID == "2")
            {
                var queryItem = login.getTeacher(id)[0];
                return new UserClass()
                {
                    Id = queryItem.tec_ID,
                    Username = queryItem.tec_ID.ToString(),
                    FullName = queryItem.tec_Name,
                    Role = queryItem.role
                };

            }
            else if (FindID == "4")
            {
                var queryItem = login.getEmployee(id)[0];
                return new UserClass()
                {
                    Id = queryItem.emp_ID,
                    Username = queryItem.emp_ID.ToString(),
                    FullName = queryItem.emp_Name,
                    Role = queryItem.role
                };
            }

            return null;
        
        }
    }
}
