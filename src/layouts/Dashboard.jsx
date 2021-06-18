import React from 'react'
import {Grid} from 'semantic-ui-react'
import { Route } from 'react-router'
import CandidateList from '../pages/CandidateList'
import Sidebar from '../layouts/SideBar';
import EmployerList from '../pages/EmployerList';
import Home from '../pages/Home';
import JobTitleList from '../pages/JobTitleList';
import JobPostingList from '../pages/JobPostingList';

export default function Dashboard() {


    return (
        <div>
            <Grid>
                <Grid.Row>
                <Grid.Column width ={0}>
                <Sidebar/>
                </Grid.Column>
                    <Grid.Column  width ={16}>
                    <Route exact path ="/employerlist" component={EmployerList}/>
                    <Route exact path ="/candidatelist" component={CandidateList}/>
                    <Route exact path ="/jobtitlelist" component={JobTitleList}/>
                    <Route exact path ="/jobpostinglist" component={JobPostingList}/>
                    <Route path ="/home" component={Home}/>
                    <Route exact path ="/" component={Home}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        </div>
    )
}