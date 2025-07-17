//venv\Scripts\activate 啟動虛擬環境
//pip freeze > requirements.txt 部屬到render時建立安裝套件txt
//npm run build  輸出react
//uvicorn main:app --reload 執行fastapi

import React, {  useEffect, useRef, useState } from "react";
import "./App.css";
import SubmitFile from "./components/SubmitFile.jsx";
import { toast, ToastContainer } from "react-toastify"; //非阻斷通知
import { FaArrowDown } from "react-icons/fa6"; 
import { FaImage } from "react-icons/fa6";
import { MdVideoCameraBack } from "react-icons/md";
import defaltimg from "./assets/castle3.jpg";
import defalttran from "./assets/defalttran.png";
import defalttranmp4 from "./assets/defalt.mp4";
import sampleoutputmp4 from "./assets/sampleoutput.mp4";
import defaltloadingmp4 from "./assets/defaltloading.mp4";
import waitmp4 from "./assets/waitmp4.mp4";
import waitimg from "./assets/waitimg.png";
import Quesbtncomp from "./components/quesbtncomp.jsx";  // component要大寫開頭!!!!
import DialogBox from "./components/DialogBox.jsx";  // component要大寫開頭!!!!
import { BsQuestionSquareFill } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";


function App() {
  //const [name, setName] = useState("");
  //const [age, setAge] = useState("");
  const [file, setFile] = useState("");
  const [imgurl, setImgUrl] = useState("");
  const [oriurl, setOriUrl] = useState("");
  const [fileType, setFileType] = useState("");
  const [transvideo, setTransVideo] = useState(false); 
  //const [initial, setInitial] = useState(true);
  const [defaltsrc, setDefaltSrc] = useState("image");
  const [isupload, setIsUpload] = useState(false);
  const [issubmit, setIsSubmit] = useState(false);
  const fileInputRef = useRef(null); //清空檔名用
  const [showhowdefault, setShowHowDefault] = useState(false);
  const [showsamplevid, setShowSampleVid] = useState(sampleoutputmp4);

/*
  useEffect(() =>{
    if(initial){
      setImgUrl(defalttran);
      setOriUrl(defaltimg);
      setInitial(false);
    }
  },[initial]);  //effect當依賴變數有改變或第一次才執行(沒依賴變數只有括號指初始執行一次)
  */

  useEffect(() =>{
    if(issubmit)return;
    if(isupload) {
      toast.info("File uploaded successfully!");
      if(defaltsrc === "image"){
        setImgUrl(waitimg);
        setFileType("image/");
      }
      else{
        setImgUrl(waitmp4);
        setFileType("video/mp4");
      }
      return;
      /*
      if(defaltsrc === "image"){
        setImgUrl(waitimg);
        setFileType("image/");
      }
      else{
        setImgUrl(waitmp4);
        setFileType("video/mp4");
      }
      return;
      */
    }
    if(defaltsrc === "image"){
      setImgUrl(defalttran);
      setFileType("image/");
      setOriUrl(defaltimg);
    }
    else{
      setImgUrl(showsamplevid);
      setFileType("video/mp4");
      setOriUrl(defaltloadingmp4);
    }
  },[defaltsrc,isupload,issubmit,showsamplevid]);



  useEffect(() =>{
    if(transvideo){
      setImgUrl(waitmp4); //!!!改成[待轉換]
    }
  },[transvideo]);

  function FileSelect(e) {
    const selectedFile = e.target.files[0];

    const MAX_SIZE = 10 * 1024 * 1024; //10mb
    if(selectedFile.size > MAX_SIZE) {
      alert("The file is too large! Please select a file smaller than 10MB.");
      //handleClear();
      return;
    }
    setFile(selectedFile);

    //alert(selectedFile.type);
    setFileType(selectedFile.type);
    setOriUrl(URL.createObjectURL(selectedFile));
    setIsUpload(true);

    if(selectedFile.type.startsWith("video/")){
      setTransVideo(true);
      setActiveTab("video")
      setDefaltSrc("video")
    }
    else{
      setTransVideo(false);
      setActiveTab("image")
      setDefaltSrc("image")
    }

    //加pending 圖(imgurl)
  }

  function handleSubmit() {
    if (!file) {
      alert("please upload file");
      return;
    }
    setIsSubmit(true);

    if(!isupload) {
      alert("Oops! It seems you've already uploaded this file.\nTry uploading a different one!")
      return;
    }
    setIsUpload(false)
    //加loading圖 setImgUrl()
    toast.info(
      "Submitted! " //Please wait about 10 seconds for the system to process the image."
    );
    setTimeout(() => {
      toast.warn(
        "If nothing being show, please wait about 30 seconds for the system to process the image."
      );
    }, 200);
    SubmitFile(file, setImgUrl);
  }

  function handleClear() {
    setIsUpload(false);
    setIsSubmit(false);
    setFile("");
    
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }


/*
  function ShowDefult(typenum){
    if(typenum){ //video
      setOriUrl(loadingmp4);    //!!!顯示指示觀看範例成果影片
      setImgUrl(defalttranmp4);
      setFileType("video/");
    }
    else{
      setOriUrl(defaltimg);
      setImgUrl(defalttran);
      setFileType("image/");
    }
  }
*/




  const [activeTab, setActiveTab] = useState("image");
  const [samplevidTab, setSampleVidTab] = useState(0);
  /*
  let list = document.querySelectorAll('.list');
  function activeLink(){
    list.forEach((item)=> item.classList.remove('active'));
    this.classList.add('active')
  }
  list.forEach((item)=> item.addEventListener('click', activeLink))
  */

  return (
    <div>
      <h2 className="titleAOP">
        <span style={{ color: "aqua" }}>Attack on Paper &nbsp; </span>
        <span className="title2">
          -&nbsp; I Was Reincarnated as an Anime Sketch
        </span>
      </h2>

      <div className="navi">
        <h3 className="subtitle" style={{ color: "rgb(198, 214, 234)" }}>
          Please upload video oder image first <FaArrowDown />
        </h3>
        <div className="navigation">
          <ul>
            <li className={`list ${activeTab === "image" ? "active": ""}`}>
              <a href="#" onClick={() => {if(!file) setActiveTab("image"), setDefaltSrc("image");else{alert("Hey, it seems you've already uploaded something!\nIf you want to switch it, feel free to click 'Clear' or just upload a new file.\nI’ll automatically detect the file type for you!")}}}>
                <span className="icon"><FaImage /></span>
                <span className="text">Image</span>
              </a>
            </li>

            <li className={`list ${activeTab === "video" ? "active" : ""}`}>
              <a href="#" onClick={() => {if(!file) setActiveTab("video"), setDefaltSrc("video");else{alert("Hey, it seems you've already uploaded something!\nIf you want to switch it, feel free to click 'Clear' or just upload a new file.\nI’ll automatically detect the file type for you!")}}}>
                <span className="icon"><MdVideoCameraBack /></span>
                <span className="text">Video</span>
              </a>
            </li>
            <div className="indicator"></div>
          </ul>
        </div>
        <BsQuestionSquareFill style={{marginTop:"20px",marginLeft:"12px", cursor:"pointer"}} onClick={() => setShowHowDefault(true)} />
        <DialogBox show={showhowdefault} onClose={() => setShowHowDefault(false)}>
          <p>
            切換顯示預設[影片/圖片]範例轉換成果<br />
            Click the button to view sample results of image and video conversion.
            <br /><br />
            If nothing is displayed, it's possible that you've already uploaded the file earlier.<br />
            Please click the "Clear" button next to "Submit" and try again. Thanks!
          </p>
        </DialogBox>
      </div>


      <div className="container">
        <div className="UploadAreaL">
          {oriurl && (
            <div>
              <h3 style={{ color: "rgb(198, 214, 234)" }}>Original</h3>
              
              {fileType.startsWith("video/") ? (
                <video key={oriurl} controls style={{maxWidth: "95%"}}>
                  <source src={oriurl} type = {fileType} />
                </video>
              ):(
                <img src={oriurl} alt="[filetype error] only video & image" style={{ maxWidth: "95%" }} />
              )}

              {
                //<img src={oriurl} alt="Result" style={{ maxWidth: "95%" }} />
              }
            </div>
          )}

          <div
            className="upbtn"
            style={{ margin: "1px", marginTop: "30px"}}
          >
            <input ref={fileInputRef} type="file" accept="image/*,video/*" onChange={FileSelect} style={{cursor: "pointer"}}/>

            <div style={{display:"flex"}}>
             <button onClick={handleSubmit}  style={{marginRight:"6px",cursor: "pointer",border:"none",borderRadius: "2px"}}>Submit</button>
             <button onClick={handleClear}  style={{marginRight:"10px",cursor: "pointer",border:"none",borderRadius: "2px"}}>Clear</button>
            </div>
          </div>
        </div>

        <div className="UploadAreaR">
          {imgurl && (
            <div>
              <div className="quescontainer">
              <h3 className="result">Result</h3>
              <Quesbtncomp /> 
              </div>
              {fileType.startsWith("video/") ? (
                <video key={imgurl} controls style={{maxWidth: "95%" }}>
                  <source src={imgurl} type="video/mp4" />
                </video>
              ):(
                <img src={imgurl} alt="[filetype error] only video & image" style={{minWidth:"262px" , maxWidth: "95%" }} />
              )}
            </div>
          )}

          {!isupload && !issubmit && defaltsrc === "video" && (
            <div className="nnn" style={{alignItems: "center",justifyContent: "center",display: "flex",width:"50px",bottom:"0",height:"30px"}}>
              <ul style={{left:"10px",width: "100px", display: "flex", justifyContent: "space-between" }}>
                <li key="sample1" className={`list-bottom ${samplevidTab === 0 ? "active" : ""}`} style={{fontSize:"12px"}}>
                  <a href="#" onClick={() => { setSampleVidTab(0); setShowSampleVid(sampleoutputmp4); }}>
                    <span className="icon"><FaArrowLeft /></span>
                    <span className="text">demo_1</span>
                  </a>
                </li>

                <li key="sample2" className={`list-bottom ${samplevidTab === 1 ? "active" : ""}`} style={{fontSize:"12px",right:"22px"}}>
                  <a href="#" onClick={() => { setSampleVidTab(1); setShowSampleVid(defalttranmp4); }}>
                    <span className="icon"><FaArrowRight /></span>
                    <span className="text">?!?</span>
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
        
      </div>
      
      <ToastContainer />
    </div>
  );
}//<a href="https://wakatime.com/badge/user/ec29ef99-8c9b-4017-ba6e-b52d5fcc5c9a/project/e26ae291-830e-4b27-ad21-1ad819fb5bea"><img src="https://wakatime.com/badge/user/ec29ef99-8c9b-4017-ba6e-b52d5fcc5c9a/project/e26ae291-830e-4b27-ad21-1ad819fb5bea.svg?style=flat" alt="wakatime"  /></a>
//toast可克制化樣式
export default App;







/*
          <ul>
            <li className="list active">
              <a href="#" onClick={() =>ShowDefult(0)}>
                <span className="icon">
                  <FaImage />
                </span>
                <span className="text">Image</span>
              </a>
            </li>
            <li className="list">
              <a href="#" onClick={() =>ShowDefult(1)}>
                <span className="icon">
                  <MdVideoCameraBack />
                </span>
                <span className="text">Video</span>
              </a>
            </li>
            <div className="indicator"></div>
          </ul>
*/



/*ship步驟:
[] 改submitfile的api網址
[] 改暫時檔名



*/





// component == 元件 (顯示UI)
// function == 處理函式

/*
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value); // 從輸入框中拿到 value
  };

  return <input type="text" onChange={handleChange} />;

*/



/*
import React, { useState } from "react";
import './App.css';
import { FaArrowDown } from "react-icons/fa6";

function App(){
    const [selectedFile, setSelectedFile] = useState(null);
    const [processedImage, setProcessedImage] = useState(null);

    function handleFileChange(event){
        setSelectedFile(event.target.files[0]); 
    }

    async function handleSubmit() {
        if (!selectedFile){
            alert('請先選擇圖片please select the img first!');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await fetch('https://attackonpaper.onrender.com/upload', {
                method: 'POST',
                body: formData,
            });

            if(!response.ok){
                alert('上傳失敗 failed');
                return;
            }

            const blob = await response.blob();
            const imageUrl = URL.createObjectURL(blob); // ✅ 產生 blob 圖片網址
            setProcessedImage(imageUrl);

        }catch (error) {
            alert('錯誤 error: '+ error.message);
        }
    }

    return (
        <div style={{ padding:20 }}>
            <h1>I Was Reincarnated as an Anime Sketch – <big className="AOP">Attack on Paper</big> : <br></br><small>Image-to-Canny Edge Detection</small></h1>
            <div className="subname">select an img first <FaArrowDown /></div>
            <br></br>
            <input type="file" accept="image/*"  onChange={handleFileChange} />
            <button onClick={handleSubmit}>送出 submit</button>

            <br/><br/>

            {processedImage &&(
                <div>
                    <h3>處理後 result:</h3>
                    <img src={processedImage} alt="Canny edges" />
                </div>
            )}
        </div>
    );
}

export default App;
*/
