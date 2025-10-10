import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("upload", "routes/Upload.tsx"),
    route("api/auth/*", "routes/auth.ts"),
    route("signup", "./routes/SignUp.tsx"),
    route("signin", "./routes/SignIn.tsx")
] satisfies RouteConfig;