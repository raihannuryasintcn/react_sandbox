import { useState } from "react";
import { Button } from '@mantine/core';
import { IconSelector } from '@tabler/icons-react';



export default function IspMapDropdown({ providers, selected, setSelected }) {
  const [open, setOpen] = useState(false);

  const toggleIsp = (name) => {
    if (selected.includes(name)) {
      setSelected(selected.filter((n) => n !== name));
    } else {
      setSelected([...selected, name]);
    }
  };

  const selectAll = () => setSelected(providers.map((p) => p.name));
  const deselectAll = () => setSelected([]);

  return (
    <div className="absolute top-2 left-[50px] bg-white border-2 border-gray-300 rounded-md z-[1000] w-[150px]">
      <button
        className="w-full p-1 text-left cursor-pointer hover:bg-gray-100 flex justify-between items-center"
        onClick={() => setOpen(!open)}
      >
        <span>{open ? "Tutup" : "Pilih ISP"}</span>
        <IconSelector />
      </button>

      {open && (
        <div className="">
          <div className="border-y-2 border-gray-300 p-1 flex flex-row gap-2">
            <Button className="flex-1" variant="filled" size="xs" onClick={selectAll}>All</Button>
            <Button className="flex-1" variant="filled" color="gray" size="xs" onClick={deselectAll}>None</Button>
          </div>
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
