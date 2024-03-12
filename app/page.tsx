"use client";

import { useRouter } from 'next/navigation';
import React, { useState } from "react";

type ApiSetting = {
    endpointURL: string;
    text_json: string;
    request_option: string;
}

type Response = {
    response: string;
}

const Page: React.FC = () => {
    const router = useRouter()
    const [api, setApi] = useState<ApiSetting | null>({
        endpointURL: 'http://127.0.0.1:8001/',
        text_json: '{}',
        request_option: 'GET',
    });
    const [resp, setResp] = useState<Response | null>({
        response: "empty",
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setApi((prevApi) => ({
            ...prevApi!,
            [event.target.name]: event.target.value,
        }));
    }

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        setApi((prevApi) => ({
            ...prevApi!,
            [event.target.name]: event.target.value,
        }));
    }

    const handleSubmit = async (event: React.FormEvent): Promise<void> => {
        const endpoint_url = api?.endpointURL !== undefined ? api?.endpointURL : '';
        console.log(endpoint_url, api?.request_option, api?.text_json)

        event.preventDefault();

        let requestOptions;
        if (api?.request_option == "POST" || api?.request_option == "DELETE") {
            requestOptions = {
                method: api?.request_option,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(api?.text_json),
            };
        } else {
            requestOptions = {
                method: api?.request_option,
            };
        }

        console.log(requestOptions)
        try {
            const res = await fetch(endpoint_url, requestOptions);
            const data = await res.text();
            setResp((prevApi) => ({
                ...prevApi!,
                response: data
            }));
            console.log(data);
        } catch (err) {
            alert(err);
        }
    }

    return (
        <main className="container mx-auto">
            <div>
                <ul className="flex border-b">
                    <li className="-mb-px mr-1">
                        <a className="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold" href="#">Page1</a>
                    </li>
                    <li className="mr-1">
                        <a className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold" onClick={() => router.push('/second')}>Page2</a>
                    </li>

                </ul>
            </div>
            <div className="w-full max-w-3xl">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            endpoint
                        </label>
                        <input type="text" name="endpointURL" value={api?.endpointURL || ''} onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            text_json:
                        </label>
                        <input type="textarea" name="text_json" value={api?.text_json || ''} onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            request_option (POST, GET, PUT, DELETE):
                        </label>

                        <select value={api?.request_option || 'GET'} onChange={handleSelectChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option value="GET">GET</option>
                            <option value="POST">POST</option>
                            <option value="PUT">PUT</option>
                            <option value="DELETE">DELETE</option>
                        </select>
                    </div>

                    <input type="submit" value="Submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" />
                </form>
            </div>
            <div>
                <label className="block text-gray-700 text-sm font-bold text-xl">Response</label>
                {resp?.response}
            </div>
        </main>
    );
}

export default Page;
