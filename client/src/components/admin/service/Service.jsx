import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../../config';
import Sidebar from '../common/sidebar/Sidebar';
import { Link } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible, AiFillDelete, AiFillEdit } from "react-icons/ai";

const Service = () => {
  const [service, setservice] = useState()
  const [del, setdel] = useState(false)

  useEffect(() => {
    getservice();
  }, [!del])


  const getservice = async () => {
    try {
      const { data } = await axiosInstance.get("/api/service");
      setservice(data)
      console.log("Service", data)
    } catch (error) {
      alert(error.response.data)
    }
  }

  const togglehandle = (e) => {
    e.persist();
    var menu_btn = document.querySelector("#menu-btn");
    var sidebar = document.querySelector("#sidebar");
    var container = document.querySelector(".my-container");
    sidebar.classList.toggle("active-nav")
    container.classList.toggle("active-cont");
  }

  const deleteservice = async (id) => {
    var answer = window.confirm("Are you sure To delete?");
    if (answer) {
      await axiosInstance.delete(`/api/service/${id}`, {
        headers: {
          'token': localStorage.getItem("token")
        },
      });

      alert("deleted");

      setTimeout(() => {
        setdel(!del);
      }, 100);
    }

  }

  const showdetails = () => {

  }


  return (
    <>
      <Sidebar />
      <div className="p-1 my-container active-cont overflow-hidden">
        {/* <!-- Top Nav --> */}
        <nav className="navbar top-navbar navbar-light bg-light px-5">
          <a className="btn border-0" id="menu-btn" onClick={togglehandle}><i className="bx bx-menu"></i></a>
        </nav>
        {/* <!--End Top Nav --> */}
        <h3 className="text-dark p-3">ADMIN SERVICE DASHBOARD 💻 📱
        </h3>

        <div className="row">
          <div className="col-md-9"></div>
          <div className="col-md-3 btn btn-secondary  mx-5"><Link to="/admin/addservice" className="text-white nav-link">Add New service</Link></div>
        </div>

        <div className="row">
          <div className="col-md-2">Name</div>
          <div className="col-md-1">Type</div>
          <div className="col-md-1">Price</div>
          <div className="col-md-1">Heading</div>
          <div className="col-md-2">Description</div>
          <div className="col-md-2">Image</div>
          <div className="col-md-2 btn btn-secondary">EXTRA OPTIONS</div>
        </div>



        {
          !service ? <div className='row d-flex justify-content-center position-relative top-50 mt-5 ' style={{ height: "100vh" }}>
            <div className="col-md-8 text center position-absolute top-40 start-50">
              <div class="spinner-border text-dark " role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </div> : service.length === 0 ? <>
            <div className="row d-flex justify-content-center mt-5">
              <div className="col-md-8 text-center">
                <h4>No service Available</h4>
              </div>
            </div>
          </> :

            service && service.map((service) => (
              <>
                <div className="row">
                  <div className="col-md-2 ">{service.ServiceName}</div>
                  <div className="col-md-1 ">{service?.serviceType[0]?.categoryName}</div>
                  <div className="col-md-1 ">{service.ServicePrice}</div>
                  <div className="col-md-1">{service.ServiceHeading}</div>
                  <div className="col-md-2 ">{service.ServiceDescription}</div>
                  {/* <div className="col-md-2 ">{service.Email}</div> */}
                  <div className="col-md-2 ">
                    <img src={`http://localhost:7000/images/service/${service.ServiceImage}`} alt="" height={100} width={100} />
                  </div>
                  <div className="col-md-2">
                    <div className="row">
                      <div className="col-md-4">
                        <AiFillEye color='red' size={25} onClick={() => showdetails(service)} />
                      </div>
                      <div className="col-md-4">
                        <AiFillDelete color='black' size={25} onClick={() =>
                          deleteservice(service._id)} />
                      </div>
                      <div className="col-md-4">
                        <Link className="col-md-1" to={`/admin/editservice/${service._id}`} ><AiFillEdit size={25}  color="blue"/>  </Link>
                      </div>
                    </div>
                  </div>

                </div>
              </>
            ))
        }
      </div>


    </>
  )
}

export default Service