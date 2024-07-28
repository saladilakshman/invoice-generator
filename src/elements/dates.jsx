import { useState, useEffect } from "react";
import { motion } from "framer-motion";
const Dates = ({
  // eslint-disable-next-line react/prop-types
  dateactions: { invoicenumber, dispatch },
}) => {
  const [selecteddate, setSelecteddate] = useState("");
  const [error, setError] = useState(false);
  useEffect(() => {
    if (new Date(selecteddate) < new Date()) {
      setError(true);
    } else {
      setError(false);
    }
  }, [selecteddate]);
  return (
    <div className="flex justify-between items-baseline pb-8 border-b-[0.1rem] border-gray-200">
      <div className="flex flex-col lg:gap-2 gap-3">
        <h1 className=" text-xs lg:text-lg font-semibold">
          Current date:
          <span className=" text-sm lg:text-md font-normal pl-2">
            {new Date().toLocaleDateString("en-US")}
          </span>
        </h1>
        <h1 className="text-xs lg:text-lg font-semibold text-nowrap">
          Due Date:
          <input
            type="date"
            id="due-date"
            placeholder="mm/dd/yyyy"
            value={selecteddate}
            onChange={(e) => {
              setSelecteddate(e.target.value);
              dispatch({ type: "due-date-selection", payload: e.target.value });
            }}
            className="border border-gray-200 ml-2 rounded-md bg-gray-100 focus:outline-none font-normal "
          />
        </h1>
        {error && (
          <motion.p
            className="text-xs text-rose-500 font-semibold"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
          >
            !Invalid date.Please check
          </motion.p>
        )}
      </div>
      <div className="flex">
        <h1 className="text-xs lg:text-lg font-semibold text-nowrap ">
          Invoice number:
          <input
            type="text"
            inputMode="numeric"
            value={invoicenumber}
            onChange={(e) =>
              dispatch({
                type: "invoice-number-selection",
                payload: e.target.value,
              })
            }
            className=" w-6 focus:outline-none lg:w-[2rem] border border-gray-200  rounded-md bg-gray-100 text-base font-normal"
          />
        </h1>
      </div>
    </div>
  );
};

export default Dates;
