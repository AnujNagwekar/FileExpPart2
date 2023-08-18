const Dispatcher = {
    callbacks: [],

    register(callback) {
        this.callbacks.push(callback);
    },

    dispatch(action) {
        this.callbacks.forEach(callback => callback(action));
    }
};



const Structure = {
    state:[ {
        type:"Folder",
        name:"Root",
        id:"main_section",
        level:0,
        children:[]
        
    }],

    getState(){
        return this.state;
    },

    ActionHandler(action){
        if(action.type === 'File'){
            
            Iterate_Children_And_Push(action.parentid , this.state , action.newobj);
            console.log(this.state)

        }
        else if(action.type === 'Folder'){
            Iterate_Children_And_Push(action.parentid , this.state , action.newObj);
        }
    }
}

Dispatcher.register(Structure.ActionHandler.bind(Structure))