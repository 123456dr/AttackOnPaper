import { useRef, useState } from "react";
import { BsQuestionSquareFill } from "react-icons/bs";
import "../App.css";

function Quesbtncomp() {
    const [questext, setQuestext] = useState("Nothing showing??");
    const [isTying, setIstyping] = useState(false);
    const typingRef = useRef(false);

  const fullText = [
    " Hi! Think like the result file haven't shown.\n",
    " Cause the first time submit need to restart my backend.\n",
    " Could you wait more seconds (about 30secs) if the screen not showing wrong?\n",
    " Thank you very much! Vielen Danke!",
  ];

  const delay = (ms) =>  new Promise((resolve) => setTimeout(resolve,ms));
  //讓setTimeout同步 , delay(箭頭函式) -> promise -> resolve() -> setTimeout
  //promise + await
  // == const delay = function(ms){return new Promise((resolve) => setTimeout(resolve,ms));}

  const handleClick = async () => {
    if(isTying){
        typingRef.current = false;
        setIstyping(false);
        return;
    }

    setQuestext("");
    setIstyping(true);
    typingRef.current = true;

    for ( let i = 0; i<fullText.length ; i++){
      let line = fullText[i];
      let currentline = "";

      for( let j = 0; j < line.length ; j++){
        if (!typingRef.current) return;
        currentline += line[j];
        setQuestext(currentline);
        await delay(50);
      }
      /*
      for(let i =0 ;i<2;i++){
        setQuestext("");
        await delay(100);
        setQuestext(currentline);
        await delay(500);
      }
      await delay(500);
      */
      await delay(1000);
      setQuestext("");
    }

    setIstyping(false);
    typingRef.current = false;

  }

  return (
    <div className="quescontainer" style={{position:"relative"}}>
      <BsQuestionSquareFill className="quesbtn" onClick={handleClick} style={{}}/>
      <p className="questxt" style={{marginTop:"39px",whiteSpace: "nowrap",position:"absolute",background:"rgb(88, 88, 88)",right:"2px",fontFamily:"monospace",padding:"1px 2px",borderRadius:"2px"}}>{questext}</p> 
    </div>
  );
}
//monospace 等寬如打字機字體 ; zIndex最上層(數字大) ;
//whiteSpace: nowrap 不換行
export default Quesbtncomp;
