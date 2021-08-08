import axios from "axios"

export default class CandidateService {

    getAllCandidates() {
        return axios.get("http://localhost:8080/api/candidates/findAll")
    }
    
    addCandidate(candidate){
        return axios.post("http://localhost:8080/api/candidates/add",candidate)
    }

    getByCandidateId(id) {
        return axios.get(`http://localhost:8080/api/candidates/findById?candidateId=${id}`)
    }

    

}