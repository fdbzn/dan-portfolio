import type { ChallengePair } from "@/types/project";

/**
 * Local enriched data that augments Contentful projects.
 * Keyed by project title. Add new entries as projects are created.
 */
const ENRICHED_MAP: Record<string, {
  productVision: string;
  challenges: ChallengePair[];
  architectureTags: string[];
}> = {
  /* ─── EXAMPLE ──────────────────────────────────────────────
  "My Project": {
    productVision: "…",
    challenges: [
      { challenge: "…", solution: "…" },
    ],
    architectureTags: ["Next.js", "Supabase", "Tailwind"],
  },
  ──────────────────────────────────────────────────────────── */
};

/**
 * Merge Contentful project data with local enriched content.
 * Falls back gracefully to generic content when no enrichment is found.
 */
export function enrichProject(project: { title: string }): {
  productVision: string;
  challenges: ChallengePair[];
  architectureTags: string[];
} {
  const local = ENRICHED_MAP[project.title];

  if (local) {
    return local;
  }

  // Graceful fallback for projects without local enrichment
  return {
    productVision: `${project.title} represents a strategic initiative where technical leadership and product thinking converge to deliver measurable business impact.`,
    challenges: [
      {
        challenge: "Scalability and performance under evolving requirements.",
        solution:
          "Leveraged a modular architecture with cloud-native services, enabling independent scaling of critical subsystems.",
      },
      {
        challenge: "Cross-functional alignment across distributed teams.",
        solution:
          "Established clear API contracts, shared component libraries, and iterative delivery cadences to reduce integration friction.",
      },
    ],
    architectureTags: ["Node.js", "React", "AWS", "CI/CD", "REST API"],
  };
}
