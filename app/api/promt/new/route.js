import Promt from "@models/promt";
import { connectToDB } from "@utils/database";

export const POST = async (request, _) => {
  const { userId, promt, tag } = await request.json();

  try {
    await connectToDB();

    const newPromt = new Promt({
      creator: userId,
      promt,
      tag,
    });

    await newPromt.save();

    return new Response(JSON.stringify(newPromt), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new promt", { status: 500 });
  }
};
