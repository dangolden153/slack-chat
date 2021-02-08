import React,{useEffect, useState, useRef} from 'react'
import {Grid, Header,Icon, Dropdown, Image,Modal, Button, Input} from 'semantic-ui-react'
import {connect} from 'react-redux'
import firebase from '../firebase'
import DpModalFile from './dpModalFile'

const UserPanel =({currentUser})=>{

    const [user, setUser] = useState();
    const [userImg, setUserImg] = useState();
    const [modal, setModal] = useState(false);
    
    const [storageRef, setStorage] = useState(firebase.storage().ref())
    const [userRef, setref] = useState(firebase.database().ref('user'))
    
    const openModal =()=> setModal(true)
    const closeModal =()=> setModal(false)
        
        useEffect(()=>{
            if(currentUser){
                setUser(currentUser.displayName)
                setUserImg(currentUser.photoURL)
            }
           
            
        },[currentUser])

    

    const signOut =()=>{
        firebase.auth().signOut()
        .then(()=>console.log('sign out'))
        .catch(err=> console.log(err))
    }

    const dropDownOptions =[
        {
            key: 'user',
            text: <span>sign in as <strong>{user}</strong></span>,
            disable: true
        },

        {
            key: 'avatar',
            text: <span onClick={openModal}>change profile pics</span>,
            
        },

        {
            key: 'signout',
            text: <span onClick={signOut}>sign out</span>,
           
        },
    ]

   










    return(
        <Grid>
        <Grid.Column>
            <Grid.Row style={{padding: "1.2em", margin: 0}} >
                <Header as='h2' floated='left' inverted style={{ margin: 0}}> 
                    <Icon name='code'/>
                    <Header.Content>Let's Chat</Header.Content>
                   
                </Header>

                <Header as='h4'  inverted style={{ padding: '1.5em 0.25em'}}>
                <Dropdown 
                trigger={< span>
                <Image src={userImg} spaced='right' avatar/>
                {user}
                </span>}  
                   options={dropDownOptions} />


                </Header>
            </Grid.Row>

            <DpModalFile
            modal={modal}
            closeModal={closeModal}
            userRef={userRef}
            currentUser={currentUser}
            storageRef={storageRef}
            />

           



        </Grid.Column>
        </Grid>
    )
}

const mapStateToProps= state=>({
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(UserPanel)