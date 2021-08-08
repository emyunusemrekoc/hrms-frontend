import React from 'react'
import { Grid, Image, Card, Table, Header } from 'semantic-ui-react'
import moment from 'moment'

export default function ProfileCard({candidate}) {
    return (
        <div>
       
            <Card fluid color="blue">
                <Card.Content>
                    <Grid>
                        <Grid.Column width={4}>
                        <Image style={{marginTop:"1.5em"}}  size="medium"   src="assets/images/HRMSlogo.png" />
                            <Image style={{marginTop:"3em"}} floated="left" size="large" circular  src='https://img.piri.net/mnresize/900/-/resim/upload/2017/11/12/11/28/12ee7246kapak.jpg' />
                        </Grid.Column>
                        <Grid.Column width={12}>
                            <h1><Card.Header >{candidate.firstName + " "+ candidate.lastName}</Card.Header></h1>
                            <Card.Description>
                                <Table celled color={"blue"}>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>Kullanıcı</Table.HeaderCell>
                                            <Table.HeaderCell>Bilgiler</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>

                                    <Table.Body>
                                        <Table.Row>
                                            <Table.Cell>
                                                <Header as="h4" >
                                                    <Header.Content>Ad</Header.Content>
                                                </Header>
                                            </Table.Cell>
                                            <Table.Cell>{candidate.firstName}</Table.Cell>
                                        </Table.Row>

                                        <Table.Row>
                                            <Table.Cell>
                                                <Header as="h4" >
                                                    <Header.Content>Soyad</Header.Content>
                                                </Header>
                                            </Table.Cell>
                                            <Table.Cell>{candidate.lastName}</Table.Cell>
                                        </Table.Row>

                                        <Table.Row>
                                            <Table.Cell>
                                                <Header as="h4" >
                                                    <Header.Content>Doğum Tarihi</Header.Content>
                                                </Header>
                                            </Table.Cell>
                                            <Table.Cell>{moment(candidate.dateOfBirth).format('DD/MM/YYYY')}</Table.Cell>
                                        </Table.Row>

                                        <Table.Row>
                                            <Table.Cell>
                                                <Header as="h4" >
                                                    <Header.Content>Email</Header.Content>
                                                </Header>
                                            </Table.Cell>
                                            <Table.Cell>{candidate.email}</Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                </Table>
                            </Card.Description>

                        </Grid.Column>

                    </Grid>
                </Card.Content >
                <Card.Content extra></Card.Content>
            </Card>

        </div>
    )

}
