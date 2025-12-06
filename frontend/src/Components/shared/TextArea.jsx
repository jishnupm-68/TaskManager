import React from "react";

const TextArea = ({ value, setValue, label }) => {
  return (
    <div>
      <label
        htmlFor="label"
        className="block text-sm/6 font-medium text-gray-100"
      >
        {label}
      </label>
      <div className="mt-2  bg-gray-200 text-brown-900 rounded-md">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="textarea px-4 block w-full rounded-mdpx-3 py-1.5 text-base text-amber-950 outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
          placeholder={label}
        ></textarea>
      </div>
    </div>
  );
};

export default TextArea;
