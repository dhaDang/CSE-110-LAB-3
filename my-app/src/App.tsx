import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { Label, Note } from "./types";
import { dummyNotesList } from "./constants"; 
import { ClickCounter} from "./hooksExercise";

function App() {
  const [notes,setNotes]=useState<Note[]>(dummyNotesList);

  const [newNote, setNewNote] = useState<Note>({
    id: -1,
    title: "",
    content: "",
    label: Label.other,
    isFavorite: false,
  });

  const [selectedLabel, setSelectedLabel] = useState<Label>(Label.other);
  // const initialNote = {
  //   id: -1,
  //   title: "",
  //   content: "",
  //   label: Label.other,
  // };

  const [selectedNote, setSelectedNote] = useState<Note|null>(null);

const createNoteHandler = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const newId = notes.length>0 ? Math.max(...notes.map(note => note.id))+1:1;

  setNotes([...notes, { ...newNote, id:newId, label: selectedLabel }]);
  
  setNewNote({
    id: -1,
    title: "",
    content: "",
    label: Label.other,
    isFavorite: false,
  });
  setSelectedLabel(Label.other);
};

  const toggleFavorite = (id: number) => {
    setNotes(
      notes.map(note=>note.id === id ? {...note,isFavorite:!note.isFavorite} :note
      )
    );
  };

  const handleNoteEdit = (id:number, field: keyof Note, value: string) => {
    setNotes(
      notes.map(note => note.id == id ? { ...note, [field]: value}: note)
    );
  };

  const selectNoteForEditing = (note:Note) => {
    setSelectedNote(note);
  }

  const favoriteNoteTitles = notes.filter(note => note.isFavorite).map(note=>note.title);
  
  return (
    <div className='app-container'>
      <form className="note-form" onSubmit={createNoteHandler}>
    	<div>
      	<input
        	placeholder="Note Title"
          value={newNote.title}
        	onChange={(event) =>
          	setNewNote({...newNote, title: event.target.value})}
        	required>
      	</input>
    	</div>

    	<div>
      	<textarea
        	placeholder='Note Content'
          value = {newNote.content}
          onChange={(event) => setNewNote({...newNote, content: event.target.value})}
      	/>
    	</div>

  <div>
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

    	<div><button type="submit">Create Note</button></div>
  	</form>

      //favoriting tool
      <div className="notes-grid">
       {notes.map((note) => (
         <div
           key={note.id}
           className="note-item"
            style = {{border: "1px solid #ddd", borderRadius: "8px", padding: "10px"}}
            onClick = {() => selectNoteForEditing(note)}
            >
           <div className="notes-header">
            <button onClick={() => toggleFavorite(note.id)}
              style={{cursor: 'pointer', border:'none',background:'transparent'}}>
                <span style = {{color: note.isFavorite ? 'red' : 'gray'}}>
                  {note.isFavorite ? '♥' : '♡'}
                </span>
              </button>
             <button>x</button>
             
            </div>

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
     
     <div className='favorites-list' style={{position:'absolute', bottom: '20px', left: '20px'}}>
      <h4>List of favorites:</h4>
        <ul>
          {favoriteNoteTitles.length > 0 ? (
            favoriteNoteTitles.map((title, index) => <li key={index}>{title}</li>)
          ) : (<p>No favorite notes.</p>)}
        </ul>
     </div>
     <ClickCounter/>
   </div>
  );
}

export default App;
