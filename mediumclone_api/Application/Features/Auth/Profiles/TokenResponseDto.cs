using mediumclone_api.Domain.Entities;

namespace mediumclone_api.Application.Features.Profiles
{
    public class TokenResponseDto
    {
        public bool isOk { get; set; } = false;
        public User User { get; set; }
    }
}