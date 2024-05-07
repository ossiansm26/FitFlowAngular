export default class Post {
  id: number;
  title: string;
  content: string;
  creationDate: string;
  category: string;
  likes: number;
  comments: any[]; // Corregí el nombre de la propiedad de "comment" a "comments"

  constructor(
    id: number,
    title: string,
    content: string,
    creationDate: string,
    category: string,
    likes: number,
    comments: any[]
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.creationDate = creationDate;
    this.category = category;
    this.likes = likes;
    this.comments = comments;
  }
}