import axios from "axios"

export default class CandidateLanguageService {

    getAllByCandidateId(id) {
        return axios.get(`http://localhost:8080/api/candidateLanguages/findAllByCandidateId?candidateId=${id}`)
    }
    
    addCandidateLanguage(values){
        return axios.post("http://localhost:8080/api/candidateLanguages/add",values)
    }

    deleteCandidateLanguageById(id){
        return axios.delete(`http://localhost:8080/api/candidateLanguages/deleteById?candidateLanguageId=${id}`)
    }


}