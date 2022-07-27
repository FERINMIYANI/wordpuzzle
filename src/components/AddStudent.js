import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Link } from "react-router-dom";
import "../App.scss";

export function AddStudent() {
  const [dropdownItem, setDropdownItem] = useState(null);
  const [dropdownItem1, setDropdownItem1] = useState(null);
  const [dropdownItem2, setDropdownItem2] = useState(null);
  const [image, setImage] = useState({ preview: "", raw: "" });

  const handleChange = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image.raw);

    await fetch("YOUR_URL", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });
  };

  const dropdownItems = [
    { name: "Option 1", code: "Option 1" },
    { name: "Option 2", code: "Option 2" },
    { name: "Option 3", code: "Option 3" },
  ];
  const dropdownItems1 = [
    { name: "Course 1", code: "surat" },
    { name: "Course 2", code: "Option 2" },
    { name: "Course 3", code: "Option 3" },
    { name: "Course 4", code: "Option 3" },
    { name: "Course 5", code: "Option 3" },
  ];
  const dropdownItems2 = [
    { name: "ABC", code: "surat" },
    { name: "DEF", code: "Option 2" },
    { name: "GHI", code: "Option 3" },
    { name: "JKL", code: "Option 3" },
    { name: "MNO", code: "Option 3" },
  ];

  // const toast = useRef(null);
  // const onUpload = () => {
  //     toast.current.show({ severity: "info", summary: "Success", detail: "File Uploaded", life: 3000 });
  // };
  return (
    <div>
      <div className="card">
        <span>
          <Link to="/super-admin/Students">Student</Link> <i className="pi pi-angle-right" /> Add Student
        </span>
      </div>
      <div className="grid">
        <div className="col-8">
          <div className="card">
            <h5>Student Details</h5>
            <div className="p-fluid formgrid grid">
              <div className="field col-12 md:col-4">
                <label htmlFor="firstname2">Firstname</label>
                <InputText id="firstname2" type="text" />
              </div>
              <div className="field col-12 md:col-4">
                <label htmlFor="lastname2">Lastname</label>
                <InputText id="lastname2" type="text" />
              </div>
              <div className="field col-12 md:col-4">
                <label htmlFor="lastname2">Fathername</label>
                <InputText id="lastname2" type="text" />
              </div>
              <div className="field col-12 md:col-6">
                <label htmlFor="lastname2">Date Of Joining</label>
                <InputText id="lastname2" type="date" />
              </div>
              <div className="field col-12 md:col-6">
                <label htmlFor="lastname2">Date Of Course-End</label>
                <InputText id="lastname2" type="date" />
              </div>
              <div className="field col-12 md:col-6">
                <label htmlFor="lastname2">Student Mobile no.</label>
                <InputText id="lastname2" type="number" />
              </div>
              <div className="field col-12 md:col-6">
                <label htmlFor="lastname2">Working Hours</label>
                <InputText id="lastname2" type="text" />
              </div>

              <div className="field col-12 md:col-6">
                <label htmlFor="lastname2">Course Name</label>
                <Dropdown id="state" value={dropdownItem1} onChange={(e) => setDropdownItem1(e.value)} options={dropdownItems1} optionLabel="name" placeholder="Select One"></Dropdown>
              </div>
              <div className="field col-12 md:col-6">
                <label htmlFor="lastname2">Faculty Name</label>
                <Dropdown id="state" value={dropdownItem2} onChange={(e) => setDropdownItem2(e.value)} options={dropdownItems2} optionLabel="name" placeholder="Select One"></Dropdown>
              </div>
              <div className="field col-12">
                <label htmlFor="address">Address</label>
                <InputTextarea id="address" rows="4" />
              </div>
              <div className="field col-12 md:col-6">
                <label htmlFor="city">City</label>
                <InputText id="city" type="text" />
              </div>
              <div className="field col-12 md:col-3">
                <label htmlFor="state">State</label>
                <Dropdown id="state" value={dropdownItem} onChange={(e) => setDropdownItem(e.value)} options={dropdownItems} optionLabel="name" placeholder="Select One"></Dropdown>
              </div>
              <div className="field col-12 md:col-3">
                <label htmlFor="zip">Zip</label>
                <InputText id="zip" type="text" />
              </div>
            </div>
          </div>
        </div>

        <div className="col-4">
          <div className="card card-user">
            <div>
              <label htmlFor="upload-button">
                {image.preview ? (
                  <img className="profilepic" src={image.preview} alt="dummy" />
                ) : (
                  <>
                    <span className="fa-stack fa-2x mt-3 mb-2">
                      <i className="fas fa-circle fa-stack-2x" />
                      <i className="fas fa-store fa-stack-1x fa-inverse" />
                    </span>
                    <h5 className="text-center choose pi pi-check ">Choose Image</h5>
                  </>
                )}
              </label>
              <input type="file" id="upload-button" style={{ display: "none" }} onChange={handleChange} />
              <br />
              {/* <button onClick={handleUpload}>Upload</button> */}
            </div>

            <div>
              <div className="p-fluid formgrid grid">
                <div className="field col-12 md:col-12">
                  <label htmlFor="firstname2">Email</label>
                  <InputText id="firstname2" type="text" />
                </div>
                <div className="field col-12 md:col-12">
                  <label htmlFor="firstname2">Password</label>
                  <InputText id="firstname2" type="password" />
                </div>
              </div>
            </div>
            <div className='backbtn'>
              <Link to="/super-admin/Students">
                <Button className="submitbtn" label="Back" icon="pi pi-arrow-left" />
              </Link>
              <Link to="/super-admin/Students">
                <Button className="btn" label="Submit" icon="pi pi-check" onClick={handleUpload} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}