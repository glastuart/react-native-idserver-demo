using System.Security.Claims;
using IdentityModel;
using IdentityServer8;
using IdentityServer8.Models;
using IdentityServer8.Test;

namespace IdentityServerDemo;

public static class IdentityConfiguration {
    
    public static List<TestUser> TestUsers => [
        new TestUser {
            SubjectId = "1144",
            Username = "stuart",
            Password = "password",
            Claims = {
                new Claim(JwtClaimTypes.Name, "Stuart Harrison"),
                new Claim(JwtClaimTypes.Email, "stuart.harrison@saveandinvest.com"),
                new Claim(JwtClaimTypes.GivenName, "Stuart"),
                new Claim(JwtClaimTypes.FamilyName, "Harrison")
            }
        }
    ];
    
    public static IEnumerable<IdentityResource> IdentityResources =>
        new IdentityResource[]
        {
            new IdentityResources.OpenId(),
            new IdentityResources.Profile(),
        };
    
    public static IEnumerable<ApiScope> ApiScopes =>
        new ApiScope[]
        {
            new ApiScope("myApi.read"),
            new ApiScope("myApi.write"),
        };
    
    public static IEnumerable<ApiResource> ApiResources =>
        new ApiResource[]
        {
            new ApiResource("myApi")
            {
                Scopes = new List<string>{ "myApi.read","myApi.write" },
                ApiSecrets = new List<Secret>{ new Secret("supersecret".Sha256()) }
            }
        };
    
    public static IEnumerable<Client> Clients =>
        new Client[]
        {
            new Client
            {
                ClientId = "cwm.client",
                ClientName = "Username & Password Client",
                AllowedGrantTypes = GrantTypes.Code,
                RedirectUris = [
                    "http://localhost:8081",
                    "http://localhost:8081/",
                    "http://localhost:8081/*",
                    "http://localhost:5173/",
                    "http://localhost:5173/*",
                    "http://localhost:5174/",
                    "http://localhost:5174/dashboard"
                ],
                PostLogoutRedirectUris = [
                    "http://localhost:8081",
                    "http://localhost:8081/",
                    "http://localhost:8081/*",
                    "http://localhost:5173/",
                    "http://localhost:5173/*",
                    "http://localhost:5174/",
                    "http://localhost:5174/dashboard"
                ],
                //ClientSecrets = { new Secret("secret".Sha256()) },
                AllowedScopes = {
                    IdentityServerConstants.StandardScopes.OpenId,
                    IdentityServerConstants.StandardScopes.Profile,
                    IdentityServerConstants.StandardScopes.OfflineAccess,
                    "myApi.read"
                },
                RequirePkce = true,
                RequireConsent = false,
                RequireClientSecret = false,
                AccessTokenType = AccessTokenType.Jwt,  
                AccessTokenLifetime = 900,
                AllowOfflineAccess = true,
                RefreshTokenExpiration = TokenExpiration.Absolute,
                RefreshTokenUsage = TokenUsage.OneTimeOnly,
                AbsoluteRefreshTokenLifetime = 1800
            },
        };
}