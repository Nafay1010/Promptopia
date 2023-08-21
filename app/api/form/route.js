import { connectToDatabase } from "@utils/database";
import { getServerSession } from "next-auth/next";
import User from "@models/user.js";

export async function POST(req) {
  try {
    const data = await req.json();
    const { GPA, department } = data;
    const session = await getServerSession({ req });

    console.log("Received data:", data);
    console.log("Parsed GPA:", GPA);
    console.log("Received department:", department);
    console.log("User email:", session.user.email);

    try {
      await connectToDatabase();
      const userExists = await User.findOne({ email: session.user.email });

      if (!userExists) {
        return new Response("User does not exist!");
      } else {
        await User.updateOne(
          { email: session.user.email },
          { $set: { gpa: parseFloat(GPA), department } }
        );
        return new Response("Success!");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      return new Response("Error updating user.", 500);
    }
  } catch (error) {
    console.error("Error parsing JSON data:", error);
    return new Response("Error processing form data.", 400);
  }
}
