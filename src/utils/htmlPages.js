import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";
import { select } from "hast-util-select";

/**
 * Extracts the inner HTML of the body element
 * @param {string} html - The input HTML string
 * @returns {{ body: string, description: string, keywords: string, title: string}} Object containing body HTML and page title
 */
export function extractPageContent(html) {
  try {
    // Parse the HTML string into an AST
    const ast = unified().use(rehypeParse, { fragment: false }).parse(html);

    // Select the body element
    const bodyElement = select("body", ast);

    if (!bodyElement) {
      throw new Error("No body element found in HTML");
    }

    // Get only the children of the body element
    const body = unified()
      .use(rehypeStringify)
      .stringify({ type: "root", children: bodyElement.children });

    const headElement = select("head", ast);
    const titleElement = select("title", headElement);
    const title = titleElement ? titleElement.children[0].value : "";

    const metaDescription = select('meta[name="description"]', headElement);
    const metaKeywords = select('meta[name="keywords"]', headElement);

    const description = metaDescription
      ? metaDescription.properties.content
      : "";
    const keywords = metaKeywords ? metaKeywords.properties.content : "";

    return {
      body: body,
      title: title,
      description: description,
      keywords: keywords,
    };
  } catch (error) {
    throw new Error(`Failed to extract body content: ${error.message}`);
  }
}

/**
 * Loads and extracts content from an HTML file
 * @param {string} pagename - Page path relative to content/pages directory without .html extension
 * @returns {Promise<{ body: string, description: string, keywords: string, title: string}>}
 */
export async function loadPage(pagename) {
  const fs = await import("node:fs/promises");
  const path = await import("node:path");

  const pagesDir = path.join(process.cwd(), "content", "pages");
  const filePath = path.join(pagesDir, pagename + ".html");

  try {
    const content = await fs.readFile(filePath, "utf-8");
    return extractPageContent(content);
  } catch (error) {
    throw new Error(`Failed to load page ${pagename}: ${error.message}`);
  }
}

/**
 * Lists all HTML pages in the content/pages directory
 * @returns {Promise<string[]>} Array of pathnames relative to content/pages
 */
export async function listPages() {
  const fs = await import("node:fs/promises");
  const path = await import("node:path");

  const pagesDir = path.join(process.cwd(), "content", "pages");

  async function getFiles(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(
      entries.map(async (entry) => {
        const fullPath = path.join(dir, entry.name);
        const relativePath = path.relative(pagesDir, fullPath);
        if (entry.isDirectory()) {
          return getFiles(fullPath);
        } else if (entry.name.endsWith(".html")) {
          return [relativePath.replace(".html", "")];
        }
        return [];
      }),
    );
    return files.flat();
  }

  try {
    return await getFiles(pagesDir);
  } catch (error) {
    throw new Error(`Failed to list pages: ${error.message}`);
  }
}
