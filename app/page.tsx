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

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    const endpoint_url = api?.endpointURL !== undefined ? api?.endpointURL : 'http://127.0.0.1:8001/';
    console.log(endpoint_url, api?.request_option, api?.text_json)

    event.preventDefault();
    try {
      const res = await fetch(endpoint_url, { mode: 'cors' });
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
          <input type="text" name="request_option" value={api?.request_option || ''} onChange={handleChange} />
        </label><br></br>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Page;
