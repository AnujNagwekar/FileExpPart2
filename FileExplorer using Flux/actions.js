function folderClick(event){
    let name = document.getElementById('user_ip')

    let parentObj = findItem(Structure.state,event.parentNode.id)
    let newFold = createFolderNode(parentObj,name.value,"Folder")

    return{
        type: 'Folder',
        newObj: newFold,
        parentid: parentObj.id
    }


}
function fileClick(event){
    let name = document.getElementById('user_ip')

    const parentObj = findItem(Structure.state,event.parentNode.id)

    let newFile = createFileNode(parentObj,name.value,"File")

    return{
        type: 'File',
        newobj : newFile,
        parentid: parentObj.id
    }


}

function folderClickHandler(element){
    Dispatcher.dispatch(folderClick(element))
    DataStore.render()
}

function fileClickHandler(element){
    Dispatcher.dispatch(fileClick(element))
    DataStore.render()

}