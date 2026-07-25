const FORMULA_PREFIX = /^[=+\-@\t\r]/;

export function safeCsvCell(value: unknown) {
  let text = value == null ? "" : String(value);
  if (FORMULA_PREFIX.test(text)) text = `'${text}`;
  return `"${text.replaceAll('"', '""')}"`;
}

export function toCsv(rows: unknown[][]) {
  return rows.map((row) => row.map(safeCsvCell).join(",")).join("\r\n");
}
