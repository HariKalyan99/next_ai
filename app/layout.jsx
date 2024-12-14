import React from 'react'
import '@styles/global.css';
import Nav from '@components/Nav';


export const metadata = {
    title: "Tron's AI",
    description: "Integrating Tron's AI into your Next.js app opens the door to countless possibilities. From image and video analysis to real-time chatbots, Tron's AI allows you to rapidly build intelligent and interactive features that enhance user engagement and improve overall app performance."
}

const RootLayout = ({children}) => {
  return (
    <html lang='en'>
        <body>
            
            <div className="main">
                <div className="gradient"/>
            </div>

            <main className="app">
                <Nav />
                {children}
            </main>
        </body>
    </html>
  )
}

export default RootLayout