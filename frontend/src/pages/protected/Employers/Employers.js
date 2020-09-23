import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { employerActions,userActions } from "../../../actions";
import { history } from "../../../helpers";

import DataTable from '../../../components/DataTable'

class Employers extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "",statusChange:'BLOCKED',changeStatus:'VERIFIED' };
  }


  addRates(id){
    alert(id);
    history.push(`/employer/rates/${id}`)
  }
  onViewRow(id) {
     history.push('/employers/view/'+id)
  }
  onActiveChanged(id, value) {
    //alert('Edit record')
    //console.log("Activate User", id);
    const data = {
      id: id,
      value: !value
    };
    const { dispatch } = this.props;
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

  onEditRow(id) {
    history.push('/employers/'+id)
 }
  onDeleteRow(id) {
    alert(id)
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

    console.log(data);
  }

  columns = [
    {
      name: 'Name',
      sortable: true,
      width:'180px',
      cell: row => <div style={{textTransform:'capitalize'}}>{row.profile.first_name} {row.profile.last_name}</div>
    },
    {
      name: 'Status',
      selector: 'account.status',
      sortable: true,
      width:'120px',
      cell: row => <div>{row.account.status}</div>
    },
    {
      name: 'Role',
      selector: 'account.role',
      sortable: true,
      width:'120px',
      cell: row => <div>{row.account.role}</div>,
     },
    {
      name: "Mobile",
      selector: "profile.mobile",
      width:'120px',
      cell: row => (
        <div>{row.profile.mobile ? row.profile.mobile.mobile : "N/A"}</div>
      )
    },
    {
      name: "Email",
      selector: "profile.email",
      width:'220px',
      cell: row => <div>{row.profile.email ? row.profile.email : "N/A"}</div>
    },
    {
      name: 'Rates',
      // selector: 'profile.email',       
     cell: row => <div className='rate-button' onClick={()=>{this.addRates(row._id)}} >Add Rates</div>,
     width:'150px'
    },
    {
      name: "Actions",
      cell: row => (
        <div class="btn-group" >
      <div className='edit-button' style={{float:'left'}} onClick={()=>{this.onEditRow(row._id)}}>
      <i class="fa fa-fw fa-edit"></i>
   <a><strong>Edit</strong></a>
      </div>
      <div className='view-button' style={{float:'left'}} onClick={()=>{this.onViewRow(row._id)}}>
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
        
      )
    }
  ];

  
  componentDidMount() {
    const { dispatch } = this.props;
    // alert('employers')
    dispatch(employerActions.getAll());
  }

  render() {
    const { users } = this.props;
console.log('logging employers user:',users)
    return (
      <>
    
            {/* <Link  className='submit-button'  to="/employers/new" >Add</Link> */}
   
                 <DataTable
            title="Employers"
            columns={this.columns}     
            data={users}         
            onRowClicked={row => {
              this.onViewRow(row._id);
            }}
          
          />
        
      </>
    );
  }
}

function mapStateToProps(state) {
  const { employers } = state;
console.log('logging employers:',employers)
  return { users: employers.employers };
}

const connectedEmployers = connect(mapStateToProps)(Employers);
export default connectedEmployers;
