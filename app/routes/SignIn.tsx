import { Form, redirect } from "react-router";
import { authClient } from "~/shared/auth/client";
import type { Route } from "./+types/SignUp";
import { auth } from "~/shared/auth";

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const response = await auth.api.signInEmail({
        body: { email, password },
        asResponse: true,
    });

    if (response.ok) {
        return redirect("/upload", {
        headers: response.headers,
        });
    } else {
        if (response.status === 401) {
            return { error: "Ogiltig e-postadress eller lösenord, försök igen." }
        } else {
            return { error: "Inloggning misslyckades" }
        }
    }
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
                        Logga in med e-post
                    </button>
                </Form>
                <div className="mt-4">
                    <button 
                        type="button"
                        onClick={() =>
                            authClient.signIn.social({
                            provider: "microsoft",
                            callbackURL: "/upload",
                            })
                        }
                        className="w-full bg-gray-100 text-gray-800 py-2 rounded-md border border-gray-300 hover:bg-gray-200"
                    >
                        Logga in med Microsoft <i className="fa-brands fa-microsoft"></i>
                    </button>
                </div>
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