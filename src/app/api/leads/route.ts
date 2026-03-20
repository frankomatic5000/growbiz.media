import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Lead intake endpoint for IntakePro skill
export async function POST(request: NextRequest) {
  try {
    const lead = await request.json();
    
    // Add metadata
    const leadRecord = {
      lead_id: `LEAD-${Date.now()}`,
      timestamp: new Date().toISOString(),
      ...lead,
      logged_at: new Date().toISOString(),
    };
    
    // Append to CRM file
    const crmPath = path.join(process.cwd(), "crm", "leads.jsonl");
    fs.appendFileSync(crmPath, JSON.stringify(leadRecord) + "\n");
    
    // Return success
    return NextResponse.json({
      success: true,
      lead_id: leadRecord.lead_id,
      message: "Lead captured successfully",
    });
    
  } catch (error) {
    console.error("Lead capture error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to capture lead" },
      { status: 500 }
    );
  }
}

// Get leads (for dashboard)
export async function GET() {
  try {
    const crmPath = path.join(process.cwd(), "crm", "leads.jsonl");
    
    if (!fs.existsSync(crmPath)) {
      return NextResponse.json({ leads: [] });
    }
    
    const data = fs.readFileSync(crmPath, "utf-8");
    const leads = data
      .split("\n")
      .filter((line) => line.trim())
      .map((line) => JSON.parse(line))
      .reverse(); // Newest first
    
    return NextResponse.json({ leads });
    
  } catch (error) {
    console.error("Lead fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}
