import { useEffect, useState } from 'react'


const apiCall = {
  "params": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE5NDY2MTg0MTV9.UR1lBM6Eqh0yWz-PVirw1uPCxe60FdchR8eNVdsskeo"
  },
  "id": 1
};

function App() {
  const [count, setCount] = useState(0)
  const [bs, setBs] = useState({
    pair: "", ask: [], bid: []
  });
  const [koin, setKoin] = useState(["btcidr"])
  const indodax = new WebSocket("wss://ws3.indodax.com/ws/");

  useEffect(() => {

    if (localStorage.getItem('koin') == null) {
      localStorage.setItem('koin', JSON.stringify(koin));
      koin.map((koinku) => {
        localStorage.setItem(koinku, {});
      })
    }

    // return () => indodax.close();
  }, [koin, bs]);
  indodax.onopen = (e) => {
    try {
      indodax.send(JSON.stringify(apiCall))
      indodax.send(JSON.stringify({
        "method": 1,
        "params": {
          "channel": "market:order-book-ethidr"
        },
        "id": 2
      }));
    } catch (err) {
      console.log(err)
    }
  }
  
  indodax.onmessage = function (e) {
    const json = JSON.parse(e.data);

    try {
      if ((json.result.data.data.pair != null)) {
        setBs(bs => ({
          pair: json.result.data.data.pair,
          ask: json.result.data.data.ask[0],
          bid: json.result.data.data.bid[0]
        }));
        // console.log(bs);
      }

    } catch (err) {
      // console.log(err);
    }
  }



  const apiCall = {
    "params": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE5NDY2MTg0MTV9.UR1lBM6Eqh0yWz-PVirw1uPCxe60FdchR8eNVdsskeo"
    },
    "id": 1
  };

  const test = {
    "method": 1,
    "params": {
      "channel": "market:order-book-btcidr"
    },
    "id": 2
  }

  // indodax.onopen = (e) => {
  //   const konek = () => {
  //     indodax.send(JSON.stringify(apiCall))
  //   }
  //   const get = () => {
  //     koin.map((koins) => {
  //       indodax.send(JSON.stringify({
  //         "method": 1,
  //         "params": {
  //           "channel": "market:order-book-" + koins
  //         },
  //         "id": 2
  //       }))
  //     })
  //   }
  //   konek();
  //   get();
  //   // console.log()
  // }


  // indodax.onmessage = function (e) {
  //   const json = JSON.parse(e.data);
  //   try {
  //     // console.log(json.tick);
  //     localStorage.setItem(json.result.data.data.pair, JSON.stringify(json.result.data.data));
  //     console.log(json);

  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  const get = () => {

    location.reload();
  }

  function formatRupiah(money) {
    return new Intl.NumberFormat('id-ID',
      { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 } // diletakkan dalam object
    ).format(money);
  }



  return (
    <div className="App">
      <div className="card">
        <button onClick={() => get()}>
          count is {count}
        </button>
        <h1>Indodax</h1>
        <h3>ASK</h3>
        <table border="1">
          <thead>
            <th>Koin</th>
            <th>harga</th>
            <th>koin volume</th>
            <th>idr volume</th>
          </thead>
          <tbody>
            {/* {
              koin.map((data, index) => {
                return ( */}
            <tr>
              <td> {bs.pair}</td>
              <td>{formatRupiah(bs.ask.price)}</td>
              <td>{bs.ask.eth_volume}</td>
              <td>{formatRupiah(bs.ask.idr_volume)}</td>
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
            <th>koin volume</th>
            <th>idr volume</th>
          </thead>
          <tbody>
            {/* {
              koin.map((data, index) => {
                return ( */}
            <tr>
              <td> {bs.pair}</td>
              <td>{formatRupiah(bs.bid.price)}</td>
              <td>{bs.bid.eth_volume}</td>
              <td>{formatRupiah(bs.bid.idr_volume)}</td>
            </tr>
            {/* ) */}
            {/* })
            } */}
          </tbody>
        </table>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
