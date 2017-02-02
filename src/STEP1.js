import React, { Component } from 'react';
import './App.css';

import { Grid, Row, Col, Button, Accordion, Panel, Modal, Form, FormGroup, FormControl, ControlLabel, Glyphicon, Pager }  from 'react-bootstrap';
import fileDownload from 'react-file-download';

import inputdata from './input.js';

class STEP1 extends Component{
  defaultstate = {
      showAddCourse: false,
      showAddExperiences: false,
      courseyear: 2016,
      courseduration: 1,
      coursename: '',
      courseschool: '',
      certificate: '',
      location: ''
    };
  courseid = 3;
  constructor(){
    super();
    this.state = this.defaultstate;
  }
  removeCourse(id){
    var ind = null;
    inputdata.courses.forEach(function(course, index){
      if(course.id === id){
        ind = index;
      }
    });
    inputdata.courses.splice(ind, 1);
    this.setState(this.state);
    this.props.refreshparent();
  }
  render(){
    var thisd = this;
    var courses = [];
    inputdata.courses.forEach(function(course, index){
      var coursehtml = <Panel id={'course-'+course.id} className="course" header={<div>{course.coursename}<span className="glyphicon glyphicon-remove pull-right" onClick={(e) => thisd.removeCourse(e)}></span></div>} eventKey={course.id} key={course.id}>
                        <p>Course Name: {course.coursename}</p>
                        <p>Year: {course.year}</p>
                        <p>Duration: {course.duration}</p>
                        <p>School Name: {course.schoolname}</p>
                        <p>Certificate: {course.certificate}</p>
                        <p>Location: {course.location}</p>
                      </Panel>
      courses.push(coursehtml);
    });
    return <div className="step1">
            <h3>Step 1</h3>
            <div className="form">
              <h4>Additional Courses / Certificates : <Button bsStyle="primary" onClick={() => this.showAddCourseModal()}><Glyphicon glyph="plus" /> Add Course</Button></h4>
              <Accordion className="courses">
                { courses.length ? courses : 'Please Add Courses.' }
              </Accordion>
            </div>
            <Modal
              show={this.state.showAddCourse}
              onHide={() => this.hideAddCourseModal()}
            >
              <Modal.Header closeButton>
                <Modal.Title>Add Course</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form horizontal>
                  <FormGroup controlId="courseyear" 
                      validationState={'success'}>
                    <Col componentClass={ControlLabel} sm={3}>
                      Year
                    </Col>
                    <Col sm={9}>
                      <FormControl componentClass="select" 
                      defaultValue={this.state.courseyear} 
                      onChange={(e) => this.setState({courseyear: e.target.value}, () => console.log(this.state.courseyear))}>
                        <option value="2010">2010</option>
                        <option value="2011">2011</option>
                        <option value="2012">2012</option>
                        <option value="2013">2013</option>
                        <option value="2014">2014</option>
                        <option value="2015">2015</option>
                        <option value="2016">2016</option>
                        <option value="2017">2017</option>
                      </FormControl>
                    </Col>
                  </FormGroup>
                  <FormGroup controlId="courseduration" validationState={this.state.courseduration > 0 ? 'success' : 'error'}>
                    <Col componentClass={ControlLabel} sm={3}>
                      Duration
                    </Col>
                    <Col sm={9}>
                      <FormControl 
                        value={this.state.courseduration} 
                        componentClass="input" 
                        type="number"
                        onChange={(e) => this.setState({courseduration: e.target.value}, () => console.log(this.state.courseduration))}
                        required>
                      </FormControl>
                      <FormControl.Feedback />
                    </Col>
                  </FormGroup>
                  <FormGroup controlId="coursename" validationState={this.state.coursename.length > 0 ? 'success' : 'error'}>
                    <Col componentClass={ControlLabel} sm={3}>
                      Course Name
                    </Col>
                    <Col sm={9}>
                      <FormControl 
                        value={this.state.coursename}
                        type="text" 
                        placeholder="Course Name"
                        onChange={(e) => this.setState({coursename: e.target.value}, () => console.log(this.state.coursename))}>
                      </FormControl>
                      <FormControl.Feedback />
                    </Col>
                  </FormGroup>
                  <FormGroup controlId="courseschool" validationState={this.state.courseschool.length > 0 ? 'success' : 'error'}>
                    <Col componentClass={ControlLabel} sm={3}>
                      School Name
                    </Col>
                    <Col sm={9}>
                      <FormControl 
                        value={this.state.courseschool}
                        type="text" 
                        placeholder="School Name"
                        onChange={(e) => this.setState({courseschool: e.target.value}, () => console.log(this.state.courseschool))}>
                      </FormControl>
                      <FormControl.Feedback />
                    </Col>
                  </FormGroup>
                  <FormGroup controlId="certificate" validationState={this.state.certificate.length > 0 ? 'success' : 'error'}>
                    <Col componentClass={ControlLabel} sm={3}>
                      Certificate
                    </Col>
                    <Col sm={9}>
                      <FormControl 
                        value={this.state.certificate}
                        type="text" 
                        placeholder="Certificate"
                        onChange={(e) => this.setState({certificate: e.target.value}, () => console.log(this.state.certificate))}>
                      </FormControl>
                      <FormControl.Feedback />
                    </Col>
                  </FormGroup>
                  <FormGroup controlId="location" validationState={this.state.location.length > 0 ? 'success' : 'error'}>
                    <Col componentClass={ControlLabel} sm={3}>
                      Location
                    </Col>
                    <Col sm={9}>
                      <FormControl 
                        value={this.state.location}
                        type="text" 
                        placeholder="Location"
                        onChange={(e) => this.setState({location: e.target.value}, () => console.log(this.state.location))}>
                      </FormControl>
                      <FormControl.Feedback />
                    </Col>
                  </FormGroup>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={() => this.hideAddCourseModal()}>Close</Button>
                <Button bsStyle="primary" onClick={() => this.addNewCourse()}>Add Course</Button>
              </Modal.Footer>
            </Modal>
          </div>
  }
  showAddCourseModal(){
    this.setState({showAddCourse: true});
  }
  hideAddCourseModal(){
    this.setState({showAddCourse: false});
  }
  addNewCourse(){
    console.log(this.state);
    if(this.state.courseyear > 0 && this.state.courseduration > 0 && this.state.coursename.length > 0 && this.state.courseschool.length > 0 && this.state.certificate.length > 0 && this.state.location.length > 0){
      inputdata.courses.push({
        id: this.courseid++, 
        year: this.state.courseyear, 
        duration: this.state.courseduration,
        coursename: this.state.coursename,
        schoolname: this.state.courseschool,
        certificate: this.state.certificate,
        location: this.state.location
      });
      this.setState(this.defaultstate);
      this.props.refreshparent();
    }
    else 
      alert("Please fill proper details.");  
    
  }
  
}

export default STEP1;