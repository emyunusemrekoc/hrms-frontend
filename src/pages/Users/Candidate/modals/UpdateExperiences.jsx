import React, { useEffect, useState } from "react";
import CandidateExperienceService from '../../../../services/candidateExperienceService'
import * as Yup from "yup";
import { useFormik } from 'formik';
import { Button, Card, Form, Grid, Table, Icon, Dropdown } from "semantic-ui-react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
import moment from 'moment';
import JobTitleService from "../../../../services/jobTitleService";
export default function UpdateExperiences({ candidate, candidateExperiences, updateExperiencesValues }) {

    let candidateExperienceService = new CandidateExperienceService();


    let candidateAddExperienceSchema = Yup.object().shape({
        jobTitleId: Yup.string().required("Bu alan zorunludur"),
        companyName: Yup.string().required("Bu alan zorunludur").min(2, "En az 2 karakter uzunlugunda olmalıdır"),
        endDate: Yup.date().required("Bu alan zorunludur"),
        startedDate: Yup.date().required("Bu alan zorunludur")
    })

    const formik = useFormik({
        initialValues: {

            companyName: "",
            endDate: "",
            jobTitleId: "",
            startedDate: ""
        },
        validationSchema: candidateAddExperienceSchema,
        onSubmit: (values) => {
            values.candidateId = candidate.id;
            // alert(JSON.stringify(values, null, 2));
            candidateExperienceService.addCandidateExperience(values).then((result) => {
                toast.success(result.data.message)
                updateExperiencesValues();
            }).catch((result) => {
                toast.error(result.response.data.message)
            })
        }
    })

    const handleDeleteExperience = (experienceid) => {
        candidateExperienceService.deleteCandidateExperienceById(experienceid).then((result) => {
            toast.success(result.data.message)
            updateExperiencesValues();
        }).catch((result) => {
            toast.error(result.response.data.message)
        })
    }


    const [jobTitles, setjobTitles] = useState([])

    useEffect(() => {
        let jobTitleService = new JobTitleService();
        jobTitleService.getAllJobTitles().then((result) => setjobTitles(result.data.data))

    }, [])

    const jobTitleOption = jobTitles.map((jobTitle, index) => ({
        key: index,
        text: jobTitle.title,
        value: jobTitle.id,
    }));
    return (
        <div>
            <Card fluid color={"blue"} >
                <Card.Content header="Eğitim" />
                <Table celled color={"grey"}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Şirket Adı</Table.HeaderCell>
                            <Table.HeaderCell>İş Ünvanı</Table.HeaderCell>
                            <Table.HeaderCell>Başlangıç Tarihi</Table.HeaderCell>
                            <Table.HeaderCell>Çıkış Tarihi</Table.HeaderCell>
                            <Table.HeaderCell >Düzenle</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {candidateExperiences?.map((experience) => (
                            <Table.Row key={experience.id}>
                                <Table.Cell>{experience.companyName.toUpperCase()}</Table.Cell>
                                <Table.Cell>{experience.jobTitleTitle}</Table.Cell>
                                <Table.Cell>{moment(experience.startedDate).format('DD/MM/YYYY')}</Table.Cell>
                                <Table.Cell>{experience.endDate ? moment(experience.endDate).format('DD/MM/YYYY') : <p>Devam Ediyor</p>}</Table.Cell>
                                <Table.Cell> <Button circular animated color="red" onClick={() => handleDeleteExperience(experience.id)}>
                                    <Button.Content visible>Sil</Button.Content>
                                    <Button.Content hidden>
                                        <Icon name="trash" />
                                    </Button.Content>
                                </Button></Table.Cell>
                               

                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>

                <Card.Content header="Deneyim Ekle" />
                <Card.Content>
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Field>
                            <Grid stackable>
                                <Grid.Column width={8}>
                                    <label><b>Şirket Adı</b></label>
                                    <Form.Input
                                        fluid
                                        placeholder="Şirket Adı"
                                        type="text"
                                        name="companyName"
                                        value={formik.values.companyName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.companyName && formik.touched.companyName && (
                                        <div className={"ui pointing red basic label"}>
                                            {formik.errors.companyName}
                                        </div>
                                    )}
                                </Grid.Column>

                                <Grid.Column width={8}>    <label><b>İş Ünvanı</b></label>
                                    <Dropdown
                                        fluid
                                        clearable
                                        item
                                        placeholder="İş ünvanı"
                                        search
                                        selection
                                        id="jobTitleId"
                                        value={formik.values.jobTitleId}
                                        options={jobTitleOption}
                                        onChange={(field, data) => formik.setFieldValue("jobTitleId", data.value)}

                                    />
                                    {formik.errors.jobTitleId && formik.touched.jobTitleId && (
                                        <div className={"ui pointing red basic label"}>
                                            {formik.errors.jobTitleId}
                                        </div>)}
                                </Grid.Column>

                            </Grid>
                        </Form.Field>

                        <Grid stackable>
                            <Grid.Column width={8}>
                                <label><b>Başlangıç Tarihi</b></label>
                                <Form.Input
                                    fluid
                                    type="date"
                                    name="startedDate"
                                    value={formik.values.startedDate}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.startedDate && formik.touched.startedDate && (
                                    <div className={"ui pointing red basic label"}>
                                        {formik.errors.startedDate}
                                    </div>
                                )}
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <label><b>Çıkış Tarihi</b></label>
                                <Form.Input
                                    fluid
                                    type="date"
                                    name="endDate"
                                    value={formik.values.endDate}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.endDate && formik.touched.endDate && (
                                    <div className={"ui pointing red basic label"}>
                                        {formik.errors.endDate}
                                    </div>
                                )}
                            </Grid.Column>
                        </Grid>
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
