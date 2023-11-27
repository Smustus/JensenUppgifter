const nameInput = document.querySelector('.nameInput');
const searchNoteBtn = document.querySelector('.searchNoteBtn');

const noteUser = document.querySelector('.inputUser');
const noteTitle = document.querySelector('.inputTitle');
const noteInput = document.querySelector('.inputNote');
const postNoteBtn = document.querySelector('.postNoteBtn');
const postText = document.querySelector('.postText');

const noteContainer = document.querySelector('.noteContainer');

let updatedContent = '';

BASE_URL = 'https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com';

//--------------------------------------------------------
searchNoteBtn.addEventListener('click', () => {
  fetchNotes(nameInput.value);
});

postNoteBtn.addEventListener('click', () => {
  generateNote();
});
//--------------------------------------------------------
//Generate a note, post it and fetch it
async function generateNote(){
  const userValue = noteUser.value;
  const titleValue = noteTitle.value;
  const inputValue = noteInput.value;

  const note = {
    username: userValue,
    title: titleValue,
    note: inputValue
  }

  await postNote(note);
  await fetchNotes(nameInput.value)

  setTimeout(() => {
    postText.textContent = 'Post added'
    postText.classList.remove('hidden');
  }, 100);
  
  setTimeout(() => {
    postText.classList.add('hidden');
  }, 2000);
}
//--------------------------------------------------------
//Post the note to the API
async function postNote(note){
  try {
    const response = await fetch(`${BASE_URL}/api/notes`, {
      method: "POST",
      body: JSON.stringify(note), 
      headers: {
        'Content-Type': 'application/json' 
        }
      });
  } catch (error) {
    console.log(error);
  }
}
//--------------------------------------------------------
//Fetch notes from the API
async function fetchNotes(userName){
  try {
    const response = await fetch(`${BASE_URL}/api/notes/${userName}`);
    const data = await response.json();
    console.log(data);
    generateNoteHTML(data)
  } catch (error) {
    console.log(error);
  }
}
//--------------------------------------------------------
//Generate the corresponding HTML for the note
function generateNoteHTML(data){
  const notesObj = data;
  console.log(notesObj);

  noteContainer.innerHTML = '';

  for(const note of notesObj.notes){
    const noteDiv = document.createElement('div');

    noteDiv.innerHTML = `
      <section class="noteSection">
      <h4>Author: ${note.username.toUpperCase()}</h4>
      <p>Title: ${note.title}</p>
      <p class="${note.id}">${note.note}</p>
      </section>
      <section class="btnSection">
      <button class="changeBtn">Change</button>
      <button class="removeBtn">Remove</button>
      </section>`;
    
    const changeBtn = noteDiv.querySelector('.changeBtn');
    const removeBtn = noteDiv.querySelector('.removeBtn');

    changeBtn.addEventListener('click', () => {
      const noteContentP = document.querySelector(`.${note.id}`);
      updatedContent = prompt('Enter new note:', note.note);

      if (updatedContent) {
        noteContentP.textContent = updatedContent;
        changeNote(note.id);
      }
    });

    removeBtn.addEventListener('click', () => {
      deleteNote(note.id);
    });

    noteContainer.appendChild(noteDiv);
  }
}
//--------------------------------------------------------
//Modification of a current note in the API
async function changeNote(noteId){
  const updatedNote = {
    note: updatedContent,
  };
  try {
    const response = await fetch(`${BASE_URL}/api/notes/${noteId}`, {
      method: "PUT",
      body: JSON.stringify(updatedNote), 
      headers: {
        'Content-Type': 'application/json' 
      }
    }); 
  } catch (error) {
    console.log(error);
  }

  setTimeout(() => {
    postText.textContent = 'Post changed'
    postText.classList.remove('hidden');
  }, 0);
  
  setTimeout(() => {
    postText.classList.add('hidden');
  }, 2000);
}
//--------------------------------------------------------
//Delete a note in the API
async function deleteNote(noteId){
  try {
   const response = await fetch(`${BASE_URL}/api/notes/${noteId}`, {
      method: 'DELETE'
    }); 
    fetchNotes(nameInput.value);
  } catch (error) {
    console.log(error);
  }

  setTimeout(() => {
    postText.textContent = 'Post removed'
    postText.classList.remove('hidden');
  }, 0);
  
  setTimeout(() => {
    postText.classList.add('hidden');
  }, 2000);
}