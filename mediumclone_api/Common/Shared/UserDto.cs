
namespace mediumclone_api.Common.Shared
{
    public class UserDto 
    {
        public string Id { get; set; }
        public string Username { get; set; } = null!;
        public string Email { get; set; } = null!;
        public IEnumerable<string> Role { get; set; }
        public DateTime CreatedAt { get; set; }
        
    }
}