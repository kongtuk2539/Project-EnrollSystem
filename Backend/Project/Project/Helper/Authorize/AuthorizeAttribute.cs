using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Http;
using Project.Models.Authorize;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Project.Helper.Authorize
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class AuthorizeAttribute : Attribute, IAuthorizationFilter
    {
        private readonly string[] _roles;

        public AuthorizeAttribute(params string[] roles)
        {
            _roles = roles;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var user = (UserClass)context.HttpContext.Items["User"];

            if (user == null)
            {
                // Not logged in
                context.Result = new JsonResult(new { message = "Unauthorized" }) { StatusCode = StatusCodes.Status401Unauthorized };
                return;
            }

            var jwt = context.HttpContext.Request.Headers["Authorization"].FirstOrDefault().Split(" ")[1];
            var roleClaim = GetRoleFromJwtToken(jwt);        

            // Check if any roles are specified
            if (_roles.Length == 0)
            {
                // No roles specified, allow access
                return;
            }

            // Check if the user has any of the required roles
            foreach (var role in _roles)
            {
                if (roleClaim.Contains(role))
                {
                    // Authorized
                    return;
                }
            }

            // User does not have any of the required roles
            context.Result = new JsonResult(new { message = "Forbidden" }) { StatusCode = StatusCodes.Status403Forbidden };
        }

        public string GetRoleFromJwtToken(string jwtToken)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.ReadJwtToken(jwtToken);

            var roleClaim = token.Claims.FirstOrDefault(c => c.Type == "role");

            if (roleClaim != null)
            {
                return roleClaim.Value;
            }

            throw new Exception("Role claim not found in JWT token");
        }
    }
}
