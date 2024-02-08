import React from 'react'
import { Navbar } from '../_components/navbar'

const BrowserLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            <div className='pt-20 flex h-full'>
                {children}
            </div>
        </>
    )
}

export default BrowserLayout