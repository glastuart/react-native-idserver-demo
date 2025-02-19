export type LogoutResponseType = {
    logoutId: string,
    clientName: string | null,
    showSignoutPrompt: boolean,
    postLogoutRedirectUri: string | null,
    signOutIFrameUrl: string | null
};