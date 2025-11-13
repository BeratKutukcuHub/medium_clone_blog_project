namespace mediumclone_api.Application.Features.Auth.Profiles
{
    public class GetUserDto
    {
        public string Id { get; set; }
        public string Username { get; set; } = null!;
        public string Email { get; set; } = null!;
        public IEnumerable<string> Role { get; set; } = new List<string>
        {
            "User"
        };
    }
}