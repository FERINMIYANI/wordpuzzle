import React, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ToastContainer } from "react-toastify";
import toast from "../components/Toast";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import Axios from 'axios';
// import { Dialog } from 'primereact/dialog';
import Token from '../auth/Token'
import { Link, useParams } from 'react-router-dom';

const ViewLevels = () => {

    const { id } = useParams()

    let allLevelId = []

    const [allLevels, setAllLevels] = useState();
    const [deleteLevelId, setDeleteLevelId] = useState()
    const [levelId, setLevelId] = useState()
    const [wordId, setWordId] = useState()
    const [word, setWord] = useState()


    const [allWordImage, setAllWordImage] = useState([])

    const [deleteProductDialog, setDeleteProductDialog] = useState(false)

    const [addLevelDialog, setAddLevelDialog] = useState(false)

    const [imageWord, setImageWord] = useState({})

    // const [wordImage, setWordImage] = useState()
    const [updateWordDialog, setUpdateWordDialog] = useState(false)

    const [deleteWordDialog, setDeleteWordDialog] = useState()
    const [editDialog, setEditDialog] = useState(false)
    const [preWordImage, setPreWordImage] = useState()

    const [addWordDialog, setAddWordDialog] = useState(false)

    const [deleteId, setDeleteId] = useState()

    const getAllLevels = async () => {
        await Axios.get(`http://localhost:3000/category/viewlevel?id=${id}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'auth': Token()
            },
        }).then((Response) => {
            setAllLevels(Response.data.details.levels)
        }).catch((e) => {
            console.log(e);
        })
    }
    const hideAddLevelDialog = () => {
        setAllWordImage([])
        setAddLevelDialog(false)
    }

    if(allLevels){
        // console.log(allLevels);
    }

    const AddLevel = async () => {
        if (allWordImage.length == 1 || !allWordImage.length) {
            return toast({ type: 'error', message: "2 or More Word Are Required To Create A Level" })
        }
        else {
            try {

                let data = new FormData()
                if (allWordImage && allWordImage.length) {
                    allWordImage.map((ele, i) => {
                        data.append('word', ele.word)
                        data.append('image', ele.image.raw)
                    })
                }
                await Axios.post(`http://localhost:3000/category/addlevel?id=${id}`,
                    data,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'auth': Token()
                        }
                    }
                ).then(() => {
                    getAllLevels()
                    setAddLevelDialog(false)
                    setAllWordImage([])
                    toast({ type: 'success', message: `Level ${allLevels.length + 1} Created` })
                })

            } catch (error) {
                console.log(error);
                return toast({ type: 'error', message: error.response.data.message })
            }
        }
    }

    const addLevelDialogFooter = () => {
        return (
            <>
                <Button label="Discard" icon="pi pi-times" className="p-button-text" onClick={hideAddLevelDialog} />
                <Button label="Submit" icon="pi pi-check" className="p-button-text" onClick={AddLevel} />
            </>
        )
    }


    const handleChange = (e) => {
        if (e.target.files.length) {
            setImageWord({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0],
            });
        }
    }

    const levelAddImageHandler = (e) => {
        if (e.target.files.length) {
            setImageWord({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0],
            });
        }
    }

    if (allLevels) {
        allLevels.map((e) => {
            allLevelId.push(e._id)
        })
    }

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
        // setDeleteId(null)
    }

    const deleteLevel = async () => {
        try {
            await Axios.get(`http://localhost:3000/category/deletelevel?dataid=${deleteLevelId}&id=${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'auth': Token()
                },
            }).then((Response) => {
                getAllLevels()
            }).catch((e) => {
                console.log(e);
            })
            setDeleteProductDialog(false)
            setDeleteLevelId(null)
            return toast({ type: 'success', message: `A Level Was Deleted` })
        } catch (error) {
            console.log(error);
            return toast({ type: 'error', message: error.response.data.message })
        }
    }

    const hideAddDialog = () => {
        setAddWordDialog(false)
        setWord(null)
        // setWordImage(null)
        setImageWord({ preview: "", raw: "" })
    }

    const hideUpdateDialog = () => {
        setUpdateWordDialog(false)
        setImageWord({ preview: "", raw: "" })
        setWord(null)
    }

    const dialogAddWordHandler = () => {
        if (word && imageWord.raw) {
            let copyAllImage = [...allWordImage]
            let dummyObj = {}
            dummyObj.image = { ...imageWord }
            dummyObj.word = word
            console.log(dummyObj);
            copyAllImage.push(dummyObj)
            setAllWordImage(copyAllImage)
            setWord('')
            setImageWord({ preview: "", raw: "" })
        }
    }

    const deleteProductDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteLevel} />
        </>
    );

    const wordAdder = async () => {
        try {
            let data = new FormData()
            data.append('image', imageWord.raw)
            data.append('levelId', levelId)
            data.append('word', word)
            await Axios.post(`http://localhost:3000/category/addword?id=${id}`,
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'auth': Token()
                    }
                }).then(() => {

                })
            toast({ type: "success", message: `Word ${word} Was Appended` })
            setAddWordDialog(false)
            setImageWord({ preview: "", raw: "" })
            setWord(null)
            await getAllLevels()
        } catch (error) {
            console.log(error);
            return toast({ type: 'error', message: error.response.data.message })
        }
    }

    const addDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideAddDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={wordAdder} />
        </>
    );

    const hideDeleteWordDialog = () => {
        setDeleteWordDialog(false)
    }

    const deleteWord = async () => {
        try {
            await Axios.post(`http://localhost:3000/category/deleteword?id=${id}`, { levelId, wordId },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'auth': Token()
                },
            }).then(() => {

            }).catch((e) => {
                console.log(e);
            })
            await getAllLevels()
            setDeleteWordDialog(false)
            toast({ type: 'success', message: 'A Word Was Deleted' })
            setLevelId(null)
            setWordId(null)
        } catch (error) {
            console.log(error);
            return toast({ type: 'error', message: error.response.data.message })
        }
    }

    const deleteWordFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteWordDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteWord} />
        </>
    );

    const wordUpdater = async () => {
        try {
            let body = new FormData()
            body.append('levelId', levelId)
            if (imageWord.raw != "") {
                body.append('image', imageWord.raw)
            }
            body.append('wordId', wordId)
            body.append('word', word)
            Axios.post(`http://localhost:3000/category/updateword?id=${id}`,
                body,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'auth': Token()
                    }
                }).then((Response) => {
                    console.log(Response.data.message);
                }).catch((e) => {
                    console.log(e);
                })
            await getAllLevels()
            setUpdateWordDialog(false)
            toast({ type: 'success', message: `A Word Was Updated to ${word}` })
            setWord(null)
            setPreWordImage(null)
            setLevelId(null)
            setImageWord({ preview: "", raw: "" })
            setWordId(null)
        } catch (error) {
            console.log(error);
            return toast({ type: 'error', message: error.response.data.message })
        }
    }

    const updateDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideUpdateDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={wordUpdater} />
        </>
    )

    useEffect(() => {
        getAllLevels()

    }, []);//eslint-disable-next-line

    const wordImageTemplate = (details, index) => {
        return (
            <div>
                <a target='blank' href={`http://localhost:3000/images/${details.image}`}><img src={`http://localhost:3000/images/${details.image}`} width={100} /></a>
            </div>
        )
    }

    const updateConfirm = (details, index) => {
        setLevelId(allLevelId[index])
        setWordId(details._id)
        setUpdateWordDialog(true)
        setWord(details.word)
        setImageWord({
            preview: `http://localhost:3000/images/${details.image}`,
            raw: ""
        })
    }

    const updateWordTemplate = (details, index) => {
        return (
            <div>
                <Button className='p-button-warning' onClick={() => updateConfirm(details, index)}>Update</Button>
            </div>
        )
    }

    const deleteWordConfirm = (details, index) => {
        // console.log(index);
        setDeleteWordDialog(true)
        setLevelId(allLevelId[index])
        setWordId(details._id)
        // setDeleteId(details._id)
    }

    const deleteWordTemplate = (details, index) => {
        return (
            <div>
                <Button className='p-button-secondary' onClick={() => deleteWordConfirm(details, index)}>Delete</Button>
            </div>
        )
    }

    const allWordTemplate = (details, index) => {
        // console.log(details);
        return (
            <div className='my-5 '>
                <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
                <DataTable value={details.spellings}
                    dataKey="id" showGridlines rows={10} className="datatable-responsive p-datatable-gridlines" paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" emptyMessage="No products found." responsiveLayout="scroll" >

                    <Column className='wordRow' field='word' header='Word' ></Column>
                    <Column className='wordRow' body={wordImageTemplate} header='Word Image' ></Column>
                    <Column className='wordRow' body={(e) => updateWordTemplate(e, index.rowIndex)} header='Update' ></Column>
                    <Column className='wordRow' body={(e) => deleteWordTemplate(e, index.rowIndex)} header='Delete' ></Column>

                </DataTable>
            </div>
        )
    }

    const deleteConfirm = (details) => {
        // setDeleteLeveldetails(details)
        setDeleteLevelId(details)
        setDeleteProductDialog(true)
    }

    const confirmAdd = (details) => {
        setAddWordDialog(true)
        setLevelId(details._id)
    }

    const wordImageHandler = (e) => {
        // console.log(e.target.files[0]);
        setImageWord({
            preview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0]
        })
    }

    const editWordTemplate = (details) => {
        return (
            <div className='text-center'>
                <Button className='my-4 p-button-success' onClick={() => confirmAdd(details)}>Add</Button>
                <Button className='my-4 p-button-danger' onClick={() => deleteConfirm(details._id)}>Delete</Button>
            </div>
        )
    }

    const levelNumberTemplate = (details, index) => {
        return (
            <h3>level {index.rowIndex + 1}</h3>
        )
    }



    return (
        <div className='card'>

            <div className='flex justify-content-between mb-5 align-items-center' >
                <h3 className='mb-5'>Levels / <Link to='/'> <i>Back</i> </Link></h3>
                <Button className='p-button-success' onClick={() => setAddLevelDialog(true)}>Add Level</Button>
            </div>

            <DataTable value={allLevels}
                dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive p-datatable-gridlines" paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" emptyMessage="No products found." responsiveLayout="scroll" >

                <Column header="Level" body={levelNumberTemplate} style={{ width: '8em' }}></Column>
                <Column body={allWordTemplate} header="Words" ></Column>
                <Column header="Add Spelling" body={editWordTemplate} style={{ width: '5em' }}></Column>

            </DataTable>




            <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    <span>Are you sure you want to delete ?</span>
                </div>
            </Dialog>



            <Dialog visible={deleteWordDialog} style={{ width: '450px' }} header="delete" modal footer={deleteWordFooter} onHide={hideDeleteWordDialog}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    <span>Are you sure you want to delete ?</span>
                </div>
            </Dialog>




            <Dialog visible={addWordDialog} style={{ width: '650px' }} header="Add Level" modal footer={addDialogFooter} onHide={hideAddDialog}>
                <div>
                    <table width="100%">
                        <thead>
                            <tr>
                                <th>Word</th>
                                <th>Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='text-center'>
                                <td>
                                    <InputText style={{ width: '100%' }} value={word} onChange={(e) => setWord(e.target.value)} />
                                </td>
                                <td>
                                    <div>
                                        <label htmlFor="upload-button">
                                            {
                                                imageWord.preview ?
                                                    (
                                                        <img className="profilepic" src={imageWord.preview} alt="dummy" />
                                                    )
                                                    : (
                                                        <>
                                                            <span className="fa-stack fa-2x mt-3 mb-2">
                                                                <i className="fas fa-circle fa-stack-2x" />
                                                                <i className="fas fa-store fa-stack-1x fa-inverse" />
                                                            </span>
                                                            <h5 className="text-center choose pi pi-check">Choose Image</h5>
                                                        </>
                                                    )}
                                        </label>
                                        <input type="file" id="upload-button" style={{ display: "none" }} onChange={wordImageHandler} />
                                        <br />
                                        {/* <button onClick={handleUpload}>Upload</button> */}
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Dialog>



            <Dialog visible={updateWordDialog} style={{ width: '650px' }} header="update Level" modal footer={updateDialogFooter} onHide={hideUpdateDialog}>
                <div>
                    <table width="100%">
                        <thead>
                            <tr>
                                <th>Word</th>
                                <th>Image</th>
                                {/* <th>Previos-Image</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='text-center'>
                                <td><InputText style={{ width: '100%' }} value={word} onChange={(e) => setWord(e.target.value)} /></td>
                                {/* <td><input type='file' onChange={(e) => wordImageHandler(e)} /></td> */}
                                {/* <td><img src={`http://localhost:3000/images/${preWordImage}`} width={50} /></td> */}
                                <td>
                                    <div>
                                        <label htmlFor="upload-button">
                                            {
                                                imageWord.preview ?
                                                    (
                                                        <img className="profilepic" src={imageWord.preview} alt="dummy" />
                                                    )
                                                    : (
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
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Dialog >


            <Dialog visible={addLevelDialog} style={{ width: '1000px' }} header="Add Level" modal footer={addLevelDialogFooter} onHide={hideAddLevelDialog}>
                <div>
                    <table width="100%">
                        <thead>
                            <tr>
                                <th>Word</th>
                                <th>Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='text-center'>
                                <td><InputText style={{ width: '100%' }} value={word} onChange={(e) => setWord(e.target.value)} /></td>
                                {/* <td><input type='file' onChange={(e) => wordImageHandler(e)} /></td> */}
                                {/* <td><img src={`http://localhost:3000/images/${preWordImage}`} width={50} /></td> */}
                                <td>
                                    <div>
                                        <label htmlFor="upload-button">
                                            {
                                                imageWord.preview ?
                                                    (
                                                        <img className="profilepic" src={imageWord.preview} alt="dummy" />
                                                    )
                                                    : (
                                                        <>
                                                            <span className="fa-stack fa-2x mt-3 mb-2">
                                                                <i className="fas fa-circle fa-stack-2x" />
                                                                <i className="fas fa-store fa-stack-1x fa-inverse" />
                                                            </span>
                                                            <h5 className="text-center choose pi pi-check ">Choose Image</h5>
                                                        </>
                                                    )}
                                        </label>
                                        <input type="file" id="upload-button" style={{ display: "none" }} onChange={levelAddImageHandler} />
                                        <br />
                                        {/* <button onClick={handleUpload}>Upload</button> */}
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='flex justify-content-center'>
                        <Button className='p-button-secondary mx-auto' onClick={dialogAddWordHandler}>Add</Button>
                    </div>
                </div>

                {
                    allWordImage.length && allWordImage.length ?
                        <table width="100%">
                            <thead>
                                <tr>
                                    <th>Word</th>
                                    <th>Image</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allWordImage.map((ele, i) => {
                                        return <tr>
                                            <td align='center'>{ele.word}</td>
                                            <td align='center'><img src={ele.image.preview} width={100} /></td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>

                        : null
                }
            </Dialog >
        </div >
    )
}

export default ViewLevels