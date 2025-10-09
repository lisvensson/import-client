import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("Upload", "routes/Upload.tsx"),
    route("api/auth/*", "routes/auth.ts"),
    route("SignUp", "./routes/SignUp.tsx"),
    route("SignIn", "./routes/SignIn.tsx")
] satisfies RouteConfig;