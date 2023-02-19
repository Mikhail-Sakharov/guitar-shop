class OrderItem {
  public productId!: string | undefined;
  public quantity!: number;
  public totalItemPrice!: number;
}

export default class CreateOrderDto {
  public items!: OrderItem[];
  public totalOrderPrice!: number;
}
