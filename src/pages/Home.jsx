import HeroSection from "../components/HeroSection";
import BookList from "../components/BookList";
import { useState } from "react";
function Home() {
  let [isRegister, setIsRegister] =useState(false);
  return (
    <>
      {!isRegister && <HeroSection/>}
      <BookList/>
    </>
  )
}

export default Home;
