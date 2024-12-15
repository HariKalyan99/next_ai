import Promt from "@models/promt";
import { connectToDB } from "@utils/database";

export const GET = async(request) => {
    try {
        await connectToDB();

        const promts = await Promt.find({}).populate('creator');

        return new Response(JSON.stringify(promts), {status: 200});
    } catch (error) {
        return new Response("Failed to fetch a promts", {status: 500})
    }
}