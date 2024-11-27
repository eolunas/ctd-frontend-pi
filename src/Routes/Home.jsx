import { useEffect } from "react";
import Categories from "../Components/Categories";
import Suggested from "../Components/Suggested";
import ResultFilters from "../Components/ResultFilters";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <ResultFilters />
      <Categories />
      <Suggested />
    </>
  );
};

export default Home;
