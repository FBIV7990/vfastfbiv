import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import ReactToPrint from "react-to-print";
// import PropTypes from "prop-types";
import  vfast from '../../../img/VFast-white.png' ;
import {reportActions} from '../../../actions';
import{apiUrl} from '../../../helpers';
import Loader from '../../../components/Loader'
import moment from 'moment'
import './printform.css'



class ComponentToPrint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      client_name:"FBIV Infocomm Pvt Ltd",
      client_address:"D-2/6 Krishna Nagar Delhi-110051"
  }
}

  render() {
  
 const {data}=this.props;
 if(data){
     
  const documentList=data&&data.documents.map((docs)=>(
    <div className='report-image-container' style={{height:'330px',width:'330px',float:'left',margin:'10px'}}>
    <img src={apiUrl+'/'+docs.filepath} style={{height:'330px',width:'330px',margin:'10px'}} />
    <div className='report-text-block'>
      <table style={{height:'auto',border:'1px solid white',marginTop:'3px'}}>
        <tbody>
        <tr>
          <td colSpan={2} style={{border:'1px solid white'}}>India</td>
        </tr>
        <tr>
       <td style={{border:'1px solid white'}}><img src={  'https://maps.googleapis.com/maps/api/staticmap?zoom=13&size=100x100&maptype=roadmap&markers=color:blue%7Clabel:S%7C' +
                  data.longitude +
                    ',' +
                 data.latitude +
                    '&key=AIzaSyCFU9xoXBEkIUAm2XWJj7jlkerEaITusWY'}  style={{width:'60px',height:'60px',margin:'5px'}}/></td>
              <td style={{border:'0px solid white',color:'white'}}>
              Longitude{data.longitude} <br/>
              Latitude{data.latitude}
                {/* <tr><td style={{border:'1px solid white',margin:'0px'}}></td></tr>
        <tr>  <td style={{border:'1px solid white',margin:'0px'}}></td>
          </tr> */}
          </td>
       </tr>
       </tbody>
        </table>
       </div>
     </div>
  ))
    return (
<> 
<div className='container'>   
<div class="report-page">
<div class="report-border" style={{   padding: '5px 0px 20px 20px'}}>
    <div class="report-logoBackground" style={{marginTop:"20px"}}>
      <img src={vfast} style={{ width:"100%", height:'auto'}}/>
    </div>
    <h5 class="report-address">{this.state.client_name}</h5>
    <h5 class="report-address">{this.state.client_address}</h5>
</div>
<div class="report-title">
    <h3 > Employee Verification Report</h3>
</div>

<div class="report-table">
    <table>
        <tr> 
              <td >Order ID</td>
            <td >
            {data.order_id}              
              </td>
              <td >Employee Name</td>
            <td colspan="3" >
            {data.checkinfo.employee_name}
            </td>
        </tr>
        <tr>
              <td >Gender</td>
              <td>
              {data.checkinfo.gender}              
                </td>
              <td >Date of Birth</td>
              <td >
                {moment(data.checkinfo.dob).format('DD/MM/YYYY')}
                       
                </td>
              <td >Birth Place</td>
            <td >
            {data.checkinfo.birthplace}
              </td>
        </tr>

        <tr>
              <td >Mobile Number</td>
            <td colspan="2">
            {data.checkinfo.mobile}
              </td>
              <td >Email</td>
            <td colspan="2">
            {data.checkinfo.email}
                </td>
        </tr>
        <tr>
              <td >Fathers Name</td>
            <td colspan="2">
            {data.checkinfo.fathername}
              </td>
              <td >Mothers Name</td>
            <td colspan="2" >
            {data.checkinfo.mothername}
            </td>
        </tr>
        <tr>
              <td >Language Spoken</td>
              <td>
              {data.checkinfo.language}
                 
                </td>
              <td >Id:Aadhar Number</td>
              <td >
              {data.checkinfo.aadhar_number}
              
                </td>
              <td >Introduced By</td>
            <td >
            {data.checkinfo.introduced_by}
              
              </td>
        </tr>
        <tr>
            <td >Height(in CMS)</td>
            <td >
            {data.checkinfo.height}
            
              </td>
            <td  >Identity Mark</td>
            <td colspan="3">
            {data.checkinfo.identity_mark}
      
              </td> 
        </tr>
    </table>

    <table style={{width:"100%",height:'180px'}}>
        <tr>
            <td  colspan="4" style={{textAlign:"center",borderRight:"none"}}>Previous Employer Details </td>
        </tr>
        <tr>
              <td >Employer Name</td>
            <td >
            {data.checkinfo.employer_name}                           
              </td>
              <td >Designation</td>
            <td >
            {data.checkinfo.designation}
              </td>
        </tr>
        <tr>
              <td >Address</td>
            <td  colspan="3" >
            {data.checkinfo.address}
            
            </td>

        </tr>
        <tr>
            <td  >Date since Employed</td>
            <td >
            {moment(data.checkinfo.date_since_employed).format('DD/MM/YYYY')}
              </td>
            <td  >Tenure</td>
            <td  >
            {data.checkinfo.tenure}
             
              </td>
        </tr>

    </table>

    <table style={{height:"120px",width:"100%"}}>
        <tr>
              <td style={{width:'50%'}}>Name of person Met in the Organization</td>
            <td >
            {data.checkinfo.person_met_in_org}
              </td>
        </tr>
        <tr>
            <td  >Designation</td>
            <td >
            {data.checkinfo.person_designation}</td>

        </tr>
    </table>
    {/* <div>{documentList}</div> */}

</div>
  
</div>


{/* <ReportDocument data={data||[]} /> */}
<div class="report-page" style={{marginTop:'30px',padding:'20px'}}>
  <h3>Documents and Pictures:</h3>
   <div>{documentList}</div>
</div>
</div>
</>

    );

 }
 else return <h2>Loading..</h2>
  }
}


class EmploymentReports extends React.Component {
  
componentDidMount(){
 
  const {dispatch}=this.props;
const id=this.props.match.params.id;
  dispatch(reportActions.getById(id))
}
  render() {
        const{report} =this.props;
    if(report)
    return (
      <div>
        <ReactToPrint
          trigger={() => <div className="submit-button">Print Report</div>}
          content={() => this.componentRef}
        />
        <div class="container" style={{marginLeft: "242px",width:'100%'}}>
        <ComponentToPrint data={report} ref={el => (this.componentRef = el)} />
       
        </div> 
      </div>
    );
    else return <Loader/>
  }
}



function mapStateToProps(state) {
 const {reports}=state;
 return {report:reports.report};
}

const connectedEmploymentReports = connect(mapStateToProps)(EmploymentReports);
export default connectedEmploymentReports;