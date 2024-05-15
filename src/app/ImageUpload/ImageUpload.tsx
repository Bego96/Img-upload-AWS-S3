'use client'
import { useState } from "react";
export default function ImageUpload() {
    const [file, setFile] = useState<File>();

    const handleUpload = async (file: any) => {
        console.log(file)
        const formData = new FormData();
        formData.append('file', file);
        const upload = await fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: formData
        });
        return upload;
    }

    function handleChange(e) {
        console.log(e.target.files);
        if (e.target.files) {
            setFile(URL.createObjectURL(e.target.files[0]));
            console.log(file)
            if (e.target.files[0].size < 3000000) {
                const uploadHandler = handleUpload(e.target.files[0]);
            }
        }
    }
 
    return (
        <div className="App">
            <h2>Add Image:</h2>
            <input type="file" onChange={handleChange} />
            <img src={file} />
        </div>
    );
}
