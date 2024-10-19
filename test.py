from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enables Cross-Origin Resource Sharing (important for React-Flask communication)

@app.route('/submit', methods=['POST'])
def submit_form():
    # Get the JSON data from the request
    data = request.json
    
    # Access specific fields from the JSON data
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')

    # You can now process the data or store it in a database
    print(f"Name: {name}, Email: {email}, Message: {message}")

    # Send a response back to the React frontend
    return jsonify({"message": "Data received successfully!"}), 200

if __name__ == '__main__':
    app.run(debug=True)
