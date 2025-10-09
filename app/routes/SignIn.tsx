import { Form, redirect } from "react-router";
import { authClient } from "~/shared/auth/client";
import type { Route } from "./+types/SignUp";


export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/upload",
    });

    if (error) {
        return { error: error.message };
    }

    return redirect("/upload");
}

export default function SignIn({ actionData }: Route.ComponentProps) {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12">
        <div className="max-w-md w-full text-center">
            <h1 className="text-2xl font-bold mb-4 text-gray-900">Logga in</h1>
            <p className="text-gray-600 mb-6">
            Logga in för att börja ladda upp dina filer.
            </p>
            {actionData?.error && (
            <div className="text-red-600 mb-4 font-medium">{actionData.error}</div>
            )}
            <Form method="post" className="space-y-4">
            <input
                type="email"
                name="email"
                required
                placeholder="E-postadress"
                className="w-full px-3 py-2 border rounded-md"
            />
            <input
                type="password"
                name="password"
                required
                placeholder="Lösenord"
                className="w-full px-3 py-2 border rounded-md"
            />
            <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
            >
                Logga in
            </button>
            </Form>

            <p className="mt-6 text-sm text-gray-500">
            Saknar du konto?{" "}
            <a href="/signup" className="text-indigo-600 hover:text-indigo-800 font-medium">
                Skapa ett konto här
            </a>
            </p>
        </div>
        </div>
    );
}