export default class Community {
  id: number;
  name: string;
  description: string;
  post: any[];

  constructor(
    id: number,
    name: string,
    description: string,
    post: any[]
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.post = post;
  }
}
