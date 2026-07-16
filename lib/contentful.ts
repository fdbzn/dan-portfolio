import type {
  ContentfulProjectFields,
  ContentfulAsset,
  Project,
  RichTextNode,
} from "@/types/project";

const CONTENTFUL_BASE =
  "https://cdn.contentful.com";

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID!;
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN!;

export type { Project } from "@/types/project";

// ── Fetch wrapper ─────────────────────────────────────────────
async function cfFetch<T>(path: string): Promise<T> {
  const url = `${CONTENTFUL_BASE}/spaces/${SPACE_ID}${path}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error(`Contentful fetch failed: ${res.status} ${res.statusText}`);
  return res.json() as Promise<T>;
}

// ── Extract plain text from Rich Text ─────────────────────────
function collectTexts(node: RichTextNode): string[] {
  const texts: string[] = [];
  if (node.value) {
    texts.push(node.value);
  }
  for (const child of node.content ?? []) {
    texts.push(...collectTexts(child));
  }
  return texts;
}

function extractPlainText(richText: ContentfulProjectFields["projectDesc"]): string {
  return collectTexts(richText as unknown as RichTextNode).join("\n");
}

// ── Border color palette (cycled per project) ─────────────────
const BORDER_COLORS = [
  "border-t-plasma-orange",
  "border-t-primary",
  "border-t-secondary",
  "border-t-[#065f46]",
  "border-t-[#005ac1]",
  "border-t-[#7c3aed]",
] as const;

// ── Descriptions/highlights fallback (while model is expanded) ─
function generateFallbackContent(projectName: string): {
  fullDescription: string;
  highlights: string[];
} {
  return {
    fullDescription: `Full details for ${projectName} are being updated in Contentful.`,
    highlights: [
      `Strategic leadership for ${projectName}`,
      "Cross-functional team coordination",
      "Full-stack architecture and delivery",
      "Quality assurance and best practices",
    ],
  };
}

// ── Tags from Contentful metadata tags (if any) ──────────────
function extractTags(entry: {
  metadata?: { tags?: Array<{ sys: { id: string } }> };
}): string[] {
  return (entry.metadata?.tags ?? []).map((t) => t.sys.id);
}

// ── Fetch all projects ───────────────────────────────────────
interface ContentfulResponse {
  items: Array<{
    sys: { id: string; contentType: { sys: { id: string } } };
    fields: ContentfulProjectFields;
    metadata?: { tags?: Array<{ sys: { id: string } }> };
  }>;
  includes?: {
    Asset?: ContentfulAsset[];
  };
}

export async function getProjects(): Promise<Project[]> {
  try {
    const data = await cfFetch<ContentfulResponse>(
      "/entries?content_type=project"
    );

    const assetMap = new Map<string, ContentfulAsset>();
    for (const asset of data.includes?.Asset ?? []) {
      assetMap.set(asset.sys.id, asset);
    }

    return data.items.map((entry, index) => {
      const { projectName, projectDesc, projectImg } = entry.fields;
      const plainDescription = extractPlainText(projectDesc).slice(0, 200);
      const fullDesc = extractPlainText(projectDesc);

      // All images from projectImg array
      const imageUrls: string[] = (projectImg ?? [])
        .map((ref) => {
          const asset = ref.sys?.id ? assetMap.get(ref.sys.id) : undefined;
          return asset ? `https:${asset.fields.file.url}` : "";
        })
        .filter(Boolean);

      const fallback = generateFallbackContent(projectName);

      return {
        title: projectName,
        description: plainDescription || projectName,
        fullDescription: fullDesc || fallback.fullDescription,
        richDescription: projectDesc as unknown as RichTextNode,
        tags: extractTags(entry),
        images: imageUrls,
        images: imageUrls,
        borderColor: BORDER_COLORS[index % BORDER_COLORS.length],
        highlights: fallback.highlights,
      };
    });
  } catch (error) {
    console.error("Error fetching projects from Contentful:", error);
    return [];
  }
}
