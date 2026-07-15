import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

const auth = new google.auth.GoogleAuth({
  credentials: {
    type: "service_account",
    project_id: process.env.GOOGLE_PROJECT_ID,
    private_key_id: process.env.GOOGLE_KEY_ID,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    client_id: process.env.GOOGLE_CLIENT_ID,
  } as any,
});

export async function POST(req: NextRequest) {
  const { answers, report } = await req.json();
  const sheets = google.sheets({ version: "v4", auth });

  const row = [
    new Date().toISOString(),
    answers["pa-1"] ?? "",
    answers["pa-2"] ?? "",
    answers["pa-6"] ?? "",
    answers["fbi-2"] ?? "",
    answers["dd-1"] ?? "",
    answers["dd-2"] ?? "",
    answers["rf-3"] ?? "",
    answers["rf-4"] ?? "",
    answers["rf-5"] ?? "",
    answers["bb-2"] ?? "",
    answers["mc-2"] ?? "",
    answers["cb-3"] ?? "",
    report?.mostDangerous?.answer ?? "",
  ];

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Sheet1!A1",
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [row] },
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}