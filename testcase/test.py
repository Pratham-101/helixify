import pandas as pd
import pickle
import numpy
import math


beta = {
    'Alzheimer\'s': [-3.0, 0.1],
    'Breast Cancer': [-4.0, 0.1],
    'Coronary Artery Disease': [-4.0, 0.15],
    'Parkinson\'s Disease': [-4.5, 0.1]
}

threshold = {
    'Alzheimer\'s': 16.15,
    'Breast Cancer': 10.21,
    'Coronary Artery Disease': 26.84,
    'Parkinson\'s Disease': 5.11
}



disease_association = pd.read_csv(r'C:\Users\PRATHAM CHINTRATE\OneDrive\Documents\zamp\htdocs\sih_project\testcase\DiseaseAssociation (1).csv')
dna_data = pd.read_csv(r'C:\Users\PRATHAM CHINTRATE\OneDrive\Documents\zamp\htdocs\sih_project\testcase\user1.csv')


beta = {
    'Alzheimer\'s': [-3.0, 0.1],
    'Breast Cancer': [-4.0, 0.1],
    'Coronary Artery Disease': [-4.0, 0.15],
    'Parkinson\'s Disease': [-4.5, 0.1]
}

threshold = {
    'Alzheimer\'s': 22.56,
    'Breast Cancer': 16.49,
    'Coronary Artery Disease': 6.32,
    'Parkinson\'s Disease': 17.98
}

prs_values = {}
prs_prob = {}


features = pd.merge(dna_data, disease_association, on='rsid')
refined_features = pd.DataFrame()
refined_features['key'] = features['rsid']+ "_" + features['disease_name']
refined_features['risk_frequency'] = 0

for _, row in features.iterrows():

    rsid = row['rsid']
    disease = row['disease_name']
    risk_allele = row['risk_allele']
    allele1 = row['allele1']
    allele2 = row['allele2']

    risk_allele_frequency = sum([allele1 == risk_allele, allele2 == risk_allele])
    refined_features.loc[_, 'risk_frequency'] = risk_allele_frequency

    if(pd.notna(row['odds_ratio'])):

        odds_ratio = float(row['odds_ratio'])

        mrs = risk_allele_frequency * math.log(odds_ratio)
        
        if disease in prs_values:
            prs_values[disease] += mrs
        else:
            prs_values[disease] = mrs


def get_probability(prs, beta_0, beta_1):
    return 1 / (1 + math.exp(-(beta_0 + beta_1 * prs)))


for disease, prs in prs_values.items():
    beta_0 = beta[disease][0]
    beta_1 = beta[disease][1]
    prs_prob[disease] = get_probability(prs, beta_0, beta_1)

print(prs_values)


refined_features = refined_features.transpose()
refined_features.columns = refined_features.iloc[0]
refined_features = refined_features.drop(refined_features.index[0]).reset_index(drop=True)


dataset = pd.read_csv(r'C:\Users\PRATHAM CHINTRATE\OneDrive\Documents\zamp\htdocs\sih_project\testcase\Dataset (1).csv')
new_dataset = pd.concat([dataset, refined_features], ignore_index=True)

new_dataset.to_csv(r'C:\Users\PRATHAM CHINTRATE\OneDrive\Documents\zamp\htdocs\sih_project\testcase\Dataset (1).csv', index=False)

with open('disease_models.pkl', 'rb') as f:
    models = pickle.load(f)

predictions = {}
for disease, model in models.items():
    predictions[disease] = model.predict(refined_features.to_numpy())[0]

disease_data = []
for disease in beta:
    disease_data.append({'Disease': disease, 'Polygenic Risk Score': prs_values[disease], 'Disease Risk': 'Yes' if predictions[disease] else 'No'})



# for disease in beta:
#     if predictions[disease]:
#         refined_features.loc[len(refined_features.index)] = [disease, 1]
#     else:
#         refined_features.loc[len(refined_features.index)] = [disease, 0]


from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import Table, TableStyle, Paragraph
from reportlab.lib.enums import TA_CENTER


def draw_cover_page(c, user_info):
    c.setFont("Helvetica-Bold", 24)
    c.drawCentredString(300, 770, "Personalized Health Report")
    
    c.setFont("Helvetica", 14)
    c.drawString(100, 730, f"Name: {user_info['name']}")
    c.drawString(100, 710, f"Age: {user_info['age']}")
    c.drawString(100, 690, f"Gender: {user_info['gender']}")
    c.drawString(100, 670, f"Date: {user_info['date']}")
    c.line(100, 660, 500, 660)

    c.setFont("Helvetica", 12)
    c.drawString(100, 630, "This report provides an overview of your genetic risk for certain diseases,")
    c.drawString(100, 615, "based on a polygenic risk score (PRS). We also include drug effectiveness insights.")
    c.showPage()


def draw_disease_risk_table(c, disease_data):
    table_data = [["Disease", 'Polygenic Risk Score', 'Disease Risk']]
    for disease in disease_data:
        table_data.append([disease['Disease'], disease['Polygenic Risk Score'], disease['Disease Risk']])

    table = Table(table_data)
    style = TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
        ('GRID', (0, 0), (-1, -1), 1, colors.black),
    ])
    table.setStyle(style)
    
    width, height = A4
    table.wrapOn(c, width, height)
    table.drawOn(c, 100, 500)
    
    c.showPage()


def generate_report(user_info, disease_data):
    c = canvas.Canvas(r"C:\Users\PRATHAM CHINTRATE\OneDrive\Documents\zamp\htdocs\sih_project\testcase\health_report.pdf", pagesize=A4)
    
    draw_cover_page(c, user_info)
    
    c.setFont("Helvetica-Bold", 16)
    c.drawString(100, 780, "Disease Risk Overview")
    
    draw_disease_risk_table(c, disease_data)

    c.save()


user_info = {
    "name": "",
    "age": 0,
    "gender": "",
    "date": "September 4, 2024"
}


generate_report(user_info, disease_data)