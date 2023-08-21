import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";

//GET ROUTE
export const GET = async (req, { params }) => {
  try {
    await connectToDatabase();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return new Response("Prompt not found", { status: 404 });
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to get prompts", { status: 500 });
  }
};
//UPDATE ROUTE
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDatabase();
    const updatePrompt = await Prompt.findByIdAndUpdate(params.id, { prompt, tag }, { new: true })
    if(!updatePrompt) return new Response("Prompt not found", { status: 404 })
    await updatePrompt.save();

    return new Response(JSON.stringify(updatePrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 });
  }
};
//DELETE ROUTE
export const DELETE = async (req, { params }) => {
  try {
    await connectToDatabase();
    const deletePrompt = await Prompt.findByIdAndDelete(params.id);
    if (!deletePrompt) return new Response("Prompt not found", { status: 404 });
    return new Response(JSON.stringify(deletePrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to delete prompt", { status: 500 });
  }
};
