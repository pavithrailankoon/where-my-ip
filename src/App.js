import React, { useRef, useState, useEffect } from "react";
import { AccordionList } from "./components/how-to/AccordionList";
import MainPane from "./components/information/MainPane";
import Nav from "./components/navigation/Nav";
import Search from "./components/search/Search";
import Footer from "./components/footer/Footer";
import { FaArrowUp } from "react-icons/fa";

function App() {
  const howItWorksRef = useRef(null);
  const contributeRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [text, setText] = useState("");
      
  const handleTextSubmit = (inputText) => {
    setText(inputText);
  };

  //Track the scrolling positions
  useEffect(()=> {
    const handleScroll = () => {
      if(window.scrollY > 100) {
        setShowScrollButton(true);
      }else{
        setShowScrollButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //Scroll Top
  const scrollToTop = () => {
    window.scrollTo({ top:0, behavior: "smooth"});
  };

  return (
    <div className="App">
       <Nav howItWorksRef={howItWorksRef} contributeRef={contributeRef}/> 
       <Search onSubmit={handleTextSubmit}/>
       <MainPane text={text} />
       <AccordionList sectionRef={howItWorksRef}/>
       <Footer sectionRef={contributeRef}/>

       {/* Scrollup Button creating */}
       {showScrollButton && (
          <button 
            onClick={scrollToTop}
            className="fixed bottom-0 right-0 p-3 m-10 text-2xl text-white bg-red-600 opacity-60 hover:opacity-100 rounded-full z-[1000]">
              <FaArrowUp />
          </button>
       )}
    </div>
  );
}

export default App;