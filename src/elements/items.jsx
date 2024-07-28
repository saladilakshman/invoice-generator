import { MdDelete } from "react-icons/md";
import "../App.css";
const Items = ({ itemactions: { itemslist, dispatch } }) => {
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    dispatch({
      type: "items-info-insertion",
      payload: { index, property: name, value },
    });
  };
  return (
    <>
      <div className="pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 mt-2 pb-2 border-b-[0.1rem] border-gray-200">
          <h1 className="items-font col-span-4 lg:col-span-8">Item</h1>
          <h1 className="items-font col-span-1">Qty</h1>
          <h1 className="items-font lg:text-md font-semibold col-span-2">
            Price/Rate
          </h1>
          <h1 className="items-font lg:text-md font-semibold col-span-1">
            Action
          </h1>
        </div>

        <div>
          {itemslist.map(({ id }, index) => {
            return (
              <div
                key={id}
                className="grid  lg:grid-cols-12 gap-5 mt-2 pb-2 border-b-[0.1rem] border-gray-200"
              >
                <div className=" col-span-4 lg:col-span-8 flex flex-col gap-2">
                  <input
                    type="text"
                    className="bg-gray-100 pl-2 rounded-sm h-10"
                    placeholder="Item-name"
                    name="item"
                    onChange={(e) => handleChange(e, index)}
                  />
                  <input
                    type="text"
                    className="bg-gray-100 pl-2 rounded-sm h-10"
                    placeholder="Item-description"
                    name="description"
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div className="col-span-1">
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Qty"
                    name="qty"
                    className="bg-gray-100 pl-2 rounded-sm h-10 w-12"
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div className="col-span-2 ">
                  <input
                    type="text"
                    placeholder="amount"
                    inputMode="numeric"
                    name="amount"
                    className="bg-gray-100 pl-2 rounded-sm h-10 w-2/3"
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div className="col-span-1">
                  <button
                    className="bg-red-500 text-white text-xl px-2 py-2 rounded-lg"
                    type="button"
                    onClick={() =>
                      dispatch({ type: "delete-item", payload: id })
                    }
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <button
          className="px-2 py-2 bg-blue-500 text-white text-base rounded-lg my-1"
          type="button"
          onClick={() => dispatch({ type: "add-item" })}
        >
          Add item
        </button>
      </div>
    </>
  );
};

export default Items;
