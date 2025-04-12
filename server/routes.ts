import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { urlSchema } from "@shared/schema";
import { fetchProxiedContent, processHtml } from "./proxy";
import cors from "cors";

export async function registerRoutes(app: Express): Promise<Server> {
  // Enable CORS
  app.use(cors());
  
  // API endpoint to proxy a website
  app.post("/api/proxy", async (req: Request, res: Response) => {
    try {
      // Validate the URL
      const result = urlSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({
          success: false,
          message: "Invalid URL format. Please enter a complete URL including http:// or https://"
        });
      }
      
      const { url } = result.data;
      
      // Fetch content through the proxy
      const proxyResult = await fetchProxiedContent(url);
      
      if (!proxyResult.success) {
        return res.status(400).json({
          success: false,
          message: proxyResult.message
        });
      }
      
      // Process HTML to make it work in an iframe
      const processedContent = processHtml(proxyResult.content!, url);
      
      // Return the proxied content
      res.json({
        success: true,
        url,
        content: processedContent
      });
    } catch (error) {
      console.error("Proxy error:", error);
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "An unknown error occurred"
      });
    }
  });
  
  // Endpoint for opening proxied content in a new tab
  app.get("/api/proxy-redirect", async (req: Request, res: Response) => {
    try {
      const url = req.query.url as string;
      
      if (!url) {
        return res.status(400).send("URL parameter is required");
      }
      
      // Validate the URL
      try {
        // This will throw if the URL is invalid
        new URL(url);
      } catch (error) {
        return res.status(400).send("Invalid URL format");
      }
      
      // Fetch content through the proxy
      const proxyResult = await fetchProxiedContent(url);
      
      if (!proxyResult.success) {
        return res.status(400).send(proxyResult.message);
      }
      
      // Process HTML to make it work in a full page context
      const processedContent = processHtml(proxyResult.content!, url);
      
      // Set content type and send processed HTML
      res.setHeader("Content-Type", "text/html");
      res.send(processedContent);
    } catch (error) {
      console.error("Proxy redirect error:", error);
      res.status(500).send("An error occurred while proxying the content");
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
