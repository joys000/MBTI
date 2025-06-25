from flask import Flask, request, jsonify
from collections import Counter

app = Flask(__name__)

# 결과 DB (간략 예시)
result_db = {
    "ENFP_적극_표현형": {
        "title": "🔥 불꽃 몰입형 ENFP",
        "description": "감정 표현이 풍부하고, 썸 단계부터 적극적인 스타일이에요. 당신은 상대의 반응에 예민하면서도 사랑에 진심인 타입!",
        "match_mbti": ["INFJ", "ISFP", "INTP"],
        "image": "enfp_fire.png"
    },
    "ISFJ_수동_내면형": {
        "title": "🌱 조용한 배려형 ISFJ",
        "description": "마음속 감정을 쉽게 드러내진 않지만, 연애에선 헌신적인 당신! 상대를 먼저 생각하며 조심스럽게 다가가는 연애를 선호해요.",
        "match_mbti": ["ENFP", "ESFP", "ESTP"],
        "image": "isfj_care.png"
    }
}

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    mbti = data.get("mbti")
    gender = data.get("gender")
    selected_tags = data.get("tags", [])

    tag_counter = Counter(selected_tags)
    top_tags = tag_counter.most_common(2)

    if len(top_tags) < 2:
        return jsonify({"error": "Not enough tag data"}), 400

    result_key = f"{mbti}_{top_tags[0][0]}_{top_tags[1][0]}"
    result = result_db.get(result_key, {
        "title": f"{mbti}형 연애 유형",
        "description": "아직 이 유형에 대한 분석 결과가 부족해요! 곧 업데이트될 예정입니다.",
        "match_mbti": [],
        "image": "default.png"
    })

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
