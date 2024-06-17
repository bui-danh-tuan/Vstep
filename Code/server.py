from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import os
import time

app = Flask(__name__)
CORS(app)  # Thêm dòng này để cho phép CORS

# Đường dẫn tới file Excel
EXCEL_FILE_PATH = 'data.xlsx'

# Biến toàn cục để lưu trữ thời gian khởi động server
start_time = time.time()

@app.route('/get_excel_data', methods=['GET'])
def get_excel_data():
    if os.path.exists(EXCEL_FILE_PATH):
        # Đọc dữ liệu từ file Excel
        xls = pd.ExcelFile(EXCEL_FILE_PATH)
        data = {}
        for sheet_name in xls.sheet_names:
            df = pd.read_excel(EXCEL_FILE_PATH, sheet_name=sheet_name)
            data[sheet_name] = df.to_dict(orient='records')
        response = jsonify(data)
        response.status_code = 200
    else:
        response = jsonify({"error": "File not found"})
        response.status_code = 404
    return response

@app.route('/uptime', methods=['GET'])
def get_uptime():
    current_time = time.time()
    uptime_seconds = int(current_time - start_time)
    return jsonify({"uptime": uptime_seconds})

@app.route('/update_weight', methods=['POST'])
def update_weight():
    request_data = request.get_json()
    sheet_name = request_data.get('sheet_name')
    number = request_data.get('number')
    new_weight = request_data.get('weight')

    if os.path.exists(EXCEL_FILE_PATH):
        # Đọc dữ liệu từ file Excel
        xls = pd.ExcelFile(EXCEL_FILE_PATH)
        if sheet_name in xls.sheet_names:
            df = pd.read_excel(EXCEL_FILE_PATH, sheet_name=sheet_name)
            
            # Tìm dòng cần cập nhật
            index_to_update = df[df['number'] == number].index
            if not index_to_update.empty:
                index_to_update = index_to_update[0]
                
                # Cập nhật dữ liệu
                df.at[index_to_update, 'weight'] = int(new_weight)
                
                # Ghi lại vào file Excel
                with pd.ExcelWriter(EXCEL_FILE_PATH, engine='openpyxl', mode='a', if_sheet_exists='replace') as writer:
                    df.to_excel(writer, sheet_name=sheet_name, index=False)
                
                response = jsonify({"message": "Weight updated successfully"})
                response.status_code = 200
            else:
                response = jsonify({"error": "Number not found in sheet"})
                response.status_code = 404
        else:
            response = jsonify({"error": "Sheet not found"})
            response.status_code = 404
    else:
        response = jsonify({"error": "File not found"})
        response.status_code = 404

    return response

if __name__ == '__main__':
    app.run(debug=True)
