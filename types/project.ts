export interface ChallengePair {
  challenge: string;
  solution: string;
}

export interface EnrichedProject extends Project {
  productVision: string;
  challenges: ChallengePair[];
  architectureTags: string[];
}

export interface RichTextNode {
  nodeType: string;
  value?: string;
  content?: RichTextNode[];
  marks?: Array<{ type: string }>;
  data?: Record<string, unknown>;
}

export interface Project {
  title: string;
  description: string;
  fullDescription: string;
  richDescription: RichTextNode;
  tags: string[];
  images: string[];
  borderColor: string;
  highlights: string[];
}

export interface ContentfulProjectFields {
  projectName: string;
  projectDesc: {
    data: Record<string, unknown>;
    content: Array<{
      data: Record<string, unknown>;
      content: Array<{
        data: Record<string, unknown>;
        marks: Array<unknown>;
        value: string;
        nodeType: string;
      }>;
      nodeType: string;
    }>;
    nodeType: string;
  };
  projectImg: Array<{
    sys: { type: string; linkType: string; id: string };
  }>;
  projectMetaData?: Record<string, unknown>;
}

export interface ContentfulAsset {
  sys: {
    id: string;
    type: string;
    space?: Record<string, unknown>;
    createdAt: string;
    updatedAt: string;
    revision: number;
  };
  fields: {
    title: string;
    description: string;
    file: {
      url: string;
      details: {
        size: number;
        image?: { width: number; height: number };
      };
      fileName: string;
      contentType: string;
    };
  };
}
