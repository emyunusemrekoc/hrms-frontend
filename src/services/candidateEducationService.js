import axios from "axios"

export default class CandidateEducationService {

    getAllByCandidateId(id) {
        return axios.get(`http://localhost:8080/api/candidateEducations/findAllByCandidateId?candidateId=${id}`)
    }
    
    addCandidateEducation(values){
        return axios.post("http://localhost:8080/api/candidateEducations/add",values)
    }

    deleteCandidateEducationById(id){
        return axios.delete(`http://localhost:8080/api/candidateEducations/deleteById?candidateEducationId=${id}`)
    }

    getAllByByCandidateIdOrderByEndDateDesc(id) {
        return axios.get(`http://localhost:8080/api/candidateEducations/findAllByCandidateIdOrderByEndDateDesc?candidateId=${id}`)
    }
    
}