import React, { useState } from "react";
import Swal from "sweetalert2";

const Modal = ({ idModal, simbol, pairBinance, pairIndodax, onEdit }) => {
  const [symbol, setSymbol] = useState(simbol);
  const [symbolEdit, setSymbolEdit] = useState(simbol);
  const [binance, setBinance] = useState(pairBinance);
  const [indodax, setIndodax] = useState(pairIndodax);

  const handleSubmit=(e)=>{
    e.preventDefault();
    const data_koins = localStorage.getItem("data_koins");
    const datas = JSON.parse(data_koins);
    datas.find((data) => {
      if (data.koin == symbol) {
        data.koin = symbolEdit;
        data.pairBinance = binance;
        data.pairIndodax = indodax;
        console.log("sukses");
        localStorage.setItem("data_koins", JSON.stringify(datas));
        onEdit()
        Swal.fire({
            color: "#fff",
            background: "#402d8f ",
            icon: "success",
            title: "Berhasil",
            text: "Koin Berhasil di Edit",
            showConfirmButton: false,
            timer: 1500,
          });
      }
      // console.log("sukses")

    });
    
  }
  
  return (
    <div
      className="modal fade "
      id={idModal}
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div
          className="modal-content rounded-0 border-1 border-dark"
          style={{ backgroundColor: "#402d8f" }}
        >
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Edit Koin
            </h1>
            <button
              type="button"
              className="btn-close text-danger"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div className="modal-body">
            <form
              className="m-3"
              onSubmit={(e)=>handleSubmit(e)}
            >
              <div className="row">
                <div className="col-12">
                  <label className="form-label" htmlFor="koin">
                    Simbol Koin
                  </label>
                  <input
                    onChange={(e) => setSymbolEdit(e.target.value)}
                    className="form-control"
                    type="text"
                    id="koin"
                    value={symbolEdit || ""}
                    placeholder="symbol"
                  />
                </div>
                <div className="col-12">
                  <label className="form-label" htmlFor="pairBinance">
                    Binance
                  </label>
                  <input
                    onChange={(e) => setBinance(e.target.value)}
                    className="form-control"
                    type="text"
                    id="pairBinance"
                    value={binance || ""}
                    placeholder="Binance"
                  />
                </div>
                <div className="col-12">
                  <label className="form-label" htmlFor="pairIndodax">
                    Indodax
                  </label>
                  <input
                    onChange={(e) => setIndodax(e.target.value)}
                    className="form-control"
                    type="text"
                    id="pairIndodax"
                    value={indodax || ""}
                    placeholder="Indodax"
                  />
                </div>
              </div>
              <div className="text-end">
                <button
                  className="btn btn-primary mt-3 fw-bold"
                  type="submit"
                  data-bs-dismiss="modal"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
          {/* <div className="modal-footer border-0">
              <button type="button" className="btn btn-primary fw-bold">
                Save changes
              </button>
            </div> */}
        </div>
      </div>
    </div>
  );
};

export default Modal;
