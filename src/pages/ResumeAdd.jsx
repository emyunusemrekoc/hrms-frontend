import React from 'react'


export default function ResumeAdd() {

    const formik = useFormik({
        initialValues: {
            about: "string",
            candidateId: 0,
            coverLetters: [
              {
                coverLetter: "string",
                title: "string"
              }
            ],
            educations: [
              {
                degree: {
                  eduDegree: "string",
                  id: 0
                },
                endDate: "string",
                schoolDepartment: "string",
                schoolName: "string",
                startedDate: "string"
              }
            ],
            experiences: [
              {
                companyName: "string",
                continuing: true,
                endDate: "string",
                jobTitle: {
                  id: 0,
                  title: "string"
                },
                startedDate: "string"
              }
            ],
            id: 0,
            languages: [
              {
                language: "string",
                languageLevel: 0
              }
            ],
            links: [
              {
                link: "string"
              }
            ],
            resumeName: "string",
            skills: [
              {
                skill: "string"
              }
            ]
        },
    
    
        validationSchema: JobPostingSchema,
        onSubmit: (values) => {
          values.employerId = 4;
          
          //jobPostingService.addJobPosting(values).then((result) => console.log(result.data.data));
          alert(JSON.stringify(values, null, 2));
          history.push("/jobpostinglist");
        },
      });
    return (
        <div>
            
        </div>
    )
}
