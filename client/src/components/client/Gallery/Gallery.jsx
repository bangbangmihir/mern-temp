import React,{useState,useEffect} from 'react';
import { axiosInstance } from '../../../config';


const Gallery = () => {
  const [gallery, setgallery] = useState()


  useEffect(() => {
    getgallery();
  }, [])

  const getgallery = async() =>{
    try {
      const {data} = await axiosInstance.get("/api/gallery/")
      console.log(data)
      setgallery(data)
    } catch (error) {
      console.log(error)
    }
  }

 

  return (
    <>
      <div className="row gx-0">
        {
          gallery && gallery.map((img)=>{
            return(
              <>
              <img src={`http://localhost:7000/images/gallery/${img.Image}`} alt={`${img.Image}`} class="img-thumbnail m-2" style={{height:"400px",width:"400px"}}></img>
              </>
            )
          })
        }
      </div>
    
    </>
    
  )
}

export default Gallery