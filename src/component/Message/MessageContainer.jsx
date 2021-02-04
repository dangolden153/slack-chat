import React,{Component,useState} from 'react'
import {Comment,Menu} from 'semantic-ui-react'
import firebase from '../firebase'
import {setUserPosts} from '../../redux/channelReducer/channelReducer.action'
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
            this.usersPost(loadedMessages)
        })
    } 

    usersPost= message =>{
        let countUsersPost = message.reduce((acc, message)=>{
            if(message.users.name in acc){
                acc[message.users.name].count +=1

            } else {
                acc[message.users.name] = {
                    avatar : message.users.avatar,
                    count : 1
                }
            }

            return acc;
        },{})

        this.props.setUserPosts(countUsersPost)
    }

    uniqueUsers = message=>{
        const countUsers = message.reduce((acc, message)=>{
            if(!acc.includes(message.users.name)){
                acc.push(message.users.name)
            }

            return acc    
        },[])

        const plural = countUsers.length > 1 || countUsers.length === 0 
        const numUniqueUsers = `${countUsers.length} user${plural ? 's' : ''}`
        this.setState({numUniqueUsers})
        
    }


    handleSearch=event=>{
       
        this.setState({
            searchTerm: event.target.value,
            searchLoading: true
        }, ()=>this.handleSearchMessage())
        console.log(this.state.searchTerm)
    }
   
    render(){

        const {numUniqueUsers,searchResult,searchTerm,isStarredChannel,usersRef } = this.state

        return(
            <React.Fragment>
            <Messages
            numUniqueUsers={numUniqueUsers}
            handleSearch={this.handleSearch}
            searchTerm={searchTerm}
            searchResult={searchResult}
            handleStarred={this.handleStarred}
            usersRef={usersRef}
            />
            </React.Fragment>
        )
    }
} 



export default connect(null, {setUserPosts})(MessageContainer)