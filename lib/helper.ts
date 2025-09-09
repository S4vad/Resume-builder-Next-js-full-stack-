
export function formatYearMonth(date: string | Date | null | undefined): string {
  if (!date) return "";

  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
}
