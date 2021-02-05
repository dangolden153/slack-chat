import React, {useEffect} from 'react';
import Register from './component/register/register'
import Login from './component/login/login'
import AppPage from './component/App-page/App-page'
import Spinner from './component/spinner'


import {Switch, Route, useHistory} from 'react-router-dom'
import firebase from './component/firebase'
import {connect} from 'react-redux'
import {currentUser, clearUser} from './redux/userReducer/user.action'


import './App.css';

const App =({currentUser,isLoading,clearUser})=>{

  const history = useHistory()

  useEffect(()=>{
    
    firebase
    .auth().onAuthStateChanged(user =>{
      if (user){
        currentUser(user)
        history.push('/app-page')

      } else {
        clearUser()
        history.push('/')
      }
    })
  },[])
  
  return (
  <div>
    {
      isLoading ? <Spinner/> :
    <Switch>
    <Route path='/' exact component={Login} />
    <Route path='/app-page'  component={AppPage} />
    <Route path='/register'  component={Register} />
    

    </Switch>}
  </div>
  
  )}

  const mapStateToProps =state=>({
    isLoading : state.user.isLoading
  })


export default connect(mapStateToProps,{currentUser,clearUser})(App);
