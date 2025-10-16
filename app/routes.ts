import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    route("signup", "./routes/SignUp.tsx"),
    route("signin", "./routes/SignIn.tsx"),
    route("api/auth/*", "routes/auth.ts"),
    layout("./routes/shell.tsx", [
        index("routes/home.tsx"),
        route("upload", "routes/Upload.tsx"),
    ])
] satisfies RouteConfig;