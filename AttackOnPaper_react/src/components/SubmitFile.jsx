import React from "react";

async function SubmitFile(file, setImgUrl){

    const formData = new FormData();
    //formData.append("name", name);
    //formData.append("age", parseInt(age));
    formData.append("file", file);
    

    if (file.type.startsWith("image/")){
        try {
            //const response = await fetch("https://attackonpaper-fastapi.onrender.com/upload_img", {
            const response = await fetch("http://localhost:8000/upload_img", {  //
            //const response = await fetch("https://611d0243-165f-4c22-84c7-1ed33837b55e-00-2pni82htkpxmr.sisko.replit.dev/upload_img",{
                method: "POST",
                body: formData,
            });
            const blob = await response.blob(); //binary large object二進位資料包裝物件
            const imgurl = URL.createObjectURL(blob);
            setImgUrl(imgurl);
        } catch (error) {
            alert("upload error"); 
        }
    }
    else if(file.type.startsWith("video/")){
        try {
            //const response = await fetch("https://attackonpaper-fastapi.onrender.com/upload_video", { 
            const response = await fetch("http://localhost:8000/upload_video", {  //
            //const response = await fetch("https://611d0243-165f-4c22-84c7-1ed33837b55e-00-2pni82htkpxmr.sisko.replit.dev/upload_video",{
                method: "POST",
                body: formData,
            });
            const blob = await response.blob();
            const imgurl = URL.createObjectURL(blob);
            setImgUrl(imgurl);
        } catch (error) {
            alert("upload error");  
        }
    }
    else{
        alert("only mp4 or image")
    }
    
    
}
export default SubmitFile;



/*
useEffect(( =>{
    const x = setInterval(( => {
        xxx
    },1000);

    return () => {
        clearInterval(x);    
    };
}, []);

useEffect == 自動關閉interval壁面重新渲染時interval多一個(內存洩漏)
*/

