import React from 'react'
import { Link ,NavLink} from 'react-router-dom'
import { Button, Menu, Icon, Image, Container  } from 'semantic-ui-react'


export default function Navi() {

  return (
    <div>

      <Menu inverted color="teal" size='large' fixed="top" >

      <Container>
         
          <Menu.Item as={NavLink} to="/home" header name="Ana Sayfa"  >
            <Image size="small" src="assets/images/HRMSlogo.png" />
          </Menu.Item>

          
          <Menu.Item as={NavLink} to="/jobpostinglist" style={{ color: 'white' }} header name="İş ilanları" > 
          <Icon name="paper plane" /> İş ilanları
          </Menu.Item>

          <Menu.Item as={NavLink} to="/cv" style={{ color: 'white', }} header name="CVs" > 
          <Icon name="address card outline" /> Profilim
          </Menu.Item>


          <Menu.Menu position='right'>
            <Menu.Item position="right">
            
              <Button as={NavLink} to="/jobpostingadd" style={{ marginLeft: "0.3em" }} compact color="linkedin" >İş İlanı Ekle</Button>
              <Button  style={{ marginLeft: "0.3em" }} compact color="vk">Giriş Yap</Button>
              <Button style={{ marginLeft: "0.3em" }}  inverted positive  >Kaydol</Button>

             
            </Menu.Item>

          </Menu.Menu>
          </Container>
      </Menu>
 
    </div>
  )
}


