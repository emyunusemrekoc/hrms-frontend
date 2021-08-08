import React, { useState, useEffect } from 'react'
import { Table, Menu, Icon, Header, Image,Button } from 'semantic-ui-react'
import JobPostingService from '../../services/jobPostingService'
import { Link } from "react-router-dom";


export default function JobPostingList() {

    const [jobPostings, setJobPostings] = useState([])

    useEffect(() => {
        let jobPostingService = new JobPostingService();
        jobPostingService.getAllJobPostingsByIsActive().then(result => setJobPostings(result.data.data))
    }, [])

    return (
        <div>

            <Image className="ui centered medium image" src="assets/images/jobPostingLogo.png" />
            <Header size="big">İŞ İLANLARI</Header>
            <Table celled color="grey" >

                <Table.Header >

                    <Table.Row>

                        <Table.HeaderCell Header> Şirket Adı</Table.HeaderCell>
                        <Table.HeaderCell Header> İş Ünvanı</Table.HeaderCell>
                        <Table.HeaderCell Header> Açık Pozisyonlar</Table.HeaderCell>
                        <Table.HeaderCell Header> İlan Oluşturulma Tarihi</Table.HeaderCell>
                        <Table.HeaderCell Header> İlan Bitiş Tarihi</Table.HeaderCell>
                        <Table.HeaderCell Header> İlan Bilgisi</Table.HeaderCell>


                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        jobPostings.map(jobPosting => (


                            <Table.Row key={jobPosting.id}>
                                <Table.Cell>{jobPosting.employerCompanyName}</Table.Cell>
                                <Table.Cell>{jobPosting.jobTitleTitle}</Table.Cell>
                                <Table.Cell>{jobPosting.numberOfOpenPosition}</Table.Cell>
                                <Table.Cell>{jobPosting.createdDate}</Table.Cell>
                                <Table.Cell>{jobPosting.createdDate}</Table.Cell>
                                <Table.Cell><Button as={Link} to={`/jobpostinglist/${jobPosting.id}`}
                                    content="Detaylar"
                                    icon="right arrow"
                                    labelPosition="right"
                                    circular
                                /></Table.Cell>

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
