import React, { Fragment, useEffect, useState } from "react";
import { HeaderApp } from "./HeaderApp";
import Footer from "./Footer";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import Modal from "./Modal";

const Setting = () => {
  const [files, setFiles] = useState("");
  const [koins, setKoins] = useState([]);

  const uploadFile = (e) => {
    e.preventDefault();
    if (files !== "") {
      localStorage.setItem("data_koins", files);
      console.log(JSON.parse(files));
      const data_koins = JSON.parse(localStorage.getItem("data_koins"));
      if (data_koins) {
        setKoins(data_koins);
        Swal.fire({
          color: "#fff",
          background: "#402d8f ",
          icon: "success",
          title: "Berhasil",
          text: "Data Koin Berhasil di Upload",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  const changeFile = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      // console.log(e.target.result);
      setFiles(e.target.result);
      console.log("Berhasil");
    };
  };

  useEffect(() => {
    const data_koins = JSON.parse(localStorage.getItem("data_koins"));
    if (data_koins) {
      setKoins(data_koins);
    }
  }, []);
  useEffect(() => {
    const hasil = JSON.stringify(koins);
    localStorage.setItem("data_koins", hasil);
  }, [koins]);

  const tes = () => {
    console.log(koins);
  };

  const koinAktif = (e) => {
    if (e.target.checked) {
      koins.find((koin) => {
        if (e.target.id == koin.koin) {
          koin.status_aktif = true;
          localStorage.setItem("data_koins", JSON.stringify(koins));
          const data_koins = JSON.parse(localStorage.getItem("data_koins"));
          setKoins(data_koins);
          console.log("✅", e.target.id);
        }
      });
    } else {
      koins.findIndex((koin) => {
        if (e.target.id == koin.koin) {
          koin.status_aktif = false;
          localStorage.setItem("data_koins", JSON.stringify(koins));
          const data_koins = JSON.parse(localStorage.getItem("data_koins"));
          setKoins(data_koins);
          console.log("⛔️", e.target.id);
        }
      });
    }
  };

  const updateKoinAktif = () => {
    const binance_koins = [];
    const indodax_koins = [];
    const harga_koins = [];
    koins.forEach((koin) => {
      if (koin.status_aktif) {
        binance_koins.push(koin.pairBinance);
        indodax_koins.push(koin.pairIndodax);
        harga_koins.push({
          koin: koin.koin,
          pairBinance: koin.pairBinance,
          pairIndodax: koin.pairIndodax,
          status_aktif: koin.status_aktif,
          indodax: {
            ask: 0,
            bid: 0,
          },
          binance: {
            ask: 0,
            bid: 0,
          },
        });
      }
    });
    localStorage.setItem("harga_koins", JSON.stringify(harga_koins));
    localStorage.setItem("binance_koins", JSON.stringify(binance_koins));
    localStorage.setItem("indodax_koins", JSON.stringify(indodax_koins));
    console.log(binance_koins);
    Swal.fire({
      color: "#fff",
      background: "#402d8f ",
      icon: "success",
      title: "Berhasil",
      text: "Koin Berhasil di Update",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const exportDataKoin = () => {
    const data = localStorage.getItem("data_koins");
    const parsedData = JSON.parse(data);
    const jsonData = JSON.stringify(parsedData, null, 2);
    const jsonWithoutBackslashes = jsonData.replace(/\\/g, "");

    const element = document.createElement("a");
    const file = new Blob([jsonWithoutBackslashes], {
      type: "application/json",
    });
    element.href = URL.createObjectURL(file);
    element.download = "data_koins.json";
    document.body.appendChild(element);
    element.click();
  };

  const addKoin = (e) => {
    e.preventDefault();
    if (e.target[0].value && e.target[1].value && e.target[2].value) {
      const data = {
        koin: e.target[0].value,
        pairBinance: e.target[1].value,
        pairIndodax: e.target[2].value,
        status_aktif: true,
        indodax: {
          ask: 0,
          bid: 0,
        },
        binance: {
          ask: 0,
          bid: 0,
        },
      };
      // console.log(data);
      setKoins([...koins, data]);
      // console.log(koins);
      const hasil = JSON.stringify(koins);
      localStorage.setItem("data_koins", hasil);
      Swal.fire({
        color: "#fff",
        background: "#402d8f ",
        icon: "success",
        title: "Berhasil",
        text: "Koin Berhasil di Tmabahkan",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        color: "#fff",
        background: "#402d8f ",
        icon: "error",
        title: "Gagal",
        text: "Data Tidak Lengkap",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const hapusKoin = (symbol) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0d6efd",
      cancelButtonColor: "#ff006c",
      confirmButtonText: "Yes, delete it!",
      color: "#fff",
      background: "#402d8f ",
    }).then((result) => {
      if (result.isConfirmed) {
        const items = koins.filter((koin) => koin.koin !== symbol);
        setKoins(items);
        const hasil = JSON.stringify(items);
        localStorage.setItem("data_koins", hasil);
        console.log(items);
        Swal.fire({
          color: "#fff",
          background: "#402d8f ",
          icon: "success",
          title: "Berhasil",
          text: "Koin Berhasil di Hapus",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  const resetDataKoin = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0d6efd",
      cancelButtonColor: "#ff006c",
      confirmButtonText: "Yes, delete it!",
      color: "#fff",
      background: "#402d8f ",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("data_koins");
        localStorage.removeItem("harga_koins");
        localStorage.removeItem("binance_koins");
        localStorage.removeItem("indodax_koins");
        setKoins([]);
        Swal.fire({
          color: "#fff",
          background: "#402d8f ",
          icon: "success",
          title: "Berhasil",
          text: "Koin Berhasil di Hapus",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const editKoin = () => {
    const data_koins = JSON.parse(localStorage.getItem("data_koins"));
    setKoins(data_koins);
  };

  return (
    <div className="d-flex flex-column min-vh-100 ">
      <HeaderApp />
      <div className="container animate__animated animate__fadeIn">
        <div className="row mb-3">
          <div md={6}>
            <form
              onSubmit={(e) => {
                uploadFile(e);
              }}
              className=" m-3"
            >
              <label className="form-label" htmlFor="formFile">
                File Data Koin (*.json)
              </label>
              <div className="d-flex">
                <input
                  type="file"
                  className="form-control me-5"
                  onChange={(e) => changeFile(e)}
                  id="formFile"
                  accept=".json"
                />
                <button
                  className="btn btn-primary fw-bold btn-upload border-0 rounded-0"
                  type="submit"
                >
                  Import
                </button>
              </div>
            </form>
          </div>
          <div className="">
            <form className="m-3" onSubmit={(e) => addKoin(e)}>
              <div className="row">
                <div className="col">
                  <label className="form-label" htmlFor="koin">
                    Simbol Koin
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="btc"
                    id="koin"
                  />
                  <button
                    className="btn btn-primary mt-3 fw-bold btn-add rounded-0 border-0 "
                    type="submit"
                  >
                    Tambah
                  </button>
                </div>
                <div className="col">
                  <label className="form-label" htmlFor="pairBinance">
                    Binance
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="btcusdt"
                    id="pairBinance"
                  />
                  <p>
                    <small className="text-danger">*Gunakan pair USDT</small>
                  </p>
                </div>
                <div className="col">
                  <label className="form-label" htmlFor="pairIndodax">
                    Indodax
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="btcidr"
                    id="pairIndodax"
                  />
                  <p>
                    <small className="text-danger">*Gunakan pair IDR</small>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="mb-3">
          {koins.length != 0 ? (
            <div className="text-center">
              <h3 className="mb-0">Data Koin</h3>
              <p>
                <small className="text-danger">*Jangan lupa klik perbarui</small>
              </p>
            </div>
          ) : null}
          <div className="ms-3">
            {koins.map((koin, key) => {
              return (
                <Fragment key={key}>
                  <div
                    className="form-check form-check-inline ms-2 "
                    style={{ width: "85px" }}
                  >
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={koin.koin}
                      id={koin.koin}
                      onChange={koinAktif}
                      checked={koin.status_aktif}
                    />
                    <label className="form-check-label" htmlFor={koin.koin}>
                      {koin.koin}
                    </label>
                  </div>
                  <div className="d-inline-flex border-end">
                    <button
                      className="btn btn-sm p-0 mx-1 text-warning"
                      data-bs-toggle="modal"
                      data-bs-target={"#exampleModal" + key}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>

                    <Modal
                      idModal={"exampleModal" + key}
                      simbol={koin.koin}
                      pairBinance={koin.pairBinance}
                      pairIndodax={koin.pairIndodax}
                      onEdit={() => editKoin()}
                    />

                    <button
                      className="btn btn-sm p-0 me-1 text-danger"
                      onClick={() => hapusKoin(koin.koin)}
                    >
                      <i className="bi bi-x-square"></i>
                    </button>
                  </div>
                </Fragment>
              );
            })}
          </div>
          <div className="my-3">
            <p className="p-0 m-0">
              Koin Aktif : {koins.filter((value) => value.status_aktif).length}
            </p>
            <p className="p-0 m-0">Total Koin : {koins.length}</p>
          </div>
        </div>
        {koins.length != 0 ? (
          <div className=" d-flex">
            <button
              className="btn btn-primary fw-bold btn-update rounded-0 border-0"
              onClick={() => updateKoinAktif()}
            >
              Perbarui
            </button>
            <button
              className="btn btn-danger ms-3 fw-bold btn-export rounded-0 border-0"
              onClick={() => exportDataKoin()}
            >
              Eksport
            </button>
            <div className="ms-auto">
              <button
                className="btn btn-danger ms-3 fw-bold btn-reset rounded-0 border-0"
                onClick={() => resetDataKoin()}
              >
                Reset
              </button>
            </div>
          </div>
        ) : null}
      </div>
      <Footer />
    </div>
  );
};

export default Setting;
