import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import verify from '../../../img/verify360-red.svg';
import  vfast from '../../../img/VFast-white.png' ;
import '../Reports/printform.css';
import ReactToPrint from "react-to-print";
import { invoiceActions } from '../../../actions';
import Loader from '../../../components/Loader'
import moment from 'moment'

class NewInvoice extends React.Component {
    constructor(props){
        super(props)
        this.state={
           discount:'',
           employerid:'',
           verificationid:'',

        }
    }

    onAdd(){
      const {discount,employerid,verificationid} =this.state;
      console.log('state invoice:',this.state);
      const data={employer_id:employerid,
        services:[{verification_id:verificationid}],
        discount:discount
      }

      const{dispatch}=this.props
      dispatch(invoiceActions.add(data));
    }

    onChange(e)
{
  const target=e.target;
  this.setState({[target.name]:target.value});
}
    render() {

     
      return (
   <>  
   <div className='container-fluid' style={{padding:0,margin:0}}>
   <div className="row" style={{backgroundColor:'lightgrey',margin:0}}>
  <div className="col-sm-3" >
    <div style={{margin:5}}>
  <div style={{fontSize:16,fontWeight:400}}> Verification Id</div>
  <input name="verificationid" style={{height:40,fontSize:'18px',width:'100%'}} onChange={(e)=>this.onChange(e)} />    
  </div>
  </div>
  <div className="col-sm-3">
  <div style={{margin:5}}>
  <div style={{fontSize:16,fontWeight:400}}>Employer Id</div>
  <input  name="employerid" style={{height:40,fontSize:'18px',width:'100%'}} onChange={(e)=>this.onChange(e)}/>      
  </div> 
  </div> 
  <div className="col-sm-2">
  <div style={{margin:5}}>
  <div style={{fontSize:16,fontWeight:400}}>Discount Percentage</div>
  <input type="number"  name="discount" style={{height:40,fontSize:'18px',width:'100%'}} onChange={(e)=>this.onChange(e)} /> 
  </div>
  </div>
  <div className="col-sm-3">   
  <div style={{marginTop:30}}>
  <button className='btn btn-primary' style={{background:'#2C3B4C'}} onClick={()=>this.onAdd()}>Add</button>
  </div>
    </div>
</div>

   </div>
   </>
    );
    }
  }

function mapStateToProps(state){
  return state;
    }
    
    const connectedNewInvoice=connect(mapStateToProps)(NewInvoice);
    export default connectedNewInvoice;