import React, { useState,useEffect } from 'react'
import {Menu, Divider, Button, Sidebar,Segment, Modal, Icon, Label} from 'semantic-ui-react'
import {SliderPicker} from 'react-color'
import {setColors} from '../../redux/channelReducer/channelReducer.action'
import {connect} from 'react-redux'
import firebase from '../firebase'

import './color.css'


const ColorPanel =({currentUser,setColors})=>{

    const [modal, setModal] =useState(false)
    const [primary, setPrimary] =useState('')
    const [secondary, setSecondary] =useState('')
    const [Colors, setUserColors] =useState([])
    const [usersRef, setref] =useState(firebase.database().ref('user'))

    useEffect(()=>{
        if(currentUser){
            addListener(currentUser.uid)
        }
    },[currentUser])

    const addListener =userId =>{
        let usersColor = []
        usersRef
        .child(`${userId}/colors`)
        .on('child_added', snap =>{
            usersColor.unshift(snap.val())
            setUserColors(usersColor)
            
        })
        
    }

    const openModal=()=>setModal(true)
    const closeModal=()=>setModal(false)

    const handlePrimaryChange =color=> setPrimary( color.hex)
    const handleSecondaryChange =color=> setSecondary(color.hex)

    const handleSaveColor=()=>{
        if(primary && secondary){
        saveColors(primary, secondary)
    }}

    const saveColors = (primary, secondary) =>{
        usersRef
        .child(`${currentUser.uid}/colors`)
        .push()
        .update({
            primary,
            secondary
        })
        .then(()=>{
            console.log('color save')
            closeModal()
        })
        .catch(err => console.log(err))
    }


















    return (
        <Sidebar
        width="very thin"
        vertical
        as={Menu}
        visible
        icon="labeled"
        inverted
        >
        <Divider/>
        <Button icon="add" color="blue" size="small" onClick={openModal} />

        { Colors.length > 0 && Colors.map((color, i)=>(
            <React.Fragment key={i}>
                <Divider/>
                <div className="colorContainer" 
                onClick={()=>setColors(color.primary, color.secondary)}
                >
                    <div className="colorSqaure" style={{background: color.primary}}>
                    <div className="colorOverLay" style={{background: color.secondary}}></div>
                    </div>
                </div>
            </React.Fragment>
        ))

            
        }

        <Modal basic open={modal} onClose={closeModal} >
            <Modal.Header>choose App Colors

            </Modal.Header>

            <Modal.Content>
                <Segment inverted>
                <Label content='Primary Color' />
                <SliderPicker color={primary} onChange={handlePrimaryChange}/>
                </Segment>

                <Segment inverted>
                <Label content='secondary Color'/>
                <SliderPicker color={secondary} onChange={handleSecondaryChange}/>
                </Segment>
            </Modal.Content>
            <Modal.Actions>

                <Button
                inverted
                color='green'
                onClick={handleSaveColor}
                >

                <Icon name='checkmark ' />
                save color
                </Button>

                <Button 
                onClick={closeModal}
                inverted
                color='red'>

                <Icon name='remove' />
                cancel
                </Button>
            </Modal.Actions>

        </Modal>
        </Sidebar>
    )
    }
    export default connect(null,{setColors})(ColorPanel)