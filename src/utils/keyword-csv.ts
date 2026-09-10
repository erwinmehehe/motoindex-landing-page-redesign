import type { KeywordInput } from "../keyword-audit";

export function parseCsv(text: string): string[][] {
  if (text.length > 25000000) throw new Error("This file is too large. Use a CSV smaller than 25 MB.");
  const delimiter = text.split(/\r?\n/, 1)[0].includes("\t") ? "\t" : ",";
  const rows: string[][] = [];
  let row: string[] = [], cell = "", quoted = false;
  const pushRow = () => { row.push(cell); if (row.some((value) => value.trim())) rows.push(row); row = []; cell = ""; if (rows.length > 60001) throw new Error("Limit this import to 60,000 keyword rows."); };
  for (let index = 0; index < text.length; index++) {
    const char = text[index];
    if (char === '"') {
      if (quoted && text[index + 1] === '"') { cell += '"'; index++; }
      else if (quoted || cell.length === 0) quoted = !quoted;
      else cell += char;
    } else if (!quoted && char === delimiter) { row.push(cell); cell = ""; }
    else if (!quoted && (char === "\n" || char === "\r")) { if (char === "\r" && text[index + 1] === "\n") index++; pushRow(); }
    else cell += char;
  }
  if (quoted) throw new Error("The CSV ends inside a quoted field. Export the sheet again or check the file.");
  if (cell || row.length) pushRow();
  return rows;
}

const numeric = (value: string | undefined) => { if (!value?.trim()) return null; const number = Number(value.replace(/,/g, "")); return Number.isFinite(number) && number >= 0 ? number : null; };

export function keywordRows(text: string): KeywordInput[] {
  const rows = parseCsv(text.replace(/^\uFEFF/, ""));
  if (rows.length < 2) throw new Error("No keyword rows found. The default spreadsheet tab may be empty; export tab 1933668074.");
  const header = rows[0].map((cell) => cell.toLowerCase().replace(/[^a-z0-9]/g, ""));
  const field = (names: string[]) => header.findIndex((name) => names.includes(name));
  const keyword = field(["keyword", "query", "searchterm"]);
  if (keyword < 0) throw new Error("Expected a Keyword or Query column. Upload a CSV/TSV export, not an HTML sign-in page.");
  const country = field(["country", "countrycode"]), volume = field(["volume", "searchvolume"]), kd = field(["kd", "keyworddifficulty"]), url = field(["currenturl", "competitorurl", "url"]);
  return rows.slice(1).filter((row) => row[keyword]?.trim()).map((row) => ({ keyword: row[keyword].trim().slice(0, 500), country: (row[country] || "").trim().toUpperCase(), volume: numeric(row[volume]), kd: numeric(row[kd]), competitorUrl: /^https?:\/\//i.test(row[url] || "") ? row[url] : "" }));
}

export function csvCell(value: string | number | null | undefined): string {
  let text = String(value ?? "");
  if (/^[\s]*[=+@-]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}