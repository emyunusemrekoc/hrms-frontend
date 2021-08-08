import axios from "axios"

export default class EmployerService{

        getAllEmployers(){
            return axios.get("http://localhost:8080/api/employers/findAll")
        }

        addEmployer(values){
            return axios.post("http://localhost:8080/api/employers/add",values)
        }
    



}