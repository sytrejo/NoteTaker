export default class NotesAPI{
    static getALLNotes(){
        const notes = JSON.parse(localStorage.getItem("notesapp-notes") || "[]");
        
        return notes.sort((a, b) => {
            return new Date(a.updated) > new Date(b.update) ? -1 : 1;
        });
    }

    static saveNote(noteToSave){
        const notes = NotesAPI.getALLNotes();
        const existing = notes.find(note => note.id == noteToSave.id);

        //Edit or Update
        if(existing){
            existing.title = noteToSave.title;
            existing.body = noteToSave.body;
            existing.update = new Date().toISOString();

        } else {
            noteToSave.id = Math.floor(Math.random() * 1000000);
            noteToSave.updated = new Date().toISOString();
            notes.push(noteToSave);   
        }
        
        localStorage.setItem("notesapp-notes", JSON.stringify(notes));


    }

    static deleteNote(id){
        const notes = NotesAPI.getALLNotes();
        const newNotes = notes.filter (note => note.id != id);

        localStorage.setItem("notesapp-note", JSON.stringify(newNotes));
    }
}