import * as zod from "zod";

export const ExchangeMobileAuthorizationCodeBody = zod.object({
  code: zod.string(),
  codeVerifier: zod.string(),
  state: zod.string(),
  nonce: zod.string().optional(),
  redirectUri: zod.string(),
});

export const ExchangeMobileAuthorizationCodeResponse = zod.object({
  sessionToken: zod.string(),
});

export const LogoutMobileSessionResponse = zod.object({
  success: zod.boolean(),
});
