import { useState } from "react";

const InputCustom = ({ name, value, functionChange, data }) => {
  const [isFocused, setIsFocused] = useState(false);

  const cleanField = () => {
    functionChange({ target: { name, value: "" } });
  };

  const setSearchValue = (value) => {
    functionChange({ target: { name, value: value } });
  };

  return (
    <>
      <div className='relative w-full flex justify-center'>
        <input
          name={name}
          value={value || ""}
          onChange={functionChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 100)}
          type='text'
          className={`bg-white border border-gray-300 shadow-md text-gray-900 text-sm rounded-md w-full p-2.5 h-[38px]`}
          placeholder='Artista o evento'
          autoComplete='false'
        />
        {value && (
          <a
            className='absolute w-9 h-full flex justify-center items-center right-0 rounded-md cursor-pointer'
            onClick={cleanField}
          >
            <svg
              height='20'
              width='20'
              viewBox='0 0 20 20'
              aria-hidden='true'
              focusable='false'
              className='css-tj5bde-Svg text-slate-300 hover:text-slate-500'
            >
              <path
                d='M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z'
                className='fill-current'
              ></path>
            </svg>
          </a>
        )}
        {value && isFocused && (
          <div className='absolute left-0 top-11 w-full rounded-md shadow-md border p-2 bg-white text-sm'>
            {data
              .filter((item) => {
                const searchTerm = value?.toLowerCase();
                const fullTerm = item?.toLowerCase();
                return fullTerm.includes(searchTerm);
              })
              .slice(0, 4)
              .map((item, index) => (
                <div
                  key={`${index}${item}`}
                  className='flex text-black cursor-pointer m-1'
                  onClick={() => setSearchValue(item)}
                >
                  {item}
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default InputCustom;
