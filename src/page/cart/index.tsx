import { useCallback, useContext, useEffect, useState } from "react";
import { useCart } from "../../context/Cart/cartContext";
import { useMutation } from "react-query";
import {
  changeCartAdd,
  userCartClear,
  userCartDelete,
} from "../../sevices/client/cart";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import debounce from "lodash.debounce";
import { useCheckout } from "../../context/checkout";
import { UsersContext } from "../../context/usersContext";
const Cart = () => {
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const { selectedProducts, setSelectedProducts } = useCheckout() || {};
  const { token }: any = useContext(UsersContext) || {};
  const { cart, cartUser, refetchCart, cartLocal, setCartLocal, setCart }: any =
    useCart();
  const { mutate: changeCart } = useMutation({
    mutationFn: async (cartData: any) => {
      return await changeCartAdd(cartData);
    },
  });
  const debouncedChangeCart = useCallback(
    debounce((id: number, quantity: number, cart_item_id: number) => {
      if (token) {
        const data = {
          cart_item_id,
          variation_id: id,
          quantity,
        };
        changeCart(data);
        setTimeout(() => {
          refetchCart();
        }, 1200);
      } else {
        const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
        const updatedCart = localCart.map((item: any) =>
          item.product_id === id ? { ...item, quantity } : item
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
    }, 1000),
    [token]
  );

  const updateQuantity = (
    id: number,
    quantity: number,
    cart_item_id: number
  ) => {
    setQuantities((prev) => ({ ...prev, [id]: quantity }));
    if (token) {
      debouncedChangeCart(id, quantity, cart_item_id);
    } else {
      const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const updatedCart = localCart.map((item: any) =>
        item.product_id === id ? { ...item, quantity } : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const handleQuantityIncrease = (
    id: number,
    maxStock: number,
    currentQuantity: number,
    cart_item_id: number
  ) => {
    setQuantities((prev) => {
      const prevQuantity = prev[id] ?? currentQuantity;
      const newQuantity = prevQuantity < maxStock ? prevQuantity + 1 : maxStock;

      if (token) {
        debouncedChangeCart(id, newQuantity, cart_item_id);
      } else {
        const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
        const updatedCart = localCart.map((item: any) =>
          item.variant_id === id ? { ...item, quantity: newQuantity } : item
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }

      return { ...prev, [id]: newQuantity };
    });
  };

  const handleQuantityDecrease = (
    id: number,
    _stockQuantity: number,
    currentQuantity: number,
    cart_item_id: number
  ) => {
    setQuantities((prev) => {
      const prevQuantity = prev[id] ?? currentQuantity;
      const newQuantity = prevQuantity > 1 ? prevQuantity - 1 : 1;

      if (token) {
        debouncedChangeCart(id, newQuantity, cart_item_id);
      } else {
        console.log(id);
        const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
        const updatedCart = localCart.map((item: any) =>
          item.variant_id === id ? { ...item, quantity: newQuantity } : item
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }

      return { ...prev, [id]: newQuantity };
    });
  };

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  useEffect(() => {
    if (cart?.length > 0) {
      const initialQuantities = cartLocal?.reduce((acc: any, item: any) => {
        acc[item.id] = item.quantity;
        return acc;
      }, {});
      setQuantities(initialQuantities);
    }
  }, [cart]);

  useEffect(() => {
    if (!cartLocal || cartLocal.length === 0) return;
    const localDataCart: any = localStorage.getItem("checkId");
    const storedProducts = localDataCart ? JSON.parse(localDataCart) : [];
    if (storedProducts.length == 0) {
      localStorage.removeItem("checkId");
      const data = cartLocal?.map((item: any) => item.id);
      setSelectedProducts(data);
      localStorage.setItem("checkId", JSON.stringify(data));
    } else {
      setSelectedProducts(storedProducts);
    }
  }, [cartLocal]);
  const handleDelete = async (id: any) => {
    if (cartUser) {
      await userCartDelete(id);
      toast.success("Xóa sản phẩm thành công");
      refetchCart();
    } else {
      const cartNew = cart.filter(
        (item: any) => Number(item.variant_id) !== id
      );
      console.log(cartNew);
      if (selectedProducts.length) {
        const cartNewCheckOutId = selectedProducts.filter(
          (item: any) => Number(item) !== id
        );
        localStorage.setItem("checkId", JSON.stringify(cartNewCheckOutId));
      }
      setCart(cartNew);
      // setReset((re: any) => !re);
      localStorage.setItem("cart", JSON.stringify(cartNew));
      toast.success("Xóa sản phẩm thành công");
    }
  };

  const handleClear = async () => {
    if (cartUser.length >= 0) {
      await userCartClear();
      refetchCart();
      toast.success("Xóa sản phẩm thành công");
    } else {
      if (cart.length <= 0) {
        toast.error("Không có sản phẩm");
      } else {
        localStorage.clear();
        setCartLocal([]);
        toast.success("Xóa sản phẩm thành công");
      }
    }
  };

  const handleSelectProduct = (productId: any) => {
    setSelectedProducts((prev: any) => {
      const newSelected = prev.includes(productId)
        ? prev.filter((id: any) => id !== productId)
        : [...prev, productId];
      localStorage.setItem("checkId", JSON.stringify(newSelected));
      return newSelected;
    });
  };

  return (
    <section className="cartPageSection woocommerce">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <table className="shop_table cart_table">
              <thead>
                <tr>
                  <th style={{ width: "50px" }}></th>
                  <th className="product-thumbnail" style={{ width: 200 }}>
                    Tên Sản Phẩm
                  </th>
                  <th className="product-name">&nbsp;</th>
                  <th className="product-price">Giá</th>
                  <th className="product-quantity">Số Lượng</th>
                  <th className="product-subtotal">Tổng Tiền</th>
                  <th className="product-remove">&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {cartLocal && cartLocal.length > 0 ? (
                  cartLocal?.map((product: any) => {
                    // const price =
                    //   product.variants[0]?.sale_price ||
                    //   product.variants[0]?.regular_price ||
                    //   0;
                    // const quantity = quantities[product.id] || 1;
                    // const total = price * quantity;
                    return (
                      <tr key={product.id}>
                        <td className="product-checkbox">
                          <input
                            type="checkbox"
                            checked={selectedProducts.includes(product.id)}
                            onChange={() => handleSelectProduct(product.id)}
                          />
                        </td>
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
                            <ins>
                              {(product?.sale_price !== null
                                ? product.sale_price
                                : product?.regular_price
                              )?.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </ins>
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
                              {(!token
                                ? (quantities?.[product?.id] ??
                                    product?.quantity ??
                                    1) *
                                  (product?.sale_price ??
                                    product?.regular_price ??
                                    0)
                                : (product?.quantity ?? 1) *
                                  (product?.sale_price ??
                                    product?.regular_price ??
                                    0)
                              ).toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              })}
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
                    <Link to="/" className="ulinaBTN">
                      <span>Continue Shopping</span>
                    </Link>
                  </td>
                  <td colSpan={4} className="text-end">
                    <Link to="/checkout" className="ulinaBTN2">
                      <span>Continue Checkout</span>
                    </Link>
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
