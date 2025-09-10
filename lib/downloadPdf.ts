import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import toast from "react-hot-toast";

export async function downloadResumePdf(
  previewEl: HTMLElement,
  resumeTitle: string,
  setIsDownloading: (val: boolean) => void
) {
  if (!previewEl) {
    toast.error("Resume preview not found!");
    return;
  }

  setIsDownloading(true);

  try {
    // wait for any pending render
    await new Promise((resolve) => setTimeout(resolve, 500));

    // temporary div
    const tempDiv = document.createElement("div");
    tempDiv.style.position = "absolute";
    tempDiv.style.left = "-9999px";
    tempDiv.style.top = "0";
    tempDiv.style.width = "794px";
    tempDiv.style.minHeight = "1123px";
    tempDiv.style.backgroundColor = "white";
    tempDiv.style.fontFamily = "Arial, sans-serif";
    tempDiv.style.fontSize = "12px";
    tempDiv.style.lineHeight = "1.4";
    tempDiv.style.padding = "20px";
    tempDiv.style.boxSizing = "border-box";

    // clone styles
    const styleSheets = Array.from(document.styleSheets);
    const styles = document.createElement("style");

    try {
      let cssText = "";
      styleSheets.forEach((sheet) => {
        try {
          if (sheet.cssRules) {
            Array.from(sheet.cssRules).forEach((rule) => {
              cssText += rule.cssText + "\n";
            });
          }
        } catch {
          // ignore cross-origin styles
        }
      });

      cssText += `
        * { box-sizing: border-box !important; }
        body { margin:0!important; padding:0!important; background:white!important; }
        .shadow-xl { box-shadow:none!important; }
        .rounded-lg { border-radius:0!important; }
        .text-blue-600 { color:#2563eb!important; }
        .text-gray-600 { color:#4b5563!important; }
        .text-gray-700 { color:#374151!important; }
        .text-gray-800 { color:#1f2937!important; }
        .bg-gray-100 { background-color:#f3f4f6!important; }
        .border-gray-300 { border-color:#d1d5db!important; }
        .border-gray-400 { border-color:#9ca3af!important; }
      `;

      styles.textContent = cssText;
    } catch (e) {
      console.warn("Could not copy styles:", e);
    }

    // clone resume
    const resumeContent = previewEl.cloneNode(true) as HTMLElement;
    const wrapper = document.createElement("div");
    wrapper.appendChild(styles);
    wrapper.appendChild(resumeContent);
    tempDiv.appendChild(wrapper);

    document.body.appendChild(tempDiv);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    // canvas
    const canvas = await html2canvas(tempDiv, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      width: 794,
      height: 1123,
      logging: false,
      onclone: (clonedDoc) => {
        clonedDoc.body.style.margin = "0";
        clonedDoc.body.style.padding = "0";
        clonedDoc.body.style.backgroundColor = "white";
        clonedDoc.body.style.fontFamily = "Arial, sans-serif";
        return clonedDoc;
      },
    });

    document.body.removeChild(tempDiv);

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    const imgData = canvas.toDataURL("image/png", 0.98);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    const fileName = resumeTitle
      ? `${resumeTitle.replace(/[^a-z0-9\s]/gi, "").replace(/\s+/g, "_").toLowerCase()}.pdf`
      : "resume.pdf";

    pdf.save(fileName);
    toast.success("PDF downloaded successfully!");
  } catch (error) {
    console.error("PDF download error:", error);
    toast.error("Failed to download PDF. Please try again.");
  } finally {
    setIsDownloading(false);
  }
}
