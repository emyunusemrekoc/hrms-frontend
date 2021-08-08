import React, { useEffect, useState } from "react";
import CandidateEducationService from '../../../../services/candidateEducationService'
import * as Yup from "yup";
import { useFormik } from 'formik';
import { Button, Card, Form, Grid, Table, Icon, Dropdown } from "semantic-ui-react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
import moment from 'moment';
import CandidateEduDegreeService from "../../../../services/candidateEduDegreeService";

export default function UpdateEducations({ candidate, candidateEducations, updateEducationsValues }) {



    let candidateEducationService = new CandidateEducationService();


    let candidateEducationSchema = Yup.object().shape({
        degreeId: Yup.string().required("Bu alan zorunludur"),
        schoolDepartment: Yup.string().required("Bu alan zorunludur").min(2, "En az 2 karakter uzunluğunda olmalıdır"),
        endDate: Yup.date().required("Bu alan zorunludur"),
        schoolName: Yup.string().required("Bu alan zorunludur").min(2, "En az 2 karakter uzunluğunda olmalıdır"),
        startedDate: Yup.date().required("Bu alan zorunludur")
    })

    const formik = useFormik({
        initialValues: {

            degreeId: "",
            endDate: "",
            schoolDepartment: "",
            schoolName: "",
            startedDate: ""
        },
        validationSchema: candidateEducationSchema,
        onSubmit: (values) => {
            values.candidateId = candidate.id;
           // alert(JSON.stringify(values, null, 2));
            candidateEducationService.addCandidateEducation(values).then((result) => {
                toast.success(result.data.message)
                updateEducationsValues();
            }).catch((result) => {
                toast.error(result.response.data.message)
            })
        }
    })

    const handleDeleteEducation = (educationid) => {
        candidateEducationService.deleteCandidateEducationById(educationid).then((result) => {
            toast.success(result.data.message)
            updateEducationsValues();
        }).catch((result) => {
            toast.error(result.response.data.message)
        })
    }


    const [eduDegrees, setEduDegrees] = useState([])

    useEffect(() => {
        let candidateEduDegreeService = new CandidateEduDegreeService();
        candidateEduDegreeService.getAllEduDegrees().then((result) => setEduDegrees(result.data.data))

    }, [])

    const eduDegreeOption = eduDegrees.map((eduDegree, index) => ({
        key: index,
        text: eduDegree.eduDegree,
        value: eduDegree.id,
    }));
    return (
        <div>
            <Card fluid color={"blue"} >
                <Card.Content header="Eğitim" />
                <Table celled color={"grey"}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Okul Adı</Table.HeaderCell>
                            <Table.HeaderCell>Bölüm</Table.HeaderCell>
                            <Table.HeaderCell>Mezuniyet Derecesi</Table.HeaderCell>
                            <Table.HeaderCell>Başlangıç Tarihi</Table.HeaderCell>
                            <Table.HeaderCell>Mezuniyet Tarihi</Table.HeaderCell>
                            <Table.HeaderCell >Düzenle</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {candidateEducations?.map((education) => (
                            <Table.Row key={education.id}>
                                <Table.Cell>{education.schoolName.toUpperCase()}</Table.Cell>
                                <Table.Cell>{education.schoolDepartment}</Table.Cell>
                                <Table.Cell>{education.degreeEduDegree}</Table.Cell>
                                <Table.Cell>{moment(education.startedDate).format('DD/MM/YYYY')}</Table.Cell>
                                <Table.Cell>{education.endDate ? moment(education.endDate).format('DD/MM/YYYY') : <p>Devam Ediyor</p>}</Table.Cell>
                                <Table.Cell>
                                    <Button circular animated color="red" onClick={() => handleDeleteEducation(education.id)}>
                                        <Button.Content visible>Sil</Button.Content>
                                        <Button.Content hidden>
                                            <Icon name="trash" />
                                        </Button.Content>
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>

                <Card.Content header="Okul Ekle" />
                <Card.Content>
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Field>
                            <Grid stackable>
                                <Grid.Column width={6}>
                                    <label><b>Okul Adı</b></label>
                                    <Form.Input
                                        fluid
                                        placeholder="Okul Adı"
                                        type="text"
                                        name="schoolName"
                                        value={formik.values.schoolName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.schoolName && formik.touched.schoolName && (
                                        <div className={"ui pointing red basic label"}>
                                            {formik.errors.schoolName}
                                        </div>
                                    )}
                                </Grid.Column>
                                <Grid.Column width={5}>
                                    <label><b>Bölüm Adı</b></label>
                                    <Form.Input
                                        fluid
                                        placeholder="Bölüm Adı"
                                        type="text"
                                        name="schoolDepartment"
                                        value={formik.values.schoolDepartment}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.schoolDepartment && formik.touched.schoolDepartment && (
                                        <div className={"ui pointing red basic label"}>
                                            {formik.errors.schoolDepartment}
                                        </div>
                                    )}
                                </Grid.Column>
                                <Grid.Column width={5}>    <label><b>Mezuniyet Derecesi</b></label>
                                    <Dropdown
                                        fluid
                                        clearable
                                        item
                                        placeholder="Mezuniyet Derecesi"
                                        search
                                        selection
                                        id="degreeId"
                                        value={formik.values.degreeId}
                                        options={eduDegreeOption}
                                        onChange={(field, data) => formik.setFieldValue("degreeId", data.value)}

                                    />
                                    {formik.errors.degreeId && formik.touched.degreeId && (
                                        <div className={"ui pointing red basic label"}>
                                            {formik.errors.degreeId}
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
                                <label><b>Mezuniyet Tarihi</b></label>
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
