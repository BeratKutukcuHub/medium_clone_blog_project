using System.Security.Claims;

namespace mediumclone_api.Common.Shared
{
    public record TokenAndClaim
    {
        public string Token { get; init; }
        public List<Claim> Claims { get; init; }
    }
}