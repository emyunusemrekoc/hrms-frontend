import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Menu, Icon, Image, Container  } from 'semantic-ui-react'


export default function Navi() {

  return (
    <div>

      <Menu inverted color="teal" size='large' fixed="top" >

      <Container>
          {/* <Image size="small" src="assets/images/HRMSlogo.png"/> */}
          <Menu.Item as={Link} to="/home" header name="Ana Sayfa"  >
            <Image size="small" src="assets/images/HRMSlogo.png" />
          </Menu.Item>

          
          <Menu.Item as={Link} to="/jobpostinglist" style={{ color: 'white' }} header name="İş ilanları" > 
          <Icon name="paper plane" /> İş ilanları
          </Menu.Item>

          <Menu.Menu position='right'>
            <Menu.Item position="right">
              <Button style={{ marginLeft: "0.3em" }} inverted color="linkedin">İlan Ekle</Button>
              <Button style={{ marginLeft: "0.3em" }} inverted color="vk">Giriş Yap</Button>
              <Button style={{ marginLeft: "0.3em" }} inverted positive  >Kaydol</Button>
            </Menu.Item>

          </Menu.Menu>
          </Container>
      </Menu>
 
    </div>
  )
}


