console.log("welcome to StickyNotes App")
showNotes();

// when user click on add note we have to add note to local storage

let addBtn=document.getElementById('addBtn');
addBtn.addEventListener('click',function(e){
    let addTxt=document.getElementById('addTxt');
    let addTitle=document.getElementById('addTitle')
    let notes=localStorage.getItem('notes');
    if(notes==null){
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
    }
    let myObj={
        title: addTitle.value, 
        text: addTxt.value
    }
   notesObj.push(myObj);
   
   localStorage.setItem('notes',JSON.stringify(notesObj));
   addTxt.value='';
   addTitle.value='';
//    console.log(notesObj);
   showNotes();
})

// To Show the Notes to the section in your notes
function showNotes(){
    let notes=localStorage.getItem('notes');
    if(notes==null){
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
    }
    let html='';
    notesObj.forEach(function(element,index){
        html +=`
        <div class="card noteCard mx-3 my-3" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text">${element.text}</p>
            <button href="#" id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
    </div>
        `
    })
    let divelem=document.getElementById('notes')
    if(notesObj.length !=0){
        divelem.innerHTML=html;
    }
    else{
        divelem.innerHTML=`Use Add note Section to add Notes`
    }

}

// To delte the note we have to made funtion deleteNote

function deleteNote(index){
    // console.log("deleting notes",index)
    let notes=localStorage.getItem('notes');
    if(notes==null){
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem('notes',JSON.stringify(notesObj));
    showNotes();
}

// now we have to search notes

let search=document.getElementById('searchTxt')
search.addEventListener('input',function(e){
    inputVal=search.value.toLowerCase();
    // console.log("input event fired",inputVal)
    let noteCard=document.getElementsByClassName('noteCard');
    Array.from(noteCard).forEach(function(element){
        cardTxt=element.getElementsByTagName('p')[0].innerText
        // console.log(cardTxt)
        if(cardTxt.includes(inputVal)){
            element.style.display='block'
        }
        else{
            element.style.display='none'
        }
    })
})