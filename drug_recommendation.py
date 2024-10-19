

def get_drug_efficacy(features, disease_insights):
    
    drug_efficacy = {}

    if all(value == 0 for value in disease_insights.values()):
        drug_efficacy = {}

    else:
        relevant_diseases = [disease for disease, has_disease in disease_insights.items() if has_disease == 1]
        features = features[features['disease_name'].isin(relevant_diseases)].copy() 

        features['genotype'] = features['allele1'] + features['allele2']

        features['weight'] = features.apply(lambda row: 1 if row['genotype'] in row['positive_response'] else (-1 if row['genotype'] in row['negative_response'] else 0), axis=1)
        efficacy_grouped = features.groupby(['disease_name', 'drug'])['weight'].sum().reset_index()

        for disease, drug_group in efficacy_grouped.groupby('disease_name'):
            drug_efficacy[disease] = dict(zip(drug_group['drug'], drug_group['weight']))
            drug_efficacy[disease] = sorted(drug_efficacy[disease], key=drug_efficacy[disease].get, reverse=True)

    return drug_efficacy