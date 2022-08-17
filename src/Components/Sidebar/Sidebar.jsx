import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Sidebar.css";
import { AiOutlineHome,AiOutlineUser,AiOutlineCalendar} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import { FiLogOut } from "react-icons/fi";
import { TbAlertTriangle } from "react-icons/tb";
import {BsThreeDots} from 'react-icons/bs'
import {GrSchedules} from 'react-icons/gr'
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineDownloadDone,MdComputer,MdOutlineLocationOn } from 'react-icons/md'
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";

const Sidebar = ({ children, login }) => {
  const [index, setIndex] = useState(1);
  const navigation = useNavigate();
  const setNavigaton=(navigate)=>
  {
    if(login===true)
    {

      navigation(navigate)
    }
    else
    {
      navigation('/')
    }

  }
  const displayName =(icon,name)=>{
   
    return(
      <>
      <div style={{display:'flex'}}>
      {icon}<p style={{fontSize:'small', paddingRight:'5px'}}>{name}</p>
      </div>
      </>
    )
  }
  const MenuData =
  [
    {
      id:1,
      name:displayName( <MdOutlineDownloadDone style={{width:'20px',height:'20px'}}/>, 'SLA & KPI"s'),
      items: [
          {
            subId:'1.1',
            sublink:'/',
            subName:displayName(<BsThreeDots style={{width:'20px',height:'20px'}}/>,'SLA Systems')
          },
          {
            subId:'1.2',
            subName:displayName(<BsThreeDots style={{width:'20px',height:'20px'}}/>,'KPI Rules')
          },
          
      ]
    }
    ,
    {
      id:2,
      name :displayName(<MdComputer style={{width:'20px',height:'20px'}}/> , 'Assets'),
      items: [
        {
          subId:'2.1',
          subName:displayName(<BsThreeDots style={{width:'20px',height:'20px',textAlign:'left'}}/>,'Audit Dashboard')
        }, 
        {
          subId:'2.2',
          subName:displayName(<BsThreeDots style={{width:'20px',height:'20px'}}/>,'Audit Log')
        }, 
        {
          subId:'2.3',
          subIcon:<BsThreeDots/>,
          subName:displayName(<BsThreeDots style={{width:'20px',height:'20px'}}/>,'Manage Assets'),
        }, 
        {
          subId:'2.4',
          subIcon:<BsThreeDots/>,
          subName:displayName(<BsThreeDots style={{width:'20px',height:'20px'}}/>,'Asset Transfers'),
        },
        {
          subId:'2.5',
          subIcon:<BsThreeDots/>,
          subName:displayName(<BsThreeDots style={{width:'20px',height:'20px'}}/>,'Repair Requests'),
        },
        {
          subId:'2.6',
          subIcon:<BsThreeDots/>,
          subName:displayName(<BsThreeDots style={{width:'20px',height:'20px'}}/>,'Asset Disposal'),
        },
        {
          subId:'2.7',
          subIcon:<BsThreeDots/>,
          subName:displayName(<BsThreeDots style={{width:'20px',height:'20px'}}/>,'Upload Assets'),
        },
      ]
    },
    {
      id:3,
      name: displayName(<MdOutlineLocationOn  style={{width:'20px',height:'20px'}}/>, 'Locations'),
      items:
      [
        {
          subId:'3.1',
          subLink:'/complex',
          subName:displayName(<BsThreeDots style={{width:'20px',height:'20px'}}/>,'Complex'),
        },
        {
          subId:'3.2',
          subLink:'/building',
          subName:displayName(<BsThreeDots style={{width:'20px',height:'20px'}}/>,'Buildings'),
        },
        {
          subId:'3.3',
          subLink:'/floors',
          subIcon:<BsThreeDots/>,
          subName:displayName(<BsThreeDots style={{width:'20px',height:'20px'}}/>,'Floors'),
        },
        {
          subId:'3.4',
          subLink:'/rooms',
          subIcon:<BsThreeDots/>,
          subName:displayName(<BsThreeDots style={{width:'20px',height:'20px'}}/>,'Rooms'),
        },
      ]
    },
    {
      id:4,
      icon: <GrSchedules/>,
      name:displayName(<AiOutlineCalendar  style={{width:'20px',height:'20px'}}/>, 'Schedule'),
      items:
      [
        {
          subId:'4.1',
          subIcon:<BsThreeDots style={{width:'20px',height:'20px', color:'white'}} />,
          subName:''
        },
      ]
    },
  ]



  const handleLogoutClose = () => {
    setModal(false);
  };
  const handleLogout = () => {
    sessionStorage.clear();
    setModal(false);
    login = false;
    navigation("/");
  };
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const [modal, setModal] = useState(false);
  const modalSet = () => {
    if (login === false) {
      setModal(false);
      alert("Youre not logged in.");
    } else {
      setModal(!modal);
    }
  };

  return (
    <div className="Smain-container">
      <Modal
        aria-labelledby="example-custom-modal-styling-title"
        dialogClassName="modal-50w"
        onHide={() => setModal(false)}
        show={modal}
        toggle={modalSet}
        centered
      >
        <Modal.Header
          closeButton
          className="modalHeader"
          toggle={() => setModal(!modal)}
          id="contained-modal-title-vcenter"
        >
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="logout-modal-confirm">
            <TbAlertTriangle className="logout-modal-icon" />
            <p className="logout-modal-para">
              Are you sure that you want to perform logout action?
            </p>
          </div>
          <div className="logout-footer">
            <div className="logout-yes" onClick={handleLogout}>
              ✔ Yes
              {/* <TiTick className="logout-yes-icon"/> */}
            </div>
            <div className="logout-no" onClick={handleLogoutClose}>
              ❌ No
              {/* <ImCross className="logout-no-icon"/> */}
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <motion.div
        animate={{
          width: isOpen ? "400px" : "70px",

          transition: {
            duration: 0.01,
            type: "just",
            damping: 1,
          },
        }}
        className="Ssidebar"
      >
        <section className="Sopen">
          <div className="Sbars">
            <FaBars onClick={toggle} className="Sicon" />{" "}
          </div>

          <div className="Slink">
                  <AiOutlineHome className="Sicon"  onClick={()=>{setNavigaton('/dashboard')}}/>
                  <AiOutlineUser className="Sicon"  onClick={()=>{setNavigaton('/')}}/>
                  <IoIosNotificationsOutline className="Sicon" />
                  <FiLogOut className="Sicon" onClick={modalSet} />
          </div>
        
        </section>

        <div className="Sclose">
          {isOpen && (
            <div className="SrouteTop">
              <div className="Heading">
                <h1 className="Slogo">ITMIS v1.12</h1>
              </div>
              <div className="SButton">Create Service Ticket</div>
              <div className="SBotttomTabs">
                  <div className="tabList">
                    <div
                      className={index === 1 ? "active" : "tabHead"}
                      onClick={() => {
                        setIndex(1);
                      }}
                    >
                      Menu
                    </div>
                    <div
                      className={index === 2 ? "active" : "tabHead"}
                      onClick={() => setIndex(2)}
                    >
                      Reports
                    </div>
                    <div
                      className={index === 3 ? "active" : "tabHead"}
                      onClick={() => setIndex(3)}
                    >
                      Manage
                    </div>
                  </div>
                  <div className="tabContent" hidden={index !== 1}>
                  {
                        MenuData.map((data)=>(
                          <>
                    <TreeView
                      multiSelect='false'
                      sx={{
                        width: "max-content",
                      }}
                    >

                      <TreeItem nodeId={data.id} label={data.name} className='TreeItem'>
                            {
                              data.items.map((subdata)=>(
                                <>
                                <TreeItem nodeId={subdata.subId} label={subdata.subName} 
                                onClick={()=>
                                  {
                                    const link= subdata.subLink
                                    setNavigaton(link)
                                    console.log(link)
                                  }
                                }
                                className='TreeItem'/>
                                </>
                              ))
                            }
                      </TreeItem>
                   </TreeView>
                          </>
                        ))
                      }
            
                  </div>
                  <div className="tabContent" hidden={index !== 2}>
                    Tab2 Content
                  </div>
                  <div className="tabContent" hidden={index !== 3}>
                    Tab3 Content
                  </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
