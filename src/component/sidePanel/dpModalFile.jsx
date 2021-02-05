import React,{Component} from 'react'
import {Modal, Button, Icon, Image,Grid, Input } from 'semantic-ui-react'
import AvatarEditor from 'react-avatar-editor'





class DpModalFile extends Component{

    state={
        modal: this.props.modal,
        closeModal: this.props.closeModal,
        userRef: this.props.userRef,
        currentUser: this.props.currentUser,
        storageRef: this.props.storageRef,
        previewImage: '',
        uploadSetImage: '',
        metaData: {contentType : 'image/jpeg'}
    }


    handleChange=event=>{
        const file = event.target.files[0]
        const reader = new FileReader()

        if (file){
            reader.readAsDataURL(file)
            reader.addEventListener('load', ()=>{
                this.setState({previewImage: file})
                
                
            })
        }
    }

     uploadImage =()=>{
        this.props.storageRef
        .child(`avatars/user-${this.props.currentUser.uid}`)
        .put(this.state.previewImage, this.state.metaData)
        .then(snap => {
            snap.ref.getDownloadURL().then(downloadUrl =>{
                this.setState({uploadSetImage: downloadUrl}, 
                    ()=> this.chnageImage()
                    )
            })
        })
    }

     chnageImage =()=>{
        this.props.currentUser
        .updateProfile({
           photoURL: this.state.uploadSetImage 
        })
        .then(()=>{
            console.log('image uploaded sucessful')
            this.props.closeModal()
    })
        .catch(err => console.log(err))

        this.props.userRef
        .child(this.props.currentUser.uid)
        .update({
            avatar: this.state.uploadSetImage
        })
        .then(()=>console.log('still on image uploaded sucessful'))
        .catch(err => console.log(err))
    }





    render(){
        const {modal,closeModal,currentUser,previewImage,} = this.state
        return(

            <Modal basic open={this.props.modal} onClose={closeModal}>
            <Modal.Header>Change Profile Pic...</Modal.Header>
            <Modal.Content>
                <Input 
                onChange={this.handleChange}
                fluid
                type='file'
                name='previewImage'
                label='new picture'
                
                />

                <Grid  centered stackable columns={2} >

                    <Grid.Row centered>

                    <Grid.Column className="ui center aligned grid">
                        {previewImage && 
                        <AvatarEditor
                        image={previewImage}
                        width={100}
                        height={100}
                        border={50}
                        scale={1.2}
                        
                        />
                        }
                    </Grid.Column>

                    </Grid.Row>
                </Grid>
            </Modal.Content>

            <Modal.Actions>
              

                <Button color='green' inverted onClick={this.uploadImage}>
                    <Icon name='image' /> upload image
                </Button>

                <Button color='red' inverted onClick={closeModal}>
                    <Icon name='remove' /> cancel
                </Button>
            </Modal.Actions>

        </Modal>
        )
    }
}

export default DpModalFile