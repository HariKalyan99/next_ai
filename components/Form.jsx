import Link from '@node_modules/next/link'
import React from 'react'

const Form = ({type,
  getPost,
  setPost,
  submitting,
  handleSubmit}) => {
  return (

    <section className='w-full flex max-w-full flex-start flex-col'>
      <h1 className="head_text text-left">
        <span className="blue_gradient">
          {type} Post
        </span>
      </h1>

      <p className="desc text-left mex-w-md">
        {type} and share amazing promts with the world, and let your imagination run wild with any AI-powered platform
      </p>

      <form onSubmit={handleSubmit} className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'>
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>Your AI promt</span>
          <textarea value={getPost.promt} onChange={(e) => setPost({...getPost, promt: e.target.value})} placeholder='Write your promt here...' required className='form_textarea'/>
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>Tag</span>
          <span>(#product, #webdev, #idea)</span>
          <input value={getPost.tag} onChange={(e) => setPost({...getPost, tag: e.target.value})} placeholder='#tag' required className='form_input'/>
        </label>

      <div className='flex flex-end mx-3 mb-5 gap-4'>
        <Link href={"/"} className='text-gray-500 text-sm'>
        Cancel
        </Link>

      <button type='submit' disabled={submitting} className='px-5 py-1.5 text-sm bg-[black] rounded-full text-white hover:bg-[white] hover:text-black'>
        {submitting ? `${type}ing...` : type}
      </button>
      </div>

      </form>
    </section>
    // <Link>Form</Link>
  )
}

export default Form