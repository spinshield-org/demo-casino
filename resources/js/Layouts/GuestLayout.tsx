import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-theme-900 flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
            <div>
            </div>
            <div className="w-full bg-theme-800 sm:max-w-md mt-6 px-6 py-4 shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
