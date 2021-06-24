import React, { useState,useEffect } from 'react'
import { Button, Dropdown, Input, TextArea, Card, Form, Grid, Checkbox } from 'semantic-ui-react';
import * as Yup from "yup";
import "./Font.css"
import { useFormik } from "formik";
import { useHistory } from 'react-router-dom';
import JobPostingService from '../services/jobPostingService';
import moment from 'moment';
import CityService from '../services/cityService';
import JobTypeService from '../services/jobTypeService';
import JobTitleService from '../services/jobTitleService';

export default function JobPostingAdd() {

  const JobPostingSchema = Yup.object().shape({
    jobPostingName: Yup.string().required("İlan ismi zorunludur"),
    cityId: Yup.string().required("Şehir seçimi zorunludur"),
    jobTitleId: Yup.string().required("İş ünvanı seçimi zorunludur"),
    jobTypeId: Yup.string().required("İş tipi zorunludur"),
    applicationDeadline: Yup.date().nullable().required("Tarih seçimi zorunludur"), 
    minSalary: Yup.number().required("Miniumum maaş zorunludur"),
    maxSalary: Yup.number().required("Maksimum maaş zorunludur"),
    numberOfOpenPosition: Yup.string().required("Posizyon sayısı zorunludur"),
    jobDescription: Yup.string().required("İş tanımı zorunludur"),
    
  });




  let jobPostingService = new JobPostingService();
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      applicationDeadline: "",
      cityId: "",
      employerId: "",
      jobDescription: "",
      jobPostingName: "",
      jobTitleId: "",
      jobTypeId: "",
      maxSalary: "",
      minSalary: "",
      numberOfOpenPosition: "",
      remote: false
    },


    validationSchema: JobPostingSchema,
    onSubmit: (values) => {
      values.employerId = 4;
     

      jobPostingService.addJobPosting(values).then((result) => console.log(result.data.data));
      alert(JSON.stringify(values, null, 2));
      history.push("/jobpostinglist");
    },
  });

  const [cities, setCities] = useState([])
  const [jobTypes, setJobTypes] = useState([])
  const [jobTitles, setJobTitles] = useState([])

  useEffect(() => {
    let cityService = new CityService();
    let jobTypeService = new JobTypeService()
    let jobTitleService = new JobTitleService();

    cityService.getAllCities().then((result) => setCities(result.data.data))
    jobTypeService.getAllJobTypes().then((result) => setJobTypes(result.data.data))
    jobTitleService.getAllJobTitles().then((result) => setJobTitles(result.data.data))
  }, [])

  const cityOption = cities.map((city, index) => ({
    key: index,
    text: city.city,
    value: city.id,
  }));
  const jobTitleOption = jobTitles.map((jobTitle, index) => ({
    key: index,
    text: jobTitle.title,
    value: jobTitle.id,
  }));

  const jobTypeOption = jobTypes.map((jobType, index) => ({
    key: index,
    text: jobType.typeName,
    value: jobType.id,
  }));



  return (

    <div ><Card className="fluid centered">
      <h1>  <Card.Content header='İş İlanı Ekle' /></h1>
      <Card.Content   >

        <Form onSubmit={formik.handleSubmit} >
          <Form.Field>
            <h7><label style={{ fontWeight: "bold" }} >İLAN İSMİ</label></h7>
            <Input
              placeholder="İlan İsmi"
              // error={Boolean(formik.errors.description).toString()}
              value={formik.values.jobPostingName}
              name="jobPostingName"
              onChange={formik.handleChange}
            />
            {formik.errors.jobPostingName && formik.touched.jobPostingName && (
              <div className={"ui pointing red basic label"}>
                {formik.errors.jobPostingName}
              </div>
            )}

          </Form.Field>


          <Form.Field >


            <Grid >
              <Grid.Column width={6}>
                <h7><label style={{ fontWeight: "bold" }}>İş Ünvanı</label></h7>
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
                  onChange={(field,data) => formik.setFieldValue( "jobTitleId",data.value )}

                />
                {formik.errors.jobPositionId && formik.touched.jobPositionId && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.jobPositionId}
                  </div>
                )}
              </Grid.Column>

              <Grid.Column width={4}>
                <h7><label style={{ fontWeight: "bold" }}>Şehir</label></h7>
                <Dropdown
                  fluid
                  clearable
                  item
                  placeholder="Şehir"
                  search
                  selection
                  id="cityId"
                  value={formik.values.cityId}
                  options={cityOption}
                  onChange={(field,data) => formik.setFieldValue( "cityId",data.value )}

                />
                {formik.errors.cityId && formik.touched.cityId && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.cityId}
                  </div>
                )}

              </Grid.Column>

              <Grid.Column width={6}>
                <h7><label style={{ fontWeight: "bold" }}>İşTipi</label></h7>
                <Dropdown
                  fluid
                  clearable
                  item
                  placeholder="İş Tipi"
                  search
                  selection
                  id="jobTypeId"
                  options={jobTypeOption}
                  value={formik.values.jobTypeId}
                  onChange={(field,data) => formik.setFieldValue( "jobTypeId",data.value )}


                />
                {formik.errors.jobTypeId && formik.touched.jobTypeId && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.jobTypeId}
                  </div>
                )}
              </Grid.Column>

            </Grid>
          </Form.Field>
          <Form.Field>

            <Grid>
              <Grid.Column width={8}>
                <h7> <label style={{ fontWeight: "bold" }}>Minimum Maaş</label></h7>
                <Input

                  type="number"
                  placeholder="Minimum Maaş"
                  value={formik.values.minSalary}
                  name="minSalary"
                  onChange={formik.handleChange}
                  min="0"
                >
                </Input>
                {formik.errors.minSalary && formik.touched.minSalary && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.minSalary}
                  </div>
                )}
              </Grid.Column>
              <Grid.Column width={8}>
                <h7> <label style={{ fontWeight: "bold" }}>Maksimum Maaş</label></h7>
                <Input

                  type="number"
                  placeholder="Maksimum Maaş"
                  value={formik.values.maxSalary}
                  name="maxSalary"
                  onChange={formik.handleChange}
                  min="0"
                >
                </Input>
                {formik.errors.maxSalary && formik.touched.maxSalary && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.maxSalary}
                  </div>
                )}
              </Grid.Column>

            </Grid>

          </Form.Field>

          <Form.Field>
            <Grid>
              <Grid.Column width={6}>
                <h7> <label style={{ fontWeight: "bold" }}>Açık Pozisyon Adedi</label></h7>
                <Input

                  type="number"
                  placeholder="Açık Pozisyon Adedi"
                  value={formik.values.numberOfOpenPosition}
                  name="numberOfOpenPosition"
                  onChange={formik.handleChange}
                  min="1"
                >
                </Input>
                {formik.errors.numberOfOpenPosition && formik.touched.numberOfOpenPosition && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.numberOfOpenPosition}
                  </div>
                )}
              </Grid.Column>

              <Grid.Column width={4}>
                <Checkbox style={{ fontWeight: "bold" }} toggle label='Uzaktan'
                  value={formik.values.remote}
                  onChange={() => formik.setFieldValue('remote', !formik.values.remote)}>
                </Checkbox>

              </Grid.Column>

              <Grid.Column width={6}>
                <h7><label style={{ fontWeight: "bold" }}>Son Başvuru Tarihi</label></h7>
                <Input

                  type="date"
                  error={Boolean(formik.errors.applicationDeadline)}
                  onChange={formik.handleChange}
                  minDate={moment().toDate()}
                  value={formik.values.applicationDeadline}
                  name="applicationDeadline"
                 placeholder="Son başvuru tarihi"

                />
                {formik.errors.applicationDeadline && formik.touched.applicationDeadline && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.applicationDeadline}
                  </div>
                )}
              </Grid.Column>

            </Grid>

          </Form.Field>
          <Form.Field>
            <h7><label style={{ fontWeight: "bold" }}>İş Tanımı</label></h7>
            <TextArea
              placeholder="İş Tanımı"
              value={formik.values.jobDescription}
              name="jobDescription"
              onChange={formik.handleChange}
            />
            {formik.errors.jobDescription && formik.touched.jobDescription && (
              <div className={"ui pointing red basic label"}>
                {formik.errors.jobDescription}
              </div>
            )}
          </Form.Field>
          <Button centered
            content="Ekle"
            labelPosition="right"
            icon="add"
            positive
            type="submit"

          // style={{ marginLeft: "20px" }}
          />
        </Form>
      </Card.Content>

    </Card>

    </div>
  )
}
