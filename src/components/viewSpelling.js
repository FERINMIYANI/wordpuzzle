import React from 'react'
import { useState, useEffect } from 'react'
import { DataTable } from 'primereact/datatable';
import { Link } from 'react-router-dom'
import { Dialog } from 'primereact/dialog';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';

const ViewSpelling = () => {

    const { id } = useParams()
    // console.log(id);

    const [allSpelling, setAllSpelling] = useState()
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [editProductDialog, setEditProductDialog] = useState()
    const [input, setInput] = useState()
    const [wordImage, setWordImage] = useState()
    const [words, setWords] = useState()

    const getAllSpelling = async () => {
        let categoryId = localStorage.getItem("categoryId")
        await Axios.get(`http://localhost:3000/category/level?id=${categoryId}`).then((Response) => {
            // console.log("spelling", Response.data.details);
            // console.log(details);
            // setAllSpelling(details.spelling)
        })
    }

    useEffect(() => {
        getAllSpelling()
    }, [])   //eslint-disable-next-line

    const deleteWord = (i) => {
        let copyWord = [...words]
        copyWord.splice(i, 1)
        setWords(copyWord)
    }

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    }

    const hideEditProductDialog = () => {
        setEditProductDialog(false)
        setWordImage(null)
        setInput(null)
    }

    const deleteProductDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteWord} />
        </>
    );



    const updateWord = (i) => {
        // let copyWord = [...words]
        // copyWord.splice(i, 0, input)
        // setInput("")
    }

    const deleteWordTemplate = () => {

        return (
            <div>
                <Button onClick={() => setDeleteProductDialog(true)}>Delete</Button>
            </div>
        )
    }

    const updateImageHandler = (e) => {
        setWordImage(e.target.files[0])
    }

    const wordImageTemplate = (details) => {
        return (
            <div>
                <img src={`http://localhost:3000/public/images/${details.image}`} width={100} alt='word' />
            </div>
        )
    }

    const openEditDialog = (option) => {
        setInput(option.word)
        setEditProductDialog(true)
    }

    const updateWordTemplate = (option) => {
        return (
            <div>
                <Button onClick={() => openEditDialog(option)}>Update spelling</Button>
            </div>
        )
    }


    return (
        <div className='card'>
            <div className='flex align-items-center mb-5 justify-content-between'>
                <h3 className='m-0'>Spellings</h3>
                <Button className='ml-5' onClick={() => setEditProductDialog(true)}>Add</Button>
            </div>
            <DataTable value={allSpelling}
                dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive p-datatable-gridlines" paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" emptyMessage="No products found." responsiveLayout="scroll" >
                <Column header='spellings' field='word' />
                <Column body={wordImageTemplate} header='Word Image' />
                <Column body={updateWordTemplate} header='update Word' />
                <Column body={deleteWordTemplate} header='Delete Word' />
            </DataTable>
            <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Delete" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    <span>Are you sure you want to delete </span>
                </div>
            </Dialog>
            <Dialog visible={editProductDialog} style={{ width: '450px' }} header="Add/Update" modal onHide={hideEditProductDialog}>
                <table>
                    <tbody>
                        <tr>
                            <td><label>word</label></td>
                            <td><InputText type='text' value={input} onChange={(e) => setInput(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td><label>Word-Image</label></td>
                            <td><input type='file' onChange={(e) => updateImageHandler(e)} /></td>
                            <td><img src={`http://localhost:3000/public/images/${wordImage}`} /></td>
                        </tr>
                    </tbody>
                </table>
                <Button className='mt-5' onClick={updateWord}>Submit</Button>
            </Dialog>
        </div>
    )
}

export default ViewSpelling