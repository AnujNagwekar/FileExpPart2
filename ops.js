// for impure functions
// impure function
const Print = (main_div, children) => {

    for (let obj of children) {
        let addingdiv
        if (obj.type === "file") {
            addingdiv = createFile(obj.name, obj);
        }
        else {
            addingdiv = createFolder(obj.name, obj);
        }
        main_div.appendChild(addingdiv);
        if (obj.children != null) {
            Print(addingdiv, obj.children)
        }
    }
}

const Push = (findId, children, newObject) => {

    for (let obj of children) {
        if (findId === obj.id) {
            obj.children.push(newObject)
            return;
        }

        if (obj.children != null) {
            Push(findId, obj.children, newObject);
        }
    }
}

const ParentObj = (findId, children) => {
    let ans;
    for (let obj of children) {
        if (findId == obj.id) {
            return obj;
        }

        if (obj.children != null) {
            ans = ParentObj(findId, obj.children);
            if (ans) {
                // console.log(obj)
                return ans; // Return the answer if found in deeper levels
            }
        }
    }
    return null; // Return null if not found
}


// Actions Function 
const onFolderClick = (event) => {
    let inputValue = document.getElementById("InputValueId");
    let parentObj = ParentObj(event.parentNode.id, data);

    let arrayOfChildren = parentObj.children;

    // console.log(arrayOfChildren)
    for (let obj of arrayOfChildren) {
        if (obj.name === inputValue.value) {
            alert("The given name is already exist");
            return;
        }
    }
    let newobj = createFolderNode(parentObj, inputValue.value, "folder");

    Push(parentObj.id, data, newobj);

    let main_div = document.getElementById("main");
    main_div.innerHTML = '';
    parentid = 0;

    Print(main_div, data[0].children)
}

const onFileClick = (event) => {
    let inputValue = document.getElementById("InputValueId");

    let parentObj = ParentObj(event.parentNode.id, data);
    let newobj = createFileNode(parentObj, inputValue.value, "file");

    Push(parentObj.id, data, newobj);

    // main section children delete
    let main_div = document.getElementById("main");
    main_div.innerHTML = '';
    parentid = 0;
    Print(main_div, data[0].children)
}


