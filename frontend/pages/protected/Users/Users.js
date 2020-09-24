import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {userActions} from '../../../actions'
import {history} from '../../../helpers';
import DataTable from '../../../components/DataTable'

class Users extends React.Component{
    constructor(props){
        super(props);
        this.state={value:'',statusChange:'BLOCKED',changeStatus:'VERIFIED'} 
}


onEditRow(row) { 
const id=row._id;
var path="";
switch(row.account.role)
{
  case "VERIFIER":
        path=`/verifiers/${id}`
        break;


  case "EMPLOYER":
        path=`/employers/${id}`
        break;  
        
  case "VENDOR":
        path=`/vendors/${id}`
        break;       
}
 history.push({pathname:path})
 }

 onViewRow(row) { 
  const id=row._id;
  var path="";
  switch(row.account&&row.account.role)
  {
    case "VERIFIER":
          path=`/verifiers/view/${id}`
          break;
  
    case "EMPLOYER":
          path=`/employers/view/${id}`
          break;  
          
    case "VENDOR":
          path=`/vendor/view/${id}`
          break;       
  }
   history.push({pathname:path})
 
}
 onActiveChanged(id,value) {

  const data={
    id:id,
    value:!value}
    const {dispatch} =this.props;
    dispatch(userActions.changeActiveStatus(data));
}

 onRoleChanged(id,role) {
  const data={
    id:id,
    role:role}
    const {dispatch} =this.props;
    dispatch(userActions.changeRole(data));
}


onStatusChanged(row) {
  if(row.account.status!='BLOCKED'){
   const data={
     id:row._id,
     status:this.state.statusChange}
     const {dispatch} =this.props;
     dispatch(userActions.changeStatus(data));
   }
   else{
    const data={
      id:row._id,
      status:this.state.changeStatus}
      const {dispatch} =this.props;
      dispatch(userActions.changeStatus(data));
   }
  }

 onDeleteRow(id) {
 
  const data={
    id:id}
    const {dispatch} =this.props;
    dispatch(userActions.deleteUser(data));
}
onRowClicked(data) {
  // const data={
  //   id:id}
  //   const {dispatch} =this.props;
  //   dispatch(userActions.deleteUser(data));

  console.log(data)
}

 columns = [
        {
        name: 'Firstname',
        selector: 'profile.first_name',
        cell: row => <div style={{textTransform:'capitalize'}}>{row.profile.first_name} {row.profile.last_name}</div>,
        width:'150px'
      },   
      {
        name: 'Status',
        selector: 'account.status',
        sortable: true,
        width:'120px'
      },
      {
        name: 'Role',
        selector: 'account.role',
        sortable: true,
        width:'120px'
      },
        {
        name: 'Mobile',
        selector: 'profile.mobile',      
        cell: row => <div >{row.profile.mobile?row.profile.mobile.mobile:"N/A"}</div>,
        width:'120px'
      },
      {
        name: 'Email',
        selector: 'profile.email',       
       cell: row => <div >{row.profile.email?row.profile.email:'N/A'}</div>,
       width:'220px'
      },
      {

    name: 'Actions',          
    cell: row => <div class="btn-group" style={{minWidth:'250px'}}>
     <div className='edit-button' style={{float:'left'}} onClick={()=>{this.onEditRow(row)}}>
        <i class="fa fa-fw fa-edit"></i>
     <a><strong>Edit</strong></a>
        </div>
        <div className='view-button' style={{float:'left'}} onClick={()=>{this.onViewRow(row)}}>
        <i class="fa fa-fw fa-eye"></i>
     <a><strong>View</strong></a>
        </div>
        <div className='delete-button' style={{float:'left'}} onClick={()=>{this.onDeleteRow(row._id)}}>
        <i class="fa fa-fw fa-trash"></i>
     <a><strong>Delete</strong></a>
        </div>
        <div className='block-button' style={{float:'left'}} onClick={()=>{this.onStatusChanged(row)}}>
        <i style={{fontSize:'13px'}} class={row.account.status!='BLOCKED'?'fa fa-fw fa-ban':''}></i>
          {/* <i class={row.account.active==true?'fa fa-fw fa-ban':'fa fa-check-circle-o'}></i> */}
      <a><strong>{row.account.status!='BLOCKED'? "Block":"Unblock"}</strong></a>
        </div>
        </div>
      },
  ];

  componentDidMount(){
    const {dispatch}=this.props;
    dispatch(userActions.getAll());
}
    render(){
const {users}=this.props;
console.log('logging usersAll:',users)

        return( 
            <>

      {/* <Link className='submit-button' to="/users/new" > Add</Link> */}

       <DataTable          
    title="Users list"    
    columns={this.columns}   
    data={users} 
    onRowClicked={
      (row)=>{this.onViewRow(row._id)}
    } 
  />  
                
         
</>
        );
    }
}

function mapStateToProps(state){
    const {users}=state;
  
    return {users:users.users};
    }
    
    const connectedUsers=connect(mapStateToProps)(Users);
    export default connectedUsers;
