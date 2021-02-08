import React,{useState} from 'react'
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

        const [state, setState] = useState(false)
        const [metalPanel, setMetalPanel] = useState(false)


        const openModal= ()=>{setMetalPanel(true)}

        const closeModal= ()=>{setMetalPanel(false)}

        const toggleState= ()=>{
            console.log('state changed')
            setState(!state)}


    return(
        <Grid columns='equal' className="appContainer"  style={{background: setSecondaryColor}}>

            <div className={state && "color__panel"}>
            <ColorPanel
            key={currentUser && currentUser.id}
            currentUser={currentUser}
            metalPanel={metalPanel}
            openMetaModal={openModal}
            />
            </div>

            <div className={`side__panel ${state && 'media_panel'}`}>
            <SidePanel
            setPrimaryColor={setPrimaryColor}
            key={currentUser && currentUser.name}
            currentUser={currentUser}
            currentChannel={currentChannel}
            toggleState={toggleState}
            openModal={openModal}
            />
            </div>


            <Grid.Column style={{height: "100vh",overflow: "hidden"}} >
            <div className={`message__container ${state && 'media_message'}`}>
            <MessageContainer 
            key={currentChannel && currentChannel.id}
            currentChannel={currentChannel}
            currentUser={currentUser}
            toggleState={toggleState}
            openModal={openModal}
            />
            </div>
            </Grid.Column>
            

           {/* // // */}
            <div className='meta__panel'>
           <Grid.Column width={4} > 
            <MetaPanel
            key={currentChannel && currentChannel.id}
            currentChannel={currentChannel}
            privateChannel={privateChannel}
            currentUser={currentUser}
            setUsersPost={setUsersPost}
            metalPanel={metalPanel}
            closeModal={closeModal}
            />
            
            </Grid.Column>
            </div>
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