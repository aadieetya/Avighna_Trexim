import React, { useState } from "react";

export default function FreightCalculator() {
  const [form, setForm] = useState({
    origin: "",
    destination: "",
    weight: "",
    distance: "",
    mode: "sea",
  });
  const [errors, setErrors] = useState({});
  const [price, setPrice] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error on typing
  };

  const validate = () => {
    let newErrors = {};
    if (!form.origin) newErrors.origin = "Origin is required";
    if (!form.destination) newErrors.destination = "Destination is required";
    if (!form.distance) newErrors.distance = "Distance is required";
    if (form.distance && form.distance <= 0)
      newErrors.distance = "Enter a valid distance";
    if (!form.weight) newErrors.weight = "Weight is required";
    if (form.weight && form.weight <= 0)
      newErrors.weight = "Enter a valid weight";
    return newErrors;
  };

  const calculateFreight = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    let base = 50;
    let weightFactor = parseFloat(form.weight) * 2;
    let distanceKm = parseFloat(form.distance);

    let distanceFactor =
      form.mode === "air"
        ? distanceKm * 0.05
        : form.mode === "land"
        ? distanceKm * 0.03
        : distanceKm * 0.02;

    let total = base + weightFactor + distanceFactor;
    setPrice(total.toFixed(2));
  };

  const resetForm = () => {
    setForm({
      origin: "",
      destination: "",
      weight: "",
      distance: "",
      mode: "sea",
    });
    setErrors({});
    setPrice(null);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white via-[#f8faff] to-white scroll-mt-28">
      <div className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-2xl border border-slate-100">
        <h2 className="text-3xl font-bold text-slate-800 text-center mb-8">
          Freight <span className="text-[#48CAE4]">Calculator</span>
        </h2>

        <div className="grid gap-6">
          {/* Origin */}
          <div>
            <input
              name="origin"
              placeholder="Origin (City / Port)"
              className={`w-full border px-4 py-3 rounded-xl shadow-sm outline-none ${
                errors.origin
                  ? "border-red-400 focus:ring-2 focus:ring-red-400"
                  : "border-slate-200 focus:ring-2 focus:ring-[#48CAE4]"
              }`}
              value={form.origin}
              onChange={handleChange}
            />
            {errors.origin && (
              <p className="mt-1 text-sm text-red-500">{errors.origin}</p>
            )}
          </div>

          {/* Destination */}
          <div>
            <input
              name="destination"
              placeholder="Destination (City / Port)"
              className={`w-full border px-4 py-3 rounded-xl shadow-sm outline-none ${
                errors.destination
                  ? "border-red-400 focus:ring-2 focus:ring-red-400"
                  : "border-slate-200 focus:ring-2 focus:ring-[#48CAE4]"
              }`}
              value={form.destination}
              onChange={handleChange}
            />
            {errors.destination && (
              <p className="mt-1 text-sm text-red-500">{errors.destination}</p>
            )}
          </div>

          {/* Distance */}
          <div>
            <input
              name="distance"
              placeholder="Distance (in km)"
              type="text"
              className={`w-full border px-4 py-3 rounded-xl shadow-sm outline-none ${
                errors.distance
                  ? "border-red-400 focus:ring-2 focus:ring-red-400"
                  : "border-slate-200 focus:ring-2 focus:ring-[#48CAE4]"
              }`}
              value={form.distance}
              onChange={handleChange}
            />
            {errors.distance && (
              <p className="mt-1 text-sm text-red-500">{errors.distance}</p>
            )}
          </div>

          {/* Weight */}
          <div>
            <input
              name="weight"
              placeholder="Weight (kg)"
              type="number"
              className={`w-full border px-4 py-3 rounded-xl shadow-sm outline-none ${
                errors.weight
                  ? "border-red-400 focus:ring-2 focus:ring-red-400"
                  : "border-slate-200 focus:ring-2 focus:ring-[#48CAE4]"
              }`}
              value={form.weight}
              onChange={handleChange}
            />
            {errors.weight && (
              <p className="mt-1 text-sm text-red-500">{errors.weight}</p>
            )}
          </div>

          {/* Mode */}
          <select
            name="mode"
            className="w-full border border-slate-200 px-4 py-3 rounded-xl shadow-sm focus:ring-2 focus:ring-[#48CAE4] outline-none"
            value={form.mode}
            onChange={handleChange}
          >
            <option value="sea">Sea Freight</option>
            <option value="air">Air Freight</option>
            <option value="land">Land Freight</option>
          </select>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={calculateFreight}
              className="flex-1 rounded-xl bg-[#48CAE4] px-4 py-3 font-medium text-white shadow-md hover:shadow-lg hover:bg-[#0096C7] transition"
            >
              Calculate
            </button>
            <button
              onClick={resetForm}
              type="button"
              className="flex-1 rounded-xl bg-slate-200 px-4 py-3 font-medium text-slate-700 shadow-sm hover:shadow-md hover:bg-slate-300 transition"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Result */}
        {price && (
          <div className="mt-8 p-6 bg-slate-50 rounded-xl text-center shadow-inner">
            <h3 className="text-xl font-semibold text-slate-800">
              Estimated Cost: <span className="text-[#48CAE4]">${price}</span>
            </h3>
          </div>
        )}
      </div>
    </section>
  );
}
