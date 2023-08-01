import { useEffect, useState } from 'react'


function Binance() {
  const [count, setCount] = useState(0)
  const [bs, setBs] = useState({
    pair: "", ask: 0, bid: 0
  });
  const [koin, setKoin] = useState(["btcidr"])

  useEffect(() => {

    const websocket = new WebSocket('wss://stream.binance.com:443/ws');

    websocket.onopen = () => {
        websocket.send(JSON.stringify({
          "method": "SUBSCRIBE",
          "params": [
            "btcbidr@bookTicker",
            // "mobbtc@depth"
            // "btcbidr@miniTicker",
            // "btcbidr@@kline_1s",
          ],
          "id": 1
        }));

    }

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // console.log(data);
      try {
        if (data.s != null) {
          setBs(bs => ({
            pair: data.s,
            ask: data.a,
            bid: data.b
          }));
        }
      } catch (error) {

      }

    }

    return () => {
      websocket.close()
    }


  }, []);

  function formatRupiah(money) {
    return new Intl.NumberFormat('id-ID',
      { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 } // diletakkan dalam object
    ).format(money);
  }

  return (
    <div className="App">
      <div className="card">
        <h1>Binance</h1>
        <h3>ASK</h3>
        <table border="1">
          <thead>
            <th>Koin</th>
            <th>harga</th>
            {/* <th>koin volume</th>
            <th>idr volume</th> */}
          </thead>
          <tbody>
            {/* {
              koin.map((data, index) => {
                return ( */}
            <tr>
              <td> {bs.pair}</td>
              <td>{formatRupiah(bs.ask)}</td>
              {/* <td>{bs.ask.btc_volume}</td>
              <td>{formatRupiah(bs.ask.idr_volume)}</td> */}
            </tr>
            {/* ) */}
            {/* })
            } */}
          </tbody>
        </table>
        <h3>BID</h3>
        <table border="1">
          <thead>
            <th>Koin</th>
            <th>harga</th>
            {/* <th>koin volume</th>
            <th>idr volume</th> */}
          </thead>
          <tbody>
            {/* {
              koin.map((data, index) => {
                return ( */}
            <tr>
              <td> {bs.pair}</td>
              <td>{formatRupiah(bs.bid)}</td>
              {/* <td>{bs.bid.btc_volume}</td>
              <td>{formatRupiah(bs.bid.idr_volume)}</td> */}
            </tr>
            {/* ) */}
            {/* })
            } */}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Binance
