export default interface ClientSideCartItem {
  id: number;
  quantity: number;
  product: {
    id: number;
    title: string;
    price: number;
  };
}
