from flask import Flask, request, send_file
from flask_cors import CORS
import cv2
import numpy as np
import io
import os

app = Flask(__name__)
CORS(app)

@app.route('/upload', methods=['POST'])
def upload():
    file = request.files.get('image')  #前端表單中key為image的檔案
    if not file: #沒收到圖片
        return "No image uploaded", 400  #回傳錯誤狀態碼 400壞請求
    
    file_bytes = np.frombuffer(file.read(), np.uint8)
    img = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
    edges = cv2.Canny(img, 100, 200)

    # 把邊緣結果編碼成png格式的二進位資料
    is_success, buffer = cv2.imencode(".png", edges) 
    if not is_success:
        return "Image encoding failed", 500 # 500伺服器錯誤
    
    # 使用io.BytesIO將二進位資料包裝成檔案格式並用flask回傳前端
    return send_file(
        io.BytesIO(buffer.tobytes()), # 轉成BytesIO格式
        mimetype='image/png',      # 告訴瀏覽器為png檔案
        as_attachment=False, # 直接顯示而非下載檔案
        download_name='edges.png' # 檔案名稱
    )

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))  # Render 會自動設這個 PORT 變數
    app.run(host='0.0.0.0', port=port)