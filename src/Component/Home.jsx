import React from "react";
import { Link } from "react-router-dom";
import videoHome from "../assets/home.mp4";
// import {Bg} from "./Bg.jsx"

const Home = () => {
  return (
    <div className="home ">
      <h3 className="text-center pt-3 ">ExchangMonitor</h3>
      <div className="container ">
        <div className="row ">
          <div className="col-5 textHead m-auto ">
            <h1>Lacak Nilai Tukar Pertukaran Crypto Secara Real-time</h1>
          </div>
          <div className="col ">
            <video className="w-100" autoPlay loop muted>
              <source src={videoHome} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
      <div className="text-center btn-home my-4">
        <Link to="/app" className="rounded-0 border-0 btn btn-primary btn-lg">
          Luncurkan App
        </Link>
      </div>
      {/* <Bg/> */}
    </div>
  );
};

export default Home;
