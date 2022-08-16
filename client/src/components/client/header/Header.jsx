import React from 'react';
import { Link } from 'react-router-dom';
import "./header.css"

const Header = () => {

    const btnn = () => {
        let btn = document.querySelector('.menu_btn');
        let navbar = document.querySelector('.nav_icon');
        navbar.classList.toggle('mobile');
        btn.classList.toggle('fa-times');
    }



    return (
        <>

            <header className='' >
                <nav className="header_box px-5">
                    <div className="logo mt-0 rounded ">
                        <h1>He<span style={{ color: 'white', fontSize: '2.3rem', opacity: '0.9' }}>ader</span> </h1>
                        {/* <Link to="/">
                            <img src={bg} height="60px" alt="" />
                        </Link> */}
                    </div>
                    <div className="nav_icon container-fluid ">
                        <li><Link to="/">Home</Link></li>
                        <li className="mydropdown d-lg-block d-none">
                            <a className="service1" id='about_open'>
                                <Link to="/service">Services</Link>
                            </a>
                            <div className="service-menu" id='service-menu'>

                                <div className="service-submenu" style={{ width: "34%" }}>
                                    <h6>AJ Weddings</h6>
                                    <p><i>AJ Weddings was established in April 2022 with the goal of assisting couples in finding fantastic wedding offers such as Banquet Bookings, catering, Photographers, Decorators, Bridal Makeup, and so on.</i></p>
                                    <div>
                                        <Link to="/about-us" className="btn1 btn-4"><span>Read More</span></Link>
                                    </div>
                                </div>
                                <div className="service-submenu" style={{ width: "50%" }}>
                                    <h6>Service Type</h6>
                                    {/* {
                                        servicename && servicename.map((service) => (
                                            <>
                                                <Link to={`/wedding-vanues`} state={{ queryservicename: service.VendorType, queryservicelocation: city }} >{service.VendorType}</Link>
                                            </>
                                        ))
                                    } */}
                                </div>
                                <div className="service-submenu" style={{ width: "50%" }}>
                                    <h6>Service Location</h6>
                                    {/* {
                                        servicelocation && servicelocation.map((service) => (
                                            <>
                                                <Link to={`/wedding-vanues`} state={{ queryservicename: city, queryservicelocation: service }} >{service}</Link>
                                            </>
                                        ))
                                    } */}
                                </div>
                            </div>
                        </li>

                        {/* ====================== Mobile Drop */}
                        <a data-toggle="collapse" href="#Products" role="button" className="d-lg-none d-block" aria-expanded="false"
                            aria-controls="collapseExample">
                            {/* <Link to="/"> Vendors </Link> */}
                            Vendors
                        </a>
                        <div style={{ paddingLeft: '5px' }} className="collapse d-lg-none " id="Products">
                            <a style={{ color: '#fff', fontSize: '15px', fontWeight: '200', paddingLeft: '35px' }} data-toggle="collapse" href="#drop1" role="button" aria-expanded="false"
                                aria-controls="collapseExample">Service Type&nbsp;&nbsp; <i className="fas fa-chevron-down"></i></a>
                            <div style={{ paddingLeft: '15px' }} className="collapse" id="drop1">
                                {/* {
                                    servicename && servicename.map((service) => (
                                        <>
                                            <Link to={`/wedding-vanues`} style={{ color: '#fff', fontSize: '13px', fontWeight: '100' }} className="dropdown-item" state={{ queryservicename: service.VendorType, queryservicelocation: city }} >{service.VendorType}</Link>
                                        </>
                                    ))
                                } */}
                            </div><br />

                            <a style={{ color: '#fff', fontSize: '15px', fontWeight: '200', paddingLeft: '35px' }} data-toggle="collapse" href="#drop3" role="button" aria-expanded="false"
                                aria-controls="collapseExample">Service Location &nbsp;&nbsp;<i className="fas fa-chevron-down"></i></a>
                            <div style={{ paddingLeft: '15px' }} className="collapse" id="drop3">
                                {/* {
                                    servicelocation && servicelocation.map((service) => (
                                        <>
                                            <Link to={`/wedding-vanues`} style={{ color: '#fff', fontSize: '13px', fontWeight: '100' }} className="dropdown-item" state={{ queryservicename: city, queryservicelocation: service }} >{service}</Link>
                                        </>
                                    ))
                                } */}

                            </div><br />

                        </div>
                        <li><Link to="/gallery">Photos</Link></li>
                        <li><Link to="/review">Review</Link></li>
                        <li><Link to="/about-us">About Us</Link></li>
                        <li><Link to="/contact-us">Contact Us</Link></li>
                        <li className="d-lg-block d-none"><Link to="/me"><i className="fa fa-user text-white" aria-hidden="true" style={{ color: "white" }}></i></Link></li>
                    </div>


                    <div className="mobile_number text-white d-lg-block d-none  ">
                        <div >
                            <Link to="/login" className="btn py-1" style={{ backgroundColor: '#ffd2cf' }} >Login</Link>
                            <Link to ="/registration" className="btn py-1" style={{ backgroundColor: '#ffd2cf' }} >Registration</Link>
                        </div>
                    </div>

                    {/* <div className="mobile_number text-white d-none d-md-block">
                            <b><a href="#" className='btn btn-sm px-3 rounded-pill' style={{ backgroundColor: "#032D60" }}> <span style={{ color: "#fff" }}>Get Started</span></a></b>
                        </div> */}
                    <i className="menu_btn fas fa-bars text-dark d-lg-none d-block coloradd" onClick={btnn} style={{ Color: "#fff" + "!important" }}></i>
                </nav>
            </header>
        </>
    )
}

export default Header