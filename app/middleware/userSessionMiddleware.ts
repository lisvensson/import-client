import { userSessionContext } from "~/context/userSessionContext";
import { auth } from "~/shared/auth";

export const userSessionMiddleware = async ({ request, context } : { request: any, context: any }) => {
  const userSession = await auth.api.getSession(request);
  console.log("userSession: ", userSession)

  context.set(userSessionContext, userSession);
}