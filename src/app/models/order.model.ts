export interface OrderDetails {
    id: string;
    created_data: Date;
    status: string;
    billing_address: string;
    total_amount: Number;
    quantity: Number;
    user_id: string;
    product_id: string;
    session_id: string;
  }
  
  export class Order implements OrderDetails {
    id: string;
    created_data: Date;
    status: string;
    billing_address: string;
    total_amount: Number;
    quantity: Number;
    user_id: string;
    product_id: string;
    session_id: string;
  
    constructor(data: Partial<OrderDetails> = {}) {
      this.id = data.id || '';
      this.created_data = data.created_data || new Date;
      this.status = data.status || '';
      this.billing_address = data.billing_address || '';
      this.total_amount = data.total_amount || 0;
      this.user_id = data.user_id || '';
      this.product_id = data.product_id || '';
      this.quantity = data.quantity || 0;
      this.session_id = data.session_id || '';
    }
  }
  