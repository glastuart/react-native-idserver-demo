using IdentityServer8.Services;
using IdentityServerDemo;
using ReturnUrlParser = IdentityServerDemo.Helpers.ReturnUrlParser;

var builder = WebApplication.CreateBuilder(args);
{
    builder.Services.AddIdentityServer(opts => {
        opts.UserInteraction.LoginUrl = "/signin-oidc";
        opts.UserInteraction.LogoutUrl = "/signout-oidc";
        opts.UserInteraction.ErrorUrl = "/error";
    })
    .AddInMemoryClients(IdentityConfiguration.Clients)
    .AddInMemoryIdentityResources(IdentityConfiguration.IdentityResources)
    .AddInMemoryApiResources(IdentityConfiguration.ApiResources)
    .AddInMemoryApiScopes(IdentityConfiguration.ApiScopes)
    .AddTestUsers(IdentityConfiguration.TestUsers)
    .AddDeveloperSigningCredential();
    
    builder.Services.AddCors(setup => setup.AddDefaultPolicy(p => p.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin()));
    
    // configures the reverse proxy so that we can display a react-UI
    builder.Services
        .AddReverseProxy()
        .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));
    
    // add the controller endpoints
    builder.Services.AddControllers();
    
    // configure any additional services & repositories
    builder.Services.AddTransient<IReturnUrlParser, ReturnUrlParser>();
}

var app = builder.Build();
{
    app.UseCors();
    app.UseForwardedHeaders();
    app.UseRouting();
    app.MapReverseProxy();
    app.UseIdentityServer();
    app.MapControllers();
    //app.UseWelcomePage();
    app.Run();
}