import React,{Component} from 'react'
import FileModal from './fileModal'
import firebase from '../firebase'
import { v4 as uuidv4 } from 'uuid';

class FileUpload extends Component{
    state={
        uploadState: '',
        uploadTask: null,
        percentageUpLoad: 0,
        storageRef: firebase.storage().ref(),
        messageRef: this.props.messageRef,
        channel: this.props.channel ,
    }

   

        uploadFile=(file, metaData)=>{
        const pathToUpload = this.props.channel.id
        const ref = this.props.messageRef
        const pathFIle = `chat/public/${uuidv4()}.jpg`


        this.setState({
            uploadState: 'uploading',
            uploadTask :this.state.storageRef.child(pathFIle).put(file,metaData)
        },
        
        ()=>  this.state.uploadTask.on('state_changed', snap =>{
            const percentageUpLoad = Math.round((snap.bytesTransferred / snap.totalBytes) * 100)
            this.setState({percentageUpLoad: percentageUpLoad})
            },

            err => {console.log(err)},


            ()=> this.state.uploadTask.snapshot.ref.getDownloadURL() 
            .then(downloadUrl =>{ this.sendFile(ref,pathToUpload,downloadUrl)
            })
            .catch(err => console.log(err))


            )
        
        
        )
             
         }
        
    

     sendFile =(ref,pathToUpload,fileUrl)=>{
        ref.child(pathToUpload)
        .push()
        .set(this.props.creatMessage(fileUrl))
        .then(()=>{
            this.setState({uploadState: 'done'})
        })
        .catch(err => console.log(err))
    }



    render(){
        const {modal,closeModal} = this.props

        return (
            <div>
            <FileModal 
                modal={modal}
                closeModal={closeModal}
                uploadFile={this.uploadFile}
                />
               { console.log(this.props.user)}
            </div>
        )
    }
}

export default FileUpload