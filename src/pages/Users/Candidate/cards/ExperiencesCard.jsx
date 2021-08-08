import React, { useEffect, useState } from "react";
import { Button, Card, Icon, Modal, Table } from "semantic-ui-react";
import CandidateExperienceService from "../../../../services/candidateExperienceService";
import UpdateExperiences from "../modals/UpdateExperiences";
import moment from "moment";

export default function ExperiencesCard({ candidate }) {

  const [candidateExperiences, setCandidateExperiences] = useState([]);

  useEffect(() => {
    if(candidate.id !==undefined ){let candidateExperienceService = new CandidateExperienceService();
    candidateExperienceService
      .getAllByByCandidateIdOrderByEndDateDesc(candidate.id)
      .then((result) => setCandidateExperiences(result.data.data));}
    
  }, [candidate.id]);

  let candidateExperienceService =  new CandidateExperienceService();

  const updateExperiencesValues = () => {
    candidateExperienceService.getAllByByCandidateIdOrderByEndDateDesc(candidate.id).then((result) => {
      setCandidateExperiences(result.data.data)
    })}

  return (
    <div>
      <Card fluid color="blue">
        <Card.Content>
          <Card.Header textAlign="left" style={{ padding: "0.5rem" }} >
            Deneyim
            <Modal
              closeIcon
              size="medium"
              trigger={<button className="ui button"
                floated="right"
                style={{ width: "5%", backgroundColor: "white" }}>
              <Icon name="pencil" /> </button>} modal>
              <UpdateExperiences  
                candidate={candidate}
                candidateExperiences={candidateExperiences}
                updateExperiencesValues={updateExperiencesValues} />
            </Modal>
          </Card.Header>
        </Card.Content>
        <Table celled color={"grey"}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Şirket Adı</Table.HeaderCell>
              <Table.HeaderCell>Ünvan</Table.HeaderCell>
              <Table.HeaderCell>Başlangıç Tarihi</Table.HeaderCell>
              <Table.HeaderCell>Çıkış Tarihi</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {candidateExperiences?.map((experience) => (
              <Table.Row key={experience.id}>
                <Table.Cell>{experience.companyName.toUpperCase()}</Table.Cell>
                <Table.Cell>{experience.jobTitleTitle}</Table.Cell>
                <Table.Cell>{moment(experience.startedDate).format('DD/MM/YYYY')}</Table.Cell>
                {/* <Table.Cell>{experience.endDate ? experience.endDate : <p>Devam Ediyor</p>}</Table.Cell> */}
                <Table.Cell>{experience.endDate ? moment(experience.endDate).format('DD/MM/YYYY'): <p>Devam Ediyor</p>}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>
    </div>
  )
}
