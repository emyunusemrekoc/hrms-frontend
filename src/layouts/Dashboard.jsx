import React from 'react'
import {Grid} from 'semantic-ui-react'
import { Route } from 'react-router'
import CandidateList from '../pages/Users/Candidate/CandidateList'
import Sidebar from '../layouts/SideBar';
import EmployerList from '../pages/Users/Employer/EmployerList';
import Home from '../pages/Home';
import JobTitleList from '../pages/JobTitles/JobTitleList';
import JobPostingList from '../pages/JobPostings/JobPostingList';
import JobPostingAdd from '../pages/JobPostings/JobPostingAdd';
import CandidateProfile from '../pages/Users/Candidate/CandidateProfile';
import JobPostingDetail from '../pages/JobPostings/JobPostingDetail';




export default function Dashboard() {


    return (
        <div>
            <Grid>
                <Grid.Row>
                <Grid.Column width ={3}>
                {/* <Sidebar/> */}
                </Grid.Column>
                    <Grid.Column  width ={13}>
                    <Route exact path ="/employerlist" component={EmployerList}/>
                    <Route exact path ="/candidatelist" component={CandidateList}/>
                    <Route exact path ="/jobtitlelist" component={JobTitleList}/>
                    <Route exact path ="/jobpostinglist" component={JobPostingList}/>
                    <Route exact path ="/jobpostingadd" component={JobPostingAdd}/>
                    <Route exact path="/jobpostinglist/:id" component={JobPostingDetail}/>
                    <Route path ="/cv" component={CandidateProfile}/>
                    
                    <Route path ="/home" component={Home}/>
                    <Route exact path ="/" component={Home}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        </div>
    )
}
