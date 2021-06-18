import axios from "axios"

export default class JobPostingService{

        getAllJobPostingsByIsActive(){
            return axios.get("http://localhost:8080/api/jobPostings/findAllByIsActive")
        }

        getAllJobPostingsByIsActiveOrderByCreatedDateAsc(){
            return axios.get("http://localhost:8080/api/jobPostings/findAllByIsActiveOrderByCreatedDateAsc")
        }

        getAllJobPostingsByIsActiveOrderByCreatedDateDesc(){
            return axios.get("http://localhost:8080/api/jobPostings/findAllByIsActiveOrderByCreatedDateDesc")
        }

        getAllJobPostingsByIsActiveAndCompanyName(companyName){
            return axios.get("http://localhost:8080/api/jobPostings/findAllByIsActiveAndEmployer_CompanyName?companyName="+companyName)
        }


}