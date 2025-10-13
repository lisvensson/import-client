import type { FileUpload } from "@remix-run/form-data-parser";
import * as fsp from "node:fs/promises";

export async function uploadHandler(fileUpload: FileUpload) {
    if (fileUpload.fieldName !== "file") return;

    try {
        const validateFile = fileUpload.type === 'text/csv';
        if (!validateFile) {
        throw new Error ("Endast CSV-filer tillåts");
        }

        const bytes = await fileUpload.bytes();
        const filePath = `./app/uploads/${Date.now()}-${fileUpload.name}`;
        await fsp.writeFile(filePath, bytes);

        const fileContent = Buffer.from(bytes).toString("utf-8");

        return JSON.stringify({
        success: true,
        filePath,
        fileName: fileUpload.name,
        content: fileContent
        });
    } catch (error: any) {
        console.error("Upload failed:", error);
        return JSON.stringify({
        success: false,
        error: error.message
        });
    }
}