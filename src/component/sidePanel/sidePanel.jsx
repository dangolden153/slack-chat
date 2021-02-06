import React from 'react'
import {connect} from 'react-redux'
import {Menu} from 'semantic-ui-react'
import UserPanel from './userPanel'
import Channels from './channels'
import DirectMessage from './DirectMessage'
import StarredChannel from './starred'

const SidePanel =({currentUser,setPrimaryColor,currentChannel})=>{
    
   
    return (
        <Menu
        vertical
        size='large'
        inverted
        fixed='left'
        style={{background: setPrimaryColor, fontSize: '1.2rem'}}
        >
            <UserPanel/>
            <StarredChannel currentUser={currentUser}/>
            <Channels 
            currentChannel={currentChannel}
            currentUser={currentUser}
            />
            <DirectMessage currentUser={currentUser}/>

        </Menu>
    )
    }

    const mapStateToProps= state=>({
        currentUser: state.user.currentUser
    })
    
    export default connect(mapStateToProps)(SidePanel)
   