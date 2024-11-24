const InputCustom = ({ name, value, functionChange }) => {
  const cleanField = () => {
    functionChange({ target: { name , value: "" } })
  };
  
  return (
    <div className="relative w-full flex justify-center">
      <input
        name={name}
        value={value || ""}
        onChange={functionChange}
        type="text"
        className={`bg-white border border-gray-300 shadow-md text-gray-900 text-sm rounded-md w-full p-2.5 h-[38px]`}
        placeholder="Artista o evento"
      />
      {value && (
        <a
          className="absolute w-9 h-full flex justify-center items-center right-0 rounded-md cursor-pointer"
          onClick={cleanField}
        >
          <svg
            height="20"
            width="20"
            viewBox="0 0 20 20"
            aria-hidden="true"
            focusable="false"
            className="css-tj5bde-Svg text-slate-300 hover:text-slate-500"
          >
            <path
              d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"
              className="fill-current"
            ></path>
          </svg>
        </a>
      )}
    </div>
  );
};

export default InputCustom;
