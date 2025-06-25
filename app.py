
from flask import Flask, jsonify
app = Flask(__name__)

@app.route("/")
def home():
    return "MBTI Backend is working!"

if __name__ == "__main__":
    app.run()
