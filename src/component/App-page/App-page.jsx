import React from 'react'
import {Grid} from 'semantic-ui-react'
import ColorPanel from '../colorPanel/colorPanel'
import SidePanel from '../sidePanel/sidePanel'
import Message from '../Message/Message'
import MetaPanel from '../metaPanel/metaPanel'
import MessageContainer from '../Message/MessageContainer'
import {connect} from 'react-redux'

import './appPage.css'

const AppPage =({currentUser,currentChannel,privateChannel,setPrimaryColor,
    setUsersPost,setSecondaryColor})=>{

    return(
        <Grid columns='equal' className="appContainer"  style={{background: setSecondaryColor}}>

            <ColorPanel
            key={currentUser && currentUser.id}
            currentUser={currentUser}
            />

            <SidePanel
            setPrimaryColor={setPrimaryColor}
            />

            <Grid.Column style={{marginLeft: 320}}>
            <MessageContainer 
            key={currentChannel && currentChannel.id}
            currentChannel={currentChannel}
            currentUser={currentUser}
            />
            </Grid.Column>
            
           <Grid.Column width={4}>
            <MetaPanel
            key={currentChannel && currentChannel.id}
            currentChannel={currentChannel}
            privateChannel={privateChannel}
            currentUser={currentUser}
            setUsersPost={setUsersPost}
            />
            </Grid.Column>
        </Grid>
    )
}
const mapStateToProps =state =>({
    currentUser: state.user.currentUser,
    currentChannel: state.channel.setCurrentChannel,
    privateChannel: state.channel.privateChannel,
    setUsersPost: state.channel.setUsersPost,
    setPrimaryColor: state.channel.setPrimaryColor,
    setSecondaryColor: state.channel.setSecondaryColor,
    
})

export default connect(mapStateToProps) (AppPage)