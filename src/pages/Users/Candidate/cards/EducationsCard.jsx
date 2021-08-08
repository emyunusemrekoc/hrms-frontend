import React, { useEffect, useState } from "react";
import { Button, Card, Icon, Table,Modal } from "semantic-ui-react";
import CandidateEducationService from "../../../../services/candidateEducationService";
import UpdateEducations from "../modals/UpdateEducations";
import moment from "moment";

export default function EducationsCard({ candidate }) {

  const [candidateEducations, setCandidateEducations] = useState([]);

  

  useEffect(() => {
    if(candidate.id !==undefined ){let candidateEducationService = new CandidateEducationService();
    candidateEducationService
      .getAllByByCandidateIdOrderByEndDateDesc(candidate.id)
      .then((result) => setCandidateEducations(result.data.data));} 
  }, [candidate.id]);

  let candidateEducationService = new CandidateEducationService();

  const updateEducationsValues = () => {
    candidateEducationService.getAllByByCandidateIdOrderByEndDateDesc(candidate.id).then((result) => {
      setCandidateEducations(result.data.data)
    })
  }

  return (
    <div >
      <Card fluid color="blue">
        <Card.Content>
          <Card.Header textAlign="left" style={{ padding: "0.5rem" }} >
            Eğitim
            <Modal
              closeIcon
              size="medium"
              trigger={<button className="ui button"
                floated="right"
                style={{ width: "5%", backgroundColor: "white" }}>
              <Icon name="pencil" /> </button>} modal>
              <UpdateEducations  
                candidate={candidate}
                candidateEducations={candidateEducations}
                updateEducationsValues={updateEducationsValues} />
            </Modal>
          </Card.Header>
        </Card.Content>
        <Table celled color={"grey"}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Okul Adı</Table.HeaderCell>
              <Table.HeaderCell>Bölüm</Table.HeaderCell>
              <Table.HeaderCell>Mezuniyet Derecesi</Table.HeaderCell>
              <Table.HeaderCell>Başlangıç Tarihi</Table.HeaderCell>
              <Table.HeaderCell>Mezuniyet Tarihi</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {candidateEducations?.map((education) => (
              <Table.Row key={education.id}>
                <Table.Cell>{education.schoolName.toUpperCase()}</Table.Cell>
                <Table.Cell>{education.schoolDepartment}</Table.Cell>
                <Table.Cell>{education.degreeEduDegree}</Table.Cell>
                <Table.Cell>{ moment(education.startedDate).format('DD/MM/YYYY')}</Table.Cell>
                <Table.Cell>{education.endDate ? moment(education.endDate).format('DD/MM/YYYY'): <p>Devam Ediyor</p>}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>
    </div>
  );
}