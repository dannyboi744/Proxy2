import fetch from "node-fetch";

// Function to fetch content through the proxy
export async function fetchProxiedContent(url: string): Promise<{ success: boolean; content?: string; message?: string }> {
  try {
    // Validate URL format
    new URL(url);
    
    // Fetch the content
    const response = await fetch(url, {
      headers: {
        // Set a generic user agent to avoid being blocked
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        // Accept all content types
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        // Accept all languages
        "Accept-Language": "en-US,en;q=0.5",
      },
      // Follow redirects
      redirect: "follow",
      // Set timeout to 10 seconds
      timeout: 10000,
    });

    // Check if fetch was successful
    if (!response.ok) {
      return {
        success: false,
        message: `Failed to fetch content: Server responded with status ${response.status} ${response.statusText}`
      };
    }

    // Get content type
    const contentType = response.headers.get("content-type") || "";
    
    // For non-HTML content types, return a message
    if (!contentType.includes("text/html")) {
      return {
        success: false,
        message: `Content type "${contentType}" is not supported. Only HTML pages can be displayed.`
      };
    }

    // Get the HTML content
    const content = await response.text();
    
    return {
      success: true,
      content
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "An unknown error occurred"
    };
  }
}

// Process HTML content to make it work within our proxy iframe
export function processHtml(html: string, originalUrl: string): string {
  const baseUrl = new URL(originalUrl);
  
  // Add base tag to help resolve relative URLs
  const baseTag = `<base href="${baseUrl.origin}/">`;
  
  // Insert base tag after head if it exists, otherwise add it at the beginning
  if (html.includes("<head>")) {
    html = html.replace("<head>", `<head>${baseTag}`);
  } else {
    html = `<html><head>${baseTag}</head>${html}</html>`;
  }
  
  // Add a script to adjust same-origin policies
  const script = `
    <script>
      // Script to handle clicks on links to keep them within the proxy
      document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link && link.href) {
          e.preventDefault();
          // You would replace this with your actual proxy endpoint
          window.parent.postMessage({ type: 'navigate', url: link.href }, '*');
        }
      });
    </script>
  `;
  
  // Add script before closing body tag or at the end of HTML
  if (html.includes("</body>")) {
    html = html.replace("</body>", `${script}</body>`);
  } else {
    html = `${html}${script}`;
  }
  
  return html;
}
