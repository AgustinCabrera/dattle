import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";


export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }
    
    const searchParams = request.nextUrl.searchParams;

    const animalTag = searchParams.get("animalTag");
    const diseaseName = searchParams.get("disease");

    let whereClause = {};

    if (animalTag) {
      whereClause = {
        event: {
          animal: {
            tag: animalTag,
          },
        },
      };
    } else if (diseaseName) {
      whereClause = {
        name: diseaseName,
      };
    }

    const diseases = await prisma.disease.findMany({
      where: {
        animal: {
          ownerId: session.user.id,
        },
      },
      include: {
        event: true,
        animal: true,
      },
    });

    if (!diseases) {
      return new NextResponse(JSON.stringify({ error: "Diseases not found" }), {
        status: 404,
      });
    }

  return new NextResponse(JSON.stringify(diseases), { status: 200 });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Failed to search diseases" },
      { status: 500 }
    );
  }
}
