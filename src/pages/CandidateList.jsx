import React, { useState, useEffect } from 'react'
import { Table, Menu, Icon,Header ,Image} from 'semantic-ui-react'
import CandidateService from '../services/candidateService'

export default function CandidateList() {

    const [candidates, setCandidates] = useState([])

    useEffect(() => {
        let candidateService = new CandidateService();
        candidateService.getAllCandidates().then(result => setCandidates(result.data.data))
    }, [])

    return (


        <div>
            {/* <Icon color="teal" size="huge" name="puzzle piece"> </Icon> */}
            <Image  className="ui centered medium image" src="assets/images/candidatelogo.png" />
             <Header  size="big">İŞ ARAYANLAR</Header>
            <Table celled color="grey" >
           
                <Table.Header >
                    
                    <Table.Row>
                        <Table.HeaderCell Header > ID </Table.HeaderCell>
                        <Table.HeaderCell Header> ADI</Table.HeaderCell>
                        <Table.HeaderCell Header> SOYADI</Table.HeaderCell>
                        <Table.HeaderCell Header> E-MAİL ADRESİ</Table.HeaderCell>
                        <Table.HeaderCell Header> DOĞUM TARİHİ</Table.HeaderCell>
                        
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        candidates.map(candidate=>(

                       
                    <Table.Row key ={candidate.id}>
                        <Table.Cell >{candidate.id}</Table.Cell>
                        <Table.Cell>{candidate.firstName}</Table.Cell>
                        <Table.Cell>{candidate.lastName}</Table.Cell>
                        <Table.Cell>{candidate.email}</Table.Cell>
                        <Table.Cell>{candidate.dateOfBirth}</Table.Cell>
                        
                    </Table.Row>
                        ))
                     }
                   
                </Table.Body>

                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='6'>
                            <Menu floated='right' pagination>
                                <Menu.Item as='a' icon>
                                    <Icon name='chevron left' />
                                </Menu.Item>
                                <Menu.Item as='a'>1</Menu.Item>
                                <Menu.Item as='a'>2</Menu.Item>
                                <Menu.Item as='a'>3</Menu.Item>
                                <Menu.Item as='a'>4</Menu.Item>
                                <Menu.Item as='a' icon>
                                    <Icon name='chevron right' />
                                </Menu.Item>
                            </Menu>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>

        </div>
    )
}
