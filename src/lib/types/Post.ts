export interface Post {
  id: number;
  date: string;
  title: string;
  description: string;
  body: string;
  latestChangeDate: string | null;
}
