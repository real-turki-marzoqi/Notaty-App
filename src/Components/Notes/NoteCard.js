import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import { useDispatch, useSelector } from "react-redux";
import {
  SelectStatusOfNoteStatus,
  SelectErrorOfChangeNoteStatus,
  selecUpdateNoteStatus,
  selectUpdateNoteError,
  selecDeleteNoteStatus,
  selectDeleteNoteError,
  

} from "../../Api/Features/Notes/notesSelectors";
import { changeNoteStatusThunk ,updateNoteThunk,getAllNotesThunk ,deleteNoteThunk} from "../../Api/Features/Notes/notesThunk";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { resetUpdateNoteStatus,resetDeleteNoteStatus } from "../../Api/Features/Notes/notesSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey);
  return (
    <button
      type="button"
      style={{
        backgroundColor: "transparent",
        border: "none",
        color: "#15B392",
      }}
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}

const NoteCard = ({ title, content, isCompleted, id }) => {
  const [showUpdateModel, setShowUpdateModel] = useState(false);

  const [showDeleteModel, setShowDeleteModel] = useState(false);

  const [UpdateNote, SetUpdatedNote] = useState({ title: "", content: "" });

  const statusOfNoteStatus = useSelector(SelectStatusOfNoteStatus);
  const errorOfNoteStatus = useSelector(SelectErrorOfChangeNoteStatus);
  const dispatch = useDispatch();

  const updateNoteStatus = useSelector(selecUpdateNoteStatus);
  const updateNoteError = useSelector(selectUpdateNoteError);

  const deleteNoteStatus = useSelector(selecDeleteNoteStatus)
  const deleteNoteError = useSelector(selectDeleteNoteError)

  const handleChangeStatus = () => {
    if (statusOfNoteStatus === "idle") {
      dispatch(changeNoteStatusThunk(id));
    }
  };

  if (errorOfNoteStatus) {
    return <Alert>{errorOfNoteStatus}</Alert>;
  }

  // handle Founctions

  const handleCloseUpdateModel = () => setShowUpdateModel(false);
  const handleShowUpdateModel = () => setShowUpdateModel(true);

  const handleCloseDeleteModel = () => setShowDeleteModel(false);
  const handleShowDeleteModel = () => setShowDeleteModel(true);

  const handleChangeUpdateNote = (e) => {
    const { name, value } = e.target;

    SetUpdatedNote({
      ...UpdateNote,
      [name]: value,
    });
  };

  const handleSaveUpdatedNote = () => {
    if (updateNoteStatus === "idle") {
      dispatch(updateNoteThunk({ id, noteData: UpdateNote }))
        .then(() => {
          dispatch(getAllNotesThunk()); 
          dispatch(resetUpdateNoteStatus()); 
          toast.success("Note Updated Successfully"); 
        })
        .catch(() => {
          toast.error(`Failed to update note:${updateNoteError}`); 
        });
      setShowUpdateModel(false); 
    }
  };
  
  const handleSaveDeleteNote = () => {
    if (deleteNoteStatus === "idle") {
      dispatch(deleteNoteThunk(id))
        .then(() => {
          dispatch(getAllNotesThunk()); 
          toast.success("Note Deleted Successfully"); 
        })
        .catch(() => {
          toast.error(`Failed to delete note:${deleteNoteError}`); 
        })
        .finally(() => {
          dispatch(resetDeleteNoteStatus()); 
        });
      setShowDeleteModel(false);  
    }
  };
  
  
  

  return (
    <div
      style={{
        borderBlockColor: isCompleted ? "black" : "",
        backgroundColor: isCompleted ? "#6382a232" : "",
      }}
      className="NoteCard"
    >
      <Container>
      
        <Row>
          <Col
            className="note-title"
            xl={10}
            lg={10}
            md={10}
            sm={12}
            xs={12}
            style={{
              textDecoration: isCompleted ? "line-through" : "none",
              color: isCompleted ? "gray" : "black",
            }}
          >
            {title}
          </Col>
          <Col
            className="note-Icon-container"
            xl={2}
            lg={2}
            md={2}
            sm={6}
            xs={6}
          >
            <i
              style={{
                border: "solid 2px",
                borderRadius: "10px",
                padding: "2px",
                color: isCompleted ? "#15B392" : "",
                cursor: "pointer",
              }}
              className="fa-solid fa-check icons-complete"
              onClick={handleChangeStatus}
            ></i>
            <i
              onClick={handleShowUpdateModel}
              className="fa-regular fa-pen-to-square icons-edit"
            ></i>

            <i onClick={handleShowDeleteModel} className="fa-regular fa-circle-xmark icons-delete"></i>
          </Col>
        </Row>
        <Row className="accordion-row">
          <Col className="accordion-col" xl={4} lg={4} md={6} sm={12} xs={12}>
            <Accordion defaultActiveKey="0">
              <Card className="dropdown-card">
                <Card.Header>
                  <CustomToggle eventKey="1">Details</CustomToggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                  <Card.Body
                    style={{
                      textDecoration: isCompleted ? "line-through" : "none",
                      color: isCompleted ? "gray" : "black",
                    }}
                  >
                    {content}
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Col>
        </Row>
      </Container>

      {/* Start Model of Update Note */}
      <Modal
        className="Update-model"
        show={showUpdateModel}
        onHide={handleCloseUpdateModel}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
              name="title"
                value={UpdateNote.title}
                onChange={handleChangeUpdateNote}
                type="text"
                placeholder="New Title"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
              name="content"
               value={UpdateNote.content}
               onChange={handleChangeUpdateNote}
              
              placeholder="New Content" as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant=""  style={{backgroundColor:"#11e1"}} onClick={handleCloseUpdateModel}>
            Close
          </Button>
          <Button 
          
          style={{backgroundColor:"#7e60bf"}}
          variant=""
           onClick={handleSaveUpdatedNote}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* End Model of Update Note */}

      {/* Start Delete model */}

      <Modal 
        className="Update-model"
      show={showDeleteModel} onHide={handleCloseDeleteModel}>
  <Modal.Header closeButton>
    <Modal.Title>Delete Note</Modal.Title>
  </Modal.Header>
  <Modal.Body>Are you sure you want to delete this note?</Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseDeleteModel}>
      Cancel
    </Button>
    <Button variant="danger" onClick={handleSaveDeleteNote}>
      Delete
    </Button>
  </Modal.Footer>
</Modal>


      {/* End DELETE model */}
    </div>
  );
};

export default NoteCard;
