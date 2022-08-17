import React from "react";
import "./DropDown.css";
import {BsArrowCounterclockwise} from 'react-icons/bs'
import {FaFilter} from 'react-icons/fa'
import {FaSearch} from 'react-icons/fa'
import {AiOutlineBarChart} from 'react-icons/ai'

const DropDown = () => {
  return (
    <div>
      <div className="Dropdown">
        <div className="Dreporter">
          <select className="DSreporter" name="Reporter">
            <option value="Reporter">Reporter</option>
            <option value="AleemUllah">Aleem Ullah</option>
            <option value="AnasUsmani">Anas Usmani</option>
            <option value="ArslanAhmed">Arslan Ahmed</option>
            <option value="AsifAli">Asif Ali</option>
            <option value="AyeshaSaeed">Ayesha Saeed</option>
            <option value="BaqirManzoor">Baqir Manzoor</option>
            <option value="">Aleem Ullah</option>
            <option value="">Aleem Ullah</option>
            <option value="">Aleem Ullah</option>
          </select>
        </div>

        <div className="Dservice">
          <select name="ServiceProvider" className="DSservice">
            <option value="ServiceProvider">ServicePropvider</option>
            <option value="L2SP1">L2SP1</option>
            <option value="L2SP2">L2SP2</option>
            <option value="L2SP3">L2SP3</option>
            <option value="L2SP4">L2SP4</option>
          </select>
        </div>

        <div className="Dsystem">
          <select className="DSsystem" name="System">
            <option value="System">System</option>
          </select>
        </div>

        <div className="Dstation">
          <select className="DSstation" name="Station">
            <option value="Station1">Station 01</option>
            <option value="Station2">Station 02</option>
            <option value="Station3">Station 03</option>
            <option value="Station4">Station 04</option>
            <option value="Station5">Station 05</option>
            <option value="Station6">Station 06</option>
            <option value="Station7">Station 07</option>
            <option value="Station8">Station 08</option>
            <option value="Station9">Station 09</option>
            <option value="Station10">Station 10</option>
            <option value="Station11">Station 11</option>
            <option value="Station12">Station 12</option>
            <option value="Station13">Station 13</option>
            <option value="Station14">Station 14</option>
            <option value="Station15">Station 15</option>
          </select>
        </div>

        <div className="Dticket">
          <select name="Ticket" className="DSticket">
            <option value="TicketType">Ticket Type</option>
            <option value="Faulty">Faulty</option>
            <option value="Incident">Incident</option>
          </select>
        </div>

        <div className="Dpriority">
          <select className="DSpriority" name="Priority">
            <option value="Priority">Priority</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Low">Low</option>
            <option value="Repeated">Repeated</option>
            <option value="Urgent">Urgent</option>
            <option value="NonCritical">Non-Critical</option>
          </select>
        </div>

        <div className="Dstatus">
          <select name="Status" className="DSstatus">
            <option value="Status">Status</option>
            <option value="Assigned">Assigned</option>
            <option value="AutoClosed">AutoClosed</option>
            <option value="Closed">Closed</option>
            <option value="InProgress">InProgress</option>
            <option value="InReview">InReview</option>
            <option value="Open">Open</option>
            <option value="Overdue">Overdue</option>
            <option value="Reopen">Reopen</option>
          </select>
        </div>

        <div className="Ddate">
          <div className="Date1div">
            <input type="date" className="Ddate1"/>
          </div>
          <div className="Date2div">
            <input type="date"  className="Ddate2"/>
          </div>
        </div>
        <div className="Dicons">
            <div className="Dfilterdiv">
                <span className="Dfilterspan">
                    <FaFilter className="Dfilterspan"/>
                </span>
            </div>


            <div className="DArrowdiv">
                <span className="DArrowspan">
                    <BsArrowCounterclockwise className="DArrowspan"/>
                </span>
            </div>
            
            <div className="DSearchdiv">
                <span className="DSearchspan">
                    <FaSearch className="DSearchspan"/>
                </span>
            </div>

            <div className="DChartdiv">
                <span className="DChartspan">
                    <AiOutlineBarChart className="DChartspan"/>
                </span>
            </div>

           

            

        </div>
      </div>
    </div>
  );
};

export default DropDown;
