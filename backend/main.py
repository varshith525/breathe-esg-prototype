from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

app = FastAPI()

# CORS FIX
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Store uploaded records
records = []

# Home route
@app.get("/")
def home():
    return {"message": "Breathe ESG Backend Running"}

# Upload CSV route
@app.post("/upload")
async def upload_csv(file: UploadFile = File(...)):
    df = pd.read_csv(file.file)

    uploaded_records = df.to_dict(orient="records")

    for row in uploaded_records:

        # Add review status
        row["status"] = "Pending"

        # Handle realistic SAP quantity fields
        quantity = float(
            row.get("Quantity")
            or row.get("Menge")
            or 0
        )

        # CO2 calculation
        row["co2e"] = round(quantity * 2.68, 2)

        # Suspicious flag detection
        if quantity < 0:
            row["flag"] = "Suspicious"
        else:
            row["flag"] = "Normal"

        # Save record
        records.append(row)

    return {
        "message": "File uploaded successfully",
        "records_uploaded": len(uploaded_records)
    }

# Get all records
@app.get("/records")
def get_records():
    return records