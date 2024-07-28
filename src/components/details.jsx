import Dates from "../elements/dates";
import Billing from "../elements/billing";
import Notes from "../elements/notes";
import Price from "../elements/price";
import Items from "../elements/items";
import { InvoiceProvider } from "../App";
import { useContext } from "react";
const Details = () => {
  const {
    state: {
      invoicenumber,
      duedate,
      isduedateinvalid,
      billingToAddressValues,
      billingFromAddressValues,
      feedback,
      currencytype,
      itemslist,
      incentives,
      total,
    },
    dispatch,
  } = useContext(InvoiceProvider);
  return (
    <>
      <div className="w-full border border-gray-200 rounded-lg lg:col-span-9 shadow-md px-2 py-2 bg-white lg:px-6">
        <Dates
          dateactions={{ invoicenumber, duedate, isduedateinvalid, dispatch }}
        />
        <Billing
          billingactions={{
            billingToAddressValues,
            billingFromAddressValues,
            dispatch,
          }}
        />
        <Items itemactions={{ itemslist, dispatch }} />
        <Price
          priceactions={{
            currencytype,
            incentives,
            total,
            itemslist,
            dispatch,
          }}
        />
        <Notes notesactions={{ feedback, dispatch }} />
      </div>
    </>
  );
};

export default Details;
