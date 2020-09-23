import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {vendorActions,userActions} from '../../../actions'
import {history} from '../../../helpers';
import { Modal } from 'react-responsive-modal';
import ViewVendor from './ViewVendor';
import DataTable from '../../../components/DataTable'
import 'react-responsive-modal/styles.css';

class Vendors extends React.Component{
    constructor(props){
        super(props);
        this.state={value:'',open:false,statusChange:'BLOCKED',changeStatus:'VERIFIED'} 
}

onEditRow(id) { 
  const {dispatch}=this.props;
  dispatch(vendorActions.getById(id));
history.push(`/vendors/${id}`)

}

 onViewRow(id) { 
  //  alert(id)
   const {dispatch}=this.props;
   dispatch(vendorActions.getById(id));
 history.push(`/vendor/view/${id}`)

}
// addRates(row){
//    const id=row._id;
//   alert(id);
//   history.push(`/vendor/rates/${id}`)
// }

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
  alert(id)

   const {dispatch} =this.props;
   dispatch(userActions.deleteUser(id));
}
onOpenModal = (id) => {
   const {dispatch}= this.props;
  // const {check,lead} = this.state;
  this.setState(state=>({ open: !state.open,id}));
  dispatch(vendorActions.getById(id));
};

onCloseModal = () => {
  this.setState({ open: false });
};
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
 width:'200px'
},
// {
//   name: 'Rates',
//   // selector: 'profile.email',       
//  cell: row => <div className='rate-button' onClick={()=>{this.addRates(row)}} >Add Rates</div>,
//  width:'150px'
// },
{
name: 'Actions',          
cell: row => <div class="btn-group" >
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
  <div className='block-button' style={{float:'left'}}  onClick={()=>{this.onStatusChanged(row)}}>
  <i style={{fontSize:'13px'}} class={row.account.active==true?'fa fa-fw fa-ban':'fa fa-check-circle-o'}></i>
    {/* <i class={row.account.active==true?'fa fa-fw fa-ban':'fa fa-check-circle-o'}></i> */}
<a><strong>{row.account.status!='BLOCKED'? "Block":"Unblock" }</strong></a>
  </div>
  </div>
},
];
  

componentDidMount(){
    const {dispatch}=this.props;
    dispatch(vendorActions.getAll());
}
    render(){
const {vendors,vendor}=this.props;
const {open} = this.state;
if(vendors){


        return( 
        <>    
    {/* <Link className='submit-button' to="/vendors/new" >Add</Link> */}
    <DataTable
    title="Vendors list"
    columns={this.columns}
     data={vendors||[]}
    onRowClicked={
      (row)=>{
        this.onViewRow(row._id)} }
  />  
  <Modal open={open} onClose={this.onCloseModal} center>
  <ViewVendor data={vendor}/>
  </Modal>
            
</>
        );
      }
      else return <h2>Loading..</h2>
    }
}

function mapStateToProps(state){
    const {vendors}=state;
    console.log(vendors)
    return {vendors:vendors.vendors,vendor:vendors.selected_vendor};
    }
    
    const connectedVendors=connect(mapStateToProps)(Vendors);
    export default connectedVendors;



///here

