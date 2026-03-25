import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { brandDescription, distributorName } = body;

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const emailContent = `Subject: Strategic Partnership Inquiry: Distribution for ${distributorName || "your company"}

Hi Team at ${distributorName},

I am reaching out from our global brand team. We have been tracking your success in the distribution space and are incredibly impressed by your market penetration in key metro areas.

We are currently expanding our footprint in India and based on your portfolio, we believe there is a strong synergistic opportunity. 

${brandDescription ? `A bit about us: ${brandDescription}` : "Our products have seen a 300% YoY growth in similar emerging markets."}

I would love to schedule a brief 10-minute introductory call to explore if we might be a fit for your upcoming quarter's brand acquisitions.

Best regards,
Global Expansion Team
`;

    const linkedInContent = `Hi there, I've been following your work at ${distributorName} and was impressed by your recent retail expansion. We're a global brand looking for premium distribution partners in India. Let's connect and see if there's a mutual fit!`;

    return NextResponse.json({ email: emailContent, linkedin: linkedInContent });
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate outreach content" }, { status: 500 });
  }
}
