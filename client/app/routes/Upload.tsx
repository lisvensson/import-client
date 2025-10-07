import { Form } from "react-router";
import type { Route } from "./+types/Upload";

export function parseCsvFile(content: string, fileName: string) {
  const lines = content.trim().split("\n");
  const rows = lines.map(line => line.trim().split(";"));
  const dataRows = rows.slice(1);

  return {
    fileName,
    rowCount: dataRows.length,
  };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File) || !file.name) {
    return { error: "Ingen fil vald, välj en fil att ladda upp." };
  }

  if (file.type !== 'text/csv') {
    return { error: "Endast CSV-filer tillåts" };
  }

  const fileContent = await file.text();
  const result = parseCsvFile(fileContent, file.name);
  
  console.log("Result: ", result);

  return { success: true, result: result };
}

export default function Upload({ actionData }: Route.ComponentProps) {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300">
      <h1 className="text-center mb-6 text-2xl font-semibold">Ladda upp en CSV-fil</h1>
      <Form method="post" encType="multipart/form-data" className="flex flex-col gap-4">
        <input type="file" name="file" className="file:border file:border-gray-300 file:px-4 file:py-2 file:bg-gray-100 file:text-sm"/>
        <button type="submit" className="bg-green-700 text-white py-2 hover:bg-green-900 cursor-pointer ">Skicka</button>
      </Form>
      {actionData?.error && <p className="text-red-600 text-center mt-4">{actionData.error}</p>}
      {actionData?.success && <p className="text-green-600 text-center mt-4">Uppladdning lyckades!</p>}
    </div>
  );
}