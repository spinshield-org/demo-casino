import { SVGAttributes } from 'react';

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg"
            {...props}
            viewBox="0 0 24 24"
            fill="none"
            className="mx-auto h-6 mt-1 duration-200 ease opacity-60 hover:opacity-100"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round" 
            id="casino-logo"
            >
                <path d="M14 12C14 9.79086 12.2091 8 10 8C7.79086 8 6 9.79086 6 12C6 16.4183 9.58172 20 14 20C18.4183 20 22 16.4183 22 12C22 8.446 20.455 5.25285 18 3.05557" stroke="#fff"/>
                <path d="M10 12C10 14.2091 11.7909 16 14 16C16.2091 16 18 14.2091 18 12C18 7.58172 14.4183 4 10 4C5.58172 4 2 7.58172 2 12C2 15.5841 3.57127 18.8012 6.06253 21" stroke="#F56565"/>
        </svg>
    );
}
