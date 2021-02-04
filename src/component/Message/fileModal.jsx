import React,{useState} from 'react'
import {Modal,Input,Button,Icon} from 'semantic-ui-react'
import mime from 'mime-types'
const FileModal =({closeModal,modal,uploadFile})=>{

    const [file, setFile] =useState(null)
    const [authorized, setAuthorized] =useState(['image/jpeg', 'image/png'])
    

    const addFile =event=>{
        const file = event.target.files[0]
        if (file){
            setFile(file)
        }
    }

    const sendFile =()=>{
        if (file!== null){
            if (isAuthorized.name){
           const metaData ={contentType: mime.lookup(file.name)}
           uploadFile(file, metaData)
           closeModal()
           clearFile()
            }
        }
    }

    const clearFile=()=> setFile(null)

    const isAuthorized = fileName =>  setAuthorized.includes(mime.lookup(fileName))

    return(
        <Modal basic open={modal} onClose={closeModal}>

            <Modal.Header>Select an Image File </Modal.Header>

            <Modal.Content>
            <Input
            fluid
            name="file"
            type='file'
            label="File types: jpeg,jpg,png"
            placeholder="upload a file"
            onChange={addFile}
            />
            </Modal.Content>


            <Modal.Actions>
                <Button
                color='red'
                inverted
                onClick={closeModal}
                >
                <Icon name='remove'/>
                    cancel
                </Button>

                <Button
                color='green'
                inverted
                onClick={sendFile}
                >
                <Icon name='checkmark'/>
                send
                </Button>

            </Modal.Actions>
        </Modal>

    )
}

export default FileModal