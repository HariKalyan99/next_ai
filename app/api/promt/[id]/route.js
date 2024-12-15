import Promt from "@models/promt";
import { connectToDB } from "@utils/database";

export const GET = async(request, {params}) => {
    try {
        await connectToDB();

        const promt = await Promt.findById(params.id).populate('creator');
        if(!promt){
            return new Response("Promt not found", {status: 404})
        }

        return new Response(JSON.stringify(promt), {status: 200});
    } catch (error) {
        return new Response("Failed to fetch a promts", {status: 500})
    }
}

export const PATCH = async (request, { params }) => {
    const { promt, tag } = await request.json();

    try {
        await connectToDB();

        const existingpromt = await Promt.findById(params.id);

        if (!existingpromt) {
            return new Response("promt not found", { status: 404 });
        }
        existingpromt.promt = promt;
        existingpromt.tag = tag;
        await existingpromt.save();

        return new Response("Successfully updated the promts", { status: 200 });
    } catch (error) {
        return new Response("Error Updating promt", { status: 500 });
    }
};

export const DELETE = async (_, { params }) => {
    try {
        await connectToDB();

        await Promt.findByIdAndDelete(params?.id);

        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting promt", { status: 500 });
    }
};