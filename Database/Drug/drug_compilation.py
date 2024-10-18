import os
import pandas as pd


folder_path = r'./DrugClean'
drug_association = pd.DataFrame()

for root, dirs, files in os.walk(folder_path):
    for file in files:
        
        file_path = os.path.join(root, file)
        individual_drug = pd.read_csv(file_path)
        drug_association = pd.concat([drug_association, individual_drug], axis=0, ignore_index=True)

drug_association.insert(0, 'association_id', range(1, len(drug_association) + 1))

output_file = r'./DrugAssociation.csv'
drug_association.to_csv(output_file, index=False)