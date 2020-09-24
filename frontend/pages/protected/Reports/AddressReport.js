import React from 'react';
import { connect } from 'react-redux';
import ReactToPrint from "react-to-print";
import verify from '../../../img/verify360-red.svg';
import {reportActions} from '../../../actions';
import{apiUrl} from '../../../helpers';
import Loader from '../../../components/Loader'
import moment from 'moment'
import './printform.css'

class ComponentToPrint extends React.Component {
  constructor(props) {
    super(props);
 
  }

  render() {
   const {data}=this.props; 
   console.log('data',data);
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
      <div class="report-page" style={{marginBottom:'20px',padding:"15px"}}>
        
        <div class="address-logoBackground">
          <img src={verify}  style={{width:150 ,height:60}}/>
          </div>
       
    <div class="report-title" style={{margin:'10px'}}>
        <h4> Address Verification Report</h4>
    </div>
    
    <table className='address-report' cellPadding={10} cellSpacing={10}>
        <tr>
            <td style={{width:'50%'}} >Reference No.</td>
              <td> {data.checkinfo.reference_num}  </td>
        </tr>
        <tr>
            <td >Name of the Candidate</td>
              <td>{data.checkinfo.employee_name}</td>
        </tr>

        <tr>
            <td  >Address</td>
              <td>{data.checkinfo.address} </td>
        </tr>
        <tr>
            <td >Person Contacted</td>
            <td >{data.checkinfo.contact_person} </td>
        </tr>
        <tr>
            <td  >Relation</td>
            <td >{data.checkinfo.relation}  </td>
        </tr>
        <tr>
            <td >Contact Information</td>
              <td>{data.checkinfo.contact_info} </td>
        </tr>
        <tr>
            <td >Residential Status(Ownership/Rented)</td>
              <td>{data.checkinfo.residental_status}</td>
        </tr>
        <tr>
            <td >Period of Stay</td>
              <td>{data.checkinfo.period_of_stay} </td>
        </tr>
        <tr>
            <td >No. of Family Members</td>
            <td >{data.checkinfo.family_members} </td>
        </tr>
        <tr>
              <td>Marital Status</td>
            <td >{data.checkinfo.marital_status}</td>
        </tr>
        <tr>
            <td >Candidate's Age</td>
            <td >{data.checkinfo.age}</td>
        </tr>
        <tr>
            <td >Exterior Description of the House</td>
            <td >{data.checkinfo.exterior_desc_of_house}  </td>
        </tr>
        <tr>
            <td >Exterior Description of Apartment/Society(if Applicable)</td>
            <td >{data.checkinfo.exterior_desc_of_appt} </td>
        </tr>
        <tr>
            <td >Landmark(within 3 kms)</td>
            <td >{data.checkinfo.landmark}</td>
        </tr>
        <tr>
            <td >Comments</td>
              <td >{data.checkinfo.comments} </td>
        </tr>
        <tr>
            <td style={{height: "70px"}}>Signature of the Candidate</td>
              <td >{data.candidateSignature}  </td>
        </tr>
        <tr>
            <td >Relationship ( If not the Candidate )</td>
            <td  >{data.checkinfo.relationship_if_not_candidate} </td>
        </tr>
        <tr>
            <td >Name of the Representative Who Visited</td>
            <td  >{data.representative_name} </td>
        </tr>
        <tr>
            <td  style={{height: "70px"}} >Signature of the Representative</td>
              <td >{data.representative_sign} </td>
        </tr>
        <tr>
            <td  style={{height: "50px"}} >Latitude,Longitude</td>
              <td >{data.latitude}{data.longitude} </td>
        </tr>
        {/* <tr>
            <td colSpan='2' >Documents<br/>
              {documentList}</td>
        </tr> */}
    </table>
    <div></div>
    </div>
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

class AddressReport extends React.Component {

    
componentDidMount(){ 
  const {dispatch}=this.props;
const id=this.props.match.params.id;
//alert(id)
  dispatch(reportActions.getById(id))
}

  render() {
    const {report} = this.props;
    if(report)
    return (
      <div>
        <ReactToPrint
          trigger={() => <div className="submit-button">Print Report</div>}
          content={() => this.componentRef}
        />
          <div class="container" style={{marginLeft: "242px",width:'100%'}}>
      
        <ComponentToPrint data={report} ref={el => (this.componentRef = el)} />
      </div></div>
    );
    else return <Loader/>
  }
}

function mapStateToProps(state) {
  const {reports}=state;

 console.log('logging address report',reports)
   return {report:reports.report};
}

const connectedAddressReport = connect(mapStateToProps)(AddressReport);
export default connectedAddressReport;