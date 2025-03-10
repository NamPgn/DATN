import { useState } from "react";
import Quantity from "../../components/Products/Quantity";
import { useCart } from "../../context/Cart/cartContext";

const Cart = () => {
  const [quantity, setQuantity] = useState(1);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const updateQuantity = (id: number, quantity: number) => {
    setQuantities((prev) => ({ ...prev, [id]: quantity }));
  };
  const { cart }: any = useCart();
  console.log(cart)
  return (
    <section className="cartPageSection woocommerce">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="cartHeader">
              <h3>Your Cart Items</h3>
            </div>
          </div>
          <div className="col-lg-12">
            <table className="shop_table cart_table">
              <thead>
                <tr>
                  <th className="product-thumbnail">Item Name</th>
                  <th className="product-name">&nbsp;</th>
                  <th className="product-price">Price</th>
                  <th className="product-quantity">Quantity</th>
                  <th className="product-subtotal">Total</th>
                  <th className="product-remove">&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {cart.length > 0 ? (
                  cart.map((product: any) => {
                    const price =
                      product.variants[0]?.sale_price ||
                      product.variants[0]?.regular_price ||
                      0;
                    const quantity = quantities[product.id] || 1;
                    const total = price * quantity;

                    return (
                      <tr key={product.id}>
                        <td className="product-thumbnail">
                          <a href={`/product/${product.slug}`}>
                            <img src={product.url} alt={product.name} />
                          </a>
                        </td>
                        <td className="product-name">
                          <a href={`/product/${product.slug}`}>
                            {product.name}
                          </a>
                        </td>
                        <td className="product-price">
                          <div className="pi01Price">
                            <ins>${price.toLocaleString()}</ins>
                          </div>
                        </td>
                        <td className="product-quantity">
                          <div className="pcBtns m-0">
                            <Quantity
                              quantity={quantity}
                              setQuantity={(q: any) =>
                                updateQuantity(product.id, q)
                              }
                            />
                          </div>
                        </td>
                        <td className="product-subtotal">
                          <div className="pi01Price">
                            <ins>${total.toLocaleString()}</ins>
                          </div>
                        </td>
                        <td className="product-remove">
                          <div className="remove">
                            <span onClick={() => console.log("Xóa sản phẩm")} />
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center p-4">
                      Giỏ hàng trống
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr className="actions">
                  <td colSpan={2} className="text-start">
                    <a href="shop_full_width.html" className="ulinaBTN">
                      <span>Continue Shopping</span>
                    </a>
                  </td>
                  <td colSpan={4} className="text-end">
                    <a href="shop_full_width.html" className="ulinaBTN2">
                      Update Cart
                    </a>
                    <a href="shop_full_width.html" className="ulinaBTN2">
                      Clear All
                    </a>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
