using System.Security.Claims;

namespace mediumclone_api.Common.Shared
{
    public record TokenAndClaim
    {
        public string Token { get; init; }
        public string RefreshToken { get; init; }
        public List<Claim> Claims { get; init; }
        public UserDto User { get; init; }
    }
}