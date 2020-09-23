import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {vendorActions,userActions,invoiceActions} from '../../../actions'
import {history} from '../../../helpers'
import DataTable from '../../../components/DataTable'
import moment from 'moment'

class Invoices extends React.Component{
    constructor(props){
        super(props);
        this.state={value:''} 
}

 onViewRow(id) { 
  history.push('/invoices/'+id)

}
 onDeleteRow(id) {
  const data={
    id:id} 
}


onRowClicked(data) {

 console.log(data)
}

 columns = [
    {
      name: 'Inv No.',
      selector: 'invoice_num',
      sortable: true,
    },
    {
        name: 'Date',
        selector:item=>( <div>{moment(item.date).format('DD/MM/YYYY')}</div>),
        sortable: true,
      },
     
      {
        name: 'Price',
        selector: 'total_price',      
        sortable:true
      },
      {
        name: 'Status',
        selector:item=>(<div className="ibadge info"> {item.status}</div>),   
        sortable:true
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
    dispatch(invoiceActions.getAll());
}
    render(){
const {invoices}=this.props;
console.log(invoices)
        return( 
            <>  
    <DataTable
    title="Verifications "
    columns={this.columns}
    data={invoices||[]}
    onRowClicked={
      (row)=>{this.onViewRow(row._id)}
    }   
  />                
          
</>
        );
    }
}

function mapStateToProps(state){
    const {invoices}=state;
   
    return {invoices:invoices.invoices};
    }
    
    const connectedInvoices=connect(mapStateToProps)(Invoices);
    export default connectedInvoices ;