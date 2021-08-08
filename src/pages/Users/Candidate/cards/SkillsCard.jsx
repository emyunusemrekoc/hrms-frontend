import React, { useEffect, useState } from "react";
import { Card, Icon, Modal, Table } from "semantic-ui-react";
import CandidateSkillService from "../../../../services/candidateSkillService";
import UpdateSkills from "../modals/UpdateSkills";

export default function SkillsCard({ candidate }) {

  const [candidateSkills, setCandidateSkills] = useState([]);

  useEffect(() => {
    if (candidate.id !== undefined) {
      let candidateSkillService = new CandidateSkillService();
      candidateSkillService
        .getAllByCandidateId(candidate.id)
        .then((result) => setCandidateSkills(result.data.data));
    }

  }, [candidate.id]);

  let candidateSkillService = new CandidateSkillService();

  const updateSkillsValues = () => {
    candidateSkillService.getAllByCandidateId(candidate.id).then((result) => {
      setCandidateSkills(result.data.data)
    })
  }
  return (
    <div>
      <Card fluid color="blue">
        <Card.Content>
          <Card.Header textAlign="left" style={{ padding: "0.5rem" }} >
            Yetenekler
            <Modal closeIcon
              size="medium"
              trigger={<button className="ui button"
                floated="right"
                style={{ width: "5%", backgroundColor: "white" }}>
                <Icon name="pencil" /> </button>} modal>
              <UpdateSkills
                candidate={candidate}
                candidateSkills={candidateSkills}
                updateSkillsValues={updateSkillsValues} />
            </Modal>
          </Card.Header>
        </Card.Content>
        <Table celled color={"grey"}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Yetenekler</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {candidateSkills.map((skill) => (
              <Table.Row key={skill.id}>
                <Table.Cell  >{skill.skill.toUpperCase()}</Table.Cell>

              </Table.Row>

            ))}
          </Table.Body>
        </Table>
      </Card>
    </div>
  )
}
