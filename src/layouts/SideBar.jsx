import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import {  Icon, Menu, Sidebar} from 'semantic-ui-react'


export default function SideBar() {
    
     
    return (
        <div>
           
            
                    <Sidebar 
                        
                        as={Menu}
                        color="teal"
                        animation='uncover'
                        icon='labeled'
                        inverted
                        vertical
                        visible
                         width='thin'
                        
                    >
       
                        <Menu.Item as={Link} to="/home" style={{ color: 'white',marginTop: "4.5em" }} header >
                        <Icon name='home' />
                            Home
                        </Menu.Item>
                        <Menu.Item as={NavLink} to="/candidatelist" style={{ color: 'white',marginTop: "2em" }} header >
                            <Icon name='address card' />
                            İş Arayanlar
                        </Menu.Item>
                        <Menu.Item as={NavLink} to="/employerlist" style={{ color: 'white' ,marginTop: "2em" }}header >
                            <Icon name='building' />
                            Şirketler
                        </Menu.Item>

                        <Menu.Item as={NavLink} to="/jobtitlelist" style={{ color: 'white' }}style={{ marginTop: "2em" }}header >
                            <Icon name='suitcase' />
                            İş Ünvanları
                        </Menu.Item>
                      

                    </Sidebar>

                   
              
            
        </div>
    )
}
