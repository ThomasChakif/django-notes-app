import { useState, useEffect } from "react"
import api from "../api"

function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        getNotes()
    }, [])

    //this gives us all the notes a user has written
    const getNotes = () => {
        api.get("/api/notes/")
        .then((res) => res.data)
        .then((data) => {setNotes(data); console.log(data)})
        .catch((err) => alert(err)) //we lead the url with api since in the urls.py file in the backend, we took in all notes with a leading api/
    }

    //delete a note
    const deleteNote = (id) => {
        api.delete(`/api/notes/delete/${id}/`).then((res) => {
            if (res.status === 204) alert('Note was deleted!')
            else alert("Failed to delete note.")
            getNotes();
        }).catch((err) => alert(err))
    };

    //create a new note
    const createNote = (e) => {
        e.preventDefault()
        api.post("/api/notes/", {content, title}).then((res) => {
            if (res.status === 201) alert("Note created")
            else alert("Failed to create note")
            getNotes();
        }).catch((err) => alert(err))
    };

    return (
    <div>
        <div>
            <h2>Notes</h2>
        </div>
        <h2>Create a Note</h2>
        <form onSubmit={createNote}>
            <label htmlFor="title">Title:</label>
            <br/>
            <input 
                type="text" 
                id="title" 
                name="title" 
                required 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="content">Content:</label>
            <br/>
            <textarea 
                id="content" 
                name="content" 
                required 
                value={content} 
                onChange={(e) => setContent(e.target.value)}
            />
            <br/>
            <input type="submit" value = 'Submit'></input>
        </form>
    </div>
    )
}

export default Home