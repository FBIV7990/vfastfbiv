import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {vendorActions,userActions,verificationActions} from '../../../actions'
import {history} from '../../../helpers'
import DataTable from '../../../components/DataTable'

class Verifications extends React.Component{
    constructor(props){
        super(props);
        this.state={value:''} 
}

 onViewRow(id) { 
  history.push('/verifications/view/'+id)

}
 onDeleteRow(id) {
console.log("verif id:",id)
const data={verification_id:id}
    const {dispatch} =this.props;
    dispatch(verificationActions.remove(data))
   // dispatch(userActions.deleteUser(data));
}


onRowClicked(data) {

  // const data={
  //   id:id}
  //   const {dispatch} =this.props;
  //   dispatch(userActions.deleteUser(data));

  console.log(data)
}

onstartVerify(data){
  console.log('logging verID:',data)
  const id=data._id;
  var path="";
  switch(data.checkname)
  {
    case "pre_employment_check":
          path=`/employmentCheck/${id}`
          break;

    case "physical_check":
          path=`/addressCheck/${id}`
          break;  
          
    case "education_check":
          path=`/backgroundCheck/${id}`
          break;       
  }
 // console.log(data.checkname);
  //history.push('/reports'+path)

  history.push({pathname:'/reports'+path,state:{
    data:data
  }})
}

 columns = [
    // {
    //   name: 'Id',
    //   selector: '_id',
    //   sortable: true,
    // },
    // {
    //     name: 'Name',
    //     selector: 'employee_id.name',
    //     sortable: true,
    //   },
    {
        name: 'Check Name',
        selector: 'checkname',
        sortable: true,
      },
     
      {
        name: 'Price',
        selector: 'vendor_cost',      
        sortable:true
      },
      {
        name: 'Status',
        selector:item=>(<div className="ibadge info"> {item.status}</div>),   
        sortable:true
      },
      {
        name: 'TAT',
        selector: 'estimated_time',      
        sortable:true
      },
     
      
      {
        name: 'Start verification',
        sortable: true,

        cell:row=>  <>
         {row.status!='COMPLETED'? 
          <div className='start-verif'> 
                 <strong>
      <a onClick={()=>{this.onstartVerify(row)}}>  Start verification</a>
        </strong>
         </div>:<div style={{color:'white',background:'#28a745',padding:'5px 7px'}} >Verified</div>}
      </>
      },
     
      {
        name: 'Actions',          
       cell: row => <div class="btn-group">
       <div className='view-button' style={{float:'left'}} onClick={()=>{this.onViewRow(row._id)}}>
        <i class="fa fa-fw fa-eye"></i>
     <a><strong>View</strong></a>
        </div>
        <div className='delete-button' style={{float:'left'}} onClick={()=>{this.onDeleteRow(row._id)}}>
        <i class="fa fa-fw fa-trash"></i>
     <a><strong>Delete</strong></a>
        </div>
     </div>,
      },
  ];

   

componentDidMount(){
    const {dispatch}=this.props;
    dispatch(verificationActions.getAll());
}
    render(){
const {verifications}=this.props;
console.log(verifications)
        return( 
            <>
  
    <DataTable
    title="Verifications "
    columns={this.columns}
    data={verifications||[]}
    onRowClicked={
      (row)=>{this.onViewRow(row._id)}
    }   
  />                
          
</>
        );
    }
}

function mapStateToProps(state){
    const {verifications}=state;
   
    return {verifications:verifications.verifications};
    }
    
    const connectedVerifications=connect(mapStateToProps)(Verifications);
    export default connectedVerifications ;