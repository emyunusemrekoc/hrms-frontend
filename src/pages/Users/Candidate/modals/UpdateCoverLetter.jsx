import React from 'react'
import CandidateCoverLetterService from '../../../../services/candidateCoverLetterService'
import * as Yup from "yup";
import { useFormik } from 'formik';
import { Button,Card, Form } from "semantic-ui-react";
import { toast ,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css' 
export default function UpdateCoverLetter({candidate,coverLetter,updateCoverLetterValues}) {

    let candidateCoverLetterService = new CandidateCoverLetterService();

    

    const updateCoverLetterSchema = Yup.object().shape({
        coverLetter: Yup.string().required("Bu alan zorunludur")
    })

    const formik = useFormik({
        initialValues:{
            coverLetter:coverLetter.coverLetter
        },
        validationSchema: updateCoverLetterSchema,
        onSubmit:(values) =>{
            values.candidateId=candidate.id
            candidateCoverLetterService.addCandidateCoverLetter(values).then((result) =>{
                toast.success(result.data.message)
                updateCoverLetterValues();
            }).catch((result) => {
                toast.error(result.response.data.message)
            })
               
        }
    })
   
 

    return (
        <div>
            <Card fluid>
                <Card.Content>
            <Form size="large" onSubmit={formik.handleSubmit}>
                <label><b>Hakkında</b></label>
                <div style={{marginTop :"1em" ,marginBottom:"1em"}}>
                <Form.TextArea
                    placeholder="Hakkında"
                    type="text"
                    value={formik.values.coverLetter}
                    name="coverLetter"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={{ minHeight: 200 }}
                />
                {
                formik.errors.coverLetter && formik.touched.coverLetter && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.coverLetter}
                  </div>
                )
              }
              </div>
              <Button  color="green" fluid size="large" type="submit">Güncelle</Button>
              {/* <ToastContainer/> */}
            </Form>
            </Card.Content>
        </Card>
    
        </div>
    )
}
