import { InvoiceProvider } from "../App";
import { useContext } from "react";
import { IoIosSend } from "react-icons/io";
import { IoCloudDownloadOutline } from "react-icons/io5";
import html2pdf from "html2pdf.js";
import "../App.css";
const Modal = () => {
  const { state, dispatch } = useContext(InvoiceProvider);
  const snapshot = document.querySelector(".layout-snapshot");
  const opt = {
    margin: 1,
    filename: `${state?.billingToAddressValues[3]}-inovice.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: {
      unit: "in",
      format: "letter",
      orientation: "portrait",
    },
  };
  const shareInvoice = () => {
    html2pdf()
      .set(opt)
      .from(snapshot)
      .output("blob")
      .then((pdfDataUrl) => {
        const file = new File([pdfDataUrl], "invoice.pdf", {
          type: pdfDataUrl.type,
        });
        const data = {
          files: [file],
          message: "this is invoice",
        };
        if (navigator.canShare && navigator.canShare(data)) {
          try {
            navigator.share(data);
          } catch (err) {
            console.log(err.message);
          }
        } else {
          console.log("web share is not supported");
        }
      });
  };
  const downloadInvoice = () => {
    html2pdf().set(opt).from(snapshot).save();
  };
  return (
    <div
      className="modal-overlay"
      onClick={() => dispatch({ type: "show-modal" })}
    >
      <div className="bg-white shadow-lg  rounded-lg w-96 lg:w-2/3 pb-3 max-sm:px-2">
        <div className="layout-snapshot">
          <div className="modal-invoice-header">
            <h1>
              {state?.billingToAddressValues[3]}
              <br />
              <span className="font-semibold">
                Invoice# :{state?.invoicenumber}
              </span>
            </h1>
            <h2>
              Amount due:
              <br />
              <span className="font-semibold">
                {state?.currencytype}
                {state?.total}
              </span>
            </h2>
          </div>
          <div className="grid  grid-cols-2 lg:grid-cols-3 lg:place-items-center gap-2 border-b-2 pb-2">
            <h2 className="text-xs lg:text-md flex flex-col gap-1 font-semibold py-1 text-wrap">
              Billed to :<br />
              {state?.billingToAddressValues?.map((el, index) => {
                return (
                  <span key={index} className="text-xs lg:text-sm font-normal">
                    {el}
                  </span>
                );
              })}
            </h2>
            <h2 className="text-xs lg:text-md flex flex-col gap-1 font-semibold ">
              Billed from :<br />
              {state?.billingFromAddressValues?.map((el, index) => {
                return (
                  <span key={index} className="text-xs lg:text-sm font-normal">
                    {el}
                  </span>
                );
              })}
            </h2>
            <h2 className="text-xs lg:text-md flex flex-col gap-1 font-semibold">
              Issue date :<br />
              <span className="text-xs lg:text-sm font-normal">
                {new Date().toLocaleDateString()}
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-12 place-items-center gap-2 border-b-2 py-3 ">
            <h1 className="modal-table-header-text col-span-1">Qty</h1>
            <h1 className=" modal-table-header-text col-span-7">Description</h1>
            <h1 className="modal-table-header-text cols-span-2 ">Price</h1>
            <h1 className="modal-table-header-text col-span-2">Amount</h1>
          </div>
          <div className="">
            {state?.itemslist?.map((item) => {
              return (
                <div
                  key={item.id}
                  className="grid grid-cols-12 place-items-center gap-2 border-b-2 pb-1"
                >
                  <h1 className="font-normal text-md col-span-1">{item.qty}</h1>
                  <h1 className="font-normal text-xs lg:text-lg col-span-7">
                    {item?.item}-{item.description}
                  </h1>
                  <h1 className="font-normal text-xs lg:text-lg cols-span-2 text-nowrap">
                    {state?.currencytype} {item.amount}
                  </h1>
                  <h1 className="font-normal text-xs lg:text-lg col-span-2">
                    {state?.currencytype} {item.amount}
                  </h1>
                </div>
              );
            })}
          </div>

          <div className="w-[8rem] lg:w-[12rem] ml-auto flex flex-col justify-center items-baseline gap-3 my-5  text-xs lg:text-lg ">
            <h2 className=" font-semibold flex justify-center items-center gap-2 border-b-2 border-zinc-200 pb-2">
              Subtotal
              <span className="font-normal">
                {state?.currencytype} {state?.total}
              </span>
            </h2>
            <h2 className=" font-semibold flex justify-center items-center gap-2 ">
              Total
              <span className="font-normal lg:pl-8 pl-5">
                {state?.currencytype} {state?.total}
              </span>
            </h2>
          </div>
          <div className="text-xs lg:text-lg w-full bg-sky-50 p-1">
            <h2 className="ps-2">{state?.feedback}</h2>
          </div>
        </div>

        <div className="flex justify-center items-center gap-2 my-2 px-6">
          <button
            className="modal-share-button"
            onClick={(e) => {
              e.stopPropagation();
              shareInvoice();
            }}
          >
            share
            <span>
              <IoIosSend className="modal-button-icon" />
            </span>
          </button>
          <button
            className="modal-download-button"
            onClick={(e) => {
              e.stopPropagation();
              downloadInvoice();
            }}
          >
            download
            <span>
              <IoCloudDownloadOutline className="modal-button-icon" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
