// app/api/analyze/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const endpoint = process.env.AZURE_ENDPOINT;
    const key = process.env.AZURE_API_KEY;

    // Send file to Azure Document Intelligence
    const uploadResponse = await fetch(
      `${endpoint}/formrecognizer/documentModels/prebuilt-document:analyze?api-version=2023-07-31`,
      {
        method: "POST",
        headers: {
          "Content-Type": file.type,
          "Ocp-Apim-Subscription-Key": key,
        },
        body: buffer,
      }
    );

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      return NextResponse.json(
        { error: "Upload failed", detail: errorText },
        { status: 500 }
      );
    }

    const operationLocation = uploadResponse.headers.get("operation-location");

    // Polling for result
    let result = null;
    let attempts = 0;

    while (attempts < 10) {
      const pollRes = await fetch(operationLocation, {
        method: "GET",
        headers: {
          "Ocp-Apim-Subscription-Key": key,
        },
      });

      const json = await pollRes.json();

      if (json.status === "succeeded") {
        result = json;
        break;
      } else if (json.status === "failed") {
        return NextResponse.json({ error: "Analysis failed" }, { status: 500 });
      }

      await new Promise((res) => setTimeout(res, 2000)); // Wait 2 seconds
      attempts++;
    }

    if (!result) {
      return NextResponse.json(
        { error: "Timeout waiting for result" },
        { status: 504 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Server error", detail: error.message },
      { status: 500 }
    );
  }
}
