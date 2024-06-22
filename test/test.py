from flask import Flask, jsonify
import time

app = Flask(__name__)

@app.route('/data', methods=['GET'])
def get_data():
    # Giả lập việc xử lý lâu bằng cách đợi 10 giây
    time.sleep(10)
    # Trả về phản hồi JSON
    return jsonify({"message": "Data loaded successfully after 10 seconds!"})

if __name__ == '__main__':
    app.run(debug=True)
