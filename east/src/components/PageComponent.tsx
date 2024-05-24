import React, { ReactNode } from "react"

interface PageComponentProps {
    title: string;
    button?: string;
    children?: ReactNode;
}

const PageComponent: React.FC<PageComponentProps> =({ title, button, children }) => {
    return (
        <>
           <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">{title}</h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    {children}
                
                </div>
            </main>
        </>
    )
}

export default PageComponent