import axios from "axios"

export default class CandidateLinkService {

    getAllByCandidateId(id) {
        return axios.get(`http://localhost:8080/api/candidateLinks/findAllByCandidateId?candidateId=${id}`)
    }
    
    addCandidateLink(values){
        return axios.post("http://localhost:8080/api/candidateLinks/add",values)
    }

    deleteCandidateLinkById(id){
        return axios.delete(`http://localhost:8080/api/candidateLinks/deleteById?candidateLinkId=${id}`)
    }


}