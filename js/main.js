import NotesAPI from "./NotesAPI.js"

NotesAPI.saveNote({
    id: 224496,
    title: "The title has changed",
    body: "I am a new note."
});

console.log(NotesAPI.getALLNotes());