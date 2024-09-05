from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    age = data.get('age')
    gender = data.get('gender')
    past_illness = data.get('pastmedicalhistory')

    result = "Predicted result based on model"
    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
