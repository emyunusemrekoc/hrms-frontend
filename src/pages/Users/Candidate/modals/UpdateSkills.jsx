import CandidateSkillService from '../../../../services/candidateSkillService'
import * as Yup from "yup";
import { useFormik } from 'formik';
import { Button, Card, Form, Grid, Table, Icon } from "semantic-ui-react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'

export default function UpdateSkills({ candidate, candidateSkills, updateSkillsValues }) {
    let candidateSkillService = new CandidateSkillService();


    let candidateAddSkillSchema = Yup.object().shape({
        skill: Yup.string().required("Bu alan zorunludur"),
    })

    const formik = useFormik({
        initialValues: {

            skill: ""
        },
        validationSchema: candidateAddSkillSchema,
        onSubmit: (values) => {
            values.candidateId = candidate.id;
            // alert(JSON.stringify(values, null, 2));
            candidateSkillService.addCandidateSkill(values).then((result) => {
                toast.success(result.data.message)
                updateSkillsValues();
            }).catch((result) => {
                toast.error(result.response.data.message)
            })
        }
    })

    const handleDeleteSkill = (skillid) => {
        candidateSkillService.deleteCandidateSkillById(skillid).then((result) => {
            toast.success(result.data.message)
            updateSkillsValues();
        }).catch((result) => {
            toast.error(result.response.data.message)
        })
    }

    return (
        <div>
            <Card fluid color={"blue"} >
                <Card.Content header="Yetenekler" />
                <Table celled color={"grey"}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Yetenekler</Table.HeaderCell>
                            <Table.HeaderCell width ={4}>Düzenle</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {candidateSkills.map((skill) => (
                            <Table.Row key={skill.id}>
                                <Table.Cell  >{skill.skill.toUpperCase()}</Table.Cell>
                                <Table.Cell> <Button circular animated color="red" onClick={() => handleDeleteSkill(skill.id)}>
                                    <Button.Content visible>Sil</Button.Content>
                                    <Button.Content hidden>
                                        <Icon name="trash" />
                                    </Button.Content>
                                </Button></Table.Cell>

                            </Table.Row>

                        ))}
                    </Table.Body>
                </Table>

                <Card.Content header="Yetenek Ekle" />
                <Card.Content>
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Field>
                            <Grid stackable>
                                <Grid.Column width={15}>
                                    <label><b>Yetenek</b></label>
                                    <Form.Input
                                        fluid
                                        placeholder="Yetenek"
                                        type="text"
                                        name="skill"
                                        value={formik.values.skill}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.skill && formik.touched.skill && (
                                        <div className={"ui pointing red basic label"}>
                                            {formik.errors.skill}
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
