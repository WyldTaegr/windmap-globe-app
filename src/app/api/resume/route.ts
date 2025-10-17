import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET() {
  try {
    // Resolve the PDF path
    const filePath = path.resolve("./public/TigerTianResume.pdf");
    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=TigerTianResume.pdf",
      },
    });
  } catch (err) {
    console.error("Error serving resume PDF:", err);
    return new NextResponse(JSON.stringify({ error: "Failed to serve resume" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}