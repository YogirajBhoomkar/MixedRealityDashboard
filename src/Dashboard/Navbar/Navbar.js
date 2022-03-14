import React from 'react'
import './Navbar.css'
export default function Navbar() {
  return (
      <nav class="navbar navbar-inverse navbar-fixed-top " role="navigation">
          <div class="navbar-brand">Dashboard</div>
          <div class="btn-nav">
              <button id="profile-btn" class="btn btn-primary btn-circle">
                  <i class="fas fa-user"></i>
              </button>
          </div>
      </nav>
  )
}
