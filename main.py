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
        "https://123456dr.github.io",
        "https://123456dr.github.io/AttackOnPaper",
        "http://localhost:5173",
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




@app.post("/upload_video")
async def upload_video(file: UploadFile = File(...)): #, background_task:BackgroundTasks = BackgroundTasks()):
    save_path =  f"RCaop{uuid.uuid4()}.mp4" #"video.mp4" #

    with open(save_path, "wb") as buffer: # writebinary
        shutil.copyfileobj(file.file, buffer)
    
    #...暫時先不寫處理邏輯
    save_path = "defalt.mp4"

    # background_tasks.add_task(remove_file, save_path)

    return FileResponse(save_path, media_type="video/mp4")
# 加上filename可自訂下載檔案名



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