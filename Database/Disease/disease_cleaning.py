import numpy as np
import os
import pandas as pd


folder_path = r'./DiseaseRaw'
new_folder_path = r'./DiseaseClean'

valid_alleles = ['A', 'T', 'G', 'C']

for root, dirs, files in os.walk(folder_path):
    for file in files:

        disease_name = file[:-4]
        file_path = os.path.join(root, file)
        disease_association = (pd.read_table(file_path))

        disease_association = disease_association[~disease_association['riskAllele'].str.contains(r'\?', regex=True)]
        disease_association[['rsid', 'riskAllele']] = disease_association['riskAllele'].str.split('-', n=1, expand=True)
        disease_association = disease_association[disease_association['rsid'].str.startswith('rs')]
        disease_association['diseaseName'] = disease_name
        disease_association = disease_association[['diseaseName', 'rsid', 'riskAllele', 'pValue', 'orValue']]
        disease_association.columns = ['disease_name', 'rsid', 'risk_allele', 'p_value', 'odds_ratio']
        disease_association = disease_association.drop_duplicates(subset=['disease_name', 'rsid'], keep='first')
        disease_association['odds_ratio'] = disease_association['odds_ratio'].replace('-', 0.0)
        disease_association['odds_ratio'] = disease_association['odds_ratio'].str.extract(r'(\d+\.?\d*)')
        disease_association = disease_association[disease_association['risk_allele'].isin(valid_alleles)]

        new_file_path = new_folder_path + f'/{file[:-4]}.csv'
        disease_association.to_csv(new_file_path, index=False)