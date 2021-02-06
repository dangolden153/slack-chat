import React,{Component} from 'react'
import {Comment,Menu} from 'semantic-ui-react'
import firebase from '../firebase'
import MessageChatsItems from './MessageChatsItems'
import Typing from './typing'


class MessageChats extends Component{

    state={
        channel: this.props.currentChannel,
        privateMessageRef: this.props.privateMessageRef,
        privateChannel:this.props.privateChannel,
        user: this.props.user,
        messageRef: this.props.messageRef,
        messages:[],
        messageIsLoading: true,
        numUniqueUsers: '',
        searchTerm: this.props.searchTerm,
        searchResult: this.props.searchResult,
        typingRef: firebase.database().ref('typing'),
        typeUsers:[],
        connectedRef: firebase.database().ref('.info/connected')
    }

    componentDidMount(){
        if(this.props.currentChannel && this.props.user){
        this.addListener(this.props.currentChannel.id)
    }}

    addListener=channelId=>{
        this.addMessageListener(channelId)
        this.addtypingListiner(channelId)
    }

    addtypingListiner =channelId=>{
        let typeUsers =[]
        this.state.typingRef.child(channelId).on('child_added', snap=>{
            if (snap.key !== this.props.user.uid){
                typeUsers= typeUsers.concat({
                    id:snap.key,
                    name: snap.val()
                })

                this.setState({typeUsers:typeUsers})
            }
        })

        this.state.typingRef.child(channelId).on('child_removed', snap=>{
            const index = typeUsers.findIndex(user => user.id === snap.key)
            if (index !== -1){
                typeUsers= typeUsers.filter(user=> user.id !== snap.key)
                this.setState({typeUsers:typeUsers})
            }
        })


        this.state.connectedRef.on('value', snap=>{
            if(snap.val() === true){
                this.state.typingRef
                .child(channelId)
                .child(this.state.user.uid)
                .onDisconnect()
                .remove(err =>{
                    if(err !== null){
                        console.log(err)
                    }
                })
            }
        })
    }

    addMessageListener=channelId=>{
        let loadedMessages = []
        const ref = this.getMessagesRef()
        ref.child(channelId).on("child_added", snap=>{
        loadedMessages.push(snap.val())
        this.setState({messages: loadedMessages, messageIsLoading: false })
        })
    } 

    getMessagesRef= ()=>{
        const {privateChannel, privateMessageRef, messageRef} = this.state
        return privateChannel ? privateMessageRef : messageRef
    }













   

    render(){

       const {messages,user,searchTerm,searchResult,typeUsers} = this.state

        return(
            <React.Fragment>
          
            <Comment>
         {
      
       messages.length > 0 && (searchTerm ? searchResult : messages).map(message=>( 
        <MessageChatsItems
         searchTerm={searchTerm} 
         searchResult={searchResult}
         key={message.timeStamp}  
         user={user}  
         message={message}
         
         />))}
             
            </Comment>
            <div>
                {console.log(typeUsers) }
                {typeUsers.length > 0 && typeUsers.map(user=>(
                    <div style={{display:'flex', alignItems: 'center', marginBottom: '0.2em'}}
                    user={user}
                    key={user.id}
                    >
            <span className="user_typing" >{user.name} is typing </span> <Typing/>
                    </div>
                ))}
           

            </div>
            
            </React.Fragment>
        )
    }
}



export default MessageChats