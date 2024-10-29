import { useCharStates } from "../Context";
import logo from "../assets/0-Logo/isologo-gris.svg";
import rights from "../assets/0-Logo/Derechos.svg";
import facebook from "../assets/0-Logo/facebook.svg";
import instagram from "../assets/0-Logo/instagram.svg";
import linkedin from "../assets/0-Logo/linkedin.svg";

const Footer = () => {
  const { state } = useCharStates();

  return (
    <footer className={!state.theme && "dark-nav"}>
      <div className='flex justify-between m-4 pt-4 border-t-[2px] border-primaryBlue'>
        <div className='flex items-end gap-5'>
          <img src={logo} alt='' />
          <img className='hidden md:flex' src={rights} alt='' />
        </div>
        <div className='flex items-end gap-5'>
          <img src={facebook} alt='' />
          <img src={instagram} alt='' />
          <img src={linkedin} alt='' />
        </div>
      </div>
      <img className='flex md:hidden mx-auto pb-6' src={rights} alt='' />
    </footer>
  );
};

export default Footer;
