import React from 'react'
import {connect} from 'react-redux'
import {Menu, Segment, Comment, Icon} from 'semantic-ui-react'
import UserPanel from './userPanel'
import Channels from './channels'
import DirectMessage from './DirectMessage'
import StarredChannel from './starred'

const SidePanel =({currentUser,setPrimaryColor,currentChannel,
    toggleState,openModal})=>{
    
   
    return (
        <div className="media__sidePanel_menu">
        <Menu
        vertical
        size='large'
        inverted
        fixed='left'
        style={{background: setPrimaryColor,marginLeft: '58px',    fontSize: '1.2rem',}}
        >
            <UserPanel
            openModal={openModal}
            />
            

            <Segment inverted style={{ margin: "0px 20px"}}>
            <Comment.Group className="side__panel"  >

            <StarredChannel 
            currentUser={currentUser}
            toggleState={toggleState}
            />


            <Channels 
            currentChannel={currentChannel}
            currentUser={currentUser}
            toggleState={toggleState}
            />

            <DirectMessage 
            toggleState={toggleState}
            currentUser={currentUser}/>
            
            </Comment.Group>
            </Segment>
        </Menu>
        </div>
    )
    }

    const mapStateToProps= state=>({
        currentUser: state.user.currentUser
    })
    
    export default connect(mapStateToProps)(SidePanel)
   