"use client";

import { useRouter } from 'next/navigation';
import React from "react";

const Page: React.FC = () => {
    const router = useRouter()

    return (
        <main className="container mx-auto">
            <div>
                <ul className="flex border-b">
                    <li className="-mb-px mr-1">
                        <a className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold" onClick={() => router.push('/')}>Page1</a>
                    </li>
                    <li className="mr-1">
                        <a className="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold" href="#">Page2</a>

                    </li>

                </ul>
            </div>
            <div>
                This page is page2 
                Add message for test
            </div>
        </main>
    )
}
export default Page;