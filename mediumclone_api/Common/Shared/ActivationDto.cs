namespace mediumclone_api.Common.Shared
{
    public class ActivationDto
    {
        public string Activation { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public DateTime ActivationTimeOut { get; set; } = DateTime.UtcNow;
    }
}