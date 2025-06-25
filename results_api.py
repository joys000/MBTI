
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "MBTI 결과 API 정상 작동 중!"

@app.route("/api/result", methods=["POST"])
def get_result():
    data = request.json
    mbti_type = data.get("mbti")
    # 실제 서비스에서는 mbti_type 기반 분석 또는 DB조회
    return jsonify({
        "mbti": mbti_type,
        "title": f"{mbti_type} 유형의 연애 성향 분석 결과입니다.",
        "description": f"{mbti_type} 성향에 맞는 연애 스타일과 궁합을 설명하는 텍스트."
    })

if __name__ == "__main__":
    app.run(debug=True)
