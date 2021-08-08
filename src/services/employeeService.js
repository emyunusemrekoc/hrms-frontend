import axios from "axios"

export default class EmployeeService{

        getAllEmployees(){
            return axios.get("http://localhost:8080/api/employees/findAll")
        }

        addEmployee(values){
            return axios.post("http://localhost:8080/api/employees/add",values)
        }
    



}