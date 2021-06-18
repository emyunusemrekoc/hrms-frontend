import React, { useState, useEffect } from 'react'
import { Table, Menu, Icon,Header ,Image} from 'semantic-ui-react'
import JobTitleService from '../services/jobTitleService'

export default function JobTitleList() {

    const [jobTitles, setJobTitles] = useState([])

    useEffect(() => {
        let jobTitleService = new JobTitleService();
        jobTitleService.getAllJobTitles().then(result => setJobTitles(result.data.data))
    }, [])

    return (
        <div>
            
             <Image  className="ui centered medium image" src="assets/images/jobTitleLogo.png" />
             <Header  size="big">İŞ ÜNVANLARI</Header>
            <Table celled color="grey" >
           
                <Table.Header >
                    
                    <Table.Row>
                        <Table.HeaderCell Header > ID </Table.HeaderCell>
                        <Table.HeaderCell Header> Ünvanlar</Table.HeaderCell>
                        
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        jobTitles.map(jobTitle=>(

                       
                    <Table.Row key ={jobTitle.id}>
                        <Table.Cell >{jobTitle.id}</Table.Cell>
                        <Table.Cell>{jobTitle.title}</Table.Cell>
                        
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
