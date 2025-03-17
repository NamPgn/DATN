const Quantity = ({ quantity, setQuantity, stock }: any) => {
  const handleQuantityChange = (e: any) => {
    const value = e.target.value.trim();
    const parsedValue = parseInt(value, 10);

    if (value === "") {
      setQuantity("");
    } else if (!isNaN(parsedValue)) {
      if (parsedValue < 1) {
        setQuantity(1);
      } else if (parsedValue > stock) {
        setQuantity(stock);
      } else {
        setQuantity(parsedValue);
      }
    }
  };

  const handleQuantityIncrease = () => {
    setQuantity((prev: any) => (prev < stock ? prev + 1 : stock));
  };

  const handleQuantityDecrease = () => {
    setQuantity((prev: any) => (prev > 1 ? prev - 1 : 1));
  };

  const handleBlur = () => {
    if (quantity === "" || isNaN(quantity) || quantity < 1) {
      setQuantity(1);
    }
  };

  return (
    <div className="quantity clearfix">
      <button
        style={{ zIndex: 99 }}
        type="button"
        className="qtyBtn btnMinus"
        onClick={handleQuantityDecrease}
      >
        _
      </button>
      <input
        type="text"
        className="carqty input-text qty text"
        name="quantity"
        value={quantity}
        onChange={handleQuantityChange}
        onBlur={handleBlur}
      />
      <button
        type="button"
        className="qtyBtn btnPlus"
        onClick={handleQuantityIncrease}
      >
        +
      </button>
    </div>
  );
};

export default Quantity;
