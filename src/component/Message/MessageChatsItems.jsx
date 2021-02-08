import React from 'react'
// import moment from 'moment'
import {Comment, Image} from 'semantic-ui-react'


const MessageChatsItems =({user, message,searchTerm,searchResult})=>{
    
    // const timeFromNow=(timeStamp)=>{
    //     moment(timeStamp).fromNow()
    // }

    const isImage= message =>{
        return message.hasOwnProperty('image') && !message.hasOwnProperty('content')
    }
 
    //message_image
        return(
 
        <Comment className={message.users.id === user.uid ? "message_self": "messg__user"} >
            <Comment.Avatar src={message.users.avatar} className={`user__pics ${ message.users.id === user.uid && "messg__image"}`}/>
            <Comment.Content  className={` ${message.users.id !== user.uid ? "self_comment" : "users_comment"}`}>
            <Comment.Author as="a" className={message.users.id === user.uid && "messg__author"}>{message.users.name}</Comment.Author>
            {/* <Comment.Metadata>{timeFromNow(message.timeStamp)}</Comment.Metadata> */}
           {isImage(message) ? 
           <Image src={message.image} className={`message_image  ${message.users.id === user.uid && "image__sef"}`} /> 
           :
            <Comment.Text className={`users__content ${message.users.id === user.uid && "messg__content"}`} >{ message.content}</Comment.Text>}
            </Comment.Content>
        </Comment>
        
    )

        }
export default MessageChatsItems