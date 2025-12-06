import React from "react";

const InputField = ({ value, setValue, label, type = "text" }) => {
  return (
    <div>
      <label
        htmlFor="label"
        className="block text-sm/6 font-medium text-gray-100"
      >
        {label}
      </label>
      <div className="mt-2  bg-gray-200 text-brown-900 rounded-md">
        <input
          id="label"
          name="label"
          type={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="px-4 block w-full rounded-mdpx-3 py-1.5 text-base text-amber-950 outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
        />
      </div>
    </div>
  );
};

export default InputField;
