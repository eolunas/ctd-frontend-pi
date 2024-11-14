import { useEffect } from "react";
import { useCharStates } from "../Context";
import Searcher from "../Components/Searcher";
import Categories from "../Components/Categories";
import Suggested from "../Components/Suggested";

const Home = () => {
  const { state } = useCharStates();
  console.log(state.user, "aaa");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Searcher />
      {/* Renderizado condicional según filtrado */}
      {Object.keys(state.homeFilters).length == 0 && <Categories />}
      <Suggested />
    </>
  );
};

export default Home;
