import React from 'react';
import {connect} from 'react-redux';
import { NavLink,Link} from 'react-router-dom'
import vfast from "../img/VFast-white.png";
import { userActions } from '../actions';
import userImage from '../img/userImage.jpg';
import './dropdown.css';

class SideMenu extends React.Component{
    componentDidMount() {
        if(this.props.loggedIn)
       {
         const { dispatch,user } = this.props;	
         dispatch(userActions.get());
     
       }
     }

onLogout(){
    const {dispatch} = this.props;
    dispatch(userActions.logout())
}


// onDropdown(){
//  $('.nav-toggle').click(function(e) {
  
//         e.preventDefault();
//         $("html").toggleClass("openNav");
//         $(".nav-toggle").toggleClass("active");
      
//       });
// }
mobilemenu=[];
  navs=this.props.data.items.map((element,key) => {
    this.mobilemenu.push(<li ><Link  to={element.url} ><i class="fa fa-fw fa-home" style={{paddingRight:'7px'}} ></i>{element.name}</Link></li>)
      if(element.children)
            return( 
            <>  
            <li>
               <a href="#" data-toggle="collapse" data-target={"#submenu-"+key}>
              <i class="fa fa-fw fa-wrench" style={{paddingRight:'7px'}}></i> {element.name} <i class="fa fa-fw fa-angle-down pull-right"></i>
              </a>           
              <ul id={"submenu-"+key} class="collapse">
                   {
             element.children.map(child=>
            <>
              <li >
                   <Link to={child.url}><i class="fa fa-fw fa-home"></i>{child.name}</Link>
                   </li>        
            </>        
             )}
             </ul>
             </li> 
             </>
             )
             else{
                
return( <li >
    <Link  to={element.url} ><i class="fa fa-fw fa-home" style={{paddingRight:'7px'}} ></i>{element.name}</Link>  

    </li>)
             }
            
          })

    render(){
        const {user}=this.props;
       
         return( 
            <>
          
<div className='web-sidenav'>
<div id="throbber" style={{display:"none", minHeight:"120px"}}></div>
<div id="noty-holder"></div>
<div id="admin-wrapper">
    {/* <!-- Navigation --> */}
    <nav class="admin-navbar admin-navbar-inverse navbar-fixed-top" role="navigation">
        {/* <!-- Brand and toggle get grouped for better mobile display --> */}
        <div class="admin-navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="admin-navbar-brand">
            <img src={vfast}  style={{
            width:'120px',
            padding:'15px 0px',
            paddingLeft:'14px',
            float:'left'
            }} />
            </a>
        </div>

        {/* <ul class="admin-nav navbar-right admin-top-nav" style={{float:'right'}}>
                  
            <li class="dropdown">
                <a class="dropdown dropdown-toggle" data-toggle="dropdown" style={{paddingRight:'16px',fontSize:'19px'}}>
                    <i class='fas fa-user-alt' 
                    style={{fontSize:'22px',
                    color:'white',
                    padding:'5px',
                    margin:'4px',
                    border:'1px solid white',
                    borderRadius:'50%'}}></i>Account
              
                </a>
                <ul class="dropdown-menu" style={{minWidth:'167px'}}>
                    <li><a href="#"><i class="fa fa-fw fa-user"></i> Edit Profile</a></li>
                    <li><a href="#"><i class="fa fa-fw fa-cog"></i> Change Password</a></li>
                    <li class="divider"></li>
                    <li><a href="#"  onClick={()=>{this.onLogout()}}><i class="fa fa-fw fa-power-off" ></i> Logout</a></li>
                </ul>
            </li>
        </ul> */}


        <div style={{float:'right'}}>

<div  class="dropdown">
<a class="dropdown-toggle" data-toggle="dropdown" style={{padding:'2px 10px',marginTop:-5, marginRight:30,fontSize:'19px',display:'block',cursor:'pointer', color:'white'}}>
{user&&user.profile.profile_picture!=''?<img src={user&&user.profile.profile_picture} />
              
              :  
              <img src={userImage} style={{height:'50px',width:'50px',borderRadius:'50%',padding:'5px'}} /> 
              //   <i class='fas fa-user-alt' 
              // style={{fontSize:'22px',
              // color:'white',
              // padding:'5px',
              // margin:'4px',
              // border:'1px solid white',
              // borderRadius:'50%'}}></i>
              }
                  {user&&user.account.username}
              
                </a>
                <ul class="dropdown-menu" style={{minWidth:'167px'}}>
                <li><Link to={'/editprofile'}><a href="#"><i class="fa fa-fw fa-user"></i> Edit Profile</a></Link></li>
                    <li><Link to={'/changepassword'}><a href="#"><i class="fa fa-fw fa-cog"></i> Change Password</a></Link></li>
                    <li class="divider"></li>
                    <li><a href="#"  onClick={()=>{this.onLogout()}}><i class="fa fa-fw fa-power-off" ></i> Logout</a></li>
                </ul>
</div>

        </div>
        {/* <!-- Sidebar Menu Items - These collapse to the responsive navigation menu on small screens --> */}
        <div class="admin-navbar-collapse navbar-ex1-collapse sidebar" >
            <ul class="admin-nav admin-navbar-nav side-nav">
               {this.navs}
            </ul>
        </div>
        {/* <!-- /.navbar-collapse --> */}
    </nav> 
</div>

</div>

<div className='mobile-sidenav'>
<div class="primary-nav">

<button href="#" class="hamburger open-panel nav-toggle">
<span class="screen-reader-text">Menu</span>
</button>

<nav role="navigation" class="menu">

    <a href="#" class="logotype">
            <img src={vfast}  style={{
            width:'120px',
            padding:'6px',
            paddingLeft:'14px',
            background:'#2c3b4c'
            }} />
</a>

    <div class="overflow-container">

        <ul class="menu-dropdown">

            <li><a href="#">Home</a><span class="icon"><i class="fa fa-dashboard"></i></span></li>

            <li class="menu-hasdropdown">
                <a href="#">Users</a><span class="icon"><i class="fa fa-user"></i></span>

                <label title="toggle menu" for="users">
    <span class="downarrow"><i class="fa fa-caret-down"></i></span>
  </label>
                <input type="checkbox" class="sub-menu-checkbox" id="users" />

                <ul class="sub-menu-dropdown">
                    <li><a href="">Clients</a></li>
                    <li><a href="">Operations</a></li>
                    <li><a href="">Vendors</a></li>
                    <li><a href="">Lists</a></li>
                </ul>
            </li>
            <li class="menu-hasdropdown">
                <a href="#">Vendors</a><span class="icon"><i class="fa fa-gear"></i></span>

                <label title="toggle menu" for="vendors">
    <span class="downarrow"><i class="fa fa-caret-down"></i></span>
  </label>
                <input type="checkbox" class="sub-menu-checkbox" id="vendors" />

                <ul class="sub-menu-dropdown">
                    <li><a href="">New</a></li>
                    <li><a href="">List</a></li>
                    <li><a href="">Verifications</a></li>
                    </ul>
            </li>
            <li class="menu-hasdropdown">
                <a href="#">Clients</a><span class="icon"><i class="fa fa-gear"></i></span>

                <label title="toggle menu" for="clients">
    <span class="downarrow"><i class="fa fa-caret-down"></i></span>
  </label>
                <input type="checkbox" class="sub-menu-checkbox" id="clients" />

                <ul class="sub-menu-dropdown">
                    <li><a href="">New</a></li>
                    <li><a href="">List</a></li>
                </ul>
            </li>
            <li class="menu-hasdropdown">
                <a href="#">Operations</a><span class="icon"><i class="fa fa-gear"></i></span>

                <label title="toggle menu" for="settings">
    <span class="downarrow"><i class="fa fa-caret-down"></i></span>
  </label>
                <input type="checkbox" class="sub-menu-checkbox" id="settings" />

                <ul class="sub-menu-dropdown">
                    <li><a href="">New</a></li>
                    <li><a href="">List</a></li>
                    <li><a href="">View Leads</a></li>
                      </ul>
            </li>
            <li class="menu-hasdropdown">
                <a href="#">Verifications</a><span class="icon"><i class="fa fa-gear"></i></span>

                <label title="toggle menu" for="verifications">
    <span class="downarrow"><i class="fa fa-caret-down"></i></span>
  </label>
                <input type="checkbox" class="sub-menu-checkbox" id="verificatios" />

                <ul class="sub-menu-dropdown">
                    <li><a href="">New</a></li>
                    <li><a href="">List</a></li>
                     </ul>
            </li>
            <li><a href="#">Preset Form</a><span class="icon"><i class="fa fa-wpforms"></i></span></li>
            <li class="menu-hasdropdown">
                <a href="#">Reports</a><span class="icon"><i class="fa fa-file-text"></i></span>

                <label title="toggle menu" for="reports">
    <span class="downarrow"><i class="fa fa-caret-down"></i></span>
  </label>
                <input type="checkbox" class="sub-menu-checkbox" id="reports" />

                <ul class="sub-menu-dropdown">
                                        <li><a href="">List</a></li>
                                 </ul>
            </li>
            <li class="menu-hasdropdown">
                <a href="#">Billing</a><span class="icon"><i class="fas fa-file-invoice"></i></span>

                <label title="toggle menu" for="billing">
    <span class="downarrow"><i class="fa fa-caret-down"></i></span>
  </label>
                <input type="checkbox" class="sub-menu-checkbox" id="billing" />

                <ul class="sub-menu-dropdown">
                    <li><a href="">New</a></li>
                    <li><a href="">List</a></li>
                </ul>
            </li>
            {/* <li><a href="#">Messages</a><span class="icon"><i class="fa fa-envelope"></i></span></li> */}

        </ul>

    </div>

</nav>

</div>
{/* <nav class="admin-navbar admin-navbar-inverse navbar-fixed-top" role="navigation">
        <div class="admin-navbar-header">
            <a class="admin-navbar-brand">
            <img src={vfast}  style={{
            width:'120px',
            padding:'15px 0px',
            paddingLeft:'14px',
            float:'left',
            }} />
            </a>
    
    <div>
 
        </div>
        </div>
      
        <div style={{float:'right'}}>
        <ul class="admin-nav navbar-right admin-top-nav" style={{float:'right'}}>
            <li class="dropdown">
                <a className='top60' data-toggle="dropdown">  <i class="fa fa-bars" aria-hidden="true"style={{float:'right',color:'white',
        fontSize:'20px',marginRight:'14px'}}></i>            
                </a>
                <ul class="dropdown-menu" style={{minWidth:'150px',marginTop:'60px',float:'left'}}>

{this.mobilemenu}
                <hr/>
                    <li><a href="#"><i class="fa fa-fw fa-user"></i> Edit Profile</a></li>
                    <li><a href="#"><i class="fa fa-fw fa-cog"></i> Change Password</a></li>
                    <li class="divider"></li>
                    <li><a href="#"  onClick={()=>{this.onLogout()}}><i class="fa fa-fw fa-power-off" ></i> Logout</a></li>
                </ul>
            </li>
        </ul> 
 
            </div>
      
        </nav> */}

    </div>
      

</>
        );
    }
}

function mapStateToProps(state){
    const {loggedIn}=state.authentication
    const { alert ,users} = state;
  
    return {alert,user:users.currentUser,loggedIn };
    }
    
    const connectedSideMenu=connect(mapStateToProps)(SideMenu);
    export {connectedSideMenu as SideMenu};