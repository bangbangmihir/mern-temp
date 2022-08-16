import { axiosInstance } from "../../../config"
import React, { useState, useEffect } from 'react';

const ServiceClient = () => {
    const [service, setservice] = useState()

    useEffect(() => {
        getservice();
    }, [])

    const getservice = async () => {
        try {
            const { data } = await axiosInstance.get("/api/service");
            setservice(data)
            console.log("Service", data)
        } catch (error) {
            alert(error.response.data)
        }
    }
    return (
        <>
            <div className="row mt-5">




                {
                    service && service.map((s) => (
                        <>
                            <div class="card mt-5" style={{ width: "19rem" }}>
                                <img src={`http://localhost:7000/images/service/${s.ServiceImage}`} class="card-img-top" alt="..." />
                                <div class="card-body">
                                    <div className="d-flex justify-content-between">
                                        <h5 class="card-title">{s?.ServiceName}</h5>
                                        <h5 class="card-title">{s?.serviceType[0]?.categoryName}</h5>
                                    </div>
                                    <p class="card-text">{s?.ServiceDescription
                                    }.</p>
                                    <a href="#" class="btn btn-primary">product details</a>
                                </div>
                            </div>
                        </>
                    ))
                }
            </div>


        </>
    )
}

export default ServiceClient