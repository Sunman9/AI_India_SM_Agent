import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { brandName, category, cities } = body;

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 2500));

    const mockDistributors = [
      {
        id: "d1",
        name: "Apex Retail Solutions",
        company: "Apex India Pvt Ltd",
        contactEmail: "purchasing@apexretail.in",
        contactPhone: "+91 98765 43210",
        location: cities[0] || "Mumbai",
        category: category,
        relevanceScore: 94.5,
        status: "IDENTIFIED",
      },
      {
        id: "d2",
        name: "Global Trade Partners",
        company: "GTP Distribution",
        contactEmail: "hello@gtpdistributors.com",
        contactPhone: "+91 91234 56789",
        location: cities[1] || cities[0] || "Delhi",
        category: category,
        relevanceScore: 88.2,
        status: "IDENTIFIED",
      },
      {
        id: "d3",
        name: "Nexus Supply Co",
        company: "Nexus Brands India",
        contactEmail: "vendor@nexusindia.co.in",
        contactPhone: "+91 99887 76655",
        location: "Bengaluru",
        category: category,
        relevanceScore: 81.0,
        status: "IDENTIFIED",
      },
    ];

    return NextResponse.json({ distributors: mockDistributors });
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate distributors" }, { status: 500 });
  }
}
