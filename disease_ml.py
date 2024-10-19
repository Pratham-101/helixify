import matplotlib
matplotlib.use('Agg')

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import pickle
import shap
from sklearn.metrics import classification_report, accuracy_score
from sklearn.model_selection import train_test_split
from xgboost import XGBClassifier


def model_train():

    dataset = pd.read_csv(r'./Database/Dataset.csv')

    x = dataset.iloc[:, :-10]  
    y = dataset.iloc[:, -10:] 

    x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=42)

    models = {}
    y_pred = pd.DataFrame(index=y_test.index, columns=y_test.columns)

    individual_accuracies = {}
    for disease in y.columns:
        
        xgb_model = XGBClassifier(eval_metric='logloss', random_state=42)
        xgb_model.fit(x_train, y_train[disease])
        
        models[disease] = xgb_model
        
        y_pred[disease] = xgb_model.predict(x_test)

        accuracy = accuracy_score(y_test[disease], y_pred[disease])
        individual_accuracies[disease] = accuracy

        print(f"\nClassification Report for {disease}:")
        print(classification_report(y_test[disease], y_pred[disease], zero_division=0))

    overall_accuracy = np.mean(list(individual_accuracies.values()))

    print(f"\nOverall Accuracy across all diseases: {overall_accuracy:.4f}")

    print("\nIndividual Disease Accuracies:")
    for disease, accuracy in individual_accuracies.items():
        print(f"{disease}: {accuracy:.4f}")

    with open('disease_models.pkl', 'wb') as file:
        pickle.dump(models, file)


def model_output(features):

    with open('disease_models.pkl', 'rb') as file:
        models = pickle.load(file)

    predictions = {}
    for disease, model in models.items():

        predictions[disease] = model.predict(features.to_numpy())[0]

    return predictions
