import React from "react";

export const HeaderApp = () => {
  return (
    <div className="text-center py-3">
      <div className="btn-group " role="group">
        <a className="btn btn-primary border-0" href="/app">
          Monitoring
        </a>
        <a className="btn btn-primary border-0" href="/app/setting">
          Pengaturan
        </a>
        <a className="btn btn-primary border-0" href="/app/help">
          Bantuan
        </a>
      </div>
    </div>
  );
};
