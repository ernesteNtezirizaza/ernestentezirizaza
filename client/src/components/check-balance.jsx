import React, { useState, useEffect } from "react";
import Header from "./Header";

const Balance = () => {
  const [meter, setMeter] = useState({
    meterNumber: "",
  });

  const [errors, setErrors] = useState({
    meterNumber: "",
  });

  function handleChange(e) {
    setMeter((prev) => ({
      ...prev,
      [e.name]: e.value,
    }));
  }

  useEffect(() => {

    if (meter.meterNumber.split("").length < 6) {
      setErrors((prev) => ({
        ...prev,
        meterNumber: "Your meter is invalid",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        meterNumber: "",
      }));
    }
  }, [meter.amount, meter.meterNumber]);

  return (
    <React.Fragment>
      <Header title="Check Balance" />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md pt-7">
              <form className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4">
            
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    Meter number
                  </label>
                  <input
                    value={meter.meterNumber}
                    onChange={(e) => handleChange(e.target)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    name="meterNumber"
                    type="number"
                    pattern="[0-8]*"
                    required
                    autoFocus
                    placeholder="Meter number"
                  />

                  {errors.meterNumber && (
                    <p className="text-red-500">{errors.meterNumber}</p>
                  )}
                </div>
        

                <button
                  className="px-4 py-2 rounded text-white inline-block shadow-lg bg-gray-700"
                  type="submit"
                >
                  Check balance
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default Balance;
