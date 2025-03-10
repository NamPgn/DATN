import { useCallback, useEffect, useState } from "react";
import { useCart } from "../../context/Cart/cartContext";
import { useMutation, useQuery } from "react-query";
import {
  changeCartAdd,
  getCart,
  userCart,
  userCartClear,
  userCartDelete,
} from "../../sevices/client/cart";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import debounce from "lodash.debounce";
const Cart = () => {
  const [cartLocal, setCart] = useState([]);
  const [cart_item_id, setCart_item_id] = useState<number | null>(null);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const { mutate: changeCart } = useMutation({
    mutationFn: async (cartData: any) => {
      return await changeCartAdd(cartData);
    },
  });

  const debouncedChangeCart = useCallback(
    debounce((id: number, quantity: number, cart_item_id: number) => {
      const data = {
        cart_item_id: cart_item_id,
        variation_id: id,
        quantity,
      };
      changeCart(data);
      refetch();
    }, 2000),
    []
  );

  const updateQuantity = (
    id: number,
    quantity: number,
    cart_item_id: number
  ) => {
    setCart_item_id(cart_item_id);
    setQuantities((prev) => ({ ...prev, [id]: quantity }));
    debouncedChangeCart(id, quantity, cart_item_id);
  };

  const { data: cartUser, refetch } = useQuery({
    queryKey: ["userCart"],
    queryFn: async () => {
      return (await userCart())?.data?.data;
    },
  });
  const { cart }: any = useCart();
  const cartData = cart?.map((item: any) => ({
    variant: item.variant_id,
    quantity: item.quantity,
  }));
  const handleQuantityIncrease = (
    id: number,
    maxStock: number,
    currentQuantity: number,
    cart_item_id: number
  ) => {
    setQuantities((prev) => {
      const prevQuantity = prev[id] ?? currentQuantity;
      const newQuantity = prevQuantity < maxStock ? prevQuantity + 1 : maxStock;
      debouncedChangeCart(id, newQuantity, cart_item_id);
      return {
        ...prev,
        [id]: prevQuantity < maxStock ? prevQuantity + 1 : maxStock,
      };
    });
  };

  const handleQuantityDecrease = (
    id: number,
    stockQuantity: number,
    currentQuantity: number,
    cart_item_id: number
  ) => {
    setQuantities((prev) => {
      const prevQuantity = prev[id] ?? currentQuantity;
      const newQuantity = prevQuantity > 1 ? prevQuantity - 1 : 1;
      debouncedChangeCart(id, newQuantity, cart_item_id);
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
    if (cartUser?.length >= 0) {
      setCart(cartUser);
    } else {
      if (cart?.length > 0) {
        mutate();
      }
    }
  }, [cart, cartUser]);

  const handleDelete = async (id: any) => {
    if (cartUser) {
      await userCartDelete(id);
      toast.success("Xóa sản phẩm thành công");
      refetch();
    } else {
      const cartNew = cart.filter(
        (item: any) => Number(item.product_id) !== id
      );
      localStorage.setItem("cart", JSON.stringify(cartNew));
      setCart(cartNew);
      toast.success("Xóa sản phẩm thành công");
    }
  };

  const handleClear = async () => {
    if (cartUser.length >= 0) {
      await userCartClear();
      refetch();
      toast.success("Xóa sản phẩm thành công");
    } else {
      if (cart.length <= 0) {
        toast.error("Không có sản phẩm");
      } else {
        localStorage.clear();
        setCart([]);
        toast.success("Xóa sản phẩm thành công");
      }
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
                            {product?.name}
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
                                    product.stock_quantity,
                                    product.quantity,
                                    product.cart_item_id
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
                                  quantities[product.id] || product.quantity
                                }
                                onChange={(e) => {
                                  const value = parseInt(e.target.value, 10);
                                  if (
                                    !isNaN(value) &&
                                    value > 0 &&
                                    value <= product.stock_quantity
                                  ) {
                                    updateQuantity(
                                      product.id,
                                      value,
                                      product.cart_item_id
                                    );
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
                                    product.stock_quantity,
                                    product.quantity,
                                    product.cart_item_id
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
                            onClick={() =>
                              handleDelete(
                                cartUser ? product.cart_item_id : product.id
                              )
                            }
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
