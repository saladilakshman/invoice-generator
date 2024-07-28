import "../App.css";
import { useEffect, useState } from "react";
const Price = ({
  priceactions: {
    currencytype,
    total,
    itemslist,
    incentives: { tax, discount },
    dispatch,
  },
}) => {
  const [subtotal, setSubtotal] = useState(0);
  useEffect(() => {
    const amountslist = itemslist.map((item) => Number(item.amount * item.qty));
    const subtotal = amountslist.reduce((accu, price) => accu + price, 0);
    setSubtotal(subtotal);
    const taxAmount = (subtotal * tax) / 100;
    const discountAmount = (subtotal * discount) / 100;
    const actualAmount = subtotal + taxAmount - discountAmount;
    dispatch({ type: "total-price", payload: Math.floor(actualAmount) });
  }, [itemslist, tax, discount, dispatch]);
  return (
    <div className=" flex justify-end">
      <div className="w-full lg:w-1/3 float-right py-6 ">
        <div className="border-b-2 border-gray-200 max-sm:py-6 py-3">
          <div className="flex justify-between items-baseline gap-2">
            <h1 className="items-font">Subtotal:</h1>
            <h2 className="items-font font-normal">
              {currencytype} {subtotal || 0.0}
            </h2>
          </div>
          <div className="flex justify-between items-baseline gap-2">
            <h1 className="items-font">Discount :</h1>
            <h2 className="items-font font-normal">
              {currencytype} {discount || 0.0}
            </h2>
          </div>
          <div className="flex justify-between items-baseline gap-2">
            <h1 className="items-font">Tax :</h1>
            <h2 className="font-normal items-font">
              {currencytype} {tax || 0.0}
            </h2>
          </div>
        </div>
        <div className="flex justify-between items-baseline gap-2">
          <h1 className="items-font">Total:</h1>
          <h2 className="items-font">
            {currencytype} {total || 0}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Price;
