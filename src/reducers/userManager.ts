const defState = {
    size: "full"
}


const userManagerReducer:
    (state: { size: string }, action: { type: string, payload: {} }) => {}
    = (state = defState, action) => {
        var liveData = { ...state }
        
        return liveData;
    };

export default userManagerReducer