import {channelActionType} from './channelReducer.type'


const INITIAL_STATE ={
    setCurrentChannel : null,
    isloading: true,
    privateChannel : null,
    userCurrentchannel: null,
    setUsersPost: null,
    setPrimaryColor: '#4c3c4c',
    setSecondaryColor: '#eee',
}

const channelReducer =(state = INITIAL_STATE, action)=>{
    switch (action.type) {
        // case channelActionType.SET_USER_CHANNEL:
        //     return{
        //         ...state,
        //         userCurrentchannel : action.payload,
        //         isloading: false
        //     }

            case channelActionType.PRIVATE_CHANNEL:
            return{
                ...state,
                privateChannel : action.payload,
                isloading: false
            }

            case channelActionType.SET_CURRENT_CHANNEL:
            return{
                ...state,
                setCurrentChannel : action.payload,
                isloading: false
            }

            case channelActionType.SET_USERS_POST:
                return {
                    ...state,
                    setUsersPost: action.payload
                }

                case channelActionType.SET_COLOR:
                    return {
                        ...state,
                        setPrimaryColor: action.payload.primaryColor,
                        setSecondaryColor: action.payload.secondaryColor
                    }
        default:
            return state;
    }
}

export default channelReducer