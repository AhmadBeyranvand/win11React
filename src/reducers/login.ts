const defState = {
    loginState: false,
    token: "",
    username: ""
}


const loginReducer:
(state:{loginState: boolean, token: string, username: string }, action:{type:string, payload:{loginState: boolean, token: string, username: string }})
=>{loginState:Boolean; token:String; username: String} 
= (state = defState, action) => {
    var liveData = { ...state }
    switch (action.type) {
        case "LOGIN":
            liveData.loginState = true
            liveData.token = action.payload.token
            liveData.username = action.payload.username
            break
        case "LOGOUT":
            liveData.loginState = false
            liveData.token = ""
            liveData.username = ""
            break
        default:
            break

    }
    return liveData;
};

export default loginReducer