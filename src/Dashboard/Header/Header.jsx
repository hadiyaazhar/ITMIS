import React from 'react'
import './Header.css'
import {FaFolderOpen}  from 'react-icons/fa';
import {TiTick}  from 'react-icons/ti';
import {BiLoaderCircle}  from 'react-icons/bi';
import {BiFolderOpen}  from 'react-icons/bi';
import {BsChatFill}  from 'react-icons/bs';
import {HiOutlineClock}  from 'react-icons/hi';
import {BsFillHandThumbsUpFill}  from 'react-icons/bs';
import {BsThermometerHalf}  from 'react-icons/bs';

const Header = () => {
  return (
<div>
    <div className='Hheader'>


        <div className='Hleft'>

        <span className='Hopen'>
           <FaFolderOpen className='HopenImg'/>
           <p className='HopenPara'>Open: 0</p>
        </span> 

        <span className='Hassign'>
           <TiTick className='HassignImg'/>
           <p className='HassignPara'>Assigned: 0</p>
        </span>
        
        <span className='Hprogress'>
           <BiLoaderCircle className='HprogressImg'/>
           <p className='HprogressPara'>InProgress: 0</p>
        </span>

        <span className='Hreview'>
           <BsChatFill className='HreviewImg'/>
           <p className='HreviewPara'>Review: 0</p>
        </span>

        <span className='Hreopen'>
           <BiFolderOpen className='HreopenImg'/>
           <p className='HreopenPara'>Reopen: 1</p>
        </span>

        <span className='Hdue'>
           <HiOutlineClock className='HdueImg'/>
           <p className='HduePara'>Overdue: 58</p>
        </span>

        <span className='Hclose'>
           <BsFillHandThumbsUpFill className='HcloseImg'/>
           <p className='HclosePara'>Closed: 2421</p>
        </span>

        </div>





       <div className='Hright'>
       <span  className='HrC'>
         <BsThermometerHalf className='HrImgC'/>
        <p className='HrParaC'>Critical: 240</p>
       </span>

       <span   className='HrH'>
       <BsThermometerHalf className='HrImgH'/>
        <p className='HrParaH'>High: 2597</p>
       </span>

       <span   className='HrM'>
       <BsThermometerHalf className='HrImgM'/>
        <p className='HrParaM'>Medium: 0</p>
       </span>

       <span   className='HrL'>
       <BsThermometerHalf className='HrImgL'/>
        <p className='HrParaL'>Low: 248</p>
       </span>

 
       </div> 

    </div>

</div>
  )
}

export default Header;