import axios from "axios"

export default class CandidateExperienceService {

    getAllByCandidateId(id) {
        return axios.get(`http://localhost:8080/api/candidateExperiences/findAllByCandidateId?candidateId=${id}`)
    }
    
    addCandidateExperience(values){
        return axios.post("http://localhost:8080/api/candidateExperiences/add",values)
    }

    deleteCandidateExperienceById(id){
        return axios.delete(`http://localhost:8080/api/candidateExperiences/deleteById?candidateExperienceId=${id}`)
    }

    getAllByByCandidateIdOrderByEndDateDesc(id) {
        return axios.get(`http://localhost:8080/api/candidateExperiences/findAllByCandidateIdOrderByEndDateDesc?candidateId=${id}`)
    }

}