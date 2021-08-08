import React, { useEffect, useState } from "react";
import CandidateLanguageService from '../../../../services/candidateLanguageService'
import * as Yup from "yup";
import { useFormik } from 'formik';
import { Button, Card, Form, Grid, Table, Icon, Rating } from "semantic-ui-react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
import BeautyStars from 'beauty-stars';

export default function UpdateLanguages({ candidate, candidateLanguages, updateLanguagesValues }) {


    let candidateLanguageService = new CandidateLanguageService();


    let candidateAddLanguageSchema = Yup.object().shape({
        //languageLevel: Yup.number().required("Bu alan zorunludur").max(5,"En"),
        language: Yup.string().required("Bu alan zorunludur").min(2, "En az 2 karakter uzunlugunda olmalıdır"),

    })

    const formik = useFormik({
        initialValues: {

            language: "",
            languageLevel: ""
        },
        validationSchema: candidateAddLanguageSchema,
        onSubmit: (values) => {
            values.candidateId = candidate.id;
            // alert(JSON.stringify(values, null, 2));
            candidateLanguageService.addCandidateLanguage(values).then((result) => {
                toast.success(result.data.message)
                updateLanguagesValues();
            }).catch((result) => {
                toast.error(result.response.data.message)
            })
        }
    })

    const handleDeleteLanguage = (languageid) => {
        candidateLanguageService.deleteCandidateLanguageById(languageid).then((result) => {
            toast.success(result.data.message)
            updateLanguagesValues();
        }).catch((result) => {
            toast.error(result.response.data.message)
        })
    }




    return (
        <div>
            <Card fluid color={"blue"} >
                <Card.Content header="Diller" />
                <Table celled color={"grey"}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Diller</Table.HeaderCell>
                            <Table.HeaderCell>Seviye</Table.HeaderCell>
                            <Table.HeaderCell width={2}>Düzenle</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {candidateLanguages.map((language) => (
                            <Table.Row key={language.id}>
                                <Table.Cell>{language.language}</Table.Cell>
                                <Table.Cell> <Rating size="huge" icon='star' defaultRating={language.languageLevel} maxRating={5} disabled /></Table.Cell>
                                <Table.Cell> <Button circular animated color="red" onClick={() => handleDeleteLanguage(language.id)}>
                                    <Button.Content visible>Sil</Button.Content>
                                    <Button.Content hidden>
                                        <Icon name="trash" />
                                    </Button.Content>
                                </Button></Table.Cell>

                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>

                <Card.Content header="Dil Ekle" />
                <Card.Content>
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Field>
                            <Grid stackable>
                                <Grid.Column width={8}>
                                    <label><b>Dil</b></label>
                                    <Form.Input
                                        fluid
                                        placeholder="Adresi buraya giriniz"
                                        type="text"
                                        name="language"
                                        value={formik.values.language}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.language && formik.touched.language && (
                                        <div className={"ui pointing red basic label"}>
                                            {formik.errors.language}
                                        </div>
                                    )}
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <label><b>Seviye(0 ile 5 Arasında bir değer giriniz)</b></label>
                                    <Card.Content>

                                        <Form.Input
                                        placeholder="0 ile 5 Arasında bir değer giriniz"
                                        
                                            name="languageLevel"
                                            value={formik.values.languageLevel}
                                            onChange={formik.handleChange}
                                        

                                        />
                                        
                                        {formik.errors.languageLevel && formik.touched.languageLevel && (
                                            <div className={"ui pointing red basic label"}>
                                                {formik.errors.languageLevel}
                                            </div>
                                        )}</Card.Content>

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
