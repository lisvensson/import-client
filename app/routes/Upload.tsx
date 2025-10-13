import { Form } from "react-router";
import type { Route } from "./+types/Upload";
import { parseFormData } from "@remix-run/form-data-parser";
import { uploadHandler } from "~/lib/csv/uploadHandler";
import { getNameList } from "~/lib/getNameList";
import { parseAndAnalyzeCsvFile } from "~/lib/csv/parseAndAnalyzeCsvFile";

export async function action({ request }: Route.ActionArgs) {
  try {
    const formData = await parseFormData(request, uploadHandler);
    const uploadedFile = formData.get("file");
    const parsedFile = typeof uploadedFile === "string" ? JSON.parse(uploadedFile) : null;

    if (!parsedFile?.success) {
      return { success: false, error: parsedFile?.error ?? "Okänt fel vid uppladdning." };
    }

    const nameList = getNameList();
    const result = parseAndAnalyzeCsvFile(parsedFile.content, parsedFile.fileName, nameList);

    console.log(JSON.stringify(result))

    return { success: true, result };
  } catch (error) {
    console.error("Upload failed:", error);
    return { success: false, error: "Uppladdning misslyckades." };
  }
}

export default function Upload({ actionData }: Route.ComponentProps) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12">
      <div className="max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">Ladda upp en CSV-fil</h1>
        <p className="text-gray-600 mb-6">
          Välj en CSV-fil med namn eller data som ska analyseras.
        </p>

        {actionData?.error && (
          <div className="text-red-600 mb-4 font-medium">{actionData.error}</div>
        )}
        {actionData?.success && (
          <div className="text-green-600 mb-4 font-medium">Uppladdning lyckades!</div>
        )}
        <Form method="post" encType="multipart/form-data" className="space-y-4 text-left">
          <input
            type="file"
            name="file"
            accept=".csv"
            required
            className="w-full px-3 py-2 border rounded-md file:bg-gray-100 file:border file:border-gray-300 file:px-4 file:py-2 file:text-sm"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
          >
            Skicka
          </button>
        </Form>
      </div>
    </div>
  );
}