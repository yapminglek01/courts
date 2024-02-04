export default class Product {
  title: string;
  content?: string;
  image?: string;
  price?: number;

  constructor(title: string) {
    this.title = title;
  }
}
