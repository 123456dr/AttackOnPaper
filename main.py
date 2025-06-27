from fastapi import FastAPI,File,UploadFile,Form
from pydantic import BaseModel
from fastapi.responses import FileResponse #回傳圖片顯示
import shutil # 複製檔案用
import os # 管理路徑檔案
from fastapi.middleware.cors import CORSMiddleware
import uuid #產生亂數
import cv2
import numpy as np
# from fastapi.responses import RedirectResponse
from fastapi import BackgroundTasks




'''
def ero(img): //腐蝕
    kernel1 = np.ones((3,3), np.uint8)
    erosion1 = cv2.erode(img,kernel1)

    return erosion1
'''
'''def ero(img):
    kernel = np.ones((3, 3), np.uint8)
    dilated = cv2.dilate(img, kernel, iterations=1)
    eroded = cv2.erode(dilated, kernel, iterations=1)
    return eroded
'''


app = FastAPI()


# 加入 CORS middleware 跨
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://123456dr.github.io"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



def remove_file(path: str):
    try:
        os.remove(path)
    except:
        pass






@app.post("/upload_img")
async def upload_file( file: UploadFile = File(...)):
    # ...必填 , File從上傳來的

    save_path =  f"RCaop{uuid.uuid4()}.png"#"img.png"#  #亂數檔名
    with open(save_path, "wb") as buffer: # 寫入二進位wb write binary
        shutil.copyfileobj(file.file, buffer)
    # shutil複製檔案到save_path儲存

    img = cv2.imread(save_path,cv2.IMREAD_GRAYSCALE)
    img = cv2.Canny(img,150,200)
    # processed = ero(img)

    cv2.imwrite(save_path, img)#processed)

    

    return FileResponse(save_path, media_type="image/png")





#影格擷取與合成影片
def cap_to_video(save_path, output_path = "output.mp4", target_fps=12):
    cap = cv2.VideoCapture(save_path)
    fps = cap.get(cv2.CAP_PROP_FPS)
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

    #fourcc = cv2.VideoWriter_fourcc(*'mp4v') # four carator cope
    fourcc = cv2.VideoWriter_fourcc(*'avc1' )       
    writer = cv2.VideoWriter(output_path, fourcc, target_fps, (width, height))
    frame_interval = int(fps // target_fps)
    count = 0

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        if count % frame_interval == 0:
            frame = cv2.cvtColor( cv2.Canny(cv2.cvtColor(np.clip(frame * 1.5, 0, 255).astype(np.uint8), cv2.COLOR_BGR2GRAY), 150, 200), cv2.COLOR_BAYER_BG2BGR)#cv2.COLOR_GRAY2BGR) #3通道
            #frame = cv2.cvtColor(cv2.Canny(frame, 150, 200), cv2.COLOR_BAYER_BG2BGR) #3通道
            frame = 255-frame
            writer.write(frame)
        count += 1
    
    cap.release()
    writer.release()
    return output_path



@app.post("/upload_video")
async def upload_video(file: UploadFile = File(...)): #, background_task:BackgroundTasks = BackgroundTasks()):
    save_path = f"RCaop{uuid.uuid4()}.mp4"

    with open(save_path, "wb") as buffer: # writebinary
        shutil.copyfileobj(file.file, buffer)
    
    #...暫時先不寫處理邏輯
    #save_path = "defalt.mp4"
    save_path = cap_to_video(save_path)
    

    # background_tasks.add_task(remove_file, save_path)

    return FileResponse(save_path, media_type="video/mp4")
