using AutoMapper;
using MailKit.Net.Smtp;
using MediatR;
using mediumclone_api.Application.Utilities;
using mediumclone_api.Domain.Entities;
using mediumclone_api.Infrastructure.Interfaces;
using Microsoft.Extensions.Configuration;
using MimeKit;

namespace mediumclone_api.Application.Features.Auth.Commands.Handlers
{
    public class MailCommandHandler : IRequestHandler<MailCommand, Activation>
    {
        IConfiguration _config;
        IActivationRepository _activation;
        public MailCommandHandler(IConfiguration config,IActivationRepository activation)
        {
            _config = config;
            _activation = activation;
        }
        public Activation ActivationTask(Activation activation)
        {
            string token = ActivationCode.ActivationCoder();
            activation.Token = token;
            activation.ExpireAt = DateTime.UtcNow.AddMinutes(3);
            return activation;
        }
        public async Task<Activation> Handle(MailCommand request, CancellationToken cancellationToken)
        {
            var activation = ActivationTask(request.Activation);
            await _activation.InsertEntity(activation);
            var message = new MimeMessage();
            var section = _config.GetSection("SmtpSettings");
            var host = section["Host"];
            var port = section["Port"];
            var userEmail = section["User"];
            var userName = section["Name"];
            var password = section["Pass"];
            message.From.Add(new MailboxAddress(userName, userEmail));
            message.To.Add(MailboxAddress.Parse(activation.Email));
            message.Subject = request.Title;
            string activationUrl = $"https://localhost:5173/verify?token={activation.Token}";
            message.Body = new TextPart("html")
            {
                Text = $@"
                    <h2>Merhaba {activation.UserName.Trim()??"Sayın Kullanıcı"},</h2>
                    <p>{request.Message}: {request.Activation.Token}</p>
                    <a target='_blank' href='{activationUrl}'>Giriş Yap</a>
                    <br/><br/>
                    <small>Bu bağlantı 3 dakika içinde geçerlidir.</small>
                "
            };
            using var client = new SmtpClient();
            await client.ConnectAsync(host, int.Parse(port), MailKit.Security.SecureSocketOptions.StartTls);
            await client.AuthenticateAsync(userEmail, password);
            await client.SendAsync(message);
            await client.DisconnectAsync(true);
            return activation;
        }
    }
}