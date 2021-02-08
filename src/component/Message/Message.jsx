import React,{useEffect, useState} from 'react'
import { Segment,Comment} from 'semantic-ui-react'
import MessageForm from './messageForm'
import MessageHeader from './messageHeader'
import MessageChats from './messageChats'
import {connect} from 'react-redux'
import firebase from '../firebase'
import FileUpload from './fileUpload'
import './message.css'

const Messages =({currentUser,privateChannel, currentChannel,usersRef,
    toggleState,
    numUniqueUsers,handleSearch,searchResult,searchTerm,openModal})=>{


    const [messageRef, setMessageRef] = useState(firebase.database().ref('message'))
    const [privateMessageRef, setPrivateMessageRef] = useState(firebase.database().ref('privateMessage'))
     const [userRef, setUserRef] = useState(firebase.database().ref('user'))
    const [isStarredChannel, setIsStarredChannel] = useState(false)

    useEffect(()=>{
        if (currentChannel && currentUser){
        addUserStarredListner(currentChannel.id,currentUser.uid)
   } },[currentChannel,currentUser])
    


    const channalName =currentChannel=>currentChannel ?
     `${privateChannel ? '@' : '#'}${currentChannel.name}` : "" 
    

     const getMessagesRef= ()=>{
        return privateChannel ? privateMessageRef : messageRef
    }

   
   const handleSearchMessage=()=>{
        const channelMessages = [...this.state.messages]
        const regrex = new RegExp(this.state.searchTerm, 'gi');
        const searchResult = channelMessages.reduce((acc, message)=>{
            if (message.contents && message.contents.match(regrex)){
                acc.push(message)
            }
            return acc
        },[])
        console.log(searchResult,"search term")
        this.setState({searchResult})
    }



    const handleStarred =()=>{
        setIsStarredChannel(!isStarredChannel )
       StarredChannel()
        
    }

   const StarredChannel =()=>{
     
        if(isStarredChannel ){
           
            usersRef
            .child(`${currentUser.uid}/starred`)
            .child(currentChannel.id)
            .remove(err=>{
                if(err !== null){
                    console.log(err)
                }
            })

            console.log('not starred')

           
        } else{
            console.log('starred')
            usersRef
            .child(`${currentUser.uid}/starred`)
            .update({
                [currentChannel.id] :{
                    name: currentChannel.name,
                    details:currentChannel.details,
                    createdBy: {
                        name: currentChannel.createdBy.name,
                        avatar: currentChannel.createdBy.avatar
                    }
                }
             })
        }
    }



    const addUserStarredListner=(channelId, userId)=>{
        userRef
        .child(userId)
        .child('starred')
        .once('value')
        .then(data =>{
            if(data.val() !== null){
                const channelIds = Object.keys(data.val())
                const prevStarred = channelIds.includes(channelId)
               setIsStarredChannel( prevStarred)
            }
        })
        
    }



  
   
    return (
        <React.Fragment>

            <div className='message__display'>
            <MessageHeader className='message__header'
            channalName={channalName(currentChannel)}
            numUniqueUsers={numUniqueUsers}
            handleSearch={handleSearch}
            privateChannel={privateChannel}
            handleStarred={handleStarred}
            isStarredChannel={isStarredChannel}
            openModal={openModal}
            toggleState={toggleState}
            />

            <Segment className='message__chat'>
                <Comment.Group className="message_messg">
                <MessageChats  
                key={currentChannel && currentChannel.id}
                currentChannel={currentChannel}
                user={currentUser} 
                messageRef={messageRef}
                searchResult={searchResult}
                searchTerm={searchTerm}
                privateMessageRef={privateMessageRef}
                privateChannel={privateChannel}
                isStarredChannel={isStarredChannel}
                usersRef={usersRef}
                />
             
               
                </Comment.Group>
            </Segment>

            
            <MessageForm className='message__form'
            channel={currentChannel}
            user={currentUser}
            messageRef={messageRef}
            getMessagesRef={getMessagesRef}
            messageRef={messageRef}
            privateChannel={privateChannel}
            privateMessageRef={privateMessageRef}
            />

          </div>

        </React.Fragment>
    )
    }
const mapStateToProps =state =>({
    currentUser: state.user.currentUser,
    currentChannel: state.channel.setCurrentChannel,
    privateChannel: state.channel.privateChannel,
    

})

    export default connect(mapStateToProps)(Messages)