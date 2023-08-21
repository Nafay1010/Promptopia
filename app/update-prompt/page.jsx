"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Prompt_Form from "@components/Prompt_Form";

const UpdatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const promptID = searchParams.get("id");


  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(()=>{
    const getPromptDetails = async () =>{
        const response = await fetch(`/api/prompt/${promptID}`);
        const data = await response.json();
        setPost({
          prompt: data.prompt,
          tag: data.tag,
        });
    }
    if(promptID) getPromptDetails();

  }, [promptID])

  const handleUpdate = async (e) => {
    e.preventDefault()
    setSubmitting(true);
    if(!promptID) return alert('Prompt ID not found')

    try {
      const response = await fetch(`/api/prompt/${promptID}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        })
      })
      if(response.ok){
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Prompt_Form
      type="Edit"
      post={post}
      setPost={setPost}
      handleCreate={handleUpdate}
      submitting={submitting}
    />
  );
};

export default UpdatePrompt;
