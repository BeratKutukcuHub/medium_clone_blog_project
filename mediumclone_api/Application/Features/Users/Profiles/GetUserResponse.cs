namespace mediumclone_api.Application.Features.Profiles
{
    public record class GetUserResponse
    {
        public string Id { get; set; }
        public string Username { get; init; } 
        public string Email { get; init; } 
        public string PasswordHash { get; init; } 
        public IEnumerable<string> Role { get; init; }
        public DateTime CreatedAt { get; init; } 
        
    }
}