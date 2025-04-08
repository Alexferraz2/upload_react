"use client"

import axios from "axios"
import { ChangeEvent, useState } from "react"

export const Form = () => {
    const [selectedFile, setSelectedFile] = useState<File>()
    const [legendField, setLegendField] = useState('')
    const [progressUpload, setProgressUpload] = useState(0)

    const HandleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0])
        }
        
        

    }

    const HandleSubmit = async () => {
        if(selectedFile) {
            const formData = new FormData()
            formData.append('file', selectedFile)
            formData.append('legend', legendField)

            const url = 'https://b7web.com.br/uploadtest/'

            const reqi = await axios.post(url, formData, {
                onUploadProgress: (progressEvent) => {
                    if(progressEvent.total) {
                        const pct = Math.floor((progressEvent.loaded / progressEvent.total ) * 100)
                        setProgressUpload(pct)
                        console.log(pct)
                    }
                } 
            });
                     

            console.log(reqi.data)
        }
    }


    return(
        <div>
            <input 
                type="file" 
                className="block my-3"
                onChange={HandleFileChange}
            />

            <input
                className="block my-3"
                value={legendField}
                onChange={e => setLegendField(e.target.value)}
            />

            <button 
                className=" block my-3 border bg-blue-500 hover:bg-blue-800 cursor-pointer p-1 rounded-md"
                onClick={HandleSubmit}
                >
                    Enviar
            </button>
            <div className="w-[500px] h-5 bg-green-200">

                <div className="h-5 bg-green-500" style={{width: progressUpload+'%'}}>               

                </div>
            </div>
            <div>
                {progressUpload}%
                
            </div>
        </div>
    )
}