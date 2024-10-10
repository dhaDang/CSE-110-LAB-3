import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { Label, Note } from "./types";
import { dummyNotesList } from "./constants"; 
import { ClickCounter} from "./hooksExercise";

function App() {
  const [notes,setNotes]=useState<Note[]>(dummyNotesList);

  const toggleFavorite = (id: number) => {
    setNotes(
      notes.map(note=>note.id === id ? {...note,isFavorite:!note.isFavorite} :note
      )
    );
  };

  const favoriteNoteTitles = notes.filter(note => note.isFavorite).map(note=>note.title);
  
  return (
    <div className='app-container'>
      <form className="note-form">
       <div><input placeholder="Note Title"></input></div>

       <div><textarea placeholder="Note Content"></textarea></div>
        <div>
          <select>
            <option>Other</option>
            <option>Work</option>
            <option>Study</option>
            <option>Personal</option>
          </select>
        </div>
       <div><button type="submit">Create Note</button></div>
      </form>

      <div className="notes-grid">
       {notes.map((note) => (
         <div
           key={note.id}
           className="note-item">
           <div className="notes-header">
            <button onClick={() => toggleFavorite(note.id)}
              style={{cursor: 'pointer', border:'none',background:'transparent'}}>
                <span style = {{color: note.isFavorite ? 'red' : 'gray'}}>
                  {note.isFavorite ? '♥' : '♡'}
                </span>
              </button>
             <button>x</button>
             
            </div>
            <h2>{note.title}</h2>
           <p> {note.content} </p>
           <p> {note.label} </p>
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
