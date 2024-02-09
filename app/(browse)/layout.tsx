import React, { Suspense } from 'react'
import { Navbar } from './_components/navbar'
import { Sidebar, SidebarSkeleton } from './_components/sidebar'
import { Container } from './_components/container'

const BrowserLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            <div className='pt-16 flex h-full'>
                <Suspense fallback={<SidebarSkeleton />}>
                    <Sidebar />
                </Suspense>
                <Container>
                    {children}
                </Container>
            </div>
        </>
    )
}

export default BrowserLayout