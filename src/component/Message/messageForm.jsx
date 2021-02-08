import React,{useState, useRef} from 'react'
import {Segment, Input,Button} from 'semantic-ui-react'
import FileModal from './fileModal'
import firebase from '../firebase'
import FileUpload from './fileUpload'
import {emojiIndex, Picker} from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'








const MessageForm =({channel,user,messageRef,getMessagesRef,privateChannel,
    privateMessageRef})=>{

    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState([])
    const [modal, setModal] = useState(false)
    const [typingRef, settypingRef] = useState(firebase.database().ref('typing'))
    const [emojiPicker, setEmojiPicker] = useState(false)
     
    const messageRefInput = useRef()
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


    const handleKeyDown=event=>{
        


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


    const submitMessage=(event)=>{
       
            
      
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


    const handleAddEmoji =(emoji)=>{
        const oldMessage= message
        const newMessage = colonToUnicode(` ${oldMessage} ${emoji.colons} `)
        setMessage(newMessage)
        setEmojiPicker(false)
    //    setTimeout(()=> messageRefInput, 0)
    }

    const colonToUnicode = message =>{
        return message.replace(/:[A-Za-z0-9_+-]+:/g, x=>{
            x = x.replace(/:/g, "");
            let emoji = emojiIndex.emojis[x];
            if (typeof emoji !== "undefined" ){
                let unicode = emoji.native

                if(typeof unicode !== "undefined"){
                    return unicode
                }
            }

            x = ":" + x + ":";
            return x
        })
    }

    const handleToggleEmoji = emoji =>{
        setEmojiPicker(!emojiPicker)
    }




    return(
        <Segment className="message_form">
            {emojiPicker && 
            <Picker
            onSelect={handleAddEmoji}
            set="apple"
            title='pick your emoji'
            className='emoji_picker'
            emoji='point_up'
            />
            }

            <Input
            placeholder="write your message"
            label={<Button icon="smile" onClick={handleToggleEmoji}/>}
            onKeyPress={event => event.key === 'Enter' ? submitMessage(event) : null }
            name="message"
            onKeyDown={handleKeyDown}
            ref={messageRefInput}
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