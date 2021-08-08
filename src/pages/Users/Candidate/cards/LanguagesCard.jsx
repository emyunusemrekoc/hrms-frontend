import React, { useEffect, useState } from "react";
import { Button, Card, Icon ,Modal,Table,Rating} from "semantic-ui-react";
import CandidateLanguageService from "../../../../services/candidateLanguageService";
import UpdateLanguages from "../modals/UpdateLanguages";

export default function LanguagesCard({candidate}) {

    const [candidateLanguages, setCandidateLanguages] = useState([]);

    useEffect(() => {
      if(candidate.id !==undefined ){ let candidateLanguageService = new CandidateLanguageService();
      candidateLanguageService
        .getAllByCandidateId(candidate.id) 
        .then((result) => setCandidateLanguages(result.data.data));}
     
    }, [candidate.id]);

    let candidateLanguageService = new CandidateLanguageService();

  const updateLanguagesValues = () => {
    candidateLanguageService.getAllByCandidateId(candidate.id).then((result) => {
      setCandidateLanguages(result.data.data)
    })}
    
    return (
        <div>
            <Card fluid color="blue">
        <Card.Content>
          <Card.Header textAlign="left" style={{ padding: "0.5rem" }} >
            Diller
            <Modal
              closeIcon
              size="medium"
              trigger={<button className="ui button"
                floated="right"
                style={{ width: "5%", backgroundColor: "white" }}>
              <Icon name="pencil" /> </button>} modal>
              <UpdateLanguages  
                candidate={candidate}
                candidateLanguages={candidateLanguages}
                updateLanguagesValues={updateLanguagesValues} />
            </Modal>
          </Card.Header>
        </Card.Content>
        <Table celled color={"grey"}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Diller</Table.HeaderCell>
              <Table.HeaderCell>Seviye</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {candidateLanguages.map((language) => (
              <Table.Row key={language.id}>
                <Table.Cell>{language.language}</Table.Cell>
                <Table.Cell> <Rating size="huge" icon='star' defaultRating={language.languageLevel} maxRating={5} disabled/></Table.Cell>
               

              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>
        </div>
    )
}
