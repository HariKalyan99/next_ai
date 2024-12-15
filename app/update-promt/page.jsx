"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const Updatepromt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promtId = searchParams?.get("id");

  const [post, setPost] = useState({ promt: "", tag: "" });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getpromtDetails = async () => {
      const response = await fetch(`/api/promt/${promtId}`);
      const data = await response.json();

      setPost({
        promt: data.promt,
        tag: data.tag,
      });
    };

    if (promtId) getpromtDetails();
  }, [promtId]);

  const updatepromt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!promtId) return alert("Missing promtId!");

    try {
      const response = await fetch(`/api/promt/${promtId}`, {
        method: "PATCH",
        body: JSON.stringify({
          promt: post.promt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <Form
        type="Edit"
        getPost={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatepromt}
      />
  );
};

export default Updatepromt;
