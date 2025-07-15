import { useState } from "react";

export default function IspMapDropdown({ providers, selected, setSelected }) {
  const [open, setOpen] = useState(false);

  const toggleIsp = (name) => {
    if (selected.includes(name)) {
      setSelected(selected.filter((n) => n !== name));
    } else {
      setSelected([...selected, name]);
    }
  };

  return (
    <div className="absolute top-2 left-[50px] bg-white border-2 border-gray-300 rounded-md z-[1000] w-[150px]">
      <button
        className="w-full p-1 text-left cursor-pointer hover:bg-gray-100"
        onClick={() => setOpen(!open)}
      >
        {open ? "Tutup" : "Pilih ISP"}
      </button>

      {open && (
        <div className="">
          {providers.map((p) => (
            <label
              key={p.name}
              className="block text-sm hover:bg-gray-100 cursor-pointer p-1"
            >
              <input
                type="checkbox"
                checked={selected.includes(p.name)}
                onChange={() => toggleIsp(p.name)}
                className="mr-1"
              />
              {p.name}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
