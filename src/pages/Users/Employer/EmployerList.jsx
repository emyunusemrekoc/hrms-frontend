import React, { useState, useEffect } from 'react'
import { Table, Menu, Icon,Header ,Image} from 'semantic-ui-react'
import EmployerService from '../../../services/employerService'

export default function EmployerList() {

    const [employers, setEmployers] = useState([])

    useEffect(() => {
        let employerService = new EmployerService();
        employerService.getAllEmployers().then(result => setEmployers(result.data.data))
    }, [])
    return (
        <div>
            
           
            <Image  className="ui centered medium image" src="assets/images/companyLogo.png" />
             <Header  size="big">ŞİRKETLER</Header>
            <Table celled color="grey" >
           
                <Table.Header >
                    
                    <Table.Row>
                        <Table.HeaderCell Header > ID </Table.HeaderCell>
                        <Table.HeaderCell Header> ŞİRKET İSMİ</Table.HeaderCell>
                        <Table.HeaderCell Header> ŞİRKET TELEFONU</Table.HeaderCell>
                        <Table.HeaderCell Header> E-MAİL ADRESİ</Table.HeaderCell>
                        <Table.HeaderCell Header> WEB ADRESİ</Table.HeaderCell>
                        
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        employers.map(employer=>(

                       
                    <Table.Row key ={employer.id}>
                        <Table.Cell >{employer.id}</Table.Cell>
                        <Table.Cell>{employer.companyName}</Table.Cell>
                        <Table.Cell>{employer.phoneNumber}</Table.Cell>
                        <Table.Cell>{employer.email}</Table.Cell>
                        <Table.Cell>{employer.webAdress}</Table.Cell>
                        
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
