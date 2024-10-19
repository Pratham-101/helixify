import pandas as pd


def get_lifestyle_changes(disease_insights):

    if all(value == 0 for value in disease_insights.values()):
        lifestyle_recommendations = {}

    else:
        lifestyle_association = pd.read_csv(r'./Database/LifestyleAssociation.csv', index_col='disease_name')
        lifestyle_recommendations = lifestyle_association['lifestyle_changes'].str.split(', ').to_dict()

    return {
        disease: lifestyle_recommendations[disease]
        for disease, has_disease in disease_insights.items()
        if has_disease == 1 and disease in lifestyle_recommendations
    }