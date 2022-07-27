import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ToastContainer } from "react-toastify";
import toast from "../components/Toast";
import { InputText } from 'primereact/inputtext';
import Token from '../auth/Token'
import Axios from 'axios';
import { Dialog } from 'primereact/dialog';
import { Link } from 'react-router-dom';
import '../App.scss';
// import { MultiSelect } from 'primereact/multiselect';
// import { Dropdown } from 'primereact/dropdown';



export const AllCategory = () => {
    const [categoryDetails, setCategoryDetails] = useState();

    const [editProductDialog, setEditProductDialog] = useState(false)
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);

    const [iconImage, setIconImage] = useState({ preview: "", raw: "" })
    const [backgroundImage, setBackgroundImage] = useState({ preview: "", raw: "" })

    const [preIconImage, setPreIconImage] = useState()
    const [preBackgroundImage, setPreBackgroundImage] = useState()

    const [deleteId, setDeleteId] = useState()
    const [updateId, setUpdateId] = useState()
    const [addCategoryDialog, setAddCategoryDialog] = useState(false)
    const [name, setName] = useState()
    const dt = useRef(null);

    // let emptyProduct = {
    //     id: null,
    //     name: '',
    //     image: null,
    //     description: '',
    //     category: null,
    //     price: 0,
    //     quantity: 0,
    //     rating: 0,
    //     inventoryStatus: 'INSTOCK'
    // };
    // const [product, setProduct] = useState(emptyProduct);

    // const dropdownItems1 = [
    //     { name: 'Web Desiging', code: 'surat' },
    //     { name: 'Fullstack devloper', code: 'Option 2' },
    //     { name: 'Python', code: 'Option 3' },
    //     { name: 'Tally', code: 'Option 3' },
    //     { name: 'Game Developer', code: 'Option 3' }

    // ];

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    }

    const hideAddCategory = () => {
        setAddCategoryDialog(false)
        setBackgroundImage({ preview: "", raw: "" })
        setIconImage({ preview: "", raw: "" })
    }

    const hideEditProductDialog = () => {
        setEditProductDialog(false)
        setBackgroundImage({ preview: "", raw: "" })
        setIconImage({ preview: "", raw: "" })
        setName(null)
    }

    // const confirmDeleteProduct = (product) => {
    //     setProduct(product);
    //     setDeleteProductDialog(true);
    // }

    const deleteProduct = async () => {
        // console.log(deleteId);
        try {
            await Axios.get(`http://localhost:3000/category/delete?id=${deleteId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'auth': Token()
                },
            }
            ).then((Response) => {
                console.log(Response.data);
            }).catch((e) => {
                console.log(e);
            })
            setDeleteId(null)
            getCategoryDetails()
            setDeleteProductDialog(false)
            return toast({ type: 'success', message: 'Deleted A Category' })
        } catch (error) {
            console.log(error);
            return toast({ type: 'error', message: error.response.data.message })
        }

    }

    const addCategoryHandler = async () => {
        try {
            let data = new FormData()
            data.append('icon', iconImage.raw)
            data.append('background', backgroundImage.raw)
            data.append('name', name)
            await Axios.post(`http://localhost:3000/category/addcategory`,
                data,
                {

                    headers: {
                        'Content-Type': 'multipart/form-data',
                        "auth": Token()
                    }
                }
            ).then(async () => {
                await getCategoryDetails()
                setAddCategoryDialog(false)
                setBackgroundImage({ preview: "", raw: "" })
                setIconImage({ preview: "", raw: "" })
                toast({ type: 'success', message: `Created New Category, ${name}` })
                setName(null)
            })
        } catch (error) {
            console.log(error);
            return toast({ type: 'error', message: error.response.data.message })
        }
    }

    const deleteProductDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
        </>
    );
    const iconBodyTemplate = (option) => {
        return (
            <div className="p-multiselect-representative-option">
                <a target='blank' href={`http://localhost:3000/images/${option.icon}`}><img alt={option.name} src={`http://localhost:3000/images/${option.icon}`} width={100} style={{ verticalAlign: 'middle' }} /></a>
            </div>
        );
    }
    const iconImageHandler = (e) => {
        console.log("InIcon");
        // console.log(e);
        setIconImage({
            preview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0]
        })
    }
    const backgroundImageHandler = (e) => {
        console.log("IN Background");
        setBackgroundImage({
            preview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0]
        })
    }
    const backGroundBodyTemplate = (option) => {
        return (
            <div className="p-multiselect-representative-option">
                <a target='blank' href={`http://localhost:3000/images/${option.background}`}><img alt={option.name} src={`http://localhost:3000/images/${option.background}`} width={100} style={{ verticalAlign: 'middle' }} /></a>
            </div>
        );
    }
    const viewBodyTemplate = (option) => {
        return (
            <div className="p-multiselect-representative-option">
                <Link to={`/viewlevels/${option._id}`}><Button className='p-button-info'>View Levels</Button></Link>
            </div>
        );
    }

    const confirmDelete = (details) => {
        setDeleteProductDialog(true)
        setDeleteId(details._id)
    }

    const deleteCatergoryTemplate = (categoryDetails) => {
        return (
            <div>
                <Button className='p-button-danger' onClick={() => confirmDelete(categoryDetails)}>Delete</Button>
            </div>
        )
    }

    const updateSubmitHandler = async () => {
        try {
            var formData = new FormData();
            if (iconImage.raw != "") {
                formData.append('icon', iconImage.raw)
            }
            if (backgroundImage.raw != "") {
                formData.append('background', backgroundImage.raw)
            }
            formData.append('name', name)
            await Axios.post(`http://localhost:3000/category/update?id=${updateId}`, formData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'auth': Token()
                },
            }).then(() => {
                setUpdateId(null)
                setIconImage({ preview: "", raw: "" })
                setBackgroundImage({ preview: "", raw: "" })
                getCategoryDetails()
                setName("")
                setEditProductDialog(false)
                setPreBackgroundImage(null)
                setPreIconImage(null)
                return toast({ type: 'success', message: 'Updated Information Successfuly' })
            })

        } catch (error) {
            console.log(error);
            return toast({ type: 'error', message: error.response.data.message })
        }
    }



    const getCategoryDetails = async () => {
        try {
            await Axios.get('http://localhost:3000/category/allcategory',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'auth': Token()
                },
            }).then((Response) => {
                setCategoryDetails(Response.data.details)
            }).catch((e) => {
                console.log(e);
            })
        } catch (error) {
            console.log(error);
        }
    }

    const updateDialog = (details) => {
        setEditProductDialog(true)
        setName(details.name)
        setUpdateId(details._id)
        setBackgroundImage({
            preview: `http://localhost:3000/images/${details.background}`,
            raw: ""
        })
        setIconImage({
            preview: `http://localhost:3000/images/${details.icon}`,
            raw: ""
        })
    }

    const updateBodyTemplate = (categoryDetails) => {
        return (
            <Button className='p-button-warning' onClick={() => updateDialog(categoryDetails)}>Update</Button>
        )
    }


    const addCategoryDialogHandler = () => {
        setAddCategoryDialog(true)
    }


    useEffect(() => {
        getCategoryDetails()
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <div className="card">
                <div className='flex justify-content-between align-items-center mb-5'>
                    <h3 className='mb-5'>All Category</h3>
                    <Button className='p-button-success' onClick={(addCategoryDialogHandler)}>Add Category</Button>
                </div>
                <DataTable ref={dt} value={categoryDetails}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive p-datatable-gridlines" paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" emptyMessage="No products found." responsiveLayout="scroll">

                    <Column field="name" header="Name"></Column>
                    <Column body={iconBodyTemplate} header="icon"></Column>
                    <Column body={backGroundBodyTemplate} header="background"></Column>
                    <Column body={viewBodyTemplate} header="view Levels"></Column>
                    <Column body={updateBodyTemplate} header="Update Levels"></Column>
                    <Column body={deleteCatergoryTemplate} header="Delete Level"></Column>

                </DataTable>
                <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                    <div className="flex align-items-center justify-content-center">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                        <span>Are you sure you want to delete ?</span>
                    </div>
                </Dialog>
                <Dialog visible={editProductDialog} style={{ width: '900px' }} header="Confirm" modal onHide={hideEditProductDialog}>
                    <div className="d-flex ">
                        <table>
                            <tbody>
                                <tr>
                                    <th><label>Name</label></th>
                                    <th><InputText type='text' value={name} onChange={(e) => setName(e.target.value)} /></th>
                                </tr>
                                <tr>
                                    <td><label>Icon Image</label></td>
                                    {/* <td><input type='file' name="icon" onChange={(e) => iconImageHandler(e)} /></td> */}
                                    <td>
                                        <div>
                                            {
                                                iconImage.preview ?
                                                    (
                                                        <img className="profilepic" src={iconImage.preview} alt="dummy" />
                                                    )
                                                    : null}
                                            <input type="file" id="upload-button" onChange={(e) => iconImageHandler(e)} />
                                            <br />
                                            {/* <button onClick={handleUpload}>Upload</button> */}
                                        </div>
                                    </td>
                                    <td><label>Background Image</label></td>
                                    {/* <td><input type='file' onChange={(e) => backgroundImageHandler(e)} /></td> */}
                                    <td>
                                        <div>
                                            {
                                                backgroundImage.preview ?
                                                    (
                                                        <img className="profilepic" src={backgroundImage.preview} alt="dummy" />
                                                    )
                                                    : null}
                                            <input type="file" id="background" onChange={(e) => backgroundImageHandler(e)} />
                                            <br />
                                            {/* <button onClick={handleUpload}>Upload</button> */}
                                        </div>
                                    </td>

                                    {/* <td><img src={`http://localhost:3000/images/${preBackgroundImage}`} width={100} /></td> */}
                                </tr>
                            </tbody>
                        </table>
                        <Button className='mt-4' onClick={updateSubmitHandler}>Submit</Button>
                    </div>
                </Dialog>



                <Dialog visible={addCategoryDialog} style={{ width: '900px' }} header="Add Category" modal onHide={hideAddCategory}>
                    <div className="d-flex ">
                        <table>
                            <tbody>
                                <tr>
                                    <th><label>Name</label></th>
                                    <th><InputText type='text' value={name} onChange={(e) => setName(e.target.value)} /></th>
                                </tr>
                                <tr>
                                    <td><label>Icon Image</label></td>
                                    {/* <td><input type='file' name="icon" onChange={(e) => iconImageHandler(e)} /></td> */}
                                    <td>
                                        <div>
                                            {
                                                iconImage.preview ?
                                                    (
                                                        <img className="profilepic" src={iconImage.preview} alt="dummy" />
                                                    )
                                                    : null}
                                            <input type="file" id="upload-button" onChange={(e) => iconImageHandler(e)} />
                                            <br />
                                            {/* <button onClick={handleUpload}>Upload</button> */}
                                        </div>
                                    </td>
                                    <td><label>Background Image</label></td>
                                    {/* <td><input type='file' onChange={(e) => backgroundImageHandler(e)} /></td> */}
                                    <td>
                                        <div>
                                            {
                                                backgroundImage.preview ?
                                                    (
                                                        <img className="profilepic" src={backgroundImage.preview} alt="dummy" />
                                                    )
                                                    : null}
                                            <input type="file" id="background" onChange={(e) => backgroundImageHandler(e)} />
                                            <br />
                                            {/* <button onClick={handleUpload}>Upload</button> */}
                                        </div>
                                    </td>

                                    {/* <td><img src={`http://localhost:3000/images/${preBackgroundImage}`} width={100} /></td> */}
                                </tr>
                            </tbody>
                        </table>
                        <Button className='mt-4' onClick={addCategoryHandler}>Submit</Button>
                    </div>
                </Dialog>

            </div>
        </div>
    );
}
