import { countriesAndCurrencies } from "../helpers/Toaddress";
import { InvoiceProvider } from "../App";
import { useContext } from "react";
import "../App.css";
const Review = () => {
  const {
    state: { incentives },
    dispatch,
  } = useContext(InvoiceProvider);
  const TaxandDiscount = (event) => {
    const { value, name } = event.target;
    dispatch({ type: "incentives", payload: { name, value } });
  };
  return (
    <>
      <div className="lg:col-span-3 flex flex-col gap-4">
        <div className="border-b-[0.1rem] border-gray-200 pb-3">
          <button className="invoice-review-button" type="submit">
            Review Invoice
          </button>
        </div>
        <div>
          <h1 className="text-base lg:text-md font-semibold">Currency :</h1>
          <select
            className="invoice-review-selection"
            onChange={(e) => {
              const { value } = e.target;
              console.log(value);
              dispatch({
                type: "currency-type-selection",
                payload: value,
              });
            }}
          >
            {countriesAndCurrencies.map((country, index) => {
              return (
                <option value={country.currency} key={index}>
                  {country.currency}
                </option>
              );
            })}
          </select>
          <h1 className="text-base lg:text-md font-semibold pb-2">
            Tax rate (%) :
          </h1>
          <input
            type="text"
            name="tax"
            min={0}
            max={100}
            required={false}
            value={incentives.tax}
            inputMode="numeric"
            className="invoice-review-incentives"
            onChange={(e) => TaxandDiscount(e)}
          />
          <h1 className="text-base lg:text-md font-semibold pb-2">
            Discount rate (%) :
          </h1>
          <input
            type="text"
            min={0}
            max={100}
            required={false}
            name="discount"
            value={incentives.discount}
            inputMode="numeric"
            className="invoice-review-incentives"
            onChange={(e) => TaxandDiscount(e)}
          />
        </div>
      </div>
    </>
  );
};

export default Review;
