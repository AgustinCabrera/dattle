import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const animalTag = searchParams.get("animalTag");
    const diseaseName = searchParams.get("disease");

    if (animalTag) {
      {
        /*If searching by animal tag, get the animal and its diseases*/
      }
      const animal = await prisma.animal.findFirst({
        where: {
          tag: animalTag,
        },
        include: {
          events: {
            where: {
              // here i only fetch events with disease information
              type: "DISEASE",
              disease: {
                isNot: null,
              },
            },
            include: {
              disease: {
                select: {
                  id: true,
                  name: true,
                  observation: true,
                },
              },
            },
            orderBy: {
              date: "desc",
            },
          },
        },
      });

      {
        /*ensured that the API always returns an array of animals, even when searching by tag*/
      }
      if (!animal) {
        return NextResponse.json([], { status: 200 });
      }
      return NextResponse.json([animal]);
    } else {
      // If searching by disease name or viewing all
      const animals = await prisma.animal.findMany({
        where: diseaseName
          ? {
              events: {
                some: {
                  type: "DISEASE",
                  disease: {
                    name: {
                      contains: diseaseName,
                      mode: "insensitive",
                    },
                  },
                },
              },
            }
          : {
              events: {
                some: {
                  type: "DISEASE",
                  disease: {
                    isNot: null,
                  },
                },
              },
            },
        include: {
          events: {
            where: {
              type: "DISEASE",
              disease: {
                isNot: null,
              },
            },
            include: {
              disease: {
                select: {
                  id: true,
                  name: true,
                  observation: true,
                },
              },
            },
            orderBy: {
              date: "desc",
            },
          },
        },
        orderBy: {
          tag: "asc",
        },
      });

      return NextResponse.json(animals);
    }
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Failed to search diseases" },
      { status: 500 }
    );
  }
}

{
  /*
  filtering out events without disease information on the server-side, 
  i reduced the amount of data sent to the client and improve rendering performance 
  */
}
