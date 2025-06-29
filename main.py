# Swagger UI（點擊操作介面）：http://127.0.0.1:8000/docs
# Redoc（文件版樣式）：http://127.0.0.1:8000/redoc

# pip freeze > requirements.txt
# 啟動腳本 uvicorn main:app --host 0.0.0.0 --port 10000
# uvicorn main:app --reload 執行fastapi
# render Build Command: pip install -r requirements.txt 
# start Command: uvicorn main:app --host 0.0.0.0 --port $PORT && Port: 10000


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
import imageio.v2 as imageio
from fastapi import HTTPException

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
        "https://123456dr.github.io",
        "https://611d0243-165f-4c22-84c7-1ed33837b55e-00-2pni82htkpxmr.sisko.replit.dev",
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



#影格擷取與合成影片  (原始render錯誤
def cap_to_video(save_path, output_path = "output.mp4", target_fps=12): #.mp4", target_fps=12):
    cap = cv2.VideoCapture(save_path)
    fps = cap.get(cv2.CAP_PROP_FPS)
    frames = []
    frame_interval = int(fps // target_fps)
    count = 0

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        if count % frame_interval == 0:
            frame = cv2.Canny(cv2.cvtColor(np.clip(frame * 1.5, 0, 255).astype(np.uint8), cv2.COLOR_BGR2GRAY), 150, 200)
            #frame = cv2.cvtColor(cv2.Canny(frame, 150, 200), cv2.COLOR_BAYER_BG2BGR) #3通道
            frame = 255-frame
            frame = cv2.cvtColor(frame, cv2.COLOR_GRAY2BGR)
            frames.append(frame)
        count += 1
    
    cap.release()
    with imageio.get_writer(output_path, fps=target_fps, codec='libx264') as writer:
        for frame in frames:
            writer.append_data(frame)

    return output_path




'''
def cap_to_video(save_path, output_path = "output.mp4", target_fps=12): #.mp4", target_fps=12):
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
'''


@app.post("/upload_video")
async def upload_video(file: UploadFile = File(...)): #, background_task:BackgroundTasks = BackgroundTasks()):
    save_path = f"RCaop{uuid.uuid4()}.mp4"

    with open(save_path, "wb") as buffer: # writebinary
        shutil.copyfileobj(file.file, buffer)
        
    #...暫時先不寫處理邏輯
    #save_path = "defalt.mp4"
        
    save_path = cap_to_video(save_path)
    # background_tasks.add_task(remove_file, save_path)

    return FileResponse(save_path, media_type="x-msvideo") #video/mp4")
# 加上filename可自訂下載檔案名


'''


'''


'''
# 第一版
[] 將影片切成逐張圖片儲存至新創建的資料夾
[] 將逐張影格做增強對比
[] 將處理過後的影格逐張合成影片
[] 回傳影片

# 第二版
[] 透過人物骨架做人物處理
[] 骨架處理後可透過膨脹法


# 第二版進階
[] 串接或訓練ai做兩張相連影格間人物之動作預判與產生線稿
[] 完成影格處理後，已前後兩張為單位，接續比對與修正人物線條顯示

'''


'''
class Message(BaseModel):
    name: str
    age: int
'''
'''
@app.get("/hello")
def say_hello():
    return {"message": "Hello FastAPI! "}

@app.get("/ping")
def a():
    return {"status":"ok"}
'''




