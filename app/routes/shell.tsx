import { requireUserMiddleware } from "~/middleware/requireUserMiddleware";
import type { Route } from "./+types/shell";
import Navbar from "~/components/Navbar";
import { Outlet } from "react-router";
import { userSessionContext } from "~/context/userSessionContext";

export const middleware: Route.MiddlewareFunction[] = [requireUserMiddleware];

export async function loader({ context }: { context: any }) {
  const user = context.get(userSessionContext);

  return { isLoggedIn: Boolean(user?.user) }
}

export default function Shell({ loaderData }: { loaderData: { isLoggedIn: boolean } }) {
  return (
    <div>
      <Navbar isLoggedIn={loaderData.isLoggedIn} />
      <Outlet />
    </div>
  );
}