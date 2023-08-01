import React, { useEffect } from "react";
import { HeaderApp } from "./HeaderApp";
import Gambar from "../assets/ss1.png";
import Gambar2 from "../assets/ss2.png";

const Help = () => {
  return (
    <div className="d-flex flex-column min-vh-100 ">
      <HeaderApp />
      <div className="container animate__animated animate__fadeIn mt-3 text-justify ">
        <div className="mx-lg-5 px-lg-5">
          <p className="fs-4 text-uppercase fw-bolder">Monitoring</p>
          <p>
            Merupakan halaman utama website yang berisi informasi harga jual dan
            beli crypto pada dua exchanger/market. Halaman ini juga menampilkan
            selisih harga pada kedua exchanger/market.
          </p>
          <img src={Gambar} className="w-100 border  m-2" />
          <p className="m-0">Penjelasan:</p>
          <ul className="mb-5">
            <li>Pada halaman ini menampilkan tabel yang berisi harga jual, beli dan selisih </li>
            <li>Pada bagian harga kolom ASK dan BID apabila di klik maka akan membuka tab baru yang langsung menuju halaman perdagangan crypto Indodax atau Binance</li>
            <li>
                Pada kolom selisih apabila nilai selisih negatif maka akan berwarna merah (rugi) dan yang bernilai positif akan berwarna hijau (untung)
            </li>
          </ul>
        </div>
        <div className="mx-lg-5 px-lg-5">
          <p className="fs-4 text-uppercase fw-bolder">Pengaturan</p>
          <p className="m-0">
            Merupakan halaman untuk mengatur semua data koin.
          </p>
          <ul>
            <li>Import data koin</li>
            <li>Menambah koin</li>
            <li>Mengedit koin</li>
            <li>Menghapus koin</li>
            <li>Memilih daftar koin yang akan dimonitoring</li>
            <li>Ekspor data koin</li>
          </ul>
          <img src={Gambar2} className="w-100 border m-2" />
          <p className="m-0">Penjelasan:</p>
          <ul>
            <li><span className="fw-bolder">Import</span> : Pada fungsi ini digunakan untuk memasukkan data koin yang pernah di ekspor sebelumnya dengan bentuk JSON </li>
            <li><span className="fw-bolder">Menambah Koin</span> : Pada fungsi ini digunakan untuk menanmbahkan koin ke dalam list data koin apabila di kedua exchanger/market mengalami penambahan koin</li>
            <li><span className="fw-bolder">Mengedit Koin</span> : Pada fungsi ini digunakan untuk mengubah data koin</li>
            <li><span className="fw-bolder">Menghapus Koin</span> : Pada fungsi ini digunakan untuk menghapus data koin</li>
            <li><span className="fw-bolder">Mengaktifkan Koin</span> : Pada fungsi ini digunakan untuk memilih koin mana yang akan dimonitoring</li>
            <li><span className="fw-bolder">Ekspor Data Koin</span> : Pada fungsi ini digunakan untuk mengekspor data koin dalam bentuk JSON</li>
            
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Help;
