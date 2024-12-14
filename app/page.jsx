import Feed from '@components/Feed'
import React from 'react'

const Home = () => {
  return (
    <section className='w-full flex-center flex-col'>
        <h1 className='head_text text-center'>
            Discover & Share
            <br className="max-md:hidden" />
            <span className="orange_gradient">
                AI-Powered Integrations
            </span>
        </h1>

        <p className="desc text-center">
        The capability of a machine or software to simulate human-like intelligence processes. These processes include learning, reasoning, problem-solving, perception, and understanding language
        </p>

        <Feed />
    </section>
  )
}

export default Home