import React, { useEffect, useState } from "react";
import { Card, Icon, Modal, Table } from "semantic-ui-react";
import CandidateLinkService from "../../../../services/candidateLinkService";
import { SocialIcon } from "react-social-icons";
import UpdateLinks from "../modals/UpdateLinks";

export default function LinksCard({ candidate }) {

  const [candidateLinks, setCandidateLinks] = useState([]);

  useEffect(() => {
    if (candidate.id !== undefined) {
      let candidateLinkService = new CandidateLinkService();
      candidateLinkService
        .getAllByCandidateId(candidate.id)
        .then((result) => setCandidateLinks(result.data.data));
    }

  }, [candidate.id]);

  let candidateLinkService = new CandidateLinkService();

  const updateLinksValues = () => {
    candidateLinkService.getAllByCandidateId(candidate.id).then((result) => {
      setCandidateLinks(result.data.data)
    })
  }
  return (
    <div>
      <Card fluid color="blue">
        <Card.Content>
          <Card.Header textAlign="left" style={{ padding: "0.5rem" }} >
            Sosyal Medya - Kişisel Web Adresleri
            <Modal closeIcon
              size="medium"
              trigger={<button className="ui button"
                floated="right"
                style={{ width: "5%", backgroundColor: "white" }}>
                <Icon name="pencil" /> </button>} modal>
              <UpdateLinks
                candidate={candidate}
                candidateLinks={candidateLinks}
                updateLinksValues={updateLinksValues} />
            </Modal>
          </Card.Header>
        </Card.Content>
        <Table celled color={"grey"}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center">Link</Table.HeaderCell>
              <Table.HeaderCell>Web Adresleri</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {candidateLinks.map((link) => (
              <Table.Row key={link.id}>
                <Table.Cell width="1"><SocialIcon url={link.link} target="_blank"></SocialIcon></Table.Cell>
                <Table.Cell>{link.link}</Table.Cell>

              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>
    </div>
  )
}
