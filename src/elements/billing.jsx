import {
  billingtoaddressinputs,
  billingfromaddressinputs,
} from "../helpers/Toaddress";
const Billing = ({
  billingactions: {
    dispatch,
    billingToAddressValues,
    billingFromAddressValues,
  },
}) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 pt-4 pb-4 border-b-[0.1rem] border-gray-200">
        <div>
          <h1 className="text-base lg:text-lg font-semibold pb-3">Bill to :</h1>
          <div className="flex flex-col gap-2">
            {billingtoaddressinputs.map(
              ({ name, type, placeholder }, index) => {
                return (
                  <input
                    key={index}
                    type={type}
                    name={name}
                    inputMode={type === "email" ? "numeric" : "text"}
                    value={billingToAddressValues[index]}
                    className="bg-gray-100 pl-2 rounded-sm h-10"
                    placeholder={placeholder}
                    onChange={(e) => {
                      dispatch({
                        type: "billing-to-address-insertion",
                        payload: e.target.value,
                      });
                    }}
                  />
                );
              }
            )}
          </div>
        </div>
        <div>
          <h1 className="text-base lg:text-lg font-semibold pb-3">
            Bill from :
          </h1>
          <div className="flex flex-col gap-2">
            {billingfromaddressinputs.map(
              ({ name, type, placeholder }, index) => {
                return (
                  <input
                    key={index}
                    type={type}
                    name={name}
                    inputMode={type === "email" ? "numeric" : "text"}
                    value={billingFromAddressValues[index]}
                    className="bg-gray-100 pl-2 rounded-sm h-10"
                    placeholder={placeholder}
                    onChange={(e) => {
                      dispatch({
                        type: "billing-from-address-insertion",
                        payload: e.target.value,
                      });
                    }}
                  />
                );
              }
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Billing;
