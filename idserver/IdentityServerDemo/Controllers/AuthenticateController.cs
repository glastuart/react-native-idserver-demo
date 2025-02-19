using IdentityServer8;
using IdentityServer8.Services;
using IdentityServerDemo.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IdentityServerDemo.Controllers;

[ApiController, Route("api/[controller]"), AllowAnonymous]
public sealed class AuthenticateController(
    IWebHostEnvironment environment,
    IIdentityServerInteractionService interaction
) : Controller {

    [HttpPost]
    public async Task<IActionResult> Login([FromBody] LoginRequest request, CancellationToken ct = default) {
        var ctx = await interaction.GetAuthorizationContextAsync(request.ReturnUrl);
        var user = IdentityConfiguration.TestUsers.FirstOrDefault(x => x.Username == request.Username && x.Password == request.Password);
        
        if (user == null || ctx == null) {
            return Unauthorized();
        }
        
        // TODO: inactive - locked - disabled - etc

        var identityUser = new IdentityServerUser(user.SubjectId) {
            DisplayName = user.Username,
            AdditionalClaims = user.Claims
        };
        
        await HttpContext.SignInAsync(identityUser);
        return new JsonResult(new { RedirectUrl = request.ReturnUrl, IsOk = true });
    }

    [HttpGet("logout")]
    public async Task<IActionResult> Logout(string logoutId, CancellationToken ct = default) {
        var context = await interaction.GetLogoutContextAsync(logoutId);
        var showSignOutPrompt = context?.ShowSignoutPrompt != false;

        if (User?.Identity?.IsAuthenticated == true) {
            // delete local authentication cookie
            await HttpContext.SignOutAsync();
        }

        // no external signout supported for now (see \Quickstart\Account\AccountController.cs TriggerExternalSignout)
        return Ok(new {
            showSignoutPrompt = showSignOutPrompt,
            ClientName = string.IsNullOrEmpty(context?.ClientName) ? context?.ClientId : context?.ClientName,
            context?.PostLogoutRedirectUri,
            context?.SignOutIFrameUrl,
            logoutId
        });
    }

    [HttpGet("error")]
    public async Task<IActionResult> Error(string errorId, CancellationToken ct = default) {
        // retrieve error details from identityserver
        var message = await interaction.GetErrorContextAsync(errorId);
        if (message != null) {
            if (!environment.IsDevelopment()) {
                // only show in development
                message.ErrorDescription = null;
            }
        }
        return Ok(message);
    }
}