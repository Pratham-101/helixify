import os
import pandas as pd


folder_path = r'./DrugRaw'
new_folder_path = r'./DrugClean'

for root, dirs, files in os.walk(folder_path):
    for file in files:

        disease_name = file[:-4]
        file_path = os.path.join(root, file)
        drug_association = (pd.read_table(file_path))

        drug_association = drug_association[drug_association['Variant'].str.startswith('rs')]
        drug_association['diseaseName'] = disease_name
        drug_association = drug_association[['diseaseName', 'Variant', 'Association', 'P-Value', 'Drugs']]
        drug_association.columns = ['disease_name', 'rsid', 'association', 'p_value', 'drugs']
        drug_association = drug_association.drop_duplicates(subset=['disease_name', 'rsid'], keep='first')
        drug_association['p_value'] = drug_association['p_value'].apply(lambda x: x[2:] if type(x) == str else x)

        new_file_path = new_folder_path + f'./{file[:-4]}.csv'
        drug_association.to_csv(new_file_path, index=False)