import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import JobPostingService from "../../services/jobPostingService";
import { Header, Icon, Table, Button, Grid, Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";


export default function JobPostingDetail() {

    let { id } = useParams();

    const [jobPosting, setJobPosting] = useState({});


    useEffect(() => {
        let jobPostingService = new JobPostingService();
        jobPostingService.getByJobPostingId(id).then((result) => setJobPosting(result.data.data));
    }, [id]);



    return (
        <div>
            <Card fluid color="blue">
                <Card.Content>
                    <Grid>
                        <Grid.Column width={4}>

                            <Image style={{ marginTop: "1.5em" }} size="medium" src="/assets/images/HRMSlogo.png" />
                            {/* <Image style={{ marginTop: "3em" }} floated="left" size="large" circular src='https://img.piri.net/mnresize/900/-/resim/upload/2017/11/12/11/28/12ee7246kapak.jpg' /> */}
                        </Grid.Column>
                        <Grid.Column width={12}>
                            <h1><Card.Header >{jobPosting.jobPostingName}</Card.Header></h1>
                            <Card.Description>
                                <Table celled color={"black"} stackable>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>İş veren</Table.HeaderCell>
                                            <Table.HeaderCell>Bilgiler</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>

                                    <Table.Body>
                                        <Table.Row textAlign={"left"}>
                                            <Table.Cell>
                                                <Header as="h4" image>
                                                    <Header.Content>
                                                        <Icon name="building" />
                                                        Şirket Adı
                                                    </Header.Content>
                                                </Header>
                                            </Table.Cell>
                                            <Table.Cell>{jobPosting.employer?.companyName}</Table.Cell>
                                        </Table.Row>

                                        <Table.Row textAlign={"left"}>
                                            <Table.Cell>
                                                <Header as="h4" image>
                                                    <Header.Content>
                                                        <Icon name="mail" />
                                                        Email
                                                    </Header.Content>
                                                </Header>
                                            </Table.Cell>
                                            <Table.Cell>{jobPosting.employer?.email}</Table.Cell>
                                        </Table.Row>

                                        <Table.Row textAlign={"left"}>
                                            <Table.Cell>
                                                <Header as="h4" image>
                                                    <Header.Content>
                                                        <Icon name="phone" />
                                                        Telefon
                                                    </Header.Content>
                                                </Header>
                                            </Table.Cell>
                                            <Table.Cell>{jobPosting.employer?.phoneNumber}</Table.Cell>
                                        </Table.Row>

                                        <Table.Row textAlign={"left"}>
                                            <Table.Cell>
                                                <Header as="h4" image>
                                                    <Header.Content>
                                                        <Icon name="world" />
                                                        Web Sitesi
                                                    </Header.Content>
                                                </Header>
                                            </Table.Cell>
                                            <Table.Cell>{jobPosting.employer?.webAdress}</Table.Cell>
                                        </Table.Row>

                                        <Table.Row textAlign={"left"}>
                                            <Table.Cell>
                                                <Header as="h4" image>
                                                    <Header.Content>
                                                        <Icon name="list ul" />
                                                        Detaylar
                                                    </Header.Content>
                                                </Header>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Button animated as={Link} to={`/employers/${jobPosting.employer?.id}`}>
                                                    <Button.Content visible>Detaylar</Button.Content>
                                                    <Button.Content hidden>
                                                        <Icon name="arrow right" />
                                                    </Button.Content>
                                                </Button>
                                            </Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                </Table>

                            </Card.Description>

                        </Grid.Column>

                    </Grid>
                </Card.Content >
                <Card.Content extra></Card.Content>
            </Card>

            <Grid stackable>
                <Grid.Row>

                    <Grid.Column width={6}>
                        <Table celled fixed singleLine color={"black"}>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell width="7" >İş İlanı</Table.HeaderCell>
                                    <Table.HeaderCell >Detaylar</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>İş Pozisyonu</Table.Cell>
                                    <Table.Cell>{jobPosting.jobTitle?.title}</Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell>Şehir</Table.Cell>
                                    <Table.Cell>{jobPosting.city?.city}</Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell>Uzaktan</Table.Cell>
                                    <Table.Cell>{jobPosting.remote == false ? <p>Hayır</p> : <p>Evet</p>}</Table.Cell>

                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell>Çalışma Zamanı</Table.Cell>
                                    <Table.Cell>{jobPosting.jobType?.typeName}</Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell>Minimum Maaş</Table.Cell>
                                    <Table.Cell>{jobPosting.minSalary}</Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell>Maksimum Maaş</Table.Cell>
                                    <Table.Cell>{jobPosting.maxSalary}</Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell>Açık Pozisyonlar</Table.Cell>
                                    <Table.Cell>{jobPosting.numberOfOpenPosition}</Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell>Yayınlanma Tarihi</Table.Cell>
                                    <Table.Cell>{jobPosting.createdDate}</Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell>Son Başvuru Tarihi</Table.Cell>
                                    <Table.Cell>{jobPosting.applicationDeadline}</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card fluid >
                            <Card.Content textAlign="left" header="İş Tanımı" />
                            <Card.Content textAlign="left" >
                                {jobPosting.jobDescription}
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        </div>
    )
}
