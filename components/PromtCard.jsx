"use client"

import { useSession } from '@node_modules/next-auth/react'
import Image from '@node_modules/next/image'
import { usePathname, useRouter } from '@node_modules/next/navigation'
import React, { useState } from 'react'

const PromtCard = ({post, handleTagClick, handleEdit, handleDelete}) => {
  const {data: session} = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const [copied, steCopied] = useState("");

  const handleCopy = () => {
    steCopied(post.promt);
    navigator.clipboard.writeText(post.promt);
    setTimeout(() => steCopied("", 3000))
  }
  const handleProfileClick = () => {
    if (post.creator._id === session?.user.id) return router.push("/profile");
    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };
  return (
    <div className='promt_card'>
      <div className="flex justify-between items-start gap-5">
        <div className='flex flex-1 justify-start items-center gap-3 cursor-pointer' onClick={handleProfileClick}>
          <Image src={post.creator.image} alt='profile_img' width={40} height={40} className='rounded-full object-contain'/>

          <div className="flex flex-col">
            <h3 className='font-satoshi font-semibold text-gray-900'>{post.creator.username}</h3>
            <p>{post.creator.email}</p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image src={copied === post.promt ? "/assets/icons/tick.svg" : "/assets/icons/copy.svg"} alt='copy_btn' width={12} height={12}/>
        </div>
      </div>

      <p className='my-4 font-satoshi text-sm text-gray-700'>
        {post.promt}
      </p>

      <p className='font-inter text-sm blue_gradient cursor-pointer' onClick={() => handleTagClick && handleTagClick(post.tag.split("#").join(""))}>{post.tag}</p>

      {session?.user.id === post.creator._id && pathName === '/profile' && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p className="font-inter text-sm green_gradient cursor-pointer" onClick={handleEdit}>
          Edit
          </p>

          <p className="font-inter text-sm text-[red] cursor-pointer" onClick={handleDelete}>
          Delete
          </p>
        </div>
      )}
    </div>
  )
}

export default PromtCard