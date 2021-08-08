import React, { useState, useEffect } from "react";
import CandidateCoverLetterService from "../../../../services/candidateCoverLetterService";
import { Card, Icon, Modal, Button } from "semantic-ui-react";
import UpdateCoverLetter from "../modals/UpdateCoverLetter";





export default function CoverLetterCard({ candidate }) {

  const [coverLetter, setCoverLetter] = useState([]);

  
  useEffect(() => {
    if(candidate.id !==undefined ){ console.log(candidate.id) 
   let candidateCoverLetterService = new CandidateCoverLetterService();
    candidateCoverLetterService.getByCandidateId(candidate.id)
      .then((result) => setCoverLetter(result.data.data));}
 
  }, [candidate.id]);

  let candidateCoverLetterService = new CandidateCoverLetterService();

  const updateCoverLetterValues = () => {
    candidateCoverLetterService.getByCandidateId(candidate.id).then((result) => {
      setCoverLetter(result.data.data)
    })
  }


  return (
    <div >

      <Card fluid color="blue">
        <Card.Content>
          <Card.Header textAlign="left" style={{ padding: "0.5rem" }}>
            Hakkında
            <Modal
              closeIcon
              size="small"
              trigger={<button className="ui button"
                floated="right"
                style={{ width: "5%", backgroundColor: "white" }}>
                <Icon name="pencil" />  </button>} >
              <UpdateCoverLetter
                candidate={candidate}
                coverLetter={coverLetter}
                updateCoverLetterValues={updateCoverLetterValues}
              />
             <Modal.Actions>
        

      </Modal.Actions>
            </Modal>
          </Card.Header>
        </Card.Content>
        <Card.Content textAlign="left" description={coverLetter.coverLetter} />
      </Card>
    </div>
  )
}
