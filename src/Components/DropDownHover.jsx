import {  MusicalNoteIcon } from '@heroicons/react/24/solid';


const DropDownHover = () => {
  return (
    <div className='flex justify-center items-center relative'>
        <MusicalNoteIcon className="h-6 w-6 text-black absolute left-2" />
        <select id="genero" 
                className={`
                bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-10`}>
            <option selected>Genero</option>
            <option value="1">Rock</option>
            <option value="2">Jazz</option>
            <option value="3">Pop</option>
            <option value="4">Hip-Hop</option>
            <option value="4">Electronic</option>
            <option value="4">Reggae</option>
        </select>
    </div>
  )
}

export default DropDownHover;