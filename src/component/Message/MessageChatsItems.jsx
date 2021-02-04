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
 
        return(
 
        <Comment className={message.users.id === user.uid ? "message_self": ""}>
            <Comment.Avatar src={message.users.avatar}/>
            <Comment.Content  >
            <Comment.Author as="a">{message.users.name}</Comment.Author>
            {/* <Comment.Metadata>{timeFromNow(message.timeStamp)}</Comment.Metadata> */}
           {isImage(message) ? 
           <Image src={message.image} className='message_image' /> 
           :
            <Comment.Text>{ message.content}</Comment.Text>}
            </Comment.Content>
        </Comment>
        
    )

        }
export default MessageChatsItems