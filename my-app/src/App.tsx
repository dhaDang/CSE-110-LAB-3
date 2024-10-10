import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css'; /*import css file*/
import { Label, Note } from "./types"; /*import custom types for note and label*/
import { dummyNotesList } from "./constants"; /*import dummy data*/
import ToggleTheme, { ClickCounter} from "./hooksExercise"; /*import toggle theme and clickcounter compoenets*/


function App() {
  const [notes,setNotes]=useState<Note[]>(dummyNotesList); /*state to store notes*/

  const [newNote, setNewNote] = useState<Note>({ /*state for storing new note data*/
    id: -1, /*temp id*/
    title: "", /*set default title*/
    content: "",
    label: Label.other,
    isFavorite: false,
  });

  const [selectedLabel, setSelectedLabel] = useState<Label>(Label.other); /*keep track of selected label in drop down*/

  const [selectedNote, setSelectedNote] = useState<Note|null>(null); /*keep track of note being editted*/

const createNoteHandler = (event: React.FormEvent<HTMLFormElement>) => { /*function to create new notes*/
  event.preventDefault(); /*prevent default form submission*/
  const newId = notes.length>0 ? Math.max(...notes.map(note => note.id))+1:1; /*generate new id based on length of existing ids*/

  setNotes([...notes, { ...newNote, id:newId, label: selectedLabel }]); /*add new note to note list*/
  
  setNewNote({ /*reset for m fields to default after note creation */
    id: -1,
    title: "",
    content: "",
    label: Label.other,
    isFavorite: false,
  });
  setSelectedLabel(Label.other); /*reset label to other*/
};

  const toggleFavorite = (id: number) => { /*favorite toggle functino*/
    setNotes(
      notes.map(note=>note.id === id ? {...note,isFavorite:!note.isFavorite} :note
      )
    );
  };

  const handleNoteEdit = (id:number, field: keyof Note, value: string) => {/*function to edit note*/
    setNotes(
      notes.map(note => note.id == id ? { ...note, [field]: value}: note)
    );
  };

  const selectNoteForEditing = (note:Note) => { /*function to select*/
    setSelectedNote(note);
  }

  const deleteNote = (id: number) => { /*function to delete*/
    setNotes(notes.filter(note=> note.id !==id));
  };

  /*list of favorite titles*/
  const favoriteNoteTitles = notes.filter(note => note.isFavorite).map(note=>note.title);
  const [titleBackgroundColor, setTitleBackgroundColor] = useState<string>('');
  const [contentBackgroundColor, setContentBackgroundColor] = useState<string>('');
  return (
    <div className='app-container'>
      {/*creation note area*/}
      <form className="note-form" onSubmit={createNoteHandler}>
    	<div>
      	<input
          id="title"
        	placeholder="Note Title"
          style={{backgroundColor: titleBackgroundColor}}
          onFocus={() => setTitleBackgroundColor('#e0f7fa')}
          onBlur={() => setTitleBackgroundColor('')}
          value={newNote.title}
        	onChange={(event) =>
          	setNewNote({...newNote, title: event.target.value})}
        	required>
      	</input>
    	</div>

    	<div>
        {/*note content creation*/}
      	<textarea
          id = "content"
        	placeholder='Note Content'
          style = {{backgroundColor: contentBackgroundColor}}
          onFocus={() => setContentBackgroundColor("#e0f7fa")}
          onBlur={() => setContentBackgroundColor('')}
          value = {newNote.content}
          onChange={(event) => setNewNote({...newNote, content: event.target.value})}
      	/>
    	</div>

  <div>
    {/*selecting note when creating notee*/}
     	<select
       	value={selectedLabel}
        onChange={(event) => setSelectedLabel(event.target.value as Label)}
       	required>
       	<option value={Label.personal}>Personal</option>
       	<option value={Label.study}>Study</option>
       	<option value={Label.work}>Work</option>
       	<option value={Label.other}>Other</option>
     	</select>
   	</div>
    {/*SUbmission for new note creation*/}        
    	<div><button type="submit">Create Note</button></div>
  	</form>
      <div className="notes-grid">
       {notes.map((note) => (
         <div
           key={note.id}
           className="note-item"
            style = {{border: "1px solid #ddd", borderRadius: "8px", padding: "10px"}}
            onClick = {() => selectNoteForEditing(note)}
            >
           <div className="notes-header">
            {/*for each note have a heart for the favorites*/}
            <button onClick={() => toggleFavorite(note.id)}
              style={{cursor: 'pointer', border:'none',background:'transparent'}}>
                <span style = {{color: note.isFavorite ? 'red' : 'gray'}}>
                  {note.isFavorite ? '♥' : '♡'}
                </span>
              </button>
              {/*button to delete note*/}
             <button
              onClick={(e) => {
                e.stopPropagation();
                deleteNote(note.id);
              }}
                style = {{cursor:'pointer', border:'none', background:'transparent'}}
                >
                  x
                  </button>
             
            </div>
            {/*handle note editingg - title, content, type*/}
            <h2
              contentEditable 
              suppressContentEditableWarning
              onBlur = {(e) => handleNoteEdit(note.id, 'title', e.currentTarget.textContent || '')}
              style={{cursor:'text'}}
              >
                {note.title}
              </h2>
           <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleNoteEdit(note.id, 'content', e.currentTarget.textContent || '')}
            > 
              {note.content}
            </p>
           <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleNoteEdit(note.id, 'label', e.currentTarget.textContent || '')} style = {{cursor:'text'}}> 
              {note.label} 
            </p>
         </div>
       ))}
     </div>
       {/*display the favorites list of notes*/}
     <div className='favorites-list' style={{position:'absolute', bottom: '20px', left: '20px'}}>
      <h4>List of favorites:</h4>
        <ul>
          {favoriteNoteTitles.length > 0 ? (
            favoriteNoteTitles.map((title, index) => <li key={index}>{title}</li>)
          ) : (<p>No favorite notes.</p>)}
        </ul>
     </div>
     {/*changes light/dark mode*/}
     <ToggleTheme/>
   </div>
  );
}

export default App;
