'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

const ErrorPage = () => {
    return (
        <div className='h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground'>
            <h1 className='text-xl font-bold'>Something went wrong</h1>
            <Button variant="secondary" asChild><Link href="/">Go back home</Link></Button>
        </div>
    )
}

export default ErrorPage;