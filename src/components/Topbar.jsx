import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../img/Logo.png';
import profile from '../img/profile.png';
import { useLogin } from '../hooks/useLogin';

function Topbar() {
  const {user} = useLogin()
  
  return (
    <Navbar className="navbar-custom" style={{ fontFamily: 'Roboto, sans-serif', backgroundColor: '#FFFFFF' }}>
      <Navbar.Brand href="/Dashboard" className="mx-5">
        <img src={logo} alt="Logo" style={{ width: '50px' }} />
      </Navbar.Brand>

      <div className="ms-auto  d-flex">
        <img src={profile} alt="Profile" style={{ width: 'auto',borderRadius:'50%' ,height:'50px'}} className='mx-3 mt-2'/>
        <div style={{marginRight:'50px'}}>
        <h5><b>{user.name}</b></h5>
        <p>{user.role}</p>

        </div>

      </div>
    </Navbar>
  );
}

export default Topbar;
