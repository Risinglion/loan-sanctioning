import sys
import pyarrow.parquet as pq
import xgboost as xgboost
import pandas as pd
from sklearn.preprocessing import StandardScaler
import joblib

model = joblib.load('models/model.pkl')
scaler = joblib.load('models/loan_sanctioning_XG_Boost_scaler.pkl')

def predict_loan_sanctioning(data):
    df = pd.DataFrame(data, index=[0])
    df.columns = df.columns.str.strip()
    df.columns = ' ' + df.columns
    df = scaler.transform(df)
    prediction = model.predict(df)
    return prediction

if __name__ == '__main__':
    data = {
        'no_of_dependents': sys.argv[1],
        'education': sys.argv[2],
        'self_employed': sys.argv[3],
        'income_annum': sys.argv[4],
        'loan_amount': sys.argv[5],
        'loan_term': sys.argv[6],
        'cibil_score': sys.argv[7],
        'residential_assets_value': sys.argv[8],
        'commercial_assets_value': sys.argv[9],
        'luxury_assets_value': sys.argv[10],
        'bank_asset_value': sys.argv[11]
    }

    # TEST input
    # data = {
    #     'no_of_dependents': 2,
    #     'education': 1,
    #     'self_employed': 0,
    #     'income_annum': 100000,
    #     'loan_amount': 100000,
    #     'loan_term': 360,
    #     'cibil_score': 800,
    #     'residential_assets_value': 100000,
    #     'commercial_assets_value': 100000,
    #     'luxury_assets_value': 100000,
    #     'bank_asset_value': 100000
    # }
    prediction = predict_loan_sanctioning(data)
    print(prediction)