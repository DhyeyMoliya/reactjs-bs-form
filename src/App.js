import React, { Component } from 'react';
import './App.css';

import { Alert, Grid, Row, Col, Button, Accordion, Panel, Modal, Form, FormGroup, FormControl, ControlLabel, Glyphicon, Pager }  from 'react-bootstrap';

import inputdata from './input.js';



class App extends Component {
  constructor(){
    super();
    this.state = {
      data: null,
      step: 1
    };    
    this.refresh = this.refresh.bind(this);
  }
  render() {
    return <Grid className="app">
            <Row className="head">
              <h1>Test <Button bsStyle="primary" onClick={() => this.downloadCurrentData()}>Download Current Data</Button></h1>
              <p>5 STEPS - All Steps are required with minimum 1 answer.</p>
            </Row>
            <Row>
              <Pager className="pager">
                <Pager.Item previous style={this.state.step === 1 ? {visibility: "hidden"} : {}} disabled={this.state.step > 1 ? false : true} onClick={()=> this.goToStep(this.state.step - 1)}>&larr; Previous Step</Pager.Item> 
                <Pager.Item next style={this.state.step === 5 ? {visibility: "hidden"} : {}} disabled={this.getNextStepState()} onClick={() => this.goToStep(this.state.step + 1)}>Next Step &rarr;</Pager.Item> 
              </Pager>
            </Row>
            <Row>
              <form method="POST">
                <STEPS displayStep={this.state.step} refreshparent={this.refresh} />
              </form>
            </Row>
            <Row>
              <Pager>
                <Pager.Item previous href="#" style={this.state.step === 1 ? {visibility: "hidden"} : {}} disabled={this.state.step > 1 ? false : true} onClick={()=> this.goToStep(this.state.step - 1)}>&larr; Previous Step</Pager.Item> 
                <Pager.Item next href="#" style={this.state.step === 5 ? {visibility: "hidden"} : {}} disabled={this.getNextStepState()} onClick={() => this.goToStep(this.state.step + 1)}>Next Step &rarr;</Pager.Item> 
              </Pager>
            </Row>
          </Grid>;
  }
  getNextStepState(){
    if(this.state.step === 1)
      if(inputdata.courses.length > 0 && inputdata.experiences.length > 0)
        return false;
      else 
        return true;
    else if(this.state.step === 2)
      if(inputdata.skills.length > 0 && inputdata.licenses.length > 0)
        return false;
      else
        return true;
    else if(this.state.step === 3)
      if(inputdata.skills.length > 0 && inputdata.licenses.length > 0)
        return false;
      else
        return true;
    else if(this.state.step === 4)
      if(inputdata.skills.length > 0 && inputdata.licenses.length > 0)
        return false;
      else
        return true;
    else if(this.state.step === 5)
      return true;
  }
  goToStep(step){
      this.setState({data: this.state.data, step: step});
  }
  refresh(){
    this.setState(this.state);
  }
  downloadCurrentData(){
    var a = document.createElement("A");
    a.download="data.json";
    var file = new Blob([JSON.stringify(inputdata, null, "\t")], {"type" : "application/json"});
    a.download = "data.json";
    a.href = URL.createObjectURL(file);
    a.click();
  }
}

function STEPS(props) {
    var step = props.displayStep;
    if(step === 1){
      return <STEP1 refreshparent={props.refreshparent}/>    
    }
    else if(step === 2){
      return <STEP2 refreshparent={props.refreshparent}/>    
    }
    else if(step === 3){
      return <STEP3 refreshparent={props.refreshparent}/>    
    }
    else if(step === 4){
      return <STEP4 refreshparent={props.refreshparent}/>    
    }
    else if(step === 5){
      return <STEP5 refreshparent={props.refreshparent}/>    
    }
}

class STEP1 extends Component{
  defaultstate = {
      showAddCourse: false,
      showAddExperience: false,
      courseyear: 2016,
      courseduration: 1,
      coursename: '',
      courseschool: '',
      certificate: '',
      location: '',
      experienceyear: 2017,
      experienceduration: 2,
      jobtitle: '',
      companyname: '',
      companylocation: '',
      contracttype: "CDD",
      majortasks: [],
    };
  courseid = 1;
  experienceid = 1;
  taskid = 1;
  constructor(){
    super();
    this.state = this.defaultstate;
    this.addTask = this.addTask.bind(this);
    this.getTasks = this.getTasks.bind(this);
    this.removeTask = this.removeTask.bind(this);
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
  removeExperience(id){
    var ind = null;
    inputdata.experiences.forEach(function(experience, index){
      if(experience.id === id){
        ind = index;
      }
    });
    inputdata.experiences.splice(ind, 1);
    this.setState(this.state);
    this.props.refreshparent();
  }
  render(){
    var thisd = this;
    var courses = [];
    inputdata.courses.forEach(function(course, index){
      var coursehtml = <Panel id={'course-'+course.id} className="course" header={<div>{course.coursename}<span className="glyphicon glyphicon-remove pull-right" onClick={() => thisd.removeCourse(course.id)}></span></div>} eventKey={course.id} key={course.id}>
                        <p>Course Name: {course.coursename}</p>
                        <p>Year: {course.year}</p>
                        <p>Duration: {course.duration}</p>
                        <p>School Name: {course.schoolname}</p>
                        <p>Certificate: {course.certificate}</p>
                        <p>Location: {course.location}</p>
                      </Panel>
      courses.push(coursehtml);
    });
    var experiences = [];
    inputdata.experiences.forEach(function(experience, index){
      var tasks = [];
      experience.majortasks.forEach(function(task, index){
        var taskhtml = <li key={task.id}>{task.task}</li>;
        tasks.push(taskhtml);
      });
      var exphtml = <Panel id={'experience-'+experience.id} className="course" header={<div>{experience.jobtitle}<span className="glyphicon glyphicon-remove pull-right" onClick={() => thisd.removeExperience(experience.id)}></span></div>} eventKey={experience.id} key={experience.id}>
                        <p>Job Title: {experience.jobtitle}</p>
                        <p>Year: {experience.year}</p>
                        <p>Duration: {experience.duration}</p>
                        <p>Company Name: {experience.companyname}</p>
                        <p>Location: {experience.location}</p>
                        <p>Contract Type: {experience.contracttype}</p>
                        <p>Major Tasks:</p>
                        <ul>
                          {tasks}
                        </ul>
                      </Panel>
      experiences.push(exphtml);
    });
    return <div className="step1">
            <h3>Step 1</h3>
            <div className="form">
              <h4>Additional Courses / Certificates : <Button bsStyle="primary" onClick={() => this.showAddCourseModal()}><Glyphicon glyph="plus" /> Add Course</Button></h4>
              <Accordion className="courses">
                { courses.length ? courses : <Alert bsStyle="danger">Please add at least one course.</Alert> }
              </Accordion>
              <h4>Professional Experiences : <Button bsStyle="primary" onClick={() => this.showAddExperienceModal()}><Glyphicon glyph="plus" /> Add Experience</Button></h4>
              <Accordion className="experiences">
                { experiences.length ? experiences : <Alert bsStyle="danger">Please add at least one experience.</Alert> }
              </Accordion>
            </div>
            <Modal
              show={this.state.showAddCourse}
              onHide={() => this.hideAddCourseModal()}>
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
                      onChange={(e) => this.setState({courseyear: e.target.value})}>
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
                        onChange={(e) => this.setState({courseduration: e.target.value})}
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
                        onChange={(e) => this.setState({coursename: e.target.value})}>
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
                        onChange={(e) => this.setState({courseschool: e.target.value})}>
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
                        onChange={(e) => this.setState({certificate: e.target.value})}>
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
                        onChange={(e) => this.setState({location: e.target.value})}>
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
            <Modal
              show={this.state.showAddExperience}
              onHide={() => this.hideAddExperienceModal()}>
              <Modal.Header closeButton>
                <Modal.Title>Add Experience</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form horizontal>
                  <FormGroup controlId="experienceyear" 
                      validationState={'success'}>
                    <Col componentClass={ControlLabel} sm={3}>
                      Year
                    </Col>
                    <Col sm={9}>
                      <FormControl componentClass="select" 
                      defaultValue={this.state.experienceyear} 
                      onChange={(e) => this.setState({experienceyear: e.target.value})}>
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
                  <FormGroup controlId="experienceduration" validationState={this.state.experienceduration > 0 ? 'success' : 'error'}>
                    <Col componentClass={ControlLabel} sm={3}>
                      Duration
                    </Col>
                    <Col sm={9}>
                      <FormControl 
                        value={this.state.experienceduration} 
                        componentClass="input" 
                        type="number"
                        onChange={(e) => this.setState({experienceduration: e.target.value})}
                        required>
                      </FormControl>
                      <FormControl.Feedback />
                    </Col>
                  </FormGroup>
                  <FormGroup controlId="jobtitle" validationState={this.state.jobtitle.length > 0 ? 'success' : 'error'}>
                    <Col componentClass={ControlLabel} sm={3}>
                      Job Title
                    </Col>
                    <Col sm={9}>
                      <FormControl 
                        value={this.state.jobtitle}
                        type="text" 
                        placeholder="Job Title"
                        onChange={(e) => this.setState({jobtitle: e.target.value})}>
                      </FormControl>
                      <FormControl.Feedback />
                    </Col>
                  </FormGroup>
                  <FormGroup controlId="companyname" validationState={this.state.companyname.length > 0 ? 'success' : 'error'}>
                    <Col componentClass={ControlLabel} sm={3}>
                      Company Name
                    </Col>
                    <Col sm={9}>
                      <FormControl 
                        value={this.state.companyname}
                        type="text" 
                        placeholder="Company Name"
                        onChange={(e) => this.setState({companyname: e.target.value})}>
                      </FormControl>
                      <FormControl.Feedback />
                    </Col>
                  </FormGroup>
                  <FormGroup controlId="companylocation" validationState={this.state.companylocation.length > 0 ? 'success' : 'error'}>
                    <Col componentClass={ControlLabel} sm={3}>
                      Location
                    </Col>
                    <Col sm={9}>
                      <FormControl 
                        value={this.state.companylocation}
                        type="text" 
                        placeholder="Location"
                        onChange={(e) => this.setState({companylocation: e.target.value})}>
                      </FormControl>
                      <FormControl.Feedback />
                    </Col>
                  </FormGroup>
                  <FormGroup controlId="contracttype" 
                      validationState={'success'}>
                    <Col componentClass={ControlLabel} sm={3}>
                      Contract Type
                    </Col>
                    <Col sm={9}>
                      <FormControl componentClass="select" 
                      defaultValue={this.state.contracttype} 
                      onChange={(e) => this.setState({contracttype: e.target.value})}>
                        <option value="CDD">CDD</option>
                        <option value="STAGE">STAGE</option>
                        <option value="CDI">CDI</option>
                        <option value="ALTERANCE">ALTERANCE</option>
                      </FormControl>
                    </Col>
                  </FormGroup>
                  <FormGroup controlId="majortasks" validationState={this.state.majortasks.length > 0 ? 'success' : 'error'}>
                    <Col componentClass={ControlLabel} sm={3}>
                      Major Tasks
                    </Col>
                    <Col sm={9}>
                      <Tasks getTasks={this.getTasks} addTask={this.addTask} removeTask={this.removeTask}/>
                    </Col>
                  </FormGroup>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={() => this.hideAddExperienceModal()}>Close</Button>
                <Button bsStyle="primary" onClick={() => this.addNewExperience()}>Add Experience</Button>
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

  showAddExperienceModal(){
    this.setState({showAddExperience: true});
  }
  hideAddExperienceModal(){
    this.setState({showAddExperience: false});
  }

  addNewCourse(){
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

  addNewExperience(){
    if(this.state.experienceyear > 0 && this.state.experienceduration > 0 && this.state.jobtitle.length > 0 && this.state.companyname.length > 0 && this.state.majortasks.length > 0 && this.state.companylocation.length > 0){
      inputdata.experiences.push({
        id: this.experienceid++, 
        year: this.state.experienceyear, 
        duration: this.state.experienceduration,
        jobtitle: this.state.jobtitle,
        companyname: this.state.companyname,
        location: this.state.companylocation,
        contracttype: this.state.contracttype,
        majortasks: this.state.majortasks
      });
      this.setState(this.defaultstate, () => this.props.refreshparent());
      
    }
    else 
      alert("Please fill proper details."); 
  }

  addTask(task){
    var majortasks = this.state.majortasks;
    majortasks.push({ id: this.taskid++ , task : task});
    this.setState({majortasks: majortasks});
  }
  removeTask(id){
    var ind = null;
    
    var majortasks = this.state.majortasks;
    majortasks.forEach(function(task, index){
      if(task.id === id){
        ind = index;
      }
    });
    majortasks.splice(ind, 1);
    this.setState({majortasks: majortasks});
  }

  getTasks(){
    return this.state.majortasks;
  }
  getState(){
    return this.state;
  }
  
}

class Tasks extends Component{
  
  constructor(){
    super();
    this.state = {}
  }
  render(){
    var thisd = this;
    var taskshtml = [];
    this.props.getTasks().forEach(function(task, index){
      var t = <li key={task.id}>{task.task}<span className="glyphicon glyphicon-remove" style={{marginLeft: "10px"}} onClick={() => thisd.props.removeTask(task.id)}></span></li>
      taskshtml.push(t);
    });
    return <div>
              {taskshtml.length ? <ul className="tasks">{taskshtml}</ul> : 'Please add at least one Task.'}
            <Row>
              <Col sm={6}>
                <FormControl
                  type="text" 
                  placeholder="Task">
                </FormControl>
              </Col>
              <Button bsStyle="primary" onClick={()=>this.addNewTask()}>Add</Button>
            </Row>
          </div>
  }
  addNewTask(){
    var task = document.getElementById("majortasks").value;
    this.props.addTask(task);
  }
  removeTask(id){}
}

class STEP2 extends Component{
  constructor(){
    super();
    this.state = {};
  }
  render(){
    return <div className="step2" ><h2>Step 2</h2></div>
  }
}

class STEP3 extends Component{
  constructor(){
    super();
    this.state = {}
  }
  render(){
    return <div className="step3" ><h2>Step 3</h2></div>
  }
}

class STEP4 extends Component{
  constructor(){
    super();
    this.state = {}
  }
  render(){
    return <div className="step4" ><h2>Step 4</h2></div>
  }
}

class STEP5 extends Component{
  constructor(){
    super();
    this.state = {}
  }
  render(){
    return <div className="step5" ><h2>Step 5</h2></div>
  }
}

export default App;
