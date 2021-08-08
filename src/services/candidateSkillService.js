import axios from "axios"

export default class CandidateSkillService {

    getAllByCandidateId(id) {
        return axios.get(`http://localhost:8080/api/candidateSkills/findAllByCandidateId?candidateId=${id}`)
    }
    
    addCandidateSkill(values){
        return axios.post("http://localhost:8080/api/candidateSkills/add",values)
    }

    deleteCandidateSkillById(id){
        return axios.delete(`http://localhost:8080/api/candidateSkills/deleteById?candidateSkillId=${id}`)
    }


}