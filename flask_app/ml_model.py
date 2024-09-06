import pandas as pd
from sklearn.model_selection import train_test_split
from xgboost import XGBClassifier
import pickle

# Provide the correct relative or absolute path to the dataset
dataset = pd.read_csv('flask_app/Dataset (1).csv')  # Adjust the path if needed

# The rest of the code remains the same...

# Separate features and target labels
X = dataset.iloc[:, :-4]  # First 1006 columns as features
y = dataset.iloc[:, -4:]  # Last 4 columns as target labels (diseases)

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train models for each disease
models = {}
for disease in y.columns:
    print(f"Training model for {disease}")
    xgb_model = XGBClassifier(use_label_encoder=False, eval_metric='logloss', random_state=42)
    xgb_model.fit(X_train, y_train[disease])
    models[disease] = xgb_model

# Save models to a pickle file
with open('disease_models.pkl', 'wb') as f:
    pickle.dump(models, f)

print("Models saved to 'disease_models.pkl'.")
