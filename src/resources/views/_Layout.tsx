import { ReactNode } from "react";

type LayoutProps = {
    sidebarContent: ReactNode | string;
    mainContent?: ReactNode;
    footerContent?: ReactNode;
}

const _Layout = ({ sidebarContent, mainContent, footerContent }: LayoutProps) => {
    return (
        <div className="flex">
            <div className="flex flex-col min-h-screen w-1/5">
                {sidebarContent}
            </div>
            <div className="flex flex-col items-center min-h-screen w-4/5">
                <div className="mt-20">
                    {mainContent}
                </div>
            </div>
            {footerContent}
        </div>
    )
}

export default _Layout