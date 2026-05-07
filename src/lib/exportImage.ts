import { toPng } from "html-to-image";

export async function downloadResultCard(
  element: HTMLElement,
  fileName = "team-diagnosis-results.png",
): Promise<void> {
  const dataUrl = await toPng(element, {
    cacheBust: true,
    pixelRatio: Math.min(window.devicePixelRatio || 2, 3),
    backgroundColor: "#f8fafc",
  });

  const link = document.createElement("a");
  link.download = fileName;
  link.href = dataUrl;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
}
