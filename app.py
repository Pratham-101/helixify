from flask import Flask, render_template, request, send_file
from flask_cors import CORS
import pandas as pd

import disease_detection
import drug_recommendation


app = Flask(__name__)
CORS(app)


@app.route('/')
def index():
    return render_template('./templates/index.html')


@app.route('/upload', methods=['POST'])
def upload_file():
    try:
        if 'file' not in request.files:
            return "No file part", 400

        file = request.files['file']

        if file.filename == '':
            return "No selected file", 400

        print(f"File received: {file.filename}")

        if file and file.filename.endswith('.csv'):

            dna_data = pd.read_csv(file)

            disease_association = pd.read_csv(r'./Database/Disease/DiseaseAssociation.csv')
            disease_features = pd.merge(dna_data, disease_association, on='rsid')

            prs_values = disease_detection.get_disease_prs(disease_features)
            print("\n", prs_values, "\n")

            disease_insights = disease_detection.predict_disease(disease_features, prs_values)
            print(disease_insights, "\n")

            drug_association = pd.read_csv(r'./Database/Drug/DrugAssociation.csv')
            drug_features = pd.merge(dna_data, drug_association, on='rsid')

            drug_insights = drug_recommendation.get_drug_efficacy(drug_features, drug_recommendation)
            print(drug_insights, "\n")

    except Exception as e:
        print(f"Error: {e}")  
        return "An error occurred while processing the file", 500
    

if __name__ == '__main__':
    app.run(debug=True)