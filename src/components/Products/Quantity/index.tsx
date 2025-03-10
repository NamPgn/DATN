const Quantity = ({ quantity, setQuantity }: any) => {
  const handleQuantityChange = (e: any) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const handleQuantityIncrease = () => {
    setQuantity((prev: any) => prev + 1);
  };

  const handleQuantityDecrease = () => {
    setQuantity((prev: any) => (prev > 1 ? prev - 1 : prev));
  };
  
  return (
    <div className="quantity clearfix">
      <button
        type="button"
        className="qtyBtn btnMinus"
        onClick={handleQuantityDecrease}
      >
        _
      </button>
      <input
        type="number"
        className="carqty input-text qty text"
        name="quantity"
        value={quantity}
        onChange={handleQuantityChange}
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
