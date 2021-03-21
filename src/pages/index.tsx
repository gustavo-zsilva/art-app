import { useEffect } from 'react';

import { useRouter } from 'next/router';

export default function Index() {
    const router = useRouter();

    useEffect(() => {
        router.push('/gallery')
    }, []);

    return (
        <div>
            Main Page
        </div>
    );
}