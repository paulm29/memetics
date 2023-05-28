import { Title } from "./title";
import { Excerpt } from "./excerpt";
import { Content } from "./content";

export class Post {
  title: Title = new Excerpt();
  excerpt: Excerpt = new Excerpt();
  content: Content = new Content();

  author: number;
  status: string;
  _links: Object; // Links
  modified: string;
  guid: string; // Guid
  featured_media: number;
  sticky: boolean;
  password: string;
  format: string;
  link: string;
  ping_status: string;
  modified_gmt: string;
  id: number;
  comment_status: string;
  type: string;
  slug: string;
  date: string;
  date_gmt: string;
  categories: number[] = [];
  tags: string;
}
