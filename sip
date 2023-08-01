import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'


function App() {
  const [count, setCount] = useState(0)
  const [bs, setBs] = useState([0])


  const indodax = new WebSocket("wss://ws3.indodax.com/ws/", []);

  const apiCall = {
    "params": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE5NDY2MTg0MTV9.UR1lBM6Eqh0yWz-PVirw1uPCxe60FdchR8eNVdsskeo"
    },
    "id": 1
  };

  const test = {
    "method": 1,
    "params": {
        "channel": "market:summary-24h"
    },
    "id": 2
  }

  indodax.onopen = (e) => {
    const konek = () => {
      indodax.send(JSON.stringify(apiCall))
    }
    const get=()=>{indodax.send(JSON.stringify(test))}
    konek();
    get();
    // console.log()
  }

  indodax.onmessage = function (e) {
    const json = JSON.parse(e.data);
    try {   
      console.log(json.result.data.data);
      bs.map((koin)=>{
        if (json.result.data.data[0][0] != koin){
          setBs([...bs,json.result.data.data[0][0]]);
        }
      })
    } catch (err) {
      console.log(err);
    }
  }




  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => konek()}>
          count is {count}
        </button>
        <p>
          {bs.map((item) => {
            return (
              <div>
                <p> {item}</p>
              </div>)
          })}
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
