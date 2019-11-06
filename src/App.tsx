import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { FileInput } from "@blueprintjs/core";
import axios from "axios";

const App: React.FC = () => {

  const [selectedPhoto, setSelectedPhoto] = useState('');

  const options = (name: string, type: string) => ({
    params: {
      Bucket: "tigrow-test",
      Key: name,
      ContentType: type,
      ACL: "public-read"
    },

    headers: {
      "Content-Type": type
    }
  });

  const onChange = async (e: any) => {
    const files = Array.from(e.target.files)
    // this.setState({ uploading: true })

    console.log(`e.target.files[0]: `, e.target.files[0])
    // console.log(`files: `, files)
    // setSelectedPhoto(e.target.files[0])

    let formData = new FormData()

    // files.forEach((f: any, i: any) => {
    //   formData.append(i, f);
    // })

    // console.log(`selectedPhoto`, selectedPhoto)

    formData.append('file', e.target.files[0]);

    console.log(`before api call`);
    await axios.get(
      `http://192.168.8.103:3500/generate-put-url`, 
      options(e.target.files[0].name, e.target.files[0].type)
    ).then(r => {
      console.log(`successfully api call`);
      console.log(`response: `, r);
    }).catch(error => {
      console.log(`error occured`);
      console.log(`error: `, error);
    })
    console.log(`after api call`);

    // fetch(`http://192.168.8.103:3500/generate-put-url`, options(e.target.files[0].name, e.target.files[0].type), {
    //   method: 'GET',
    //   body: formData
    // })
    //   .then(res => res.json())

    // console.log(`formData.entries(): `, formData.entries());
    // for (var pair of formData.entries() as any) {
    // }
    // console.log(`formData: `, formData);
  }

  return (
    <div className="App">
      <h2>File input</h2>
      <FileInput
        text="Choose file..."
        onInputChange={(e: any) => onChange(e)}
      />
    </div>
  );
}

export default App;
