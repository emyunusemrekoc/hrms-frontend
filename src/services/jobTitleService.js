import axios from "axios"

export default class JobTitleService{

        getAllJobTitles(){
            return axios.get("http://localhost:8080/api/jobTitles/findAll")
        }



}