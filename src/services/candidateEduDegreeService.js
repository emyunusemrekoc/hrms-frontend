import axios from "axios"

export default class CandidateEduDegreeService {

    getAllEduDegrees() {
        return axios.get(`http://localhost:8080/api/candidateEduDegrees/findAll`)
    }
    
}