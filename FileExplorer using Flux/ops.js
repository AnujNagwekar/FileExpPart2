let counter = 0;


function unique_id(){

    counter++;

    return counter;

}

 

function creating_arrow(){

    let arrow_icon = document.createElement("span");

    arrow_icon.classList.add("rotate")

    arrow_icon.setAttribute("onclick" , "checkClassCollapse(this)")

    arrow_icon.innerHTML = "&#10148;"

    return  arrow_icon;

}

 

function creating_button(){

    let folder_button = document.createElement("button");

    folder_button.innerText = "📁";

    folder_button.classList.add("sub-icon")

    folder_button.setAttribute("onclick" , "folderClickHandler(this)")

 

    let file_button = document.createElement("button")

    file_button.innerHTML = "&#128196;"

    file_button.classList.add("sub-icon")

    file_button.setAttribute("onclick" , "fileClickHandler(this)")

 

    let delete_button = document.createElement("button")

    delete_button.innerHTML = " &#x2715;"

    delete_button.classList.add("sub-icon")

    delete_button.setAttribute("onclick" , "onClickDelete(this)")

   

    return {folder_button , file_button , delete_button};

}

const deleteNode = (id, childrenArray , deleteId) => {

//    if(id ==="main"){

//     id = "main_section"

//    }

 

    for (let i = 0 ; i < childrenArray.length ; i++) {

        if (id == childrenArray[i].id) {

            let childArray = childrenArray[i].children;

           

            let index = childArray.findIndex((obj) => obj.id === deleteId);

            childrenArray[i].children.splice(index , 1);

            return;                

        }

        if (childrenArray[i].children != null) {

            deleteNode(id, childrenArray[i].children , deleteId);  // Recursively search nested children

        }

    }

 

}

function createFile(name , obj){

 

    let main_div = document.createElement("div");

    main_div.id = unique_id();

    main_div.style.paddingLeft = ((obj.level) * 10) + "px";

    main_div.innerHTML = name;

    let  {delete_button} = creating_button();

    main_div.appendChild(delete_button)

    return main_div

}

 

function createFolder(name , obj ){
    let main_div = document.createElement("div");
    main_div.id = obj.id;
    main_div.style.paddingLeft = ((obj.level) * 10) + "px";
    let arrow_button = creating_arrow();
    let  {folder_button , file_button , delete_button} = creating_button();
    let folder_name = document.createElement("span");
    folder_name.innerText = name;
    main_div.appendChild(arrow_button);
    main_div.appendChild(folder_name)
    main_div.appendChild(folder_button);
    main_div.appendChild(file_button);
    main_div.appendChild(delete_button);

   

    // for appending children
    let children_div = document.createElement("div");
    children_div.id = unique_id();
    main_div.appendChild(children_div)
    // console.log(main_div);
    return main_div;
} 


const createFolderNode = (parentObj, folderName, folderType) => {
    let newObj = {
        type: folderType,
        name: folderName,
        id: "FolderId" + unique_id(),
        level: parentObj.level+1,
        children: []
        
    }
    return newObj;

}

function createFileNode(parentObj, fileName, fileType) {
    let newObj = {
        type: fileType,
        name: fileName,
        id: "FileId" + unique_id(),
        children: null,
        level: parentObj.level + 1
    }
    return newObj;
}

const Iterate_Children_for_print = ( main_div ,  children ) => {
    // console.log(children)
    for(let obj of children){
        let addingdiv
        // console.log(obj)
        if(obj.type == "File"){
            addingdiv = createFile(obj.name , obj);
        }
        else if(obj.type === "Folder"){
            addingdiv = createFolder(obj.name , obj);
        }
        main_div.appendChild(addingdiv);
        if(obj.children != null  ){
            Iterate_Children_for_print( addingdiv.lastElementChild , obj.children )
        }
    }
}

const Iterate_Children_And_Push = ( findId ,  children , newObject  ) => {
    for(let obj of children){
            if(findId === obj.id){
                obj.children.push(newObject)
                return;
            }
           if(obj.children != null){
               Iterate_Children_And_Push( findId , obj.children , newObject );
           }
    }
}

function findItem (folderList, index){
    let ans;
    for (let item of folderList) {
        if (item.id == index) {
            console.log(item)
            return item;
        }
        if (item.type == "Folder") {
            ans = findItem(item.children, index);
            if(ans){
                return ans;
            }    
    }
    }
    return null;
}

 

function checkFileName(event){

    // console.log(event.value)

    if(typeof event === "string"){

        fileName = event

    }else{

        fileName = event.value;

    }

    let regex = /^([a-zA-Z]){1,10}$/;

    let regex1 = /^([a-zA-Z]){0}$/;

   

    if(!fileName.match(regex) && !fileName.match(regex1)){

     

        alert("File name should be less than 10 char & it should not contain number!!")

    }

}