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
import {ToastContainer,  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const URL = "http://103.226.217.67:443/api/building/create-code?OrgId=2";

const Building = () => {
  const [users, setUsers] = useState("");
  const [edit, setEdit] = useState(false);
  const [buildingId, setBuildingId] = useState("");
  const [buildingCode, setBuildingCode] = useState();
  const [buildingName, setBuildingName] = useState("");

  const [buildingStatus, setBuildingStatus] = useState("");
  const [buildingAvailability, setBuildingAvailability] = useState("");
  const [buildingUseType, setBuildingUseType] = useState("");
  const [buildingCondition, setBuildingCondition] = useState("");
  const [buildingCriticality, setBuildingCriticality] = useState("");
  const [buildingGrossArea, setBuildingGrossArea] = useState("");
  const [buildingCoveredArea, setBuildingCoveredArea] = useState("");
  const [buildingFloors,setBuildingFloors]=useState('')
  const [buildingNetArea, setBuildingNetArea] = useState("");
  const [complexName, setComplexName] = useState("");
  const [complexId, setComplexId] = useState("");
  const [complexTableData, setComplexTableData]=useState('')
  const [steric, setSteric] = useState("");
  const [modal, setModal] = useState(false);
  const [show, setShow] = useState(false);
  const [saveModal, setSaveModal] = useState(false);
  const [saveData, setSaveData] = useState(false);
  const [filters1, setFilters1] = useState(null);
  const [globalFilterValue1, setGlobalFilterValue1] = useState("");
  const [name,setName]=useState('')
  const dt = useRef(null);
  const cols = [
    { field: "buildingCode", header: "Building Code" },
    { field: "buildingName", header: "Building Name" },
    { field: "status", header: "Status" },
    { field: "criticality", header: "Criticality" },
    { field: "condition", header: "Condition" },
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
        doc.save("complexData.pdf");
      });
    });
  };

  const getNewCodeData = () => {
    axios.get(URL).then((res) => {
      setBuildingCode(res.data.data);
      // console.log(res.data.data);
    });
  };
  const getTableData = () => {
    axios
      .get(
        " http://103.226.217.67:443/api/building/fetch-all?OrgId=2&SupplierId=0"
      )
      .then((res) => {
        setUsers(res.data.data);
      });
  };
  const resetData = () => {
    setBuildingCode("");
    setBuildingName("");
    setBuildingStatus("");
    setBuildingCondition("");
    setComplexName("");
    setComplexId("");
    setBuildingAvailability("");
    setBuildingCoveredArea("");
    setBuildingFloors("")
    setBuildingCriticality("");
    setBuildingGrossArea("");
    setBuildingNetArea("");
    setBuildingUseType("");
  };
  const handleClearButton=()=>
  {
    setBuildingName("");
    setBuildingStatus("");
    setBuildingCondition("");
    setComplexName("");
    setComplexId("");
    setBuildingAvailability("");
    setBuildingCoveredArea("");
    setBuildingFloors("")
    setBuildingCriticality("");
    setBuildingGrossArea("");
    setBuildingNetArea("");
    setBuildingUseType("");
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
  const action = (data) => {
    return (
      <div className="complex-table-data-action">
        <FiEdit
          className="update-icon"
          onClick={(e) => {handleUpdateData(e, data); setName('Update')}}
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
    setBuildingId(data.buildingId);
  };

  const handleDelete = () => {
    axios
      .delete(`http://103.226.217.67:443/api/building/delete?id=${buildingId}`)
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
    e.preventDefault();
    setBuildingId(data.buildingId);
    setBuildingStatus(data.status);
    setBuildingCode(data.buildingCode);
    setBuildingName(data.buildingName);
    setBuildingCondition(data.condition);
    setComplexName(data.complexName);
    setComplexId(data.complexId);
    setBuildingAvailability(data.availability);
    setBuildingCoveredArea(data.coveredArea);
    setBuildingFloors(data.totalFloors)
    setBuildingCriticality(data.criticality);
    setBuildingGrossArea(data.totalGrossArea);
    setBuildingNetArea(data.totalNetArea);
    setBuildingUseType(data.useType);
    setModal(true);
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
    if (buildingCode === "" || buildingName === "" || buildingStatus === "" || buildingUseType==='' || complexId==='') {
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
      setSaveData(false);

      if (edit === false) {
        axios
          .post("http://103.226.217.67:443/api/building/create", {
            OrgId: 2,
            buildingCode: buildingCode,
            buildingName: buildingName,
            status: buildingStatus,
            condition: buildingCondition,
            complexId:complexId,
            availability: buildingAvailability,
            coveredArea: buildingCoveredArea,
            totalFloors:buildingFloors,
            criticality: buildingCriticality,
            totalGrossArea: buildingGrossArea,
            totalNetArea: buildingNetArea,
            useType: buildingUseType,
          })
          .then((res) => {
            console.log(res.data);
            console.log(res)
            if (res.data.code === 1) 
            {
          
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
                    })
                
            }
            if (res.data.code === 2) 
            {
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
                    })
                
            }
          }).catch((err)=>{console.log(err)});
      } else {
        axios
          .put("http://103.226.217.67:443/api/building/update", {
            orgId: 2,
            complexId:complexId,
            buildingCode: buildingCode,
            buildingId: buildingId,
            buildingName: buildingName,
            Status: buildingStatus,
            condition: buildingCondition,
            complexName: complexName,
            availability: buildingAvailability,
            coveredArea: buildingCoveredArea,
            totalFloors:buildingFloors,
            criticality: buildingCriticality,
            totalGrossArea: buildingGrossArea,
            totalNetArea: buildingNetArea,
            useType: buildingUseType,
          })
          .then((res) => {
            console.log(res.data);
            console.log(res.data.code)
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
    getComplexTableData()
    getTableData();
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
            {name} Building
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
                      value={buildingCode}
                      disabled
                    />
                  </div>
                  <div className="complex-input-divs">
                    <input
                      type="text"
                      className="complex-inputs"
                      placeholder="Enter Building Name"
                      value={buildingName}
                      onChange={(e) => {
                        setBuildingName(e.target.value);
                        // console.log(buildingName);
                      }}
                      onBlur={(e) => {
                        if (buildingName === "") {
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
                      name="Availability"
                      id=""
                      className="complex-inputs"
                      value={buildingAvailability}
                      onChange={(e) => setBuildingAvailability(e.target.value)}
                    >
                      <option value="">Availability</option>
                      <option value="InUse">In Use</option>
                      <option value="Vacant">Vacant</option>
                    </select>
                  </div>
                  <div className="complex-input-divs">
                    <select
                      name="UseType"
                      id=""
                      className="complex-inputs"
                      value={buildingUseType}
                      onChange={(e) => setBuildingUseType(e.target.value)}
                      onBlur={(e) => {
                        if (buildingUseType === "") {
                          handleOnBlurClick(e);
                        }
                      }}
                    >
                      <option value="">Use Type</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Warehouse">Warehouse</option>
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

              <div className="complex-location">
                <h5>Position:</h5>
                <div className="complex-location-data">
                  <div className="complex-input-divs">
                    <select
                      name="ComplexName"
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
                      name="UseType"
                      id=""
                      className="complex-inputs"
                      value={buildingStatus}
                      onChange={(e) => setBuildingStatus(e.target.value)}
                      onBlur={(e) => {
                        if (buildingStatus === "") {
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

              <div className="complex-maintenance">
                <h5>Maintenance:</h5>
                <div className="complex-maintenance-data">
                  <div className="complex-input-divs">
                    <select
                      name="Condition"
                      id=""
                      className="complex-inputs"
                      value={buildingCondition}
                      onChange={(e) => setBuildingCondition(e.target.value)}           
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
                      value={buildingCriticality}
                      onChange={(e) => setBuildingCriticality(e.target.value)}
                    >
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
                    <input
                      type="text"
                      className="complex-inputs"
                      placeholder="Enter Total Gross Area"
                      value={buildingGrossArea}
                      onChange={(e) => setBuildingGrossArea(e.target.value)}
                    />
                  </div>
                  <div className="complex-input-divs">
                    <input
                      type="text"
                      className="complex-inputs"
                      placeholder="Enter Covered Area"
                      value={buildingCoveredArea}
                      onChange={(e) => setBuildingCoveredArea(e.target.value)}
                    />
                  </div>
                  <div className="complex-input-divs">
                    <input
                      type="text"
                      className="complex-inputs"
                      placeholder="Enter Total Net Area"
                      value={buildingNetArea}
                      onChange={(e) => setBuildingNetArea(e.target.value)}
                    />
                  </div>
                  <div className="complex-input-divs">
                    <input
                      type="text"
                      className="complex-inputs"
                      placeholder="Enter Total Floor"
                      value={buildingFloors}
                      onChange={(e) => setBuildingFloors(e.target.value)}
                    />
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
                  onClick={() => handleClearButton()}
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
                ??? Yes
              </div>
              <div className="logout-no" onClick={() => setShow(false)}>
                ??? No
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
                ??? Yes
              </div>
              <div className="logout-no" onClick={handleSaveNo}>
                ??? No
              </div>
            </div>
          </Modal.Body>
        </Modal>

        <div className="complex-header">
          <div className="complex-header-right">
            <span className="complex-header-button" onClick={()=>{handleNewComplex(); getNewCodeData(); setName('Create')}}>
              <BsPlusLg className="complex-header-icon" />
              <p className="complex-header-right-para">Create New Building</p>
            </span>
          </div>

          <div className="complex-header-left">
            <div className="complex-header-left-para">Building</div>
          </div>
        </div>

        <div className="complex-table">
          <div>
            <DataTable
              value={users}
              paginator
              stripedRows 
              paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
              paginatorClassName="Custompaginator"
              paginatorPosition="bottom"
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
                  return <Column key={col.field} field={col.field} header={col.header} className='complex-table-data' sortable />
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
};

export default Building;
