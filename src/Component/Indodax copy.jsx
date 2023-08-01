import { useEffect, useState } from "react";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import { useSelector, useDispatch } from "react-redux";
import { addIndodax, updateIndodax, updateBinance } from "../indodaxSlice";
import { Kolom } from "./Kolom";
import { Container, Table, ButtonGroup,Button } from "react-bootstrap";
import { HeaderApp } from "./HeaderApp";

function Indodax() {
  const [koin, setKoin] = useState(JSON.parse(localStorage.getItem("koinI")));
  const [koinb, setKoinb] = useState(JSON.parse(localStorage.getItem("koinB")));
  const dataIndodax = useSelector((state) => state.indodax);
  const [idr, setIdr] = useState();
  const dispatch = useDispatch();

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
        }
      } catch (e) {}
    },
  });

  useEffect(() => {
    const harga = JSON.parse(localStorage.getItem("harga"));
    dispatch(addIndodax(harga));
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
          let usdtIdr =
            dataIndodax.harga[dataIndodax.harga.length - 1].binance.ask;
          if (usdtIdr) {
            setIdr(usdtIdr);
          }
        }
      } catch (e) {}
    },
  });

  function formatRupiah(money) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(money);
  }

  return (
    <div>
      <HeaderApp />
      <Container>
        <Table striped hover responsive>
          <thead>
            <tr>
              <th
                rowSpan={2}
                style={{ verticalAlign: "middle", textAlign: "center" }}
              >
                #
              </th>
              <th
                rowSpan={2}
                style={{ verticalAlign: "middle", textAlign: "center" }}
              >
                Koin
              </th>
              <th colSpan={2} className="text-center">
                Indodax
              </th>
              <th colSpan={2} className="text-center">
                Binance
              </th>
            </tr>
            <tr className="text-center">
              <th className="bg-success text-white">ASK</th>
              <th className="bg-danger text-white">BID</th>
              <th className="bg-success text-white">ASK</th>
              <th className="bg-danger text-white">BID</th>
            </tr>
          </thead>
          <tbody style={{ textAlign: "left" }}>
            {dataIndodax.harga.map((data, i) => {
              if (data.koin != "usdt") {
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
                    no={(i += 1)}
                    koin={data.koin}
                    Iask={idr ? formatRupiah(data.indodax.ask) : "Loading"}
                    Ibid={idr ? formatRupiah(data.indodax.bid) : "Loading"}
                    Bask={
                      idr ? formatRupiah(idr * data.binance.ask) : "Loading"
                    }
                    Bbid={
                      idr ? formatRupiah(idr * data.binance.bid) : "Loading"
                    }
                  />
                  // </tr>
                );
              }
            })}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default Indodax;
