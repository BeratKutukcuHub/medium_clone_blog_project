using System.Net;
using System.Net.Mail;
using AutoMapper;
using MediatR;
using mediumclone_api.Application.Utilities;
using mediumclone_api.Common.Shared;
using Microsoft.Extensions.Configuration;

namespace mediumclone_api.Application.Features.Auth.Commands.Handlers
{
    public class SignupMailCommandHandler : IRequestHandler<SignupMailCommand, ActivationDto>
    {
        private readonly IConfiguration _configuration;

        public SignupMailCommandHandler(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<ActivationDto> Handle(SignupMailCommand request, CancellationToken cancellationToken)
        {
            string activationCode = ActivationCode.ActivationCoder();
            var config = _configuration.GetSection("SmtpSettings");
            string Host = config["Host"];
            int Port = Convert.ToInt16(config["Port"]);
            string User = config["User"];
            string Pass = config["Pass"];

            using var message = new MailMessage();
            message.From = new MailAddress(User, "The Medium Company");
            message.To.Add(request.Email);
            message.Subject = "Activation code";
            var html = await File.ReadAllTextAsync("./ActivationTemplemate.html");
            string activationLink = $"https://localhost:5173/activate?email={request.Email}&code={activationCode}";
            html = html.Replace("{act}", activationCode);

            message.Body = html;
            message.IsBodyHtml = true;

            using var client = new SmtpClient(Host, Port);
            client.Credentials = new NetworkCredential(User, Pass);
            client.EnableSsl = true;

            await client.SendMailAsync(message);

            return new ActivationDto
            {
                Email = request.Email,
                Activation = activationCode,
                ActivationTimeOut = DateTime.UtcNow.AddMinutes(5)
            };
        }
    }
}