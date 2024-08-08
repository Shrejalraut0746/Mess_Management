import React from "react";

function Alert({ alert, setalert }) {
  return (
    alert.mode && (
      <div className={`alert ${alert.type} p-4 mb-4 rounded-md`}>
        <div className="flex items-center justify-between">
          <span>{alert.message}</span>
          <button
            type="button"
            className="ml-auto box-content h-4 mb-2 rounded-none border-none p-1 text-warning-900 opacity-100 hover:text-warning-900 hover:no-underline hover:opacity-100 focus:opacity-100 focus:shadow-none focus:outline-none"
            aria-label="Close"
            onClick={() => setalert({ mode: false, message: "", type: "" })}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    )
  );
}

export default Alert;
