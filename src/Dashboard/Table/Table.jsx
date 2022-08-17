import React, { useEffect, useState } from "react";
import "./Table.css";
import "./Modal.css";
import { FiEdit } from "react-icons/fi";
import Modal from "react-bootstrap/Modal";
import { FiUpload } from "react-icons/fi";
import { BiRefresh } from "react-icons/bi";
import { FiPower } from "react-icons/fi";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
// import ActionModal from "../../Modals/ActionModal";

const Table = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };

  const [value1, setValue1] = useState("LHR.L2SP2022.07.00022684");
  const [formErrors, setFormErrors] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange1 = (e) => {
    console.log(value1);
    setValue1(e.target.value);
  };

  const checkCityCode = (value) => {
    let check = "";
    for (let i = 0; value[i] !== "."; i++) {
      check = check + value[i];
    }
    const regMatch = /^[a-zA-Z]*$/.test(check);

    if (regMatch && check.toUpperCase() === check) {
      return true;
    } else {
      return false;
    }
  };

  const checkInputLength = (value) => {
    if (value.length !== 24) {
      //  alert('Invalid Input.')
      return false;
    } else {
      return true;
    }
  };

  const checkDate = (value) => {
    let count = 0,
      index;
    for (let i = 0; i < value.length; i++) {
      if (value[i] === ".") {
        count++;
        if (count === 2) {
          index = i;
        }
      }
    }

    let checkDate = value1[index + 1] + value1[index + 2];
    parseInt(checkDate);
    // console.log(typeof(checkDate))
    if (checkDate < 0 || checkDate > 31) {
      // alert('Given Date is incorrect')
      return false;
    } else {
      return true;
    }
  };

  const checkYear = (value) => {
    let count = 0,
      index;
    for (let i = 0; i < value.length; i++) {
      if (value[i] === ".") {
        count++;
        if (count === 2) {
          index = i;
        }
      }
    }
    let checkYear = index - 4;
    for (let i = checkYear; i < index; i++) {
      if (isNaN(value1[i])) {
        //  console.log("Incorrect Year")
        return false;
      } else {
        // console.log('Correct Year')
        return true;
      }
    }
  };

  useEffect(() => {
    // console.log(formErrors);
    if (Object.keys(formErrors.length === 0 && isSubmit)) {
      // console.log(value1);
    }
  }, [formErrors]);

  const validate = (value) => {
    let errors = "";
    if (
      checkCityCode(value) === true &&
      checkYear(value) === true &&
      checkDate(value) === true &&
      checkInputLength(value) === true
    ) {
      console.log("Form is valid");
    } else {
      console.log("Form is Invalid");
      errors = "🚫 Invalid Input";
    }
    return errors;
  };

  const handleOnBlurClick = (e) => {
    e.preventDefault();
    setFormErrors(validate(value1));
    setIsSubmit(true);
  };

  const handleUpdate = () => {
    alert("Data Updated successfully");
  };

  const Ticket = [
    {
      Ticket: "2022.07.00020320",
      ReportedBy: "Saad Chachar",
      LSP: "Fare Collection",
      Incident: "Unmanned TVM",
      Status:<span className="SuccessButton">Closed</span>,
      Request: "Incident",
      Priority:<span className="HighButton">High</span>,
      Opened: "02/07/2022 09:46 PM",
      Exp: "02/07/2022 09:46 PM",
      Closed: "Incident",
      Action:<FiEdit className="EditButton" onClick={() => setModal(true)} />,
    },
    {
      Ticket: "2022.07.00020320",
      ReportedBy: "Saad Chachar",
      LSP: "Fare Collection",
      Incident: "Unmanned TVM",
      Status:<span className="OverdueButton">Overdue</span>,
      Request: "Incident",
      Priority:<span className="HighButton">High</span>,
      Opened: "02/07/2022 09:46 PM",
      Exp: "02/07/2022 09:46 PM",
      Closed: "Incident",
      Action: <FiEdit className="EditButton" onClick={() => setModal(true)} />,
    },
    {
      Ticket: "2022.07.00020320",
      ReportedBy: "Saad Chachar",
      LSP: "Fare Collection",
      Incident: "Unmanned TVM",
      Status:<span className="SuccessButton">Closed</span>,
      Request: "Incident",
      Priority:<span className="LowButton">Critical</span>,
      Opened: "02/07/2022 09:46 PM",
      Exp: "02/07/2022 09:46 PM",
      Closed: "Incident",
      Action: <FiEdit className="EditButton" onClick={() => setModal(true)} />,
    },
    {
      Ticket: "2022.07.00020320",
      ReportedBy: "Saad Chachar",
      LSP: "Fare Collection",
      Incident: "Unmanned TVM",
      Status: <span className="SuccessButton">Closed</span>,
      Request: "Incident",
      Priority:<span className="HighButton">High</span>,
      Opened: "02/07/2022 09:46 PM",
      Exp: "02/07/2022 09:46 PM",
      Closed: "Incident",
      Action: <FiEdit className="EditButton" onClick={() => setModal(true)} />,
    },
    {
      Ticket: "2022.07.00020320",
      ReportedBy: "Saad Chachar",
      LSP: "Fare Collection",
      Incident: "Unmanned TVM",
      Status: <span className="SuccessButton">Closed</span>,
      Request: "Incident",
      Priority:<span className="HighButton">High</span>,
      Opened: "02/07/2022 09:46 PM",
      Exp: "02/07/2022 09:46 PM",
      Closed: "Incident",
      Action: <FiEdit className="EditButton" onClick={() => setModal(true)} />,
    },
    {
      Ticket: "2022.07.00020320",
      ReportedBy: "Saad Chachar",
      LSP: "Fare Collection",
      Incident: "Unmanned TVM",
      Status:<span className="AutoCloseButton">AutoClosed</span>,
      Request: "Incident",
      Priority:<span className="LowButton">Critical</span>,
      Opened: "02/07/2022 09:46 PM",
      Exp: "02/07/2022 09:46 PM",
      Closed: "Incident",
      Action: <FiEdit className="EditButton" onClick={() => setModal(true)} />,
    },
    {
      Ticket: "",
      ReportedBy: "",
      LSP: "",
      Incident: "",
      // Status:<span className="SuccessButton">Closed</span>,
      Request: "",
      Priority: "",
      Opened: "",
      Exp: "",
      Closed: "",
      Action: "",
    },
    {
      Ticket: "",
      ReportedBy: "",
      LSP: "",
      Incident: "",
      Status: "",
      Request: "",
      Priority: "",
      Opened: "",
      Exp: "",
      Closed: "",
      Action: "",
    },
  ];

  return (
    <div className="Table">
      <div className=".modal-90w">
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
            <Modal.Title>Update Service Ticket</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="BodyHeader">
              <div className="basedata">Base Data</div>

              <div className="horizontal">
                <span className="yellowspan"></span>
                <span className="greyspan"></span>
              </div>
            </div>

            <div className="body">
              <div className="general">
                <h5>General:</h5>

                <div className="Generalinputs">
                  <section>
                    <div className="Generalinput1">
                      <label className="GeneralLabel">
                        Expected Ticket Code
                      </label>
                      <input
                        type="text"
                        className="input1"
                        required
                        onBlur={(e) => {
                          handleOnBlurClick(e);
                        }}
                        value={value1}
                        onChange={(e) => handleChange1(e)}
                      />
                      <p className="display-input-error">{formErrors}</p>
                    </div>

                    <div className="Generalinput2">
                      <label className="GeneralLabel">
                        Service Provider<span style={{ color: "red" }}>*</span>
                      </label>
                      <select
                        name="ServiceProvider"
                        className="input2"
                        required
                      >
                        <option value="ServiceProvider" defaultValue>
                          ServicePropvider
                        </option>
                        <option value="L2SP1">L2SP1</option>
                        <option value="L2SP2">L2SP2</option>
                        <option value="L2SP3">L2SP3</option>
                        <option value="L2SP4">L2SP4</option>
                      </select>
                    </div>

                    <div className="Generalinput3">
                      <label className="GeneralLabel">
                        Ticket Type <span style={{ color: "red" }}>*</span>
                      </label>
                      <select name="Ticket" className="input3" required>
                        <option value="TicketType" selected>
                          Ticket Type
                        </option>
                        <option value="Faulty">Faulty</option>
                        <option value="Incident">Incident</option>
                      </select>
                    </div>

                    <div className="Generalinput4">
                      <label className="GeneralLabel">
                        Fault/Incident Type
                        <span style={{ color: "red" }}>*</span>
                      </label>

                      <select name="Ticket" className="input4" required>
                        <option value="TicketType" selected>
                          Ticket Type
                        </option>
                        <option value="Faulty">Faulty</option>
                        <option value="Incident">Incident</option>
                      </select>
                    </div>
                    <div className="Generalinput5">
                      <label className="GeneralLabel">
                        System<span style={{ color: "red" }}>*</span>
                      </label>
                      <select className="input5" name="System" required>
                        <option value="System" selected>
                          System
                        </option>
                      </select>
                    </div>

                    <div className="Generalinput6">
                      <label className="GeneralLabel">
                        Penalty Amount<span style={{ color: "red" }}>*</span>
                      </label>
                      <select className="input6" name="System" required>
                        <option value="System" selected>
                          System
                        </option>
                      </select>
                    </div>
                  </section>
                </div>
              </div>

              <div className="review">
                <h5>Reviews and Files</h5>

                <div className="reviewBody">
                  <div className="reviewText">
                    <textarea></textarea>
                  </div>

                  <div className="Buttondiv">
                    <span className="BrowseButton">
                      <FiUpload className="BrowseIcon" />
                      <p className="BrowsePara">Browse</p>
                    </span>
                  </div>
                </div>
              </div>

              <div className="Location">
                <h5>Location:</h5>

                <div className="loacationInputs">
                  <section>
                    <div className="Locationinput">
                      <label className="LocationLabel">
                        Complex<span style={{ color: "red" }}>*</span>
                      </label>
                      <select name="Station" className="input2" required>
                        <option value="Station">
                          Station 025 - Thokar Niaz Baig
                        </option>
                        <option value="L2SP1">L2SP1</option>
                        <option value="L2SP2">L2SP2</option>
                        <option value="L2SP3">L2SP3</option>
                        <option value="L2SP4">L2SP4</option>
                      </select>
                    </div>

                    <div className="Locationinput">
                      <label className="LocationLabel">
                        Building<span style={{ color: "red" }}>*</span>
                      </label>
                      <select name="Building" className="input3">
                        <option value="Building">Building</option>
                        <option value="Faulty">Faulty</option>
                        <option value="Incident">Incident</option>
                      </select>
                    </div>

                    <div className="Locationinput">
                      <label className="LocationLabel">
                        Floor<span style={{ color: "red" }}>*</span>
                      </label>
                      <select name="Floor" className="input4">
                        <option value="Floor">Floor</option>
                        <option value="Faulty">Faulty</option>
                        <option value="Incident">Incident</option>
                      </select>
                    </div>

                    <div className="Locationinput">
                      <label className="LocationLabel">
                        Room<span style={{ color: "red" }}>*</span>
                      </label>
                      <select className="input6" name="Room">
                        <option value="Room">Room</option>
                      </select>
                    </div>
                  </section>
                </div>
              </div>

              <div className="Footer">
                <div className="button1">
                  <BiRefresh className="FooterIcon2" /> Clear
                </div>
                <div className="button2" onClick={handleUpdate}>
                  <FiPower className="FooterIcon1" />
                  Update
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        {/* <ActionModal modal={modal} toggle={toggle}/> */}
      </div>

      <table className="Ttable">
      <DataTable 
            value={Ticket}
            paginatorPosition="bottom"
            // rowsPerPageTemplate="5,10,15"
            dataKey="id"
            paginator
            emptyMessage="No data found."
            className="datatable-responsive"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} posts"
            rows={15}
         >

        <Column field='Ticket' className='complex-table-data' sortable header="Ticket" ></Column>
        <Column field='ReportedBy' className='complex-table-data' sortable header="Reported By" ></Column>
        <Column field='LSP' className='complex-table-data' sortable header="LSP" ></Column>
        <Column field='Incident' className='complex-table-data' sortable header="Incident" ></Column>
        <Column field='Status' className='complex-table-data' sortable header="Status" ></Column>
        <Column field='Request' className='complex-table-data' sortable header="Request" ></Column>
        <Column field='Priority' className='complex-table-data' sortable header="Priority" ></Column>
        <Column field='Opened' className='complex-table-data' sortable header="Opened" ></Column>
        <Column field='Exp' className='complex-table-data' sortable header="Exp.Cl" ></Column>
        <Column field='Closed' className='complex-table-data' sortable header="Closed@" ></Column>
        <Column field='Action' className='complex-table-data' sortable header="Action" ></Column>

   
       </DataTable>
      </table>
    </div>
  );
};

export default Table;
