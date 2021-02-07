import React, { useState, Component } from 'react'
import {setCurrentChannel,setPrivateChannel} from '../../redux/channelReducer/channelReducer.action'
import {connect} from 'react-redux'
import firebase from '../firebase'
import {Menu,Icon} from 'semantic-ui-react'

class StarredChannel extends Component{
    state={
        starredChannel: [],
        activeChannel: '',
        firtsLoad: true,
        user: this.props.currentUser,
        usersRef: firebase.database().ref('user')
    }
   
    componentDidMount(){
        if (this.state.user){
            this.addListener(this.state.user.uid)
        }
    }

    addListener=(userId)=>{
        this.state.usersRef
        .child(userId)
        .child('starred')
        .on('child_added', snap=>{
        const starredChannals = {id:snap.key, ...snap.val()}
            this.setState({
                starredChannel : [...this.state.starredChannel, starredChannals]
            })
        })

        this.state.usersRef
        .child(userId)
        .child('starred')
        .on('child_removed', snap=>{
            const childOnRemove = {id: snap.key, ...snap.val()}
            const fIlteredChannels = this.state.starredChannel.filter(channel=>{
              return  channel.id !== childOnRemove.id})
              this.setState({starredChannel: fIlteredChannels})
        })
    }


    setActiveChannel= channel=>{
        this.setState({activeChannel: channel.id})
        this.props.setCurrentChannel(channel) 
    }

   
   

    changeChannel=channel=>{
        this.props.setCurrentChannel(channel)
        this.setActiveChannel(channel)
       this.props.setPrivateChannel(false)
    }
    
    

    render(){
        const {starredChannel} = this.state
    return(
        <Menu.Menu>
            <Menu.Item>
                <sapn>
                    <Icon name='star'/>STARRED CHANNELS
                </sapn> {''}
                ({starredChannel.length})
            </Menu.Item>

            {
    starredChannel.length > 0 && starredChannel.map(channel =>
    <Menu.Item 
    key={channel.id} 
    channel={channel}
    active={channel.id === this.state.activeChannel}
    onClick={()=>this.changeChannel(channel)}
    >
       # {channel.name}
      
    </Menu.Item>)}
        </Menu.Menu>
    )
}
}

export default connect(null,{setCurrentChannel,setPrivateChannel})(StarredChannel)