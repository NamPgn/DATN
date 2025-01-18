
const Cart = () => {
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
                <tr>
                  <td className="product-thumbnail">
                    <a href="shop_details1.html">
                      <img src="/assets/images/cart/1.jpg" alt="Cart Item" />
                    </a>
                  </td>
                  <td className="product-name">
                    <a href="shop_details1.html">
                      Ulina luxurious bag for men women
                    </a>
                  </td>
                  <td className="product-price">
                    <div className="pi01Price">
                      <ins>$48.00</ins>
                    </div>
                  </td>
                  <td className="product-quantity">
                    <div className="quantity clearfix">
                      <button
                        type="button"
                        name="btnMinus"
                        className="qtyBtn btnMinus"
                      >
                        _
                      </button>
                      <input
                        type="number"
                        className="carqty input-text qty text"
                        name="quantity"
                      />
                      <button
                        type="button"
                        name="btnPlus"
                        className="qtyBtn btnPlus"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="product-subtotal">
                    <div className="pi01Price">
                      <ins>$48.00</ins>
                    </div>
                  </td>
                  <td className="product-remove">
                    <a href="javascript:void(0);" className="remove">
                      <span />
                    </a>
                  </td>
                </tr>
            
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
