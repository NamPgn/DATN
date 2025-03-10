import { useEffect, useState } from "react";
import { useCart } from "../../context/Cart/cartContext";
import { useMutation } from "react-query";
import { getCart } from "../../sevices/client/cart";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  const [cartLocal, setCart] = useState([]);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const updateQuantity = (id: number, quantity: number) => {
    setQuantities((prev) => ({ ...prev, [id]: quantity }));
  };
  const { cart }: any = useCart();
  const cartData = cart?.map((item: any) => ({
    variant: item.variant_id,
    quantity: item.quantity,
  }));
  const handleQuantityIncrease = (id: number, maxStock: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] < maxStock ? prev[id] + 1 : maxStock,
    }));
  };

  const handleQuantityDecrease = (id: number, stockQuantity: number) => {
    setQuantities((prev) => {
      const currentQuantity = prev[id] ?? stockQuantity;
      return {
        ...prev,
        [id]: currentQuantity > 1 ? currentQuantity - 1 : 1,
      };
    });
  };
  const { mutate } = useMutation({
    mutationFn: async () => {
      return await getCart(cartData);
    },
    onSuccess: ({ data }: any) => {
      setCart(data?.data);
    },
  });

  useEffect(() => {
    if (cart?.length > 0) {
      const initialQuantities = cartLocal.reduce((acc: any, item: any) => {
        acc[item.id] = item.quantity;
        return acc;
      }, {});
      setQuantities(initialQuantities);
    }
  }, [cart]);
  useEffect(() => {
    if (cart?.length > 0) {
      mutate();
    }
  }, [cart]);

  const handleDelete = (id: any) => {
    const cartNew = cart.filter((item: any) => Number(item.product_id) !== id);
    localStorage.setItem("cart", JSON.stringify(cartNew));
    setCart(cartNew);
    toast.success("Xóa sản phẩm thành công");
  };

  const handleClear = () => {
    if (cart.length <= 0) {
      toast.error("Không có sản phẩm");
    } else {
      localStorage.clear();
      setCart([]);
      toast.success("Xóa sản phẩm thành công");
    }
  };

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
                {cartLocal.length > 0 ? (
                  cartLocal.map((product: any) => {
                    // const price =
                    //   product.variants[0]?.sale_price ||
                    //   product.variants[0]?.regular_price ||
                    //   0;
                    // const quantity = quantities[product.id] || 1;
                    // const total = price * quantity;

                    return (
                      <tr key={product.id}>
                        <td className="product-thumbnail">
                          <a href={`/product/${product.slug}`}>
                            <img src={product.image_url} alt={product.name} />
                          </a>
                        </td>
                        <td className="product-name">
                          <a href={`/product/${product.slug}`}>
                            {product?.name }
                            <div>{product?.value}</div>
                          </a>
                        </td>
                        <td className="product-price">
                          <div className="pi01Price">
                            <ins>${product?.regular_price}</ins>
                          </div>
                        </td>
                        <td className="product-quantity">
                          <div className="pcBtns m-0">
                            <div className="quantity clearfix">
                              <button
                                style={{ zIndex: 99 }}
                                type="button"
                                className="qtyBtn btnMinus"
                                onClick={() =>
                                  handleQuantityDecrease(
                                    product.id,
                                    product.stock_quantity
                                  )
                                }
                              >
                                _
                              </button>
                              <input
                                type="number"
                                className="carqty input-text qty text"
                                name="quantity"
                                value={
                                  quantities[product.id] ||
                                  product.stock_quantity
                                }
                                onChange={(e) => {
                                  const value = parseInt(e.target.value, 10);
                                  if (
                                    !isNaN(value) &&
                                    value > 0 &&
                                    value <= product.stock_quantity
                                  ) {
                                    updateQuantity(product.id, value);
                                  }
                                }}
                              />
                              <button
                                style={{ zIndex: 99 }}
                                type="button"
                                className="qtyBtn btnPlus"
                                onClick={() =>
                                  handleQuantityIncrease(
                                    product.id,
                                    product.stock_quantity
                                  )
                                }
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </td>
                        <td className="product-subtotal">
                          <div className="pi01Price">
                            <ins>
                              $
                              {quantities[product.id] * product.regular_price ||
                                product.stock_quantity * product.regular_price}
                            </ins>
                          </div>
                        </td>

                        <td className="product-remove">
                          <div
                            className="remove"
                            onClick={() => handleDelete(product.id)}
                          >
                            <a href="javascript:void(0);" className="remove">
                              <span></span>
                            </a>
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
                    <Link to="/checkout" className="ulinaBTN">
                      <span>Continue Shopping</span>
                    </Link>
                  </td>
                  <td colSpan={4} className="text-end">
                    <a href="javascript:void(0);" className="ulinaBTN2">
                      Update Cart
                    </a>
                    <a
                      onClick={() => handleClear()}
                      href="javascript:void(0);"
                      className="ulinaBTN2"
                    >
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
