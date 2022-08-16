import React from 'react';
import { Link } from 'react-router-dom';
import "./footer.css";



const Footer = () => {
    return (
        <>
            <footer style={{ backgroundColor: "#E72E77" }}>
                <div className="container margin_60_0 py-5 text-white">
                    <div className="row">
                        <div className="col-lg-4 col-md-12 p-r-5 text-start">
                            {/* <p><img src={imge3} data-retina="true" alt="" style={{backgroundColor:"white"}} /></p> */}
                            <p><h1 className='text-white'>Logo Here</h1></p>
                            <p>Shubham Multi Course Academy (SMCA) is a online teaching platform which enables instructors to design and offer courses consisting of a combination of videos, audio files, PowerPoint presentations, and documents such as PDF files, etc.</p>
                        </div>
                        <div className="col-lg-3 col-md-6 ml-lg-auto text-start">
                            <h5>Useful links</h5>
                            <ul className="links">
                                <li><Link to="/"><i className="fa fa-chevron-circle-right"></i> Home</Link></li>
                                <li><Link to="/about"><i className="fa fa-chevron-circle-right"></i> About Us</Link></li>
                                <li><Link to="/courses"><i className="fa fa-chevron-circle-right"></i> Courses</Link></li>
                                {/* <li><Link to="/affiliate-commission"><i className="fa fa-chevron-circle-right"></i> Affiliate Commissions</Link></li> */}
                                <li><Link to="/contact"><i className="fa fa-chevron-circle-right"></i> Contact Us</Link></li>
                            </ul>
                        </div>
                        {/* <div className="col-lg-2 col-md-6 ml-lg-auto text-start">
                            <h5>Follow us</h5>
                            <div className="follow_us">
                                <ul>
                                    <li><a to="#0"><i className="fab fa-facebook-f"></i><span>facebook.com</span></a></li>
                                    <li><a target="_blank" href="https://www.linkedin.com/in/subham-nathani-174802206"><i className="fab fa-linkedin-in"></i> <span>linkedin.com</span></a></li>
                                   
                                    <li><a target="_blank" href="https://instagram.com/smc_academy_?igshid=1nvzbj1bf4feb"><i className="fab fa-instagram"></i> <span>instagram.com</span></a></li>
                                </ul>
                                
                            </div>
                        </div> */}
                        <div className="col-lg-5 col-md-6 ">
                            <h5>Contact with Us</h5>
                            <li ><a href="#" className='text-white'><i className="fa fa-map-marker add text-white"></i> A-32 agrsen colony azad nagar bhilwara</a></li>
                            <li><a href="tel:+918385924743" className='text-white'><i className="fa fa-mobile mob text-white"></i> +91-8385924743, +91-9352933203</a></li>
                            <li><a href="mailto:agrwalsubham94@gmail.com" className='text-white'><i className="fa fa-envelope text-white"></i> agrwalsubham94@gmail.com</a></li>
                            {/* <li><a href="mailto:agrwalsubham94@gmail.com" className='text-white'><i className="fa fa-envelope text-white"></i> agrwalsubham94@gmail.com</a></li> */}
                            <li><a href="mailto:subhammulticourseacademy@gmail.com" className='text-white' style={{ fontSize: "15px" }}><i className="fa fa-envelope text-white"></i> subhammulticourseacademy@gmail.com</a></li>
                            {/* <p><img src={isoimage} data-retina="true" alt="" height={80}   /></p> */}

                        </div>
                    </div>
                    {/* <!--/row--> */}
                    <hr />
                    {/* <div className="row">
                        <div className="col-md-8 col-12">
                            <ul id="additional_links">
                                <li><Link to="">Terms and conditions</Link></li>
                                <li><Link to="">Privacy</Link></li>
                                <li><Link to="">Cancellations And Refunds</Link></li>
                            </ul>
                        </div>
                        <div className="col-md-4">
                            <div id="copy" className='text-center'>© 2021 SMCA</div>
                        </div>
                    </div> */}
                    <div className="row d-flex align-items-center mt-5">
                        <div className="col-md-12 col-12 text-center">
                            <a style={{ textDecoration: "none", color: "white" }} href="http://digisidekick.com/">Designed & Powered by Digi Sidekick</a>
                        </div>
                    </div>
                </div>
                <div id="whatsapp" class="whatsapp"><a href="https://api.whatsapp.com/send?phone=7014970488&amp;text=Hi!%20I%20was%20going%20through%20your%20site.%20Would%20like%20to%20know%20more%20about%20your%20courses." target="_blank" title="Whatsapp" data-bs-toggle="tooltip" data-bs-placement="top"><i class="fab fa-whatsapp"></i></a></div>
                <div id="whatsapp" class="whatsapp">
                    <a href="https://api.whatsapp.com/send?phone=7014970488&text=Hi!%20I%20was%20going%20through%20your%20site.%20Would%20like%20to%20know%20more%20about%20your%20courses." target="_blank" title="Whatsapp" data-bs-toggle="tooltip" data-bs-placement="top">
                        <i class="fab fa-whatsapp"></i>
                    </a>
                </div>
            </footer>
        </>
    )
}

export default Footer