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
    // Wait for any pending renders
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Get the actual resume content (skip the wrapper div)
    const resumeContent = previewEl.querySelector('.resume-section') || previewEl.firstElementChild || previewEl;
    
    if (!resumeContent) {
      throw new Error("Resume content not found");
    }

    // Create a temporary container for PDF generation
    const tempContainer = document.createElement("div");
    tempContainer.style.cssText = `
      position: absolute;
      left: -9999px;
      top: 0;
      width: 794px;
      min-height: 1123px;
      background-color: white;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 12px;
      line-height: 1.4;
      padding: 40px;
      box-sizing: border-box;
      color: #000;
    `;

    // Clone the resume content
    const clonedContent = resumeContent.cloneNode(true) as HTMLElement;
    
    // Apply PDF-specific styles to the cloned content
    const applyPdfStyles = (element: HTMLElement) => {
      // Remove problematic styles
      element.style.boxShadow = 'none';
      element.style.borderRadius = '0';
      element.style.maxWidth = 'none';
      element.style.margin = '0';
      
      // Ensure proper text colors for PDF
      if (element.classList.contains('text-blue-600') || element.classList.contains('text-blue-500')) {
        element.style.color = '#2563eb';
      }
      if (element.classList.contains('text-gray-600')) {
        element.style.color = '#4b5563';
      }
      if (element.classList.contains('text-gray-700')) {
        element.style.color = '#374151';
      }
      if (element.classList.contains('text-gray-800')) {
        element.style.color = '#1f2937';
      }
      if (element.classList.contains('text-gray-900')) {
        element.style.color = '#111827';
      }
      
      // Process child elements
      Array.from(element.children).forEach((child) => {
        if (child instanceof HTMLElement) {
          applyPdfStyles(child);
        }
      });
    };

    applyPdfStyles(clonedContent);
    tempContainer.appendChild(clonedContent);
    document.body.appendChild(tempContainer);

    // Wait for styles to apply
    await new Promise((resolve) => setTimeout(resolve, 500));

    let canvas;
    try {
      // Generate canvas with optimized settings
      canvas = await html2canvas(tempContainer, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        width: 794,
        height: Math.max(1123, tempContainer.scrollHeight + 80),
        logging: false,
        imageTimeout: 0,
        removeContainer: false,
        onclone: (clonedDoc) => {
          // Ensure the cloned document has proper styles
          const clonedBody = clonedDoc.body;
          clonedBody.style.margin = "0";
          clonedBody.style.padding = "0";
          clonedBody.style.backgroundColor = "white";
          clonedBody.style.fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
          
          // Add essential CSS rules
          const style = clonedDoc.createElement('style');
          style.textContent = `
            * { 
              box-sizing: border-box !important; 
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .text-blue-600, .text-blue-500 { color: #2563eb !important; }
            .text-gray-600 { color: #4b5563 !important; }
            .text-gray-700 { color: #374151 !important; }
            .text-gray-800 { color: #1f2937 !important; }
            .text-gray-900 { color: #111827 !important; }
            .bg-gray-100 { background-color: #f3f4f6 !important; }
            .border-gray-300 { border-color: #d1d5db !important; }
            .border-gray-400 { border-color: #9ca3af !important; }
            .font-bold { font-weight: 700 !important; }
            .font-semibold { font-weight: 600 !important; }
            .font-medium { font-weight: 500 !important; }
            .italic { font-style: italic !important; }
            .uppercase { text-transform: uppercase !important; }
            .underline { text-decoration: underline !important; }
            .truncate { 
              overflow: visible !important; 
              text-overflow: initial !important; 
              white-space: normal !important; 
            }
            a { color: #2563eb !important; text-decoration: underline !important; }
            
            /* Grid layout fixes for TemplateThree */
            .grid-cols-12 { 
              display: flex !important; 
              flex-wrap: nowrap !important; 
              gap: 1rem !important;
            }
            .col-span-5 { 
              flex: 0 0 40% !important; 
              width: 40% !important; 
            }
            .col-span-7 { 
              flex: 0 0 60% !important; 
              width: 60% !important; 
            }
            
            /* List styling fixes */
            .list-disc { list-style-type: disc !important; }
            .list-inside { list-style-position: inside !important; }
            
            /* Border fixes */
            .border-r { border-right: 1px solid #d1d5db !important; }
            .border-b { border-bottom: 1px solid #9ca3af !important; }
          `;
          clonedDoc.head.appendChild(style);
          
          return clonedDoc;
        },
      });
    } catch (canvasError) {
      console.error("Canvas generation error:", canvasError);
      throw new Error("Failed to generate PDF canvas");
    } finally {
      // Always clean up temporary element, even if canvas generation fails
      if (document.body.contains(tempContainer)) {
        document.body.removeChild(tempContainer);
      }
    }

    // Create PDF
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    // Get PDF dimensions
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Convert canvas to image
    const imgData = canvas.toDataURL("image/jpeg", 0.95);
    
    // Calculate image dimensions to fit PDF
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    // Add image to PDF
    if (imgHeight <= pdfHeight) {
      // Single page
      pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
    } else {
      // Multiple pages
      let yPosition = 0;
      const pageHeight = pdfHeight;
      
      while (yPosition < imgHeight) {
        const remainingHeight = imgHeight - yPosition;
        const currentPageHeight = Math.min(pageHeight, remainingHeight);
        
        // Create a canvas for this page section
        const pageCanvas = document.createElement('canvas');
        const pageCtx = pageCanvas.getContext('2d');
        pageCanvas.width = canvas.width;
        pageCanvas.height = (currentPageHeight * canvas.width) / imgWidth;
        
        pageCtx?.drawImage(
          canvas,
          0, (yPosition * canvas.width) / imgWidth,
          canvas.width, pageCanvas.height,
          0, 0,
          canvas.width, pageCanvas.height
        );
        
        const pageImgData = pageCanvas.toDataURL("image/jpeg", 0.95);
        
        if (yPosition > 0) {
          pdf.addPage();
        }
        
        pdf.addImage(pageImgData, "JPEG", 0, 0, imgWidth, currentPageHeight);
        yPosition += currentPageHeight;
      }
    }

    // Generate filename
    const fileName = resumeTitle
      ? `${resumeTitle.replace(/[^a-z0-9\s]/gi, "").replace(/\s+/g, "_").toLowerCase()}_resume.pdf`
      : "resume.pdf";

    // Save the PDF
    pdf.save(fileName);
    toast.success("PDF downloaded successfully!");

  } catch (error) {
    console.error("PDF download error:", error);
    toast.error("Failed to download PDF. Please try again.");
  } finally {
    setIsDownloading(false);
  }
}