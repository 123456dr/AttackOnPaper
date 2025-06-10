# Swagger UI（點擊操作介面）：http://127.0.0.1:8000/docs
# Redoc（文件版樣式）：http://127.0.0.1:8000/redoc

# pip freeze > requirements.txt
# 啟動腳本 uvicorn main:app --host 0.0.0.0 --port 10000
# uvicorn main:app --reload 執行fastapi
# render Build Command: pip install -r requirements.txt && Start Command: ./start.sh && Port: 10000


from fastapi import FastAPI,File,UploadFile,Form
from pydantic import BaseModel
from fastapi.responses import FileResponse #回傳圖片顯示
import shutil # 複製檔案用
import os # 管理路徑檔案
from fastapi.middleware.cors import CORSMiddleware
import uuid #產生亂數
import cv2
import numpy as np

'''
def ero(img):
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
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/upload")
async def upload_file( file: UploadFile = File(...)):
    # ...必填 , File從上傳來的

    save_path = "img.png"#f"{uuid.uuid4()}.png"   #亂數檔名
    with open(save_path, "wb") as buffer: # 寫入二進位wb write binary
        shutil.copyfileobj(file.file, buffer)
    # shutil複製檔案到save_path儲存

    img = cv2.imread(save_path,cv2.IMREAD_GRAYSCALE)
    img = cv2.Canny(img,150,200)
    # processed = ero(img)

    cv2.imwrite(save_path, img)#processed)

    

    return FileResponse(save_path, media_type="image/png")












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