import { emailAnalyze } from "./emailAnalyze";
import { nameAnalyze } from "./nameAnalyze";

export function parseAndAnalyzeCsvFile(content: string, fileName: string, nameList: Set<string>) {
  const lines = content.trim().split("\n");
  const rows = lines.map(line => line.trim().split(";"));
  const dataRows = rows.slice(1);
  const headers = rows[0];
  const columns = headers.map((name, index) => {
    const columnValues = dataRows.map(row => row[index] ?? '');
    const emailProbability = emailAnalyze(columnValues);
    const nameProbability = nameAnalyze(columnValues, nameList);
    const hint = emailProbability > 0
      ? { type: 'email', probability: Number(emailProbability.toFixed(2)) }
      : nameProbability > 0
      ? { type: 'person name', probability: Number(nameProbability.toFixed(2)) }
      : undefined;
    return { name, hint };
  });

  return {
    fileName,
    rowCount: dataRows.length,
    columns
  };
}