using System;
using DatingApp.Api.Data;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace DattingApp.Api {
    public class Program {
        public static void Main (string[] args) {
            var host = CreateWebHostBuilder (args).Build ();
            using (var scope = host.Services.CreateScope ()) {
                var services = scope.ServiceProvider;

                try {
                    var context = services.GetRequiredService<DataContext> ();
                    context.Database.Migrate ();
                    Seed.SeedUsers (context);

                    host.Run();
                } catch (Exception ex) {
                    var logger = services.GetRequiredService<ILogger<Program>> ();
                    logger.LogError (ex, "An error occured during migration");

                }
            }
        }

        public static IWebHostBuilder CreateWebHostBuilder (string[] args) =>
            WebHost.CreateDefaultBuilder (args)
            .UseStartup<Startup> ();
    }
}