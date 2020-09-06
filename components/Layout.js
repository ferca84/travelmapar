import React from 'react'
import MyNavbar from './MyNavbar'
import { Container, Row, Col } from 'react-bootstrap'



const Layout = (props) => {

    return (
        <>
            <Container style={{padding: 0}} fluid>
              
                    <MyNavbar />

                    {props.children}
                    
            </Container>
        </>
    )
}

export default Layout