import type { RichTextNode } from "@/types/project";

interface Props {
  node: RichTextNode;
}

/**
 * Renders a Contentful Rich Text document tree into JSX.
 * Supports: paragraphs, unordered/ordered lists, bold, text, list items.
 */
export default function RichTextRenderer({ node }: Props) {
  switch (node.nodeType) {
    case "document":
      return (
        <div className="space-y-3">
          {(node.content ?? []).map((child, i) => (
            <RichTextRenderer key={i} node={child as RichTextNode} />
          ))}
        </div>
      );

    case "paragraph": {
      // A paragraph can contain text nodes and inline nodes
      // If it's empty (no content or empty content), skip it
      if (!node.content || node.content.length === 0) return null;
      return (
        <p>
          {(node.content as RichTextNode[]).map((child, i) => (
            <RichTextRenderer key={i} node={child} />
          ))}
        </p>
      );
    }

    case "unordered-list":
      return (
        <ul className="list-disc pl-5 space-y-0.5">
          {(node.content ?? []).map((child, i) => (
            <RichTextRenderer key={i} node={child as RichTextNode} />
          ))}
        </ul>
      );

    case "ordered-list":
      return (
        <ol className="list-decimal pl-5 space-y-0.5">
          {(node.content ?? []).map((child, i) => (
            <RichTextRenderer key={i} node={child as RichTextNode} />
          ))}
        </ol>
      );

    case "list-item": {
      // Contentful wraps list-item content in paragraph(s) inside the list-item
      // For simple list items with just a paragraph, render inline
      const content = node.content as RichTextNode[] | undefined;
      if (!content || content.length === 0) return null;
      return (
        <li>
          {content.map((child, i) => (
            <RichTextRenderer key={i} node={child} />
          ))}
        </li>
      );
    }

    case "text": {
      const marks = node.marks ?? [];
      let el: React.ReactNode = node.value ?? "";
      if (marks.some((m) => m.type === "bold")) {
        el = <strong>{el}</strong>;
      }
      if (marks.some((m) => m.type === "italic")) {
        el = <em>{el}</em>;
      }
      if (marks.some((m) => m.type === "underline")) {
        el = <u>{el}</u>;
      }
      if (marks.some((m) => m.type === "code")) {
        el = <code className="bg-surface-container-high px-1 rounded text-sm">{el}</code>;
      }
      return <>{el}</>;
    }

    default:
      // Unknown node type — try its children if any, or nothing
      return node.content ? (
        <>
          {(node.content as RichTextNode[]).map((child, i) => (
            <RichTextRenderer key={i} node={child} />
          ))}
        </>
      ) : null;
  }
}
