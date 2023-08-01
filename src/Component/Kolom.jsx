import React from "react";

export const Kolom = ({
  koin,
  Bask,
  Bbid,
  Iask,
  Ibid,
  pairBinance,
  pairIndodax,
}) => {
  function formatRupiah(money) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(money);
  }
  return (
    <tr>
      <td className="w-20 text-center">{koin.toUpperCase()}</td>
      <td className="w-20 text-center">
        {Iask ? (
          <LinkIndodax harga={formatRupiah(Iask)} pair={pairIndodax} />
        ) : (
          <Spinner />
        )}
      </td>
      <td className="w-20 text-center">
        {Bbid ? (
          <LinkBinance harga={formatRupiah(Bbid)} pair={pairBinance} />
        ) : (
          <Spinner />
        )}
      </td>
      <td
        className={
          Bbid - Iask > 0
            ? "w-20 text-success text-center"
            : "w-20 text-danger text-center"
        }
      >
        {Bask && Ibid ? formatRupiah(Bbid - Iask) : <Spinner />}
      </td>
      <td className="w-20 text-center">
        {Bask ? (
          <LinkBinance harga={formatRupiah(Bask)} pair={pairBinance} />
        ) : (
          <Spinner />
        )}
      </td>
      <td className="w-20 text-center">
        {Ibid ? (
          <LinkIndodax harga={formatRupiah(Ibid)} pair={pairIndodax} />
        ) : (
          <Spinner />
        )}
      </td>
      {(() => {
        if (Ibid - Bask > 0) {
          return (
            <td className="w-20 text-success text-center">
              {Bask && Ibid ? formatRupiah(Ibid - Bask) : <Spinner />}
            </td>
          );
        } else {
          return (
            <td className="w-20 text-danger text-center">
              {Bask && Ibid ? formatRupiah(Ibid - Bask) : <Spinner />}
            </td>
          );
        }
      })()}
      {/* <td className="w-20 text-danger text-center">
        {Bask && Ibid ? formatRupiah(Ibid - Bbid) : <Spinner />}
      </td> */}
      
    </tr>
  );
};

function Spinner() {
  return (
    <div className="spinner-border text-light spinner-border-sm" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}
function LinkBinance({ harga, pair }) {
  return (
    <a
      href={"https://www.binance.me/en/trade/" + pair}
      target="binance"
      className="text-white link-underline-opacity-0 link-underline"
    >
      {harga}
    </a>
  );
}
function LinkIndodax({ harga, pair }) {
  return (
    <a
      href={"https://indodax.com/market/" + pair}
      target="indodax"
      className="text-white link-underline-opacity-0 link-underline"
    >
      {harga}
    </a>
  );
}
