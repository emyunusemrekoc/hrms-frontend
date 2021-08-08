import React, { useEffect, useState } from "react";
import CandidateLinkService from '../../../../services/candidateLinkService'
import * as Yup from "yup";
import { useFormik } from 'formik';
import { Button, Card, Form, Grid, Table, Icon} from "semantic-ui-react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
import { SocialIcon } from "react-social-icons";


export default function UpdateLinks({ candidate, candidateLinks, updateLinksValues }) {

    let candidateLinkService = new CandidateLinkService();


    let candidateAddLinkSchema = Yup.object().shape({
        link: Yup.string().required("Bu alan zorunludur"),
    })

    const formik = useFormik({
        initialValues: {

            link: ""
        },
        validationSchema: candidateAddLinkSchema,
        onSubmit: (values) => {
            values.candidateId = candidate.id;
            // alert(JSON.stringify(values, null, 2));
            candidateLinkService.addCandidateLink(values).then((result) => {
                toast.success(result.data.message)
                updateLinksValues();
            }).catch((result) => {
                toast.error(result.response.data.message)
            })
        }
    })

    const handleDeleteLink = (linkid) => {
        candidateLinkService.deleteCandidateLinkById(linkid).then((result) => {
            toast.success(result.data.message)
            updateLinksValues();
        }).catch((result) => {
            toast.error(result.response.data.message)
        })
    }

    return (
        <div>
            <Card fluid color={"blue"} >
                <Card.Content header="Sosyal Medya - Kişisel Web Adresleri" />
                <Table celled color={"grey"}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell textAlign="center">Link</Table.HeaderCell>
                            <Table.HeaderCell>Web Adresleri</Table.HeaderCell>
                            <Table.HeaderCell >Düzenle</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {candidateLinks.map((link) => (
                            <Table.Row key={link.id}>
                                <Table.Cell width="1"><SocialIcon url={link.link} target="_blank"></SocialIcon></Table.Cell>
                                <Table.Cell>{link.link}</Table.Cell>
                                <Table.Cell> <Button circular animated color="red" onClick={() => handleDeleteLink(link.id)}>
                                    <Button.Content visible>Sil</Button.Content>
                                    <Button.Content hidden>
                                        <Icon name="trash" />
                                    </Button.Content>
                                </Button></Table.Cell>

                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>

                <Card.Content header="Link Ekle" />
                <Card.Content>
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Field>
                            <Grid stackable>
                                <Grid.Column width={15}>
                                    <label><b>Adres(Lütfen adresiniz başında https:// olacak şekilde yazınız)</b></label>
                                    <Form.Input
                                        fluid
                                        placeholder="Adresi buraya giriniz"
                                        type="text"
                                        name="link"
                                        value={formik.values.link}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.link && formik.touched.link && (
                                        <div className={"ui pointing red basic label"}>
                                            {formik.errors.link}
                                        </div>
                                    )}
                                </Grid.Column>



                            </Grid>
                        </Form.Field>


                        <div style={{ marginTop: "1em" }}>
                            <Button fluid color="green" type="submit">Ekle</Button>
                        </div>
                        {/* <ToastContainer /> */}
                    </Form>
                </Card.Content>
            </Card>
        </div>
    )
}
