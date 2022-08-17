import React, { useEffect, useState, useRef } from "react";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { BsPlusLg } from "react-icons/bs";
import { FiRefreshCcw } from "react-icons/fi";
import { Button } from "primereact/button";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { FiSave } from "react-icons/fi";
import { TbAlertTriangle } from "react-icons/tb";
import { InputText } from "primereact/inputtext";
import Sidebar from "../../Components/Sidebar/Sidebar";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const Rooms = () => {
    const URL = "http://103.226.217.67:443/api/rooms/create-code?OrgId=2";

    const [users, setUsers] = useState("");
    const [edit, setEdit] = useState(false);

    const [roomId, setRoomId] = useState("");
    const [roomCode, setRoomCode] = useState();
    const [roomName, setRoomName] = useState('');
    const [buildingName, setBuildingName] = useState("");
    const [floorName, setFloorName] = useState("");
    const [floorId, setFloorId] = useState("");
    const [buildingId, setBuildingId] = useState("");
    const [complexId, setComplexId] = useState("");
    const [complexName, setComplexName] = useState("");
  
    const [roomStatus, setRoomStatus] = useState("");
    const [roomCondition, setRoomCondition] = useState("");
    const [roomCriticality, setRoomCriticality] = useState("");
    const [roomGrossArea, setRoomGrossArea] = useState("");
    const [roomUseType, setroomUseType] = useState("");
    const [roomHeated, setroomHeated] = useState("");
    const [roomNetArea, setroomNetArea] = useState("");
    const [roomHeight,setroomHeight]=useState('')
    const [complexTableData, setComplexTableData]=useState('')
    const [buildingTableData, setBuildingTableData]=useState('')
    const [floorTableData, setFloorTableData]=useState('')
    const [steric, setSteric] = useState("");
    const [modal, setModal] = useState(false);
    const [show, setShow] = useState(false);
    const [saveModal, setSaveModal] = useState(false);
    const [saveData, setSaveData] = useState(false);
    const [filters1, setFilters1] = useState(null);
    const [globalFilterValue1, setGlobalFilterValue1] = useState("");
    const dt = useRef(null);
    const cols = [
      { field: "roomCode", header: "Code" },
      { field: "roomName", header: "Name" },
      { field: "status", header: "Status" },
      { field: "criticality", header: "Criticality" },
    ];
  
    const exportColumns = cols.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));
  
    const exportCSV = (selectionOnly) => {
      dt.current.exportCSV({ selectionOnly });
    };
  
    const exportPdf = () => {
      import("jspdf").then((jsPDF) => {
        import("jspdf-autotable").then(() => {
          const doc = new jsPDF.default(0, 0);
          doc.autoTable(exportColumns, users);
          doc.save("RoomsData.pdf");
        });
      });
    };
  
    const getNewCodeData = () => {
      axios.get(URL).then((res) => {
        setRoomCode(res.data.data);
        // console.log(res.data.data);
      });
    };
    const getTableData = () => {
      axios
        .get(
          " http://103.226.217.67:443/api/rooms/fetch-all?OrgId=2&SupplierId=0"
        )
        .then((res) => {
          setUsers(res.data.data);
        });
    };
    const resetData = () => {
      setRoomCode();
      setRoomId("");
      setBuildingName("");
      setBuildingId("");
      setFloorName("");
      setroomHeated('');
      setRoomName("");
      setFloorId("");
      setFloorName('')
      setRoomStatus("");
      setRoomCondition("");
      setComplexName("");
      setComplexId("");
      setroomUseType("");
      setroomHeight("")
      setRoomCriticality("");
      setRoomGrossArea("");
      setroomNetArea("");
    };
    const handleClearButton =()=>
    {
      setRoomId("");
      setBuildingName("");
      setBuildingId("");
      setFloorName("");
      setroomHeated('');
      setRoomName("");
      setFloorId("");
      setFloorName('')
      setRoomStatus("");
      setRoomCondition("");
      setComplexName("");
      setComplexId("");
      setroomUseType("");
      setroomHeight("")
      setRoomCriticality("");
      setRoomGrossArea("");
      setroomNetArea("");
    }
    const getComplexTableData = () => {
      axios
        .get(
          "http://103.226.217.67:443/api/complex/fetch-all?OrgId=2&SupplierId=0"
        )
        .then((res) => {
          setComplexTableData(res.data.data);
        });
    };
    const getBuildingTableData = () => {
      axios
        .get(
          "http://103.226.217.67:443/api/building/fetch-all?OrgId=2&SupplierId=0"
        )
        .then((res) => {
          setBuildingTableData(res.data.data);
        });
    };
    const getFloorTableData = () => {
        axios
          .get(
            "http://103.226.217.67:443/api/floors/fetch-all?OrgId=2&SupplierId=0"
          )
          .then((res) => {
            setFloorTableData(res.data.data);
          });
      };
    const action = (data) => {
      return (
        <div className="complex-table-data-action">
          <FiEdit
            className="update-icon"
            onClick={(e) => handleUpdateData(e, data)}
          />
          <RiDeleteBin6Line
            className="delete-icon"
            onClick={(e) => {
              handleDeleteItem(e, data);
            }}
          />
        </div>
      );
    };
  
    const handleDeleteItem = (e, data) => {
      e.preventDefault();
      setShow(true);
      console.log(data);
      setRoomId(data.roomId);
    };
  
    const handleDelete = () => {
      axios
        .delete(`http://103.226.217.67:443/api/rooms/delete?id=${roomId}`)
        .then((res) => {
          console.log(res);
          if (res.data.code === 1) {
            toast.success(res.data.message, {
              position: "top-left",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              closeButton: false,
              theme: "colored",
            });
          }
          if (res.data.code === 2) {
            toast.error(res.data.message, {
              position: "top-left",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              closeButton: false,
              theme: "colored",
            });
          } 
        })
        .catch((err) => console.log(err));
  
      setShow(false);
    };
    const handleUpdateData = (e, data) => {
      setEdit(true);

      console.log(data)
      console.log(data.roomCode)
      e.preventDefault();
      setRoomId(data.roomId);
      setRoomName(data.roomName);
      setRoomStatus(data.status);
      setRoomCode(data.roomCode);
      setroomHeated(data.heated)
      setFloorId(data.floorId)
      setBuildingId(data.buildingId)
      setBuildingName(data.buildingName);
      setFloorName(data.floorName);
      setRoomCondition(data.condition);
      setComplexName(data.complexName);
      setComplexId(data.complexId);
      setroomUseType(data.useType);
      setroomHeight(data.height)
      setRoomCriticality(data.criticality);
      setRoomGrossArea(data.totalGrossArea);
      setroomNetArea(data.totalNetArea);
      setModal(true);
      console.log('building Id --> '+buildingId)
      console.log('rooom Id --> '+roomId)
      console.log('roomCode --> '+roomCode)
      console.log('roomName --> '+roomName)
      console.log('roomUseType --> '+roomUseType)
      // console.log('floorName --> '+floorName)
      console.log('floorId --> '+floorId)
      console.log('buildingId --> '+buildingId)
      console.log('complexId --> '+complexId)
      console.log('roomCondition --> '+roomCondition)
      console.log('roomCriticality --> '+roomCriticality)
      console.log('roomHeight --> '+roomHeight)
      console.log('roomStatus --> '+roomStatus)
      console.log('roomHeated --> '+roomHeated)
      console.log('roomGrossArea --> '+roomGrossArea)
      console.log('roomNetArea --> '+roomNetArea)
      console.log('working')
    };
  
    const handleOnBlurClick = (e) => {
      setSteric("*");
    };
  
    const handleSaveYes = () => {
      setSaveData(true);
      setSaveModal(false);
      setModal(false);
      getNewData();
    };
    const handleSaveNo = () => {
      setSaveModal(false);
      setModal(false);
      setSaveData(false);
    };
    const handleSaveButton = () => {
      setSaveModal(true);
    };
    const getNewData = () => {
      if (roomCode === "" || roomName === "" ||complexId===''|| buildingId===''||floorId===''||roomStatus==='') {
        setSteric("*");
        toast.warn('Please fill all required fields.', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          closeButton: false,
          theme: "colored",
        });      
        setModal(true)
      } else {
        setSaveData(false)
        if (edit === false) {
          console.log(edit)
          axios
            .post("http://103.226.217.67:443/api/rooms/create", {
              OrgId: 2,
            //   roomId:roomId,
              roomCode: roomCode,
              roomName:roomName,
              useType: roomUseType,
            //   floorName:floorName,
              floorId:floorId,
              buildingId:buildingId,
            //   buildingName:buildingName,
              complexId:complexId,
            //   complexName:complexName,
              condition: roomCondition,
              criticality: roomCriticality,
              height:roomHeight,
              status: roomStatus,
              heated:roomHeated,
              totalGrossArea: roomGrossArea,
              totalNetArea: roomNetArea,
            })
            .then((res) => {
              console.log(res.data);
              console.log(res)
              if (res.data.code === 1) {
                toast.success(res.data.message, {
                  position: "top-left",
                  autoClose: 3000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                  closeButton: false,
                  theme: "colored",
                });
              }
              if (res.data.code === 2) {
                toast.error(res.data.message, {
                  position: "top-left",
                  autoClose: 3000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                  closeButton: false,
                  theme: "colored",
                });
              } 
            }).catch((err)=>{console.log(err)});
        } else {
          axios
            .put("http://103.226.217.67:443/api/rooms/update", {
              orgId: 2,
              complexId:complexId,
              roomCode: roomCode,
              roomName: roomName,
              heated:setroomHeated,
            //   floorName:floorName,
              buildingId:buildingId,
              roomId: roomId,
            //   buildingName: buildingName,
              Status: roomStatus,
              condition: roomCondition,
            //   complexName: complexName,
              useType: setroomUseType,
              height:roomHeight,
              criticality: roomCriticality,
              totalGrossArea: roomGrossArea,
              totalNetArea: roomNetArea,
            })
            .then((res) => {
              console.log(res.data);
              console.log(res)
              if (res.data.code === 1) {
                toast.success(res.data.message, {
                  position: "top-left",
                  autoClose: 3000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                  closeButton: false,
                  theme: "colored",
                });
              }
              if (res.data.code === 2) {
                toast.error(res.data.message, {
                  position: "top-left",
                  autoClose: 3000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                  closeButton: false,
                  theme: "colored",
                });
              } 
          
            })
            .catch((err) => {
              console.log(err);
            });
          setEdit(false);
        }
  
        resetData();
      }
    };

    useEffect(() => {
      getBuildingTableData()
      getComplexTableData()
      getFloorTableData()
      getTableData();
      setRoomCode()
      initFilters1();
    }, []);
  
    const toggle = () => {
      setModal(!modal);
    };
  
    const handleNewComplex = () => {
      resetData();
      setModal(true);

    };
  
    const handleRefreshButton = () => {
      getTableData();
    };
  
    const onGlobalFilterChange1 = (e) => {
      const value = e.target.value;
      let _filters1 = { ...filters1 };
      _filters1["global"].value = value;
  
      setFilters1(_filters1);
      setGlobalFilterValue1(value);
    };
  
    const initFilters1 = () => {
      setFilters1({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
        },
        "country.name": {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
        },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        date: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
        },
        balance: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
        },
        status: {
          operator: FilterOperator.OR,
          constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
        },
        activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
        verified: { value: null, matchMode: FilterMatchMode.EQUALS },
      });
      setGlobalFilterValue1("");
    };
  
    const renderHeader1 = () => {
      return (
        <div className="flex justify-content-between complex-search">
          <span className="complex-search-right">
            <InputText
              className="complex-search-input"
              value={globalFilterValue1}
              onChange={onGlobalFilterChange1}
              placeholder="Find here...."
            />
          </span>
  
          <div className="complex-search-left">
         
            <Button
              type="button"
              icon="pi pi-file"
              onClick={() => exportCSV(false)}
              className="mr-2 complex-left-search-button2 p-button-danger"
              data-pr-tooltip="CSV"
              tooltip="CSV"
              tooltipOptions={{
                position: "bottom",
                style: { width: "max-content", height: "30px" },
              }}
            />
            <Button
              type="button"
              icon="pi pi-file-pdf"
              onClick={exportPdf}
              className="p-button-warning mr-2 complex-left-search-button3"
              data-pr-tooltip="PDF"
              tooltip="PDF"
              tooltipOptions={{
                position: "bottom",
                style: { width: "max-content", height: "30px" },
              }}
            />
               <Button
              className="complex-left-search-button1 mr-2"
              icon="pi pi-refresh"
              onClick={handleRefreshButton}
              tooltip="Refresh"
              tooltipOptions={{
                position: "bottom",
                style: { width: "max-content", height: "30px" },
              }}
            />
          </div>
        </div>
      );
    };

    const header1 = renderHeader1();
  
    return (
      <Sidebar login={true}>
        <div className="complex-main">
          <Modal
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
            onHide={() => setModal(false)}
            show={modal}
            toggle={toggle}
          >
            <Modal.Header
              closeButton
              className="modalHeader"
              toggle={() => setModal(!modal)}
              id="contained-modal-title-vcenter"
            >
              Create Rooms
            </Modal.Header>
            <Modal.Body>
              <div className="BodyHeader">
                <div className="basedata">Base Data</div>
  
                <div className="horizontal">
                  <span className="yellowspan"></span>
                  <span className="greyspan"></span>
                </div>
              </div>
              <div className="complex-modal-body">
                <div className="complex-general">
                  <h5>General:</h5>
                  <div className="complex-general-data">
                    <div className="complex-input-divs">
                      <input
                        type="text"
                        className="complex-inputs"
                        placeholder="Enter Room Code"
                        value={roomCode}
                        onChange={(e)=>setRoomCode(e.target.value)}
                        disabled
                      />
                    </div>
                    <div className="complex-input-divs">
                      <input
                        type="text"
                        className="complex-inputs"
                        placeholder="Enter Room Name"
                        value={roomName}
                        onChange={(e) => {
                          setRoomName(e.target.value);
                          // console.log(buildingName);
                        }}
                        onBlur={(e) => {
                          if (roomName === "") {
                            handleOnBlurClick(e);
                          }
                        }}
                      />
                      <span
                        style={{
                          color: "red",
                          width: "max-content",
                          height: "max-content",
                        }}
                      >
                        {steric}
                      </span>
                    </div>
               
                    <div className="complex-input-divs">
                      <select
                        className="complex-inputs"
                        placeholder="UseType"
                        value={roomUseType}
                        onChange={(e) => setroomUseType(e.target.value)}
                      >
                      <option value=''>UseType</option>
                      <option value='commercial'>Commercial</option>
                      <option value='Warehouse'>Warehouse</option>

                      </select>
                    </div>
                  </div>
                </div>
  
                <div className="complex-location">
                  <h5>Position:</h5>
                  <div className="complex-location-data">
                    <div className="complex-input-divs">
                      <select
                        name="Complex"
                        className="complex-inputs"
                        value={complexId}
                        onChange={(e) => setComplexId(e.target.value)}
                        onBlur={(e) => {
                          if (complexName === "") {
                            handleOnBlurClick(e);
                          }
                        }}
                      >
                        <option value="">Complex Name</option>
                       {    
                             Object.keys(complexTableData).map((index)=>{
                               return(
                                <>
                                <option value={complexTableData[index].complexId}>{
                                complexTableData[index].complexName
                                }</option>
                                </>
                              )
                            })
  
                       }
                    </select>
                      <span
                        style={{
                          color: "red",
                          width: "max-content",
                          height: "max-content",
                        }}
                      >
                        {steric}
                      </span>
                    </div>
                    <div className="complex-input-divs">
                      <select
                        name="Building"
                        className="complex-inputs"
                        value={buildingId}
                        onChange={(e) => setBuildingId(e.target.value)}
                        onBlur={(e) => {
                          if (buildingName === "") {
                            handleOnBlurClick(e);
                          }
                        }}
                      >
                        <option value="">Building</option>
                       {    
                             Object.keys(buildingTableData).map((index)=>{
                               return(
                                <>
                                <option value={buildingTableData[index].buildingId}>
                              {
                                buildingTableData[index].buildingName
                              }
                                </option>
                                </>
                              )
                            })
  
                       }
                    </select>
                      <span
                        style={{
                          color: "red",
                          width: "max-content",
                          height: "max-content",
                        }}
                      >
                        {steric}
                      </span>
                    </div>
                    <div className="complex-input-divs">
                      <select
                        name="Building"
                        className="complex-inputs"
                        value={floorId}
                        onChange={(e) => setFloorId(e.target.value)}
                        onBlur={(e) => {
                          if (floorName === "") {
                            handleOnBlurClick(e);
                          }
                        }}
                      >
                        <option value="">Floor</option>
                       {    
                             Object.keys(floorTableData).map((index)=>{
                               return(
                                <>
                                <option value={floorTableData[index].floorId}>
                              {
                                floorTableData[index].floorName
                              }
                                </option>
                                </>
                              )
                            })
  
                       }
                    </select>
                      <span
                        style={{
                          color: "red",
                          width: "max-content",
                          height: "max-content",
                        }}
                      >
                        {steric}
                      </span>
                    </div>
              
                  </div>
                </div>
  
                <div className="complex-maintenance">
                  <h5>Maintenance:</h5>
                  <div className="complex-maintenance-data">
                    <div className="complex-input-divs">
                      <select
                        name="Condition"
                        id=""
                        className="complex-inputs"
                        value={roomCondition}
                        onChange={(e) => setRoomCondition(e.target.value)}
                      >
                        <option value="">Condition</option>
                        <option value="Ok">Ok</option>
                        <option value="PartiallyOk">PartiallyOk</option>
                      </select>
                    </div>
                    <div className="complex-input-divs">
                      <select
                        name=""
                        id=""
                        className="complex-inputs"
                        value={roomCriticality}
                        onChange={(e) => setRoomCriticality(e.target.value)}>
                        <option value="">Criticality</option>
                        <option value="Extreme">Extreme</option>
                        <option value="High">High</option>
                        <option value="Low">Low</option>
                        <option value="Moderate">Moderate</option>
                      </select>
                    </div>
        
                  </div>
                </div>
  
                <div className="complex-dimensional">
                  <h5>Dimensional:</h5>
                  <div className="complex-dimensional-data">
                  <div className="complex-input-divs">
                      <select
                        name="Heated"
                        id=""
                        className="complex-inputs"
                        value={roomHeated}
                        onChange={(e) => setroomHeated(e.target.value)}>
                        <option value="">Heated</option>
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                      </select>
                    </div>
                    <div className="complex-input-divs">
                      <input
                        type="text"
                        className="complex-inputs"
                        placeholder="Enter Height"
                        value={roomHeight}
                        onChange={(e) => setroomHeight(e.target.value)}
                      />
                    </div>

                    <div className="complex-input-divs">
                      <input
                        type="text"
                        className="complex-inputs"
                        placeholder="Enter Total Gross Area"
                        value={roomGrossArea}
                        onChange={(e) => setRoomGrossArea(e.target.value)}
                      />
                    </div>
              
                    <div className="complex-input-divs">
                      <input
                        type="text"
                        className="complex-inputs"
                        placeholder="Enter Total Net Area"
                        value={roomNetArea}
                        onChange={(e) => setroomNetArea(e.target.value)}
                      />
                    </div>
                    <div className="complex-input-divs">
                      <select
                        name="UseType"
                        id=""
                        className="complex-inputs"
                        value={roomStatus}
                        onChange={(e) => setRoomStatus(e.target.value)}
                        onBlur={(e) => {
                          if (roomStatus === "") {
                            handleOnBlurClick(e);
                          }
                        }}
                      >
                        <option value="">Status</option>
                        <option value="Active">Active</option>
                        <option value="InActive">InActive</option>
                      </select>
                      <span
                        style={{
                          color: "red",
                          width: "max-content",
                          height: "max-content",
                        }}
                      >
                        {steric}
                      </span>
                    </div>
                  </div>
                </div>
  
                <div className="complex-footer">
                <Button
                  variant="primary"
                  className="complex-footer-button"
                  size="sm"
                  style={{marginLeft:'1%',color:'white',width:'max-content'}}
                  onClick={handleSaveButton}
                >
                  <FiSave style={{ color: "white", width: "max-content",paddingRight:'1px'  }} />{" "}
                  Save
                </Button>
                <Button
                  variant="link"
                  style={{marginLeft:'1%',color:'#6366F1',width:'max-content',backgroundColor:'white'}}
                  size="sm"
                  onClick={() => 
                    {
                      handleClearButton()
                    }
                  }
                >
                  <FiRefreshCcw
                    style={{ color: "#6366F1", width: "max-content",paddingRight:'1px' }}
                  />
                  Clear
                </Button>
              </div>
              </div>
            </Modal.Body>
          </Modal>
          <Modal show={show} onHide={() => setShow(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="logout-modal-confirm">
                <TbAlertTriangle className="logout-modal-icon" />
                <p className="logout-modal-para">
                  Are you sure that you want to perform delete the following
                  complex?
                </p>
              </div>
              <div className="logout-footer">
                <div className="logout-yes" onClick={handleDelete}>
                  ✔ Yes
                </div>
                <div className="logout-no" onClick={() => setShow(false)}>
                  ❌ No
                </div>
              </div>
            </Modal.Body>
          </Modal>
          <Modal show={saveModal} onHide={() => setSaveModal(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="logout-modal-confirm">
                <TbAlertTriangle className="logout-modal-icon" />
                <p className="logout-modal-para">
                  Are you sure that you want to save the following data?
                </p>
              </div>
              <div className="logout-footer">
                <div className="logout-yes" onClick={handleSaveYes}>
                  ✔ Yes
                </div>
                <div className="logout-no" onClick={handleSaveNo}>
                  ❌ No
                </div>
              </div>
            </Modal.Body>
          </Modal>
  
          <div className="complex-header">
            <div className="complex-header-right">
              <span className="complex-header-button" onClick={()=>{ handleNewComplex(); getNewCodeData()}}>
                <BsPlusLg className="complex-header-icon" />
                <p className="complex-header-right-para">Create New Rooms</p>
              </span>
            </div>
  
            <div className="complex-header-left">
              <div className="complex-header-left-para">Rooms</div>
            </div>
          </div>
  
          <div className="complex-table">
            <div>
              <DataTable
                value={users}
                paginator
                paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                paginatorClassName="Custompaginator"
                paginatorPosition="bottom"
                stripedRows 
                className="p-datatable-customers"
                showGridlines
                rows={10}
                dataKey="id"
                ref={dt}
                filters={filters1}
                responsiveLayout="scroll"
                header={header1}
              >
  
              {
                cols.map((col)=>
                {
                    return <Column key={col.field} field={col.field} header={col.header} className='complex-table-data' sortable/>
                })
              }
  
                
                <Column
                  className="complex-table-data"
                  header="Action"
                  value={(e) => e.users}
                  body={(e, value) => action(e, value)}
                >
                  <FiEdit />
                </Column>
              </DataTable>
            </div>
          </div>
        </div>
        <ToastContainer/>
      </Sidebar>
    );
}

export default Rooms