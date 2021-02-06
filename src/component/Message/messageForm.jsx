import React,{useState} from 'react'
import {Segment, Input,Button} from 'semantic-ui-react'
import FileModal from './fileModal'
import firebase from '../firebase'
import FileUpload from './fileUpload'

const MessageForm =({channel,user,messageRef,getMessagesRef,privateChannel,
    privateMessageRef})=>{

    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState([])
    const [modal, setModal] = useState(false)
    const [typingRef, settypingRef] = useState(firebase.database().ref('typing'))
    

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


    const handleKeyDown=()=>{
        if (message){
            typingRef
            .child(channel.id)
            .child(user.uid)
            .set(user.displayName)

        }  else {
            typingRef
            .child(channel.id)
            .child(user.uid)
            .remove()
        }
    }


    const submitMessage=()=>{

        setIsLoading(true)
        if (message){
            getMessagesRef()
            .child(channel.id)
            .push()
            .set(creatMessage())

            .then(()=> {
                setIsLoading(false)
                setMessage('')
                typingRef
                .child(channel.id)
                .child(user.uid)
                .remove()

            }) .catch(err => {
                console.log(err)
                setIsLoading(false)
            })


        } else {
            setError({message: 'add a message'})
        }
    }






    return(
        <Segment className="message_form">


            <Input
            placeholder="write your message"
            label={<Button icon="add"/>}
            name="message"
            onKeyDown={handleKeyDown}
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
                privateChannel={privateChannel}
                privateMessageRef={privateMessageRef}
                />
               
            </Button.Group>
        </Segment>
    )
}

export default MessageForm