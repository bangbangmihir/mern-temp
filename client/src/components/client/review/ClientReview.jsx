import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../../config';
import "./review.css"

const ClientReview = () => {
    const [review, setreview] = useState()


    useEffect(() => {
        getreview()
    }, [])

    const getreview = async () => {
        try {
            const { data } = await axiosInstance.get("/api/review")
            console.log("review", data)
            setreview(data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <section id="testimonials" className='mt-5'>

                <div class="testimonial-heading">
                    {/* <span>Reviews</span> */}
                    <h4>What Our Client Says</h4>
                </div>

                <div class="testimonial-box-container">
                    {
                        review && review.map((r) => (
                            <>
                                <div class="testimonial-box">

                                    <div class="box-top">

                                        <div class="profile">

                                            <div class="profile-img">
                                                <img src={`http://localhost:7000/images/review/${r.AuthorImage}`} />
                                            </div>

                                            <div class="name-user">
                                                <strong>{r.AuthorName}</strong>
                                                {/* <span>@liammendes</span> */}
                                            </div>
                                        </div>

                                        {/* <div class="reviews">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="far fa-star"></i>
                        </div> */}
                                    </div>

                                    <div class="client-comment">
                                        <p>{r.Review}</p>
                                    </div>
                                </div>
                            </>
                        ))

                    }

                </div>
            </section>

        </>
    )
}

export default ClientReview