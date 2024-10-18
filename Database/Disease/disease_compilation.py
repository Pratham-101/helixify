import os
import pandas as pd


folder_path = r'./DiseaseClean'
disease_association = pd.DataFrame()

for root, dirs, files in os.walk(folder_path):
    for file in files:
        
        file_path = os.path.join(root, file)
        individual_disease = pd.read_csv(file_path)
        disease_association = pd.concat([disease_association, individual_disease], axis=0, ignore_index=True)

disease_association.insert(0, 'association_id', range(1, len(disease_association) + 1))

output_file = r'./DiseaseAssociation.csv'
disease_association.to_csv(output_file, index=False)