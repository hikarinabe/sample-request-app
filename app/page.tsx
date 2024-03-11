"use client";
import React, { useState } from "react";

type ApiSetting = {
  endpointURL: string;
  text_json: string;
  request_option: string;
}

const Page: React.FC = () => {
  const [api, setApi] = useState<ApiSetting | null>({
    endpointURL: 'http://127.0.0.1:8001/',
    text_json: '{}',
    request_option: 'GET',
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
    const endpoint_url = api?.endpointURL !== undefined ? api?.endpointURL : 'http://127.0.0.1:8001/';
    console.log(endpoint_url, api?.request_option, api?.text_json)

    event.preventDefault();

    let requestOptions;
    if (api?.request_option == "POST" || api?.request_option == "DELETE") {
      requestOptions ={
        method: api?.request_option,
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(api?.text_json),
      };
    } else {
      requestOptions ={
        method: api?.request_option,
      };
    }
    
    console.log(requestOptions)
    try {
      const res = await fetch(endpoint_url, requestOptions);
      const data = await res.text();
      console.log(data);
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          endpoint:
          <input type="text" name="endpointURL" value={api?.endpointURL || ''} onChange={handleChange} />
        </label><br></br>
        <label>
          text_json:
          <input type="textarea" name="text_json" value={api?.text_json || ''} onChange={handleChange} />
        </label><br></br>
        <label>
        request_option (POST, GET, PUT, DELETE):
          <select value={api?.request_option || ''} onChange={handleSelectChange}>
            <option value="POST">POST</option>
            <option value="GET">GET</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </label><br></br>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Page;
