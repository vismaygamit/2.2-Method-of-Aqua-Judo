export interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  content: string; // Markdown or HTML
  publishedAt: number;
  slug: string;
  chapterNumber?: number;
  fieldNotes?: {
    id: string;
    text: string;
    sectionId: string;
  }[];
  takeaways?: string[];
  keywords?: string[];
}
