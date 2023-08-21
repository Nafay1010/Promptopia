import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Form from "@components/Form";

export default async () => {
  const session = await getServerSession(authOptions);
    if (!session) {
    return redirect("/SignIn");
  }

  return (
    <section>
      <h1 className="text-center blue_gradient head_text">Additional Information</h1>
      <Form />
    </section>
  );
};
