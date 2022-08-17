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
import "../Module/Module.css";
import { classNames } from 'primereact/utils';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const URL = "http://103.226.217.67:443/api/complex/create-code?OrgId=2";

const Complex = () => {
  const [users, setUsers] = useState("");
  const [edit, setEdit] = useState(false);
  const [complexId, setComplexId] = useState("");
  const [complexCode, setComplexCode] = useState();
  const [complexName, setComplexName] = useState("");
  const [complexAddress, setComplexAddress] = useState("");
  const [complexCity, setComplexCity] = useState("");
  const [complexStatus, setComplexStatus] = useState("");
  const [complexAvailability, setComplexAvailability] = useState("");
  const [complexPostalCode, setComplexPostalCode] = useState("");
  const [complexCondition, setComplexCondition] = useState("");
  const [complexCriticality, setComplexCriticality] = useState("");
  const [complexGrossArea, setComplexGrossArea] = useState("");
  const [complexCoveredArea, setComplexCoveredArea] = useState("");
  const [complexNetArea, setComplexNetArea] = useState("");
  const [complexBuildings, setComplexBuildings] = useState("");
  const [name, setName] = useState("");
  const [steric, setSteric] = useState("");
  const [modal, setModal] = useState(false);
  const [show, setShow] = useState(false);
  const [saveModal, setSaveModal] = useState(false);
  const [saveData, setSaveData] = useState(false);
  const [filters1, setFilters1] = useState(null);
  const [globalFilterValue1, setGlobalFilterValue1] = useState("");
  const dt = useRef(null);
  const cols = [
    { field: "complexCode", header: "Code" },
    { field: "complexName", header: "Name" },
    { field: "address", header: "Address" },
    { field: "status", header: "status" },
    { field: "city", header: "City" },
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

  const getNewCode = () => {
    axios.get(URL).then((res) => {
      setComplexCode(res.data.data);
    });
  };

  const getTableData = () => {
    axios
      .get(
        "http://103.226.217.67:443/api/complex/fetch-all?OrgId=2&SupplierId=0"
      )
      .then((res) => {
        setUsers(res.data.data);
      });
  };
  const handleClearButton = () => {
    setComplexAddress("");
    setComplexCity("");
    setComplexName("");
    setComplexStatus("");
    setComplexCondition("");
    setComplexBuildings("");
    setComplexAvailability("");
    setComplexCoveredArea("");
    setComplexCriticality("");
    setComplexGrossArea("");
    setComplexNetArea("");
    setComplexPostalCode("");
  };
  const resetData = () => {
    setComplexAddress("");
    setComplexCity("");
    setComplexCode("");
    setComplexName("");
    setComplexStatus("");
    setComplexCondition("");
    setComplexBuildings("");
    setComplexAvailability("");
    setComplexCoveredArea("");
    setComplexCriticality("");
    setComplexGrossArea("");
    setComplexNetArea("");
    setComplexPostalCode("");
  };
  const action = (data) => {
    return (
      <div className="complex-table-data-action">
        <FiEdit
          className="update-icon"
          onClick={(e) => {
            handleUpdateData(e, data);
            setName("Update");
          }}
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
    setComplexId(data.complexId);
  };

  const handleDelete = () => {
    axios
      .delete(`http://103.226.217.67:443/api/complex/delete?id=${complexId}`)
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
    setComplexId(data.complexId);
    setComplexAddress(data.address);
    setComplexCity(data.city);
    setComplexStatus(data.status);
    setComplexCode(data.complexCode);
    setComplexName(data.complexName);
    setComplexCondition(data.condition);
    setComplexBuildings(data.totalBuildings);
    setComplexAvailability(data.availability);
    setComplexCoveredArea(data.coveredArea);
    setComplexCriticality(data.criticality);
    setComplexGrossArea(data.totalGrossArea);
    setComplexNetArea(data.totalNetArea);
    setComplexPostalCode(data.zipcode);
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
    if (
      complexAddress === "" ||
      complexCity === "" ||
      complexCode === "" ||
      complexName === "" ||
      complexStatus === ""
    ) {
      setSteric("*");
      toast.warn("Please fill all required fields.", {
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
      setModal(true);
    } else {
      setSaveData(false);
      if (edit === false) {
        axios
          .post(" http://103.226.217.67:443/api/complex/create", {
            OrgId: 2,
            ComplexCode: complexCode,
            ComplexName: complexName,
            Address: complexAddress,
            City: complexCity,
            Status: complexStatus,
            condition: complexCondition,
            totalBuildings: complexBuildings,
            availability: complexAvailability,
            coveredArea: complexCoveredArea,
            criticality: complexCriticality,
            totalGrossArea: complexGrossArea,
            totalNetArea: complexNetArea,
            zipcode: complexPostalCode,
            CreatedBy: 1,
          })
          .then((res) => {
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
          });
      } else {
        axios
          .put("http://103.226.217.67:443/api/complex/update", {
            OrgId: 2,
            ComplexCode: complexCode,
            complexId: complexId,
            ComplexName: complexName,
            Address: complexAddress,
            City: complexCity,
            Status: complexStatus,
            condition: complexCondition,
            totalBuildings: complexBuildings,
            availability: complexAvailability,
            coveredArea: complexCoveredArea,
            criticality: complexCriticality,
            totalGrossArea: complexGrossArea,
            totalNetArea: complexNetArea,
            zipcode: complexPostalCode,
            CreatedBy: 1,
          })
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
          .catch((err) => {
            console.log(err);
          });
        setEdit(false);
      }

      resetData();
    }
  };

  useEffect(() => {
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
            {name} Complex
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
                      value={complexCode}
                      disabled
                    />
                  </div>
                  <div className="complex-input-divs">
                    <input
                      type="text"
                      className="complex-inputs"
                      placeholder="Enter Complex Name"
                      value={complexName}
                      onChange={(e) => {
                        setComplexName(e.target.value);
                      }}
                      onBlur={(e) => {
                        if (complexName === "") {
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
                      value={complexAvailability}
                      onChange={(e) => setComplexAvailability(e.target.value)}
                    >
                      <option value="">Availability</option>
                      <option value="InUse">In Use</option>
                      <option value="Vacant">Vacant</option>
                    </select>
                  </div>
                  <div className="complex-input-divs">
                    <select
                      name="Status"
                      id=""
                      className="complex-inputs"
                      value={complexStatus}
                      onChange={(e) => setComplexStatus(e.target.value)}
                      onBlur={(e) => {
                        if (complexStatus === "") {
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

              <div className="complex-location">
                <h5>Location:</h5>
                <div className="complex-location-data">
                  <div className="complex-input-divs">
                    <input
                      type="text"
                      className="complex-inputs"
                      placeholder="Enter Complex Address"
                      value={complexAddress}
                      onChange={(e) => setComplexAddress(e.target.value)}
                      onBlur={(e) => {
                        if (complexAddress === "") {
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
                    <input
                      type="text"
                      className="complex-inputs"
                      placeholder="Enter Zip/Postal Code"
                      value={complexPostalCode}
                      onChange={(e) => setComplexPostalCode(e.target.value)}
                    />
                  </div>
                  <div className="complex-input-divs">
                    <select
                      name="City"
                      id=""
                      className="complex-inputs"
                      value={complexCity}
                      onChange={(e) => setComplexCity(e.target.value)}
                      onBlur={(e) => {
                        if (complexCity === "") {
                          handleOnBlurClick(e);
                        }
                      }}
                    >
                      <option value="">City</option>
                      <option value="Lahore">Lahore</option>
                      <option value="Multan">Multan</option>
                      <option value="Rawalpindi">Rawalpindi</option>
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
                      value={complexCondition}
                      onChange={(e) => setComplexCondition(e.target.value)}
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
                      value={complexCriticality}
                      onChange={(e) => setComplexCriticality(e.target.value)}
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
                      value={complexGrossArea}
                      onChange={(e) => setComplexGrossArea(e.target.value)}
                    />
                  </div>
                  <div className="complex-input-divs">
                    <input
                      type="text"
                      className="complex-inputs"
                      placeholder="Enter Covered Area"
                      value={complexCoveredArea}
                      onChange={(e) => setComplexCoveredArea(e.target.value)}
                    />
                  </div>
                  <div className="complex-input-divs">
                    <input
                      type="text"
                      className="complex-inputs"
                      placeholder="Enter Total Net Area"
                      value={complexNetArea}
                      onChange={(e) => setComplexNetArea(e.target.value)}
                    />
                  </div>
                  <div className="complex-input-divs">
                    <input
                      type="text"
                      className="complex-inputs"
                      placeholder="Enter Total Buildings"
                      value={complexBuildings}
                      onChange={(e) => setComplexBuildings(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="complex-footer">
                <Button
                  variant="primary"
                  className="complex-footer-button"
                  size="sm"
                  style={{
                    marginLeft: "1%",
                    color: "white",
                    width: "max-content",
                  }}
                  onClick={handleSaveButton}
                >
                  <FiSave
                    style={{
                      color: "white",
                      width: "max-content",
                      paddingRight: "1px",
                    }}
                  />{" "}
                  Save
                </Button>
                <Button
                  variant="link"
                  style={{
                    marginLeft: "1%",
                    color: "#6366F1",
                    width: "max-content",
                    backgroundColor: "white",
                  }}
                  size="sm"
                  onClick={() => {
                    handleClearButton();
                  }}
                >
                  <FiRefreshCcw
                    style={{
                      color: "#6366F1",
                      width: "max-content",
                      paddingRight: "1px",
                    }}
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
            <span
              className="complex-header-button"
              onClick={() => {
                handleNewComplex();
                getNewCode();
                setName("Create");
              }}
            >
              <BsPlusLg className="complex-header-icon" />
              <p className="complex-header-right-para">Create New Complex</p>
            </span>
          </div>

          <div className="complex-header-left">
            <div className="complex-header-left-para">Complex</div>
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
              {cols.map((col) => {
                return (
                  <Column
                    keys={col.field}
                    field={col.field}
                    header={col.header}
                    value={(e) => e.users.field}
                    sortable
                    className="complex-table-data"
                  />
                );
              })}
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
      <ToastContainer />
    </Sidebar>
  );
};

export default Complex;
