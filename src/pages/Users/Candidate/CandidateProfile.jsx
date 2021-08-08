import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import CandidateService from "../../../services/candidateService";
import ProfileCard from "./cards/ProfileCard";
import CoverLetterCard from "./cards/CoverLetterCard";
import { Card } from "semantic-ui-react";
import EducationsCard from "./cards/EducationsCard";
import LinksCard from "./cards/LinksCard";
import ExperiencesCard from "./cards/ExperiencesCard";
import SkillsCard from "./cards/SkillsCard";
import LanguagesCard from "./cards/LanguagesCard";
import { ToastContainer } from "react-toastify";



export default function CandidateProfile() {

    const [candidate, setCandidate] = useState([]);

    useEffect(() => {
        let candidateService = new CandidateService();
        candidateService
            .getByCandidateId(19)
            .then((result) => setCandidate(result.data.data));
    }, []);
    // console.log(candidate.id)
    return (
        <div>

            <Card.Content><ProfileCard candidate={candidate} /></Card.Content>
            <div style={{ marginTop: "1em" }}> <CoverLetterCard candidate={candidate} /></div>
            <div style={{ marginTop: "1em" }}> <LinksCard candidate={candidate} /></div>
            <div style={{ marginTop: "1em" }}> <EducationsCard candidate={candidate} /></div>
            <div style={{ marginTop: "1em" }}> <ExperiencesCard candidate={candidate} /></div>
            <div style={{ marginTop: "1em" }}> <SkillsCard candidate={candidate} /></div>
            <div style={{ marginTop: "1em" }}> <LanguagesCard candidate={candidate} /></div>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                closeOnClick
                rtl={false}
            />


        </div>
    )
}
