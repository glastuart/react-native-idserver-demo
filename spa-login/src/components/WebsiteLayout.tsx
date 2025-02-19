import React from "react";
import { Outlet } from "react-router";
import { Card } from "./Card";
import { CompanyLogo } from "./CompanyLogo";
import { WebsiteHero } from "./WebsiteHero";

export const WebsiteLayout = () : React.ReactNode => (
    <WebsiteHero>
        <Card className="bg-white text-black p-4 max-w-xl">
            <div className="flex flex-col justify-center items-center p-3">
                <CompanyLogo />
            </div>
            <Outlet />
        </Card>
    </WebsiteHero>
);