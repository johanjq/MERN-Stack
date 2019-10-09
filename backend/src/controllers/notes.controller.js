 const notesCtrl = {};

 const Note = require('../models/Note');

 notesCtrl.getNotes = async (req, res) => {
    const notes = await Note.find(); // [{ }, { }]
    res.json(notes)
 };

 notesCtrl.createNote = async (req, res) => {
    const { title, content, date, author } = req.body;
    const newNote = new Note({
            title,
            content,
            date,
            author
        })
        await newNote.save();
        res.json({message: 'Note Saved'})
 }

 notesCtrl.getNote = async (req, res) => {
    const { id } = req.params;
    const note = await Note.findById(id);
    res.json(note);
 }
 notesCtrl.updateNote = async (req, res) => {
    const { title, content, author } = req.body;
    const { id } = req.params;
    await Note.findByIdAndUpdate(id, {
        title,
        content,
        author
    })
    res.json({message: "Note Updated"});
 }
 
 notesCtrl.deleteNote = async (req, res) => {
    const { id } = req.params;
    await Note.findByIdAndDelete(id);
    res.json({message: "Note succesfully Deleted"});
 }

 module.exports = notesCtrl;