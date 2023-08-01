import { useEffect, useState } from "react";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import { useSelector, useDispatch } from "react-redux";
import { addIndodax, updateIndodax, updateBinance } from "../indodaxSlice";
import { Kolom } from "./Kolom";
import { HeaderApp } from "./HeaderApp";
import Footer from "./Footer";
import Nodata from "../assets/Nodata.svg";

function Indodax() {
  if (
    localStorage.getItem("indodax_koins") &&
    localStorage.getItem("binance_koins") &&
    localStorage.getItem("data_koins") &&
    localStorage.getItem("harga_koins")
  ) {
    const [koin, setKoin] = useState(
      JSON.parse(localStorage.getItem("indodax_koins"))
    );
    const [koinb, setKoinb] = useState(
      JSON.parse(localStorage.getItem("binance_koins"))
    );
    const dataIndodax = useSelector((state) => state.indodax);
    const [idr, setIdr] = useState();
    const dispatch = useDispatch();

    const [harga, setHarga] = useState([]);

    const urlIndodax = "wss://ws3.indodax.com/ws/";
    const { sendJsonMessage } = useWebSocket(urlIndodax, {
      onOpen: () => console.log("WebSocket Indodax connection opened."),
      onClose: () => console.log("WebSocket Indodax connection closed."),
      shouldReconnect: (closeEvent) => true,
      onMessage: (e) => {
        try {
          const data = JSON.parse(e.data);
          if (data) {
            dispatch(updateIndodax(data.result.data.data));
            const harga_koins = JSON.parse(localStorage.getItem("harga_koins"));
            if (harga_koins) {
              setHarga(harga_koins);
            }
          }
        } catch (e) {}
      },
    });

    useEffect(() => {
      const harga_koins = JSON.parse(localStorage.getItem("harga_koins"));
      dispatch(addIndodax(harga_koins));
      console.log(dataIndodax);
    }, []);

    useEffect(() => {
      sendJsonMessage({
        params: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE5NDY2MTg0MTV9.UR1lBM6Eqh0yWz-PVirw1uPCxe60FdchR8eNVdsskeo",
        },
        id: 1,
      });

      koin.map((k) => {
        sendJsonMessage({
          method: 1,
          params: {
            channel: "market:order-book-" + k,
          },
          id: 1,
        });
      });
    }, []);

    const urlBinance =
      "wss://stream.binance.com:443/ws/" + koinb.join("@ticker/") + "@ticker";
    const { getWebSocketBinance } = useWebSocket(urlBinance, {
      onOpen: () => console.log("WebSocket Binance connection opened."),
      onClose: () => console.log("WebSocket Binance connection closed."),
      shouldReconnect: (closeEvent) => true,
      onMessage: (e) => {
        try {
          const data = JSON.parse(e.data);
          if (data) {
            dispatch(updateBinance(data));
            const harga_koins = JSON.parse(localStorage.getItem("harga_koins"));
            if (harga_koins) {
              setHarga(harga_koins);
            }
          }
        } catch (e) {}
      },
    });

    const urlUsdt = "wss://stream.binance.com:443/ws/usdtbidr@ticker";
    const { getWebSocketBinanceusdt } = useWebSocket(urlUsdt, {
      onOpen: () => console.log("WebSocket Binance connection opened."),
      onClose: () => console.log("WebSocket Binance connection closed."),
      shouldReconnect: (closeEvent) => true,
      onMessage: (e) => {
        try {
          const data = JSON.parse(e.data);
          if (data) {
            console.log(data.a);
            setIdr(data.a);
          }
        } catch (e) {}
      },
    });

    return (
      <div className="app d-flex flex-column min-vh-100 ">
        <HeaderApp />
        <div className="container mt-4 flex-grow-1 animate__animated animate__fadeIn">
          <div className="table-responsive table-responsive w-100 rounded">
            <table className="table table-striped table-hover mb-0">
              <thead className=" text-bold">
                <tr>
                  <th
                    rowSpan={2}
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      minWidth: "90px",
                    }}
                  >
                    Koin
                  </th>
                  <th colSpan={3} className="text-center ">
                    Indodax <i className="bi bi-arrow-right-short"></i> Binance
                  </th>
                  <th colSpan={3} className="text-center ">
                    Binance <i className="bi bi-arrow-right-short"></i> Indodax
                  </th>
                </tr>
                <tr className="text-center">
                  <th
                    className=" text-white"
                    // style={{ "background-color": "#5fb97e" }}
                    style={{ minWidth: "175px" }}
                  >
                    ASK
                  </th>
                  <th
                    className=" text-white"
                    // style={{ "background-color": "#f04f4f" }}
                    style={{ minWidth: "175px" }}
                  >
                    BID
                  </th>
                  <th className=" text-white" style={{ minWidth: "175px" }}>
                    Selisih
                  </th>
                  <th
                    className=" text-white"
                    // style={{ "background-color": "#5fb97e" }}
                    style={{ minWidth: "175px" }}
                  >
                    ASK
                  </th>
                  <th
                    className=" text-white"
                    // style={{ "background-color": "#f04f4f" }}
                    style={{ minWidth: "175px" }}
                  >
                    BID
                  </th>
                  <th className="text-white" style={{ minWidth: "175px" }}>
                    Selisih
                  </th>
                </tr>
              </thead>
              <tbody style={{ textAlign: "left" }}>
                {harga.map((data, i) => {
                  if (data.status_aktif) {
                    return (
                      // <tr key={data.koin}>
                      //   <td> {data.koin.toUpperCase()}</td>
                      //   <td>{idr ? formatRupiah(data.indodax.ask) : "Loading"}</td>
                      //   <td>{idr ? formatRupiah(data.indodax.bid) : "Loading"}</td>
                      //   <td>
                      //     {idr ? formatRupiah(idr * data.binance.ask) : "Loading"}
                      //   </td>
                      //   <td>
                      //     {idr ? formatRupiah(idr * data.binance.bid) : "Loading"}
                      //   </td>
                      <Kolom
                        key={data.koin}
                        koin={data.koin}
                        Iask={data.indodax.ask}
                        Ibid={data.indodax.bid}
                        Bask={idr * data.binance.ask}
                        Bbid={idr * data.binance.bid}
                        pairBinance={data.pairBinance}
                        pairIndodax={data.pairIndodax}
                      />
                      // </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
        </div>
        <Footer />
      </div>
    );
  } else {
    return (
      <div className="app d-flex flex-column min-vh-100 ">
        <HeaderApp />
        <div className="container text-center my-4 flex-grow-1 animate__animated animate__fadeIn">
          <h3>Data Tidak Lengkap / Tidak Ada</h3>
          <h4>Silahkan Upload data dan jangan lupa klik Update</h4>
          <img src={Nodata} className="w-25" />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Indodax;
