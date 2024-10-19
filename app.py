from flask import Flask, render_template, request, send_file
from flask_cors import CORS
from io import BytesIO
import pandas as pd

import disease_detection
import drug_recommendation
import lifestyle_recommendation
import generate_report


app = Flask(__name__)
CORS(app)


@app.route('/')
def index():
    return render_template('index.html')


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

            disease_insights = disease_detection.get_disease_prediction(disease_features, prs_values)
            print(disease_insights, "\n")

            drug_association = pd.read_csv(r'./Database/Drug/DrugAssociation.csv')
            drug_features = pd.merge(dna_data, drug_association, on='rsid')

            drug_insights = drug_recommendation.get_drug_efficacy(drug_features, disease_insights)
            print(drug_insights, "\n")

            lifestyle_insights = lifestyle_recommendation.get_lifestyle_changes(disease_insights)
            print(lifestyle_insights, "\n")

            disease_descriptions = {
                'Alzheimer\'s Disease': r"Alzheimer's disease is a brain disorder that gradually destroys memory and thinking skills, and eventually, the ability to carry out daily tasks. It's the most common form of dementia in older adults, accounting for at least two-thirds of cases in people aged 65 and older.",
                'Asthma': r"Asthma is a chronic lung disease that causes inflammation and tightening of the muscles around the airways, making breathing difficult.",
                'Breast Cancer': r"Breast cancer is a disease that occurs when breast tissue cells grow out of control and form tumors. It can affect both men and women, but it's rare in men.",
                'Coronary Artery Disease': r"Coronary artery disease (CAD), also known as coronary heart disease or ischemic heart disease, is a common condition that occurs when the arteries supplying blood to the heart become narrowed or blocked.", 
                'Diabetes Mellitus Type 1': r"Type 1 diabetes mellitus, also known as type 1 diabetes or T1DM, is an autoimmune disease that occurs when the body's immune system destroys the pancreas' insulin-producing cells.", 
                'Diabetes Mellitus Type 2': r"Type 2 diabetes mellitus (T2DM) is a common disease that occurs when the body has high blood sugar levels due to insulin resistance and a relative lack of insulin.",
                'Ischemic Stroke': r"An ischemic stroke is a type of stroke that occurs when a blood vessel in the brain becomes blocked, preventing blood flow to the brain.",
                'Lung Carcinoma': r"Lung carcinoma, also known as lung cancer, is a malignant tumor that starts in the lungs. It's a leading cause of cancer deaths in the United States, and is responsible for more deaths in women than breast cancer.",
                'Parkinson\'s Disease': r"Parkinson's disease is a brain disorder that causes movement problems, and can also impact mental health, sleep, and pain.", 
                'Pulmonary Fibrosis': r"Pulmonary fibrosis is a disease where there is scarring of the lungs—called fibrosis—which makes it difficult to breathe. This is because the scarring causes the tissues in the lungs to get thick and stiff and makes it hard to absorb oxygen into the bloodstream."
            }
            
            patient_data = {
                'name': 'Bhushan Saxena',
                'gender': 'Male',
                'id': '1234565',
                'dob': 'March 9, 1980',
                'phone': '+91 123456789',
                'nationality': 'Indian',
                'admission_time': 'September 8, 2021 / 22:00H',
                'bmi': '28',
                'disease_detection': '',
                'drug_recommendations': '',
                'lifestyle_recommendations': '',
                'risk': ''
            }

            threshold = {
                'Alzheimer\'s Disease': 32.45448457628697,
                'Asthma': 74.86847585458283,
                'Breast Cancer': 35.555622424105263,
                'Coronary Artery Disease': 33.362071598015476, 
                'Diabetes Mellitus Type 1': 25.472475744600086, 
                'Diabetes Mellitus Type 2': 59.695030213387476,
                'Ischemic Stroke': 12.884100038869343,
                'Lung Carcinoma': 21.294513980950068,
                'Parkinson\'s Disease': 12.573534983890493, 
                'Pulmonary Fibrosis': 12.989312428347842
            }

            disease_insights = {disease: {'description': disease_descriptions[disease], 'prs': prs_values[disease], 'risk': 'High' if prs_values[disease] >= threshold[disease] else 'Moderate'} for disease in disease_insights if disease_insights[disease] == 1}
            print(disease_insights, "\n")

            import random
            drug_insights = {disease: {'drug': drug_insights[disease][0], 'dosage': f"Initial dose of {random.choice(["162-325", "60-125"])} mg once, maintainance dose of {random.choice(["75-100", "50-65"])} mg daily for lifelong duration.", 'other_drugs': ", ".join(drug_insights[disease][1:])} for disease in drug_insights}
            print(drug_insights, "\n")

            disease_symptoms = {
                'Alzheimer\'s Disease': r"Symptoms of Alzheimer's disease include memory loss, confusion, difficulty in completing familiar tasks, misplacing things, and changes in mood or personality.",
                'Asthma': r"Symptoms of asthma include shortness of breath, chest tightness, wheezing, and coughing, especially at night or early in the morning.",
                'Breast Cancer': r"Symptoms of breast cancer include a lump or mass in the breast, change in breast size or shape, dimpling of the skin, nipple discharge, and redness or flaky skin around the breast.",
                'Coronary Artery Disease': r"Symptoms of coronary artery disease include chest pain or discomfort (angina), shortness of breath, fatigue, and sometimes heart attacks.",
                'Diabetes Mellitus Type 1': r"Symptoms of type 1 diabetes include frequent urination, extreme thirst, hunger, weight loss, fatigue, blurred vision, and slow healing of wounds.",
                'Diabetes Mellitus Type 2': r"Symptoms of type 2 diabetes include increased thirst, frequent urination, increased hunger, fatigue, blurred vision, slow-healing sores, and frequent infections.",
                'Ischemic Stroke': r"Symptoms of an ischemic stroke include sudden numbness or weakness in the face, arm, or leg (especially on one side of the body), confusion, trouble speaking, difficulty understanding speech, trouble seeing, and difficulty walking.",
                'Lung Carcinoma': r"Symptoms of lung carcinoma (lung cancer) include persistent cough, coughing up blood, chest pain, shortness of breath, hoarseness, unexplained weight loss, and fatigue.",
                'Parkinson\'s Disease': r"Symptoms of Parkinson's disease include tremors, stiffness, slowed movement (bradykinesia), balance problems, and speech changes. Non-motor symptoms may include sleep problems, depression, and cognitive changes.",
                'Pulmonary Fibrosis': r"Symptoms of pulmonary fibrosis include shortness of breath, dry cough, fatigue, unexplained weight loss, aching muscles and joints, and clubbing (widening and rounding) of the fingertips."
            }


            lifestyle_insights = {disease: {'symptoms': disease_symptoms[disease], 'present_lifestyle': random.choice(["Unhealthy diet, Lack of exercise, Excessive alcoholism", "Unhealthy Diet, Lack of Exercise", "Excessive smoking"]), 'change_lifestyle': ", ".join(lifestyle_insights[disease])} for disease in lifestyle_insights}
            print(lifestyle_insights, "\n")

            patient_data['disease_detection'] = disease_insights
            patient_data['drug_recommendation'] = drug_insights
            patient_data['lifestyle_recommendation'] = lifestyle_insights

            pdf_io = BytesIO()
            generate_report.create_report(pdf_io, patient_data)
            pdf_io.seek(0)

            return send_file(pdf_io, mimetype='application/pdf', as_attachment=True, download_name='personalized_health_report.pdf')

        return "Invalid file format", 400

    except Exception as e:
        print(f"Error: {str(e)}")  
        return "An error occurred while processing the file", 500
    

if __name__ == '__main__':
    app.run(debug=True)