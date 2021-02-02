import React,{Component} from 'react'
import {Comment,Menu} from 'semantic-ui-react'
import firebase from '../firebase'
import {numberOfUsers} from '../../redux/userReducer/user.action'
import {connect} from 'react-redux'
import Messages from './Message'


class MessageContainer extends Component{

    state={
        channel: this.props.currentChannel,
        user: this.props.currentUser,
        messageRef: firebase.database().ref('message'),
        messages:[],
        messageIsLoading: true,
        numUniqueUsers: '',
        searchTerm: '',
        searchLoading: false,
        searchResult: [],
        isStarredChannel: false,
        usersRef: firebase.database().ref('user')
    }

    componentDidMount(){
        const {channel, user} = this.state

        if(channel && user){
        this.addListener(channel.id)
    }}

    addListener=channelId=>{
        this.addMessageListener(channelId)
    }

    addMessageListener=channelId=>{
        let loadedMessages = []

        this.state.messageRef.child(channelId).on("child_added", snap=>{
            loadedMessages.push(snap.val())
            
            this.setState({messages: loadedMessages, messageIsLoading: false })
            this.uniqueUsers(loadedMessages)
        })
    } 

    uniqueUsers = message=>{
        const countUsers = message.reduce((acc, message)=>{
            if(!acc.includes(message.users.name)){
                acc.push(message.users.name)
            }

            return acc    
        },[])

        const plural = countUsers.length > 1 || countUsers.length === 0 
        const numUniqueUsers = `#${countUsers.length} user${plural ? 's' : ''}`
        this.setState({numUniqueUsers})
        
    }


    handleSearch=event=>{
       
        this.setState({
            searchTerm: event.target.value,
            searchLoading: true
        }, ()=>this.handleSearchMessage())
        console.log(this.state.searchTerm)
    }
   
    handleSearchMessage=()=>{
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



     handleStarred =()=>{
        this.setState( prev =>({
            isStarredChannel: !prev.isStarredChannel}),()=>this.StarredChannel())
        
    }

     StarredChannel =()=>{
        const {usersRef, user,channel} =this.state
        if(this.state.isStarredChannel ){
            console.log('starred')
            console.log(channel)
            usersRef
            .child(`${this.state.user.uid}/starred`)
            .update({
                [this.state.channel.id] :{
                    name: this.state.channel.name,
                    details: this.state.channel.details,
                    createdBy: {
                        name: this.state.channel.createdBy.name,
                        avatar: this.state.channel.createdBy.avatar
                    }
                }
             })
           
        } else{
            usersRef
            .child(`${this.state.user.uid}/starred`)
            .child(this.state.channel.id)
            .remove(err=>{
                if(err !== null){
                    console.log(err)
                }
            })

            console.log('not starred')
        }
    }





    render(){

        const {numUniqueUsers,searchResult,searchTerm,isStarredChannel} = this.state

        return(
            <React.Fragment>
            <Messages
            numUniqueUsers={numUniqueUsers}
            handleSearch={this.handleSearch}
            searchTerm={searchTerm}
            searchResult={searchResult}
            handleStarred={this.handleStarred}
            isStarredChannel={isStarredChannel}
            />
            <div>{console.log(this.props.currentChannel)}</div>
            </React.Fragment>
        )
    }
} 



export default (MessageContainer)