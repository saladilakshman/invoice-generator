import { useReducer, createContext, useEffect } from "react";
import {
  billingtoaddressinputs,
  billingfromaddressinputs,
  countriesAndCurrencies,
} from "./helpers/Toaddress";
import "./App.css";
import Review from "./components/review";
import Details from "./components/details";
import Modal from "./components/modal";
export const InvoiceProvider = createContext();
function App() {
  const Invoicestate = {
    invoicenumber: 1,
    duedate: new Date(),
    billingToAddressValues: billingtoaddressinputs.map(() => null),
    billingFromAddressValues: billingfromaddressinputs.map(() => null),
    currencytype: countriesAndCurrencies[0].symbol,
    incentives: {
      tax: undefined,
      discount: undefined,
    },
    feedback: "",
    itemslist: [
      {
        id: Date.now(),
        item: "",
        description: "",
        qty: undefined,
        amount: undefined,
      },
    ],
    showmodal: false,
    total: 0,
  };
  const Invoicereducer = (state, action) => {
    if (action.type === "invoice-number-selection") {
      return {
        ...state,
        invoicenumber: action.payload,
      };
    }
    if (action.type === "due-date-selection") {
      return {
        ...state,
        duedate: action.payload,
      };
    }
    if (action.type === "billing-to-address-insertion") {
      return {
        ...state,
        billingToAddressValues: [
          ...state.billingToAddressValues,
          action.payload,
        ],
      };
    }
    if (action.type === "billing-from-address-insertion") {
      return {
        ...state,
        billingFromAddressValues: [
          ...state.billingFromAddressValues,
          action.payload,
        ],
      };
    }
    if (action.type === "feedback-notes") {
      return {
        ...state,
        feedback: action.payload,
      };
    }
    if (action.type === "incentives") {
      return {
        ...state,
        incentives: {
          ...state.incentives,
          [action.payload.name]: Number(action.payload.value),
        },
      };
    }
    if (action.type === "currency-type-selection") {
      const getcurrencysymbol = countriesAndCurrencies.find(
        (item) => item.currency === action.payload
      );
      return {
        ...state,
        currencytype: getcurrencysymbol?.symbol,
      };
    }

    if (action.type === "add-item") {
      const newItem = {
        id: Date.now(),
        name: "",
        description: "",
        qty: 0,
        amount: 0,
      };
      return {
        ...state,
        itemslist: [...state.itemslist, newItem],
      };
    }

    if (action.type === "delete-item") {
      const listafterfilter = state.itemslist.filter(
        (el) => el.id !== action.payload
      );
      return {
        ...state,
        itemslist: listafterfilter,
      };
    }
    if (action.type === "items-info-insertion") {
      const { index, property, value } = action.payload;
      const newlist = [...state.itemslist];
      newlist[index] = {
        ...newlist[index],
        [property]: value,
      };
      return {
        ...state,
        itemslist: newlist,
      };
    }
    if (action.type === "show-modal") {
      return {
        ...state,
        showmodal: !state.showmodal,
      };
    }
    if (action.type === "total-price") {
      return { 
        ...state,
        total: action.payload,
      };
    } else return state;
  };
  const initializer = (initial) => {
    const localData = window.localStorage.getItem("invoice");
    return localData ? JSON.parse(localData) : initial;
  };
  const [state, dispatch] = useReducer(
    Invoicereducer,
    Invoicestate,
    initializer
  );
  useEffect(() => {
    window.localStorage.setItem("invoice", JSON.stringify(state));
  }, [state]);
  const formsubmission = () => {
    dispatch({ type: "show-modal" });
  };
  useEffect(() => {
    const formInputs = document.getElementsByTagName("input");
    formInputs.forEach((formInput) => (formInput.required = true));
    formInputs["tax"].required = false;
    formInputs["discount"].required = false;
  }, []);
  return (
    <InvoiceProvider.Provider value={{ state, dispatch }}>
      <main className="relative">
        {state.showmodal && <Modal />}
        <form
          className=" px-2 lg:px-10 py-4 grid gap-2 grid-cols-1 lg:grid-cols-12"
          onSubmit={(e) => {
            e.preventDefault();
            formsubmission();
          }}
        >
          <Details />
          <Review />
        </form>
      </main>
    </InvoiceProvider.Provider>
  );
}

export default App;
