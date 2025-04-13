
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class InputData(BaseModel):
    url: str
    tone: str
    niche: str

@app.post("/analyze")
async def analyze(data: InputData):
    return {
        "brand_summary": f"Analyzed {data.url} with tone '{data.tone}' in niche '{data.niche}'",
        "content_calendar": [
            {"day": i+1, "post": f"Post idea {i+1} for {data.niche}"} for i in range(30)
        ]
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
