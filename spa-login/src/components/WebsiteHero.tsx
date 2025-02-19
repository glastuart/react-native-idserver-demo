import React from "react";
import { WealthProLogo } from "./WealthProLogo";

export type WebsiteHeroProps = {
    children?: React.ReactNode | null | undefined
};

export const WebsiteHero = ({ children } : Readonly<WebsiteHeroProps>) : React.ReactNode => (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-600 via-indigo-700 to-blue-900 text-white">
        <header className="p-5 flex flex-nowrap items-center sticky w-full">
            <div>
                <WealthProLogo className="w-24" />
            </div>
        </header>
        <section className="flex-1 flex flex-col items-center xl:justify-center xl:-mt-6">
            {children}
        </section>
    </div>
);