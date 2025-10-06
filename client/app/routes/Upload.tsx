import { Form } from "react-router";
import type { Route } from "./+types/Upload";

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
  console.log("File content", fileContent);

  return { success: true, fileContent: fileContent };
}

export default function Upload({ actionData }: Route.ComponentProps) {
  return (
    <div>
      <h1>Ladda upp en CSV-fil</h1>
      <Form method="post" encType="multipart/form-data" >
        <input type="file" name="file" />
        <button type="submit">Skicka</button>
      </Form>
      {actionData?.error && <p style={{ color: "red" }}>{actionData.error}</p>}
      {actionData?.success && <p style={{ color: "green" }}>Uppladdning lyckades!</p>}
    </div>
  );
}