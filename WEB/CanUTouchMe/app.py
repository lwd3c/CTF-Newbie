import os
from flask import Flask, request, send_from_directory, jsonify
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__, static_folder="public")

@app.route("/")
def index():
    return send_from_directory("public", "index.html")

@app.route("/<path:filename>")
def serve_static(filename):
    return send_from_directory("public", filename)

@app.route("/getflag")
def get_flag():
    ua = request.headers.get("User-Agent", "").lower()
    width = request.args.get("w", type=int)
    height = request.args.get("h", type=int)
    dpr = request.args.get("dpr", type=float)

    # Check iPhone 14 Pro Max
    if "iphone" in ua and dpr == 3 and (
        (width == 430 and height == 932) or
        (width == 932 and height == 430)
    ):
        return jsonify({"flag": os.getenv("CTF_FLAG")})

    # Nếu là mobile khác iPhone 14 Pro Max → báo lỗi
    elif "mobile" in ua:
        return jsonify({"flag": "🚫 Only iPhone 14 Pro Max is allowed for this challenge!"})

    # Desktop hoặc các trường hợp khác → fake flag
    return jsonify({"flag": "flag{wrong_env}"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)
