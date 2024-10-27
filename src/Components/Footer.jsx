import { useCharStates } from "../Context";

const Footer = () => {
  const { state } = useCharStates();

  return (
    <footer className={!state.theme && "dark-nav"} >
        Footer
    </footer>
  )
}

export default Footer