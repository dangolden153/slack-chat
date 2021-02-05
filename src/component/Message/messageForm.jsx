import React,{useState} from 'react'
import {Segment, Input,Button} from 'semantic-ui-react'
import FileModal from './fileModal'
import firebase from '../firebase'
import FileUpload from './fileUpload'

const MessageForm =({channel,user,messageRef,getMessagesRef})=>{

    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState([])
    const [modal, setModal] = useState(false)
    

    const openModal=()=> setModal(true)
    const closeModal=()=> setModal(false)

    const creatMessage =(fileUrl = null)=>{
        const messages ={
            timeStamp : firebase.database.ServerValue.TIMESTAMP,
            
            users: {
                id: user.uid,
                name: user.displayName,
                avatar: user.photoURL
            }

        };

       if (fileUrl !== null) {
            messages['image'] = fileUrl}
      
          else { messages['content'] = message}
      

        return messages
    }

    const submitMessage=()=>{

        setIsLoading(true)
        if (message){
            getMessagesRef()
            .child(channel.id)
            .push()
            .set(creatMessage())

            .then(()=> {
                console.log(message)
                setIsLoading(false)
                setMessage('')

            }) .catch(err => {
                console.log(err)
                setIsLoading(false)
            })


        } else {
            setError({message: 'add a message'})
        }
    }


    // const uploadFile=(file, metaData)=>{
    //     const pathToUpload = channel.id
    //     const ref = messageRef
    //     const pathFIle = `chat/public${uuidv4()}.jpg`
    //     setUploadState('uploading')
    //     setUploadTask(storageRef.child(pathFIle).put(file,metaData))
       
      
    //         uploadTask.on('state_changed', snap =>{
    //             const percentageUpLoad = Math.round((snap.bytesTransferred / snap.totalBytes) * 100)
    //             setpercentageUpLoad(percentageUpLoad)
    //             })

       
           

       
    //          uploadTask.snapShot.ref.getDownloadURL() 
    //          .then(downloadUrl => sendFile(ref,pathToUpload,downloadUrl))
    //          .catch(err => console.log(err))
    //      }
        
    

    // const sendFile =(ref,pathToUpload,fileUrl)=>{
    //     ref.child(pathToUpload)
    //     .push()
    //     .set(creatMessage(fileUrl))
    //     .then(()=>{
    //         setUploadState('done')
    //     })
    //     .catch(err => console.log(err))
    // }









    return(
        <Segment className="message_form">


            <Input
            placeholder="write your message"
            label={<Button icon="add"/>}
            name="message"
            fluid
            labelPosition="left"
            style={{marginBottom: '10px'}}
            value={message}
             onChange={e=> setMessage(e.target.value)}
            
            />


            <Button.Group icon widths='2' >
                <Button
                color="orange"
                 content="add reply"
                 disabled={isLoading}
                 floated="left"
                 icon="edit"
                 onClick={submitMessage}
                 
                />
                <Button
                color="teal"
                content="cloud media"
                icon="cloud upload"
                floated="right"
                onClick={openModal}
                />

                <FileUpload 
                modal={modal}
                closeModal={closeModal}
                creatMessage ={creatMessage}
                channel={channel}
                messageRef={messageRef}
                user={user}
                />
                {/* <FileModal 
                modal={modal}
                closeModal={closeModal}
                uploadFile={uploadFile}
                /> */}
            </Button.Group>
        </Segment>
    )
}

export default MessageForm