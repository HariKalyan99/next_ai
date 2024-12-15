"use client";

import { useRouter } from '@node_modules/next/navigation';
import Form from '@components/Form';
import { useSession } from '@node_modules/next-auth/react';
import {useState} from 'react'

const CreatePromt = () => {
    const router = useRouter();

    const {data: session} = useSession();

    const [submitting, setSubmitting] = useState(false);
    const [getPost, setPost] = useState({
        promt: '',
        tag: '',
    });


    const createPromt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await fetch('/api/promt/new', {
                method: "POST",
                body: JSON.stringify({
                    promt: getPost.promt,
                    userId: session?.user.id,
                    tag: getPost.tag
                })
            })

            if (response.ok) {
                router.push('/');
            }
        } catch (error) {
            console.log(error);

        }finally{
            setSubmitting(false);
        }
    }
  return (
    <Form type="Create" getPost={getPost} setPost={setPost} submitting={submitting} handleSubmit={createPromt}/>
  )
}

export default CreatePromt