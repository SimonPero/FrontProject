import { auth } from "@/auth";
import Cart from "@/components/cart/Cart";
import CartApi from "@/api/cartApi";

const cartApi = new CartApi();
export default async function Page() {
  const session = await auth();
  let userCart = await cartApi.getCart(session?.user?.email, session);

  return (
      <Cart cart={userCart.cart} items={userCart.items} session={session} />
  );
}