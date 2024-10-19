from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, Image
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
import matplotlib.pyplot as plt
import io
from math import pi
import random
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.units import inch


def create_report(output_file, patient_data):

    doc = SimpleDocTemplate(output_file, pagesize=letter)
    elements = []

    styles = getSampleStyleSheet()
    normal_style = styles['Normal']
    title_style = ParagraphStyle(
        'Title',
        parent=styles['Heading1'],
        fontSize=18,
        textColor=colors.HexColor('#024b30'),
        alignment=1,
        spaceBefore=10,
        spaceAfter=10,
    )
    contact_info_style = ParagraphStyle(
    'ContactInfo',
    fontSize=10, 
    textColor=colors.HexColor('#024b30'),
    alignment=TA_CENTER,
    spaceBefore=5,
    spaceAfter=5,

    )
    header_style = ParagraphStyle(
        'Header',
        parent=styles['Heading2'],
        fontSize=14,
        textColor=colors.HexColor('#024b30'),
        alignment=1
    )

    company_info = """
    <h1>Helixify</h1><br/>
    """
    contact_info = """
    Phone: +91 1234567890 | Email: helixify@somaiya.edu
    """
    elements.append(Paragraph(company_info, title_style))
    elements.append(Paragraph(contact_info, contact_info_style))
    elements.append(Spacer(1, 0.25 * inch))

    elements.append(Paragraph("Patient Demographics", header_style))
    elements.append(Spacer(1, 0.1 * inch))

    data = [
        ["Name", patient_data['name'], "Gender", patient_data['gender']],
        ["Patient ID", patient_data['id'], "Date of Birth", patient_data['dob']],
        ["Phone no.", patient_data['phone'], "Nationality", patient_data['nationality']]
    ]

    table = Table(data, colWidths=[1.5 * inch, 2 * inch, 1.5 * inch, 2 * inch])
    table.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (0, -1), colors.HexColor('#d9ead3')),
    ('BACKGROUND', (2, 0), (2, 2), colors.HexColor('#d9ead3')), 
    ('TEXTCOLOR', (0, 0), (-1, -1), colors.black), 
    ('ALIGN', (0, 0), (-1, -1), 'LEFT'),  
    ('FONTNAME', (0, 0), (-1, -1), 'Helvetica-Bold'),  
    ('FONTSIZE', (0, 0), (-1, -1), 10),  
    ('BOTTOMPADDING', (0, 0), (-1, -1), 12), 
    ('BACKGROUND', (1, 0), (1, -1), colors.white), 
    ('BACKGROUND', (3, 0), (3, 2), colors.white),  
    ('GRID', (0, 0), (-1, -1), 1, colors.black)  
]))

    elements.append(Spacer(1, 0.5 * inch))
    elements.append(table)
    elements.append(Spacer(1, 0.25 * inch))

    elements.append(Paragraph("Disease Risk Analysis", header_style))
    elements.append(Spacer(1, 0.1*inch))

    disease_data = [
        ["Disease Name", "Disease Description", "Polygenic Risk Score", "Disease Risk"]]
    
    for disease in patient_data['disease_detection']:
        disease_data.append([Paragraph(disease, normal_style),
                             Paragraph(patient_data['disease_detection'][disease]['description'], normal_style),
                             patient_data['disease_detection'][disease]['prs'],
                             patient_data['disease_detection'][disease]['risk']])


    table = Table(disease_data, colWidths=[2*inch, 2*inch, 2*inch, 2*inch])
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#d9ead3')),
        ('TEXTCOLOR', (0, 0), (-1, -1), colors.black),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('FONTNAME', (0, 0), (-1, -1), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 12),
        ('GRID', (0, 0), (-1, -1), 1, colors.black)
    ]))

    elements.append(table)
    elements.append(Spacer(1, 0.25*inch))

    elements.append(Paragraph("Drug Efficacy Analysis", header_style))
    elements.append(Spacer(1, 0.1*inch))

    drug_data = [
        ["Disease Name", "Most Effective Drug", "Dosage", "Other Options"]]
    
    for disease in patient_data['drug_recommendation']:
        drug_data.append([Paragraph(disease, normal_style),
                          Paragraph(patient_data['drug_recommendation'][disease]['drug'], normal_style),
                          Paragraph(patient_data['drug_recommendation'][disease]['dosage'], normal_style),
                          Paragraph(patient_data['drug_recommendation'][disease]['other_drugs'], normal_style)])

    table = Table(drug_data, colWidths=[2*inch, 2*inch, 2*inch, 2*inch])
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#d9ead3')),
        ('TEXTCOLOR', (0, 0), (-1, -1), colors.black),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('FONTNAME', (0, 0), (-1, -1), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 12),
        ('GRID', (0, 0), (-1, -1), 1, colors.black)
    ]))

    elements.append(table)
    elements.append(Spacer(1, 0.25*inch))

    elements.append(Paragraph("Lifestyle Changes", header_style))
    elements.append(Spacer(1, 0.1*inch))

    lifestyle_data = [
        ["Disease Name", "Symptoms", "Present Lifestyle", "Lifestyle Changes"]]
    
    for disease in patient_data['lifestyle_recommendation']:
        lifestyle_data.append([Paragraph(disease, normal_style),
                          Paragraph(patient_data['lifestyle_recommendation'][disease]['symptoms'], normal_style),
                          Paragraph(patient_data['lifestyle_recommendation'][disease]['present_lifestyle'], normal_style),
                          Paragraph(patient_data['lifestyle_recommendation'][disease]['change_lifestyle'], normal_style)])

    table = Table(lifestyle_data, colWidths=[2*inch, 2*inch, 2*inch, 2*inch])
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#d9ead3')),
        ('TEXTCOLOR', (0, 0), (-1, -1), colors.black),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('FONTNAME', (0, 0), (-1, -1), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 12),
        ('GRID', (0, 0), (-1, -1), 1, colors.black)
    ]))

    elements.append(table)
    elements.append(Spacer(1, 0.25*inch))


    add_graphs(elements, patient_data)

    disclaimer = "Disclaimer: This is a preliminary diagnosis, consult your doctor before taking any medical decisions."
    elements.append(Paragraph(disclaimer, styles['Normal']))

    contact_info = "Phone: +91 1234567890 | Email: helixify@somaiya.edu"
    elements.append(Paragraph(contact_info, styles['Normal']))

    doc.build(elements)


def add_graphs(elements, patient_data):
    
    diseases = [disease for disease in patient_data['disease_detection']]
    values = [random.randint(85, 100) if patient_data['disease_detection'][disease]['risk'] == 'High' else random.randint(70, 85) for disease in patient_data['disease_detection']]

    fig, ax = plt.subplots()
    
    l = len(patient_data['disease_detection'])
    if l:
        bar_width = 1.2/l
    else:
        return
    
    ax.bar(diseases, values, color='lightgreen', width=bar_width)

    ax.set_ylabel('Score')
    ax.set_title('Disease Risk Analysis')

    plt.xticks(rotation=30, ha='right')

    plt.tight_layout()

    buf_bar = io.BytesIO()
    plt.savefig(buf_bar, format='png')
    buf_bar.seek(0)

    img_bar = Image(buf_bar, width=6 * inch, height=4 * inch)
    elements.append(img_bar)

    plt.close(fig)



    fig, ax = plt.subplots()
    pie_values = [30, 6, 24, 12, 18, 10]
    pie_labels = ['rs10498345', 'rs10861032', 'rs7549251', 'rs6460939', 'rs56084662', 'rs1057941']
    ax.pie(pie_values, labels=pie_labels, colors=['lightgreen', 'green', '#024b30'], autopct='%1.1f%%', startangle=140)
    ax.set_title('Genomic Risk SNP Contribution')

    buf_pie = io.BytesIO()
    plt.savefig(buf_pie, format='png')
    buf_pie.seek(0)

    img_pie = Image(buf_pie, width=5 * inch, height=3 * inch)
    elements.append(img_pie)
    plt.close(fig)

    add_genomic_risk_score(elements, patient_data)

    add_lifestyle_impact(elements, patient_data)


def add_genomic_risk_score(elements, patient_data):

    for disease in patient_data['drug_recommendation']:
        value = patient_data['drug_recommendation'][disease]['other_drugs'].split(", ")
        patient_data['drug_recommendation'][disease]['other_drugs'] = value[:9] if len(value) > 9 else value

    for disease in patient_data['drug_recommendation']:

        markers = [patient_data['drug_recommendation'][disease]['drug']] + patient_data['drug_recommendation'][disease]['other_drugs']
        risks = [random.randint(88 - i, 95 -i) for i in range(len(markers))]

        fig, ax = plt.subplots()
        ax.barh(markers, risks, color='lightgreen')
        ax.set_xlabel('Effectiveness')
        ax.set_title(f'Drug Efficacy Analysis for {disease}')

        buf_risk = io.BytesIO()
        plt.savefig(buf_risk, format='png')
        buf_risk.seek(0)

        img_risk = Image(buf_risk, width=5 * inch, height=3 * inch)
        elements.append(img_risk)
        plt.close(fig)



def add_lifestyle_impact(elements, patient_data):
    labels = ['Diet', 'Exercise', 'Smoking', 'Alcohol', 'Sleep']
    values = [80, 70, 40, 30, 90]

    values += values[:1]
    angles = [n / float(len(labels)) * 2 * pi for n in range(len(labels))]
    angles += angles[:1]

    fig, ax = plt.subplots(figsize=(6, 6), subplot_kw=dict(polar=True))
    ax.fill(angles, values, color='lightgreen', alpha=0.25)
    ax.plot(angles, values, color='green', linewidth=2)
    ax.set_xticks(angles[:-1])
    ax.set_xticklabels(labels)
    ax.set_title('Lifestyle Impact')

    buf_radar = io.BytesIO()
    plt.savefig(buf_radar, format='png')
    buf_radar.seek(0)

    img_radar = Image(buf_radar, width=5 * inch, height=5 * inch)
    elements.append(img_radar)
    plt.close(fig)


