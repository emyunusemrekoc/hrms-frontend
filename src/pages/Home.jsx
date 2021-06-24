import React from 'react'
import { Image ,Button, Icon} from 'semantic-ui-react'

export default function Home() {
    return (
        <div>
         
            
            <a href="https://github.com/emyunusemrekoc" >
                  <Button style={{ marginTop: "3.5em" }} className="ui massive right floated" color="black">
                    <Icon name="github" /> Github
                  </Button>
                </a>
             <Image  className="ui right floated big image" src="assets/images/welcome.png"  />
           
        </div>
    )
}
