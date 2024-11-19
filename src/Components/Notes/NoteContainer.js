import React, { useEffect, useState } from "react";
import { Container, Alert, Button, Modal, Form } from "react-bootstrap";
import NoteCard from "./NoteCard";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { getAllNotesThunk, createNoteThunk } from "../../Api/Features/Notes/notesThunk";
import { 
  selectGetAllNotesStatus, 
  selectGetAllNotesError, 
  selectNotes, 
  SelectStatusOfNoteStatus, 
  selectCreateNoteStatus, 
  selectCreateNoteError
} from "../../Api/Features/Notes/notesSelectors";
import { useDispatch, useSelector } from "react-redux";
import { resetStatusOfChangeNoteStatus, resetCreateNoteStatus } from "../../Api/Features/Notes/notesSlice";
import Loader from "../utils/Loader";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

//images

import done_togglle from '../../Images/seymbols/done_all_24dp_11E1B4_FILL0_wght400_GRAD0_opsz24.png'
import all from '../../Images/seymbols/rule_24dp_11E1B4_FILL0_wght400_GRAD0_opsz24.png'
import pending_toggle from '../../Images/seymbols/avg_pace_24dp_11E1B4_FILL0_wght400_GRAD0_opsz24.png'

const NoteContainer = () => {
  const [allNotes, setAllNotes] = useState([]);
  const [completedNotes, setCompletedNotes] = useState([]);
  const [pendingNotes, setPendingNotes] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newNote, setNewNote] = useState({ title: "", content: "" });

  const dispatch = useDispatch();
  const NOTES = useSelector(selectNotes);
  const GetAllNotesStatus = useSelector(selectGetAllNotesStatus);
  const GetAllNotesError = useSelector(selectGetAllNotesError);
  const statusOfChangeNoteStatus = useSelector(SelectStatusOfNoteStatus);
  const createNoteStatus = useSelector(selectCreateNoteStatus);
  const createNoteError = useSelector(selectCreateNoteError);

  useEffect(() => {
    if (GetAllNotesStatus === "idle") {
      dispatch(getAllNotesThunk());
    }
  }, [GetAllNotesStatus, dispatch]);

  useEffect(() => {
    if (GetAllNotesStatus === "succeeded" && Array.isArray(NOTES) && NOTES.length > 0) {
      setAllNotes(NOTES);
      setCompletedNotes(NOTES.filter((note) => note.isCompleted === true));
      setPendingNotes(NOTES.filter((note) => note.isCompleted === false));
    }
  }, [GetAllNotesStatus, NOTES]);

  useEffect(() => {
    if (statusOfChangeNoteStatus === "succeeded") {
      dispatch(getAllNotesThunk());
      dispatch(resetStatusOfChangeNoteStatus());
    }
  }, [statusOfChangeNoteStatus, dispatch]);

  const handleShowCreateModal = () => setShowCreateModal(true);
  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
    setNewNote({ title: "", content: "" });
    dispatch(resetCreateNoteStatus());
  };

  const handleSaveCreateNote = () => {
    if (!newNote.title.trim()) {
      toast.error("Title is required to save the note");
      return;
    }
  
    const noteData = {
      title: newNote.title.trim(),
      ...(newNote.content.trim() && { content: newNote.content.trim() })
    };
  
    if (createNoteStatus === "idle") {
      dispatch(createNoteThunk(noteData))
        .then(() => {
          dispatch(getAllNotesThunk());
          toast.success("Note Created Successfully");
          handleCloseCreateModal();
        })
        .catch(() => {
          toast.error(`Failed to create note: ${createNoteError}`);
        });
    }
  };

  const handleChangeNewNote = (e) => {
    const { name, value } = e.target;
    setNewNote((prevNote) => ({ ...prevNote, [name]: value }));
  };

  return (
    <div className="note-Container">
      {GetAllNotesStatus === "failed" && (
        <Alert variant="danger">
          Failed to get all notes: {GetAllNotesError}
        </Alert>
      )}

      {GetAllNotesStatus === "loading" && <Loader />}

      <div className="add-note-btn-main">
        <button className="icon-btn add-btn" onClick={handleShowCreateModal}>
          <div className="add-icon"></div>
          <div className="btn-txt">Add Note</div>
        </button>
      </div>

      <Tabs
        defaultActiveKey="All"
        id="uncontrolled-tab-example"
        className="custom-tabs mb-3"
      >
        <Tab
          eventKey="All"
          title={<i className="fa-solid fa-list-check toggle-btn"></i> ||  <img style={{width:"20px"}} src={all}/>} 
        >
          <Container>
            {Array.isArray(allNotes) && allNotes.length > 0 ? (
              allNotes.map((note) => (
                <NoteCard
                  key={note._id}
                  title={note.title}
                  content={note.content}
                  isCompleted={note.isCompleted}
                  id={note._id}
                />
              ))
            ) : (
              <p>No notes available.</p>
            )}
          </Container>
        </Tab>

        <Tab
          eventKey="Done"
          title={<i className="fa-solid fa-check-double toggle-btn"></i>||  <img style={{width:"20px"}} src={done_togglle}/>}
        >
          <Container>
            {Array.isArray(completedNotes) && completedNotes.length > 0 ? (
              completedNotes.map((note) => (
                <NoteCard
                  key={note._id}
                  title={note.title}
                  content={note.content}
                  isCompleted={note.isCompleted}
                  id={note._id}
                />
              ))
            ) : (
              <p>No completed notes.</p>
            )}
          </Container>
        </Tab>

        <Tab
          eventKey="NoneCompleted"
          title={<i className="fa-solid fa-hourglass toggle-btn"></i> || <img style={{width:"20px"}} src={pending_toggle}/>}
        >
          <Container>
            {Array.isArray(pendingNotes) && pendingNotes.length > 0 ? (
              pendingNotes.map((note) => (
                <NoteCard
                  key={note._id}
                  title={note.title}
                  content={note.content}
                  isCompleted={note.isCompleted}
                  id={note._id}
                />
              ))
            ) : (
              <p>No pending notes.</p>
            )}
          </Container>
        </Tab>
      </Tabs>

      {/* Create Note Modal */}
      <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={newNote.title}
                onChange={handleChangeNewNote}
                placeholder="Enter title"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                name="content"
                value={newNote.content}
                onChange={handleChangeNewNote}
                rows={3}
                placeholder="Enter content (optional)"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreateModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveCreateNote}>
            Save Note
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default NoteContainer;
