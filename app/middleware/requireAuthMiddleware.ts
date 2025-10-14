import { redirect } from "react-router";
import { userSessionContext } from "~/context/userSessionContext";
import { auth } from "~/shared/auth";

export async function requireAuthMiddleware({ request, context }: { request: Request; context: any }) {
  const userSession = await auth.api.getSession(request);
  const user = userSession?.user;

  if (!user) {
    throw redirect("/signin");
  }

  context.set(userSessionContext, user);
}