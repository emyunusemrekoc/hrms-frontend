import axios from "axios"

export default class CandidateCoverLetterService {

    // getAllByCandidateId(id) {
    //     return axios.get(`http://localhost:8080/api/candidateCoverLetters/findAllByCandidateId?candidateId=${id}`)
    // }

    getByCandidateId(id) {
        return axios.get(`http://localhost:8080/api/candidateCoverLetters/findByCandidateId?candidateId=${id}`)
    }
    
  
    addCandidateCoverLetter(values){
        return axios.post("http://localhost:8080/api/candidateCoverLetters/add",values)
    }

    deleteCandidateCoverLetter(values){
        return axios.delete("http://localhost:8080/api/candidateCoverLetters/delete",values)
    }


}