export function cn(...v: Array<string | false | null | undefined>) {
  return v.filter(Boolean).join(' ');
}

export async function copyToClipboard(text: string) {
  await navigator.clipboard.writeText(text);
}

export function downloadTextFile(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
