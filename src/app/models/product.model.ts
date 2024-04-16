export interface ProductDetails {
  id: string;
  title: string;
  rating?: number;
  image?: string;
  price?: number;
  productName: string;
  productDescription?: string;
  quantity?: number;
}

export class Product implements ProductDetails {
  id: string;
  title: string;
  rating: number;
  image: string;
  price: number;
  productName: string;
  productDescription: string;
  quantity: number;

  constructor(data: Partial<ProductDetails> = {}) {
    this.id = data.id || '';
    this.title = data.title || '';
    this.rating = data.rating || 0;
    this.image = data.image || 'https://cdn.discordapp.com/attachments/837068413209018471/1203370401527365653/1742054354142797959.png?ex=65d0d905&is=65be6405&hm=bb4d0e5972e4c7322e48c22b4a221c1f12576c60d42000e5b68ffb389c6fbcde&';
    this.price = data.price || 0;
    this.productName = data.productName || '';
    this.productDescription = data.productDescription || '';
    this.quantity = data.quantity || 0;
  }
}