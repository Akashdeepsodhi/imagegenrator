import React, { useRef, useState } from 'react'
import './ImageGenrator.css'
import default_image from '../Assets/default_image.svg'
export const ImageGenrator = () => {
    const [Image_url,setImage_url]=useState("/");
    let inputRef=useRef(null);

    const imageGenerator=async()=>{
        if(inputRef.current.value===""){
            return 0;
        }
        const response=await fetch(
            "https://api.openai.com/v1/images/generations",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    Authorization:
                    "Bearer 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",
                    "User-Agent":"Chrome",
                },
                body:JSON.stringify({
                    prompt:`${inputRef.current.value}`,
                    n:1,
                    size:"512x512",
                }),

            }
        );
        let data=await response.json();
        let data_array=data.data;
        setImage_url(data_array[0].url);
    }



  return (
    <div className="ai-image-genrator">
        <div className="header">Ai image <span>genrator</span></div>
        <div className="img-loading">
            <div className="image"><img src={Image_url==="/"?default_image:Image_url} alt=""/></div>
        </div>
        <div className="search-box">
            <input type="text" ref={inputRef} className='search-input' placeholder='Describe your image'/>
            <div className="genrate-btn" onClick={()=>{imageGenerator()}}>Genrate</div>
        </div>
    </div>
    
  )
}

export default ImageGenrator
