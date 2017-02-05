import React, { Component } from 'react';
import './App.css';
import { Alert, Grid, Row, Col, Button, Accordion, Panel, Modal, Form, FormGroup, FormControl, ControlLabel, Glyphicon, Pager } from 'react-bootstrap';
import Rater from './react-rater/Rater';
import inputdata from './input.js';

class App extends Component {
  constructor() {
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
        <p><i>Note: Because of limitation of curent browsers (not supporting HTML5 download option), you should use Chrome or Mozilla to best use this Web App.</i></p>
      </Row>
      <Row>
        <Pager className="pager">
          <Pager.Item previous style={this.state.step === 1 ? { visibility: "hidden" } : {}} disabled={this.state.step > 1 ? false : true} onClick={() => this.goToStep(this.state.step - 1)}>&larr; Previous Step</Pager.Item>
          <Pager.Item next style={this.state.step === 5 ? { visibility: "hidden" } : {}} disabled={this.getNextStepState()} onClick={() => this.goToStep(this.state.step + 1)}>Next Step &rarr;</Pager.Item>
        </Pager>
      </Row>
      <Row>
        <STEPS displayStep={this.state.step} refreshparent={this.refresh} />
      </Row>
      <Row>
        <Pager>
          <Pager.Item previous href="#" style={this.state.step === 1 ? { visibility: "hidden" } : {}} disabled={this.state.step > 1 ? false : true} onClick={() => this.goToStep(this.state.step - 1)}>&larr; Previous Step</Pager.Item>
          <Pager.Item next href="#" style={this.state.step === 5 ? { visibility: "hidden" } : {}} disabled={this.getNextStepState()} onClick={() => this.goToStep(this.state.step + 1)}>Next Step &rarr;</Pager.Item>
        </Pager>
      </Row>
    </Grid>;
  }
  getNextStepState() {
    if (this.state.step === 1)
      if (inputdata.courses.length > 0 && inputdata.experiences.length > 0)
        return false;
      else
        return true;
    else if (this.state.step === 2)
      if (inputdata.skills.length > 0 && inputdata.licenses.length > 0)
        return false;
      else
        return true;
    else if (this.state.step === 3)
      if (inputdata.hobbies.length > 0 && inputdata.overseasexps.length > 0 && inputdata.activities.length > 0)
        return false;
      else
        return true;
    else if (this.state.step === 4)
      if (inputdata.keywords.length > 0 && inputdata.mesdocs.length > 0 && inputdata.links.length > 0 && inputdata.links.length > 0 && inputdata.videos.length > 0 && inputdata.photos.length > 0 && inputdata.documents.length > 0)
        return false;
      else
        return true;
    else if (this.state.step === 5)
      return true;
  }
  goToStep(step) {
    this.setState({ data: this.state.data, step: step });
  }
  refresh() {
    this.setState(this.state);
  }
  downloadCurrentData() {
    var a = document.createElement("A");
    a.download = "data.json";
    var file = new Blob([JSON.stringify(inputdata, null, "\t")], { "type": "application/json" });
    a.download = "data.json";
    a.href = URL.createObjectURL(file);
    a.click();
  }
}

function STEPS(props) {
  var step = props.displayStep;
  if (step === 1) {
    return <STEP1 refreshparent={props.refreshparent} />
  }
  else if (step === 2) {
    return <STEP2 refreshparent={props.refreshparent} />
  }
  else if (step === 3) {
    return <STEP3 refreshparent={props.refreshparent} />
  }
  else if (step === 4) {
    return <STEP4 refreshparent={props.refreshparent} />
  }
  else if (step === 5) {
    return <STEP5 refreshparent={props.refreshparent} />
  }
}

class STEP1 extends Component {
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
  constructor() {
    super();
    this.state = this.defaultstate;
    this.addTask = this.addTask.bind(this);
    this.getTasks = this.getTasks.bind(this);
    this.removeTask = this.removeTask.bind(this);
  }
  removeCourse(id) {
    var ind = null;
    inputdata.courses.forEach(function (course, index) {
      if (course.id === id) {
        ind = index;
      }
    });
    inputdata.courses.splice(ind, 1);
    this.setState(this.state);
    this.props.refreshparent();
  }
  removeExperience(id) {
    var ind = null;
    inputdata.experiences.forEach(function (experience, index) {
      if (experience.id === id) {
        ind = index;
      }
    });
    inputdata.experiences.splice(ind, 1);
    this.setState(this.state);
    this.props.refreshparent();
  }
  showAddCourseModal() {
    this.setState({ showAddCourse: true });
  }
  hideAddCourseModal() {
    this.setState({ showAddCourse: false });
  }

  showAddExperienceModal() {
    this.setState({ showAddExperience: true });
  }
  hideAddExperienceModal() {
    this.setState({ showAddExperience: false });
  }

  addNewCourse() {
    if (this.state.courseyear > 0 && this.state.courseduration > 0 && this.state.coursename.length > 0 && this.state.courseschool.length > 0 && this.state.certificate.length > 0 && this.state.location.length > 0) {
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

  addNewExperience() {
    if (this.state.experienceyear > 0 && this.state.experienceduration > 0 && this.state.jobtitle.length > 0 && this.state.companyname.length > 0 && this.state.majortasks.length > 0 && this.state.companylocation.length > 0) {
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

  addTask(task) {
    var majortasks = this.state.majortasks;
    majortasks.push({ id: this.taskid++, task: task });
    this.setState({ majortasks: majortasks });
  }
  removeTask(id) {
    var ind = null;

    var majortasks = this.state.majortasks;
    majortasks.forEach(function (task, index) {
      if (task.id === id) {
        ind = index;
      }
    });
    majortasks.splice(ind, 1);
    this.setState({ majortasks: majortasks });
  }

  getTasks() {
    return this.state.majortasks;
  }
  getState() {
    return this.state;
  }

  render() {
    var thisd = this;
    var courses = [];
    inputdata.courses.forEach(function (course, index) {
      var coursehtml = <Panel id={'course-' + course.id} className="course" header={<div>{(index + 1) + ". " + course.coursename}<span className="glyphicon glyphicon-remove pull-right" onClick={() => thisd.removeCourse(course.id)}></span></div>} eventKey={course.id} key={course.id}>
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
    inputdata.experiences.forEach(function (experience, index) {
      var tasks = [];
      experience.majortasks.forEach(function (task, index) {
        var taskhtml = <li key={task.id}>{task.task}</li>;
        tasks.push(taskhtml);
      });
      var exphtml = <Panel id={'experience-' + experience.id} className="course" header={<div>{(index + 1) + ". " + experience.jobtitle}<span className="glyphicon glyphicon-remove pull-right" onClick={() => thisd.removeExperience(experience.id)}></span></div>} eventKey={experience.id} key={experience.id}>
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
    var courseModal = <Modal
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
                onChange={(e) => this.setState({ courseyear: e.target.value })}>
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
                onChange={(e) => this.setState({ courseduration: e.target.value })}
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
                onChange={(e) => this.setState({ coursename: e.target.value })}>
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
                onChange={(e) => this.setState({ courseschool: e.target.value })}>
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
                onChange={(e) => this.setState({ certificate: e.target.value })}>
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
                onChange={(e) => this.setState({ location: e.target.value })}>
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
    </Modal>;

    var experienceModal = <Modal
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
                onChange={(e) => this.setState({ experienceyear: e.target.value })}>
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
                onChange={(e) => this.setState({ experienceduration: e.target.value })}
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
                onChange={(e) => this.setState({ jobtitle: e.target.value })}>
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
                onChange={(e) => this.setState({ companyname: e.target.value })}>
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
                onChange={(e) => this.setState({ companylocation: e.target.value })}>
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
                onChange={(e) => this.setState({ contracttype: e.target.value })}>
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
              <Tasks getTasks={this.getTasks} addTask={this.addTask} removeTask={this.removeTask} />
            </Col>
          </FormGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => this.hideAddExperienceModal()}>Close</Button>
        <Button bsStyle="primary" onClick={() => this.addNewExperience()}>Add Experience</Button>
      </Modal.Footer>
    </Modal>;

    return <div className="step1">
      <h3>Step 1</h3>
      <div className="form">
        <h4>Additional Courses / Certificates : <Button bsStyle="primary" onClick={() => this.showAddCourseModal()}><Glyphicon glyph="plus" /> Add Course</Button></h4>
        <Accordion className="courses">
          {courses.length ? courses : <Alert bsStyle="danger">Please add at least one course.</Alert>}
        </Accordion>
        <h4>Professional Experiences : <Button bsStyle="primary" onClick={() => this.showAddExperienceModal()}><Glyphicon glyph="plus" /> Add Experience</Button></h4>
        <Accordion className="experiences">
          {experiences.length ? experiences : <Alert bsStyle="danger">Please add at least one experience.</Alert>}
        </Accordion>
      </div>
      {courseModal}
      {experienceModal}
    </div>
  }
}

class Tasks extends Component {

  constructor() {
    super();
    this.state = {}
  }
  render() {
    var thisd = this;
    var taskshtml = [];
    this.props.getTasks().forEach(function (task, index) {
      var t = <li key={task.id}>{task.task}<span className="glyphicon glyphicon-remove" style={{ marginLeft: "10px" }} onClick={() => thisd.props.removeTask(task.id)}></span></li>
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
        <Button bsStyle="primary" onClick={() => this.addNewTask()}>Add</Button>
      </Row>
    </div>
  }
  addNewTask() {
    var task = document.getElementById("majortasks").value;
    this.props.addTask(task);
  }
  removeTask(id) { }
}

class STEP2 extends Component {
  defaultstate = {
    showAddSkill: false,
    showAddLicense: false,
    skilltype: '',
    skilldesc: '',
    skilllevel: 1,
    licensetype: 'car',
    licensecategory: '',
    rating: "Concept"
  }
  skillid = 1;
  licenseid = 1;
  skilllevels = ["Concept", "Beginner", "Good", "Very Good", "Excellent"];
  constructor() {
    super();
    this.state = this.defaultstate;
  }
  render() {
    var thisd = this;
    var skills = [];
    inputdata.skills.forEach(function (skill, index) {
      var skillhtml = <Panel
        id={'skill-' + skill.id}
        className="skill"
        header={<div>{(index + 1) + ". " + skill.type}
          <span
            className="glyphicon glyphicon-remove pull-right"
            onClick={() => thisd.removeSkill(skill.id)}>
          </span>
        </div>}
        eventKey={skill.id}
        key={skill.id}>
        <p>Type of skill: {skill.type}</p>
        <p>Description: {skill.description}</p>
        <div>Level: <Rater total={5} rating={skill.level} interactive={false} /><div className="skill-level">{skill.leveltext}</div></div>
      </Panel>
      skills.push(skillhtml);
    });
    var licenses = [];
    inputdata.licenses.forEach(function (license, index) {
      var licensehtml = <Panel
        id={'license-' + license.id}
        className="license"
        header={<div>{(index + 1) + ". " + license.type}
          <span
            className="glyphicon glyphicon-remove pull-right"
            onClick={() => thisd.removeLicense(license.id)}>
          </span>
        </div>}
        eventKey={license.id}
        key={license.id}>
        <p>License Type: {license.type}</p>
        <p>Category: {license.category}</p>
      </Panel>
      licenses.push(licensehtml);
    });
    var skillModal = <Modal
      show={this.state.showAddSkill}
      onHide={() => this.hideAddSkillModal()}>
      <Modal.Header closeButton>
        <Modal.Title>Add Skill</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form horizontal>
          <FormGroup controlId="skilltype"
            validationState={this.state.skilltype.length > 0 ? 'success' : 'error'}>
            <Col componentClass={ControlLabel} sm={3}>
              Type of Skill
            </Col>
            <Col sm={9}>
              <FormControl
                value={this.state.skilltype}
                type="text"
                placeholder="Skill Type"
                onChange={(e) => this.setState({ skilltype: e.target.value })}>
              </FormControl>
              <FormControl.Feedback />
            </Col>
          </FormGroup>
          <FormGroup controlId="skilldesc" validationState={this.state.skilldesc.length > 0 ? 'success' : 'error'}>
            <Col componentClass={ControlLabel} sm={3}>
              Description
                      </Col>
            <Col sm={9}>
              <FormControl
                value={this.state.skilldesc}
                type="text"
                placeholder="Skill Description"
                onChange={(e) => this.setState({ skilldesc: e.target.value })}>
              </FormControl>
              <FormControl.Feedback />
            </Col>
          </FormGroup>
          <FormGroup controlId="skilllevel" validationState="success">
            <Col componentClass={ControlLabel} sm={3}>
              Skill Level
            </Col>
            <Col sm={9} style={{ paddingTop: "7px" }}>
              <Rater total={5} rating={this.state.skilllevel} onRate={(rater) => thisd.handleRate(rater)} />
              <div className="skill-level">{this.state.rating}</div>
            </Col>
          </FormGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => this.hideAddSkillModal()}>Close</Button>
        <Button bsStyle="primary" onClick={() => this.addNewSkill()}>Add Skill</Button>
      </Modal.Footer>
    </Modal>

    var licenseModal = <Modal
      show={this.state.showAddLicense}
      onHide={() => this.hideAddLicenseModal()}>
      <Modal.Header closeButton>
        <Modal.Title>Add License</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form horizontal>
          <FormGroup controlId="licensetype"
            validationState={'success'}>
            <Col componentClass={ControlLabel} sm={3}>
              License Type
                    </Col>
            <Col sm={9}>
              <FormControl componentClass="select"
                defaultValue={this.state.licensetype}
                onChange={(e) => this.setState({ licensetype: e.target.value })}>
                <option value="car">car</option>
                <option value="van">van</option>
                <option value="motorcycle">motorcycle</option>
              </FormControl>
            </Col>
          </FormGroup>
          <FormGroup controlId="licensecategory" validationState={this.state.licensecategory.length > 0 ? 'success' : 'error'}>
            <Col componentClass={ControlLabel} sm={3}>
              Category
                    </Col>
            <Col sm={9}>
              <FormControl
                value={this.state.licensecategory}
                type="text"
                placeholder="License Category"
                onChange={(e) => this.setState({ licensecategory: e.target.value })}>
              </FormControl>
              <FormControl.Feedback />
            </Col>
          </FormGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => this.hideAddLicenseModal()}>Close</Button>
        <Button bsStyle="primary" onClick={() => this.addNewLicense()}>Add License</Button>
      </Modal.Footer>
    </Modal>

    return <div className="step2">
      <h3>Step 2</h3>

      <div className="form">
        <h4>Skills &amp; Licenses : <Button bsStyle="primary" onClick={() => this.showAddSkillModal()}>
          <Glyphicon glyph="plus" /> Add Skill</Button>
        </h4>
        <Accordion className="skills">
          {skills.length ? skills : <Alert bsStyle="danger">Please add at least one skill.</Alert>}
        </Accordion>
        <h4>Driving Licenses : <Button
          bsStyle="primary"
          onClick={() => this.showAddLicenseModal()}>
          <Glyphicon glyph="plus" /> Add License</Button>
        </h4>
        <Accordion className="licenses">
          {licenses.length ? licenses : <Alert bsStyle="danger">Please add at least one license.</Alert>}
        </Accordion>
      </div>
      {skillModal}
      {licenseModal}
    </div>
  }

  showAddSkillModal() {
    this.setState({ showAddSkill: true });
  }
  hideAddSkillModal() {
    this.setState({ showAddSkill: false });
  }
  showAddLicenseModal() {
    this.setState({ showAddLicense: true });
  }
  hideAddLicenseModal() {
    this.setState({ showAddLicense: false });
  }
  addNewSkill() {

    if (this.state.skilltype.length > 0 && this.state.skilldesc.length > 0 && this.state.skilllevel >= 1 && this.state.skilllevel <= 5) {
      var skill = {
        id: this.skillid++,
        type: this.state.skilltype,
        description: this.state.skilldesc,
        level: this.state.skilllevel,
        leveltext: this.skilllevels[this.state.skilllevel - 1]
      };
      inputdata.skills.push(skill);
      this.setState(this.defaultstate, () => this.props.refreshparent());
    }
    else
      alert("Please enter appropriate details.");
  }
  addNewLicense() {
    if (this.state.licensecategory.length > 0) {
      var license = {
        id: this.licenseid++,
        type: this.state.licensetype,
        category: this.state.licensecategory
      };
      inputdata.licenses.push(license);
      this.setState(this.defaultstate, () => this.props.refreshparent());
    }
    else
      alert("Please enter appropriate details.");
  }
  removeSkill(id) {
    var ind = null;
    inputdata.skills.forEach(function (skill, index) {
      if (skill.id === id) {
        ind = index;
      }
    });
    inputdata.skills.splice(ind, 1);
    this.setState(this.state);
    this.props.refreshparent();
  }
  removeLicense(id) {
    var ind = null;
    inputdata.licenses.forEach(function (license, index) {
      if (license.id === id) {
        ind = index;
      }
    });
    inputdata.licenses.splice(ind, 1);
    this.setState(this.state);
    this.props.refreshparent();
  }
  handleRate(rater) {
    this.setState({ rating: this.skilllevels[rater.rating - 1], skilllevel: rater.rating });
  }
}

class STEP3 extends Component {
  defaultstate = {
    showAddHobby: false,
    showAddOvereseasExp: false,
    showAddActivity: false,
    hobbytype: 'travel',
    otherhobbytype: '',
    hobbydesc: '',
    overseasexpplace: '',
    overseasexpyear: 2015,
    overseasexpduration: 1,
    typeofactivity: '',
    activitytype: '',
    activityduration: 1,
    activitydesc: '',
    activityresp: ''
  }
  hobbyid = 1;
  overseasexpid = 1;
  activityid = 1;
  constructor() {
    super();
    this.state = this.defaultstate;
  }
  render() {

    var thisd = this;

    var hobbies = [];
    inputdata.hobbies.forEach(function (hobby, index) {
      var hobbyhtml = <Panel id={'hobby-' + hobby.id} className="hobby" header={<div>{(index + 1) + ". " + hobby.type}<span className="glyphicon glyphicon-remove pull-right" onClick={() => thisd.removeHobby(hobby.id)}></span></div>} eventKey={hobby.id} key={hobby.id}>
        <p>Type: {hobby.type}</p>
        <p>Decsription: {hobby.description}</p>
      </Panel>
      hobbies.push(hobbyhtml);
    });
    var overseasexps = [];
    inputdata.overseasexps.forEach(function (overseasexp, index) {
      var overseasexphtml = <Panel id={'overseasexp-' + overseasexp.id} className="overseasexp" header={<div>{(index + 1) + ". " + overseasexp.place}<span className="glyphicon glyphicon-remove pull-right" onClick={() => thisd.removeOverseasExp(overseasexp.id)}></span></div>} eventKey={overseasexp.id} key={overseasexp.id}>
        <p>Country / City: {overseasexp.place}</p>
        <p>Year: {overseasexp.year}</p>
        <p>Duration: {overseasexp.duration}</p>
        <p>Type of Activity: {overseasexp.typeofactivity}</p>
      </Panel>
      overseasexps.push(overseasexphtml);
    });
    var activities = [];
    inputdata.activities.forEach(function (activity, index) {
      var activityhtml = <Panel id={'activity-' + activity.id} className="activity" header={<div>{(index + 1) + ". " + activity.type}<span className="glyphicon glyphicon-remove pull-right" onClick={() => thisd.removeActivity(activity.id)}></span></div>} eventKey={activity.id} key={activity.id}>
        <p>Type: {activity.type}</p>
        <p>Duration: {activity.duration}</p>
        <p>Decsription: {activity.description}</p>
        <p>Responsibility: {activity.responsibility}</p>
      </Panel>
      activities.push(activityhtml);
    });

    var hobbyModal = <Modal
      show={this.state.showAddHobby}
      onHide={() => this.hideAddHobbyModal()}>
      <Modal.Header closeButton>
        <Modal.Title>Add Hobby</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form horizontal>
          <FormGroup controlId="hobbytype"
            validationState={'success'}>
            <Col componentClass={ControlLabel} sm={3}>
              Hobby Type
                    </Col>
            <Col sm={9}>
              <FormControl componentClass="select"
                defaultValue={this.state.hobbytype}
                onChange={(e) => this.setState({ hobbytype: e.target.value })}>
                <option value="travel">Travel</option>
                <option value="music">Music</option>
                <option value="sports">Sports</option>
                <option value="reading">Reading</option>
                <option value="cinema">Cinema</option>
                <option value="arts">Arts</option>
                <option value="nightlife">Night Life</option>
                <option value="other">Other</option>
              </FormControl>
            </Col>
          </FormGroup>
          <FormGroup
            style={(this.state.hobbytype === 'other') ? {} : { display: "none" }}
            controlId="otherhobbytype"
            validationState={this.state.otherhobbytype.length > 0 ? 'success' : 'error'}>
            <Col componentClass={ControlLabel} sm={3}>
              Specify Other
                    </Col>
            <Col sm={9}>
              <FormControl
                value={this.state.otherhobbytype}
                type="text"
                placeholder="Other Hobby"
                onChange={(e) => this.setState({ otherhobbytype: e.target.value })}>
              </FormControl>
              <FormControl.Feedback />
            </Col>
          </FormGroup>
          <FormGroup controlId="hobbydesc" validationState={this.state.hobbydesc.length > 0 ? 'success' : 'error'}>
            <Col componentClass={ControlLabel} sm={3}>
              Description
                    </Col>
            <Col sm={9}>
              <FormControl
                value={this.state.hobbydesc}
                type="text"
                placeholder="Hobby Description"
                onChange={(e) => this.setState({ hobbydesc: e.target.value })}>
              </FormControl>
              <FormControl.Feedback />
            </Col>
          </FormGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => this.hideAddHobbyModal()}>Close</Button>
        <Button bsStyle="primary" onClick={() => this.addNewHobby()}>Add Hobby</Button>
      </Modal.Footer>
    </Modal>;
    var overseaexpModal = <Modal
      show={this.state.showAddOvereseasExp}
      onHide={() => this.hideAddOvereseasExpModal()}>
      <Modal.Header closeButton>
        <Modal.Title>Add Overseas Experience</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form horizontal>
          <FormGroup controlId="overseasexpplace" validationState={this.state.overseasexpplace.length > 0 ? 'success' : 'error'}>
            <Col componentClass={ControlLabel} sm={3}>
              Country / City
                    </Col>
            <Col sm={9}>
              <FormControl
                value={this.state.overseasexpplace}
                type="text"
                placeholder="Country / City"
                onChange={(e) => this.setState({ overseasexpplace: e.target.value })}>
              </FormControl>
              <FormControl.Feedback />
            </Col>
          </FormGroup>
          <FormGroup controlId="overseasexpyear"
            validationState={'success'}>
            <Col componentClass={ControlLabel} sm={3}>
              Year
                    </Col>
            <Col sm={9}>
              <FormControl componentClass="select"
                defaultValue={this.state.overseasexpyear}
                onChange={(e) => this.setState({ overseasexpyear: e.target.value })}>
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
          <FormGroup controlId="overseasexpduration" validationState={this.state.overseasexpduration > 0 ? 'success' : 'error'}>
            <Col componentClass={ControlLabel} sm={3}>
              Duration (in weeks)
                    </Col>
            <Col sm={9}>
              <FormControl
                value={this.state.overseasexpduration}
                componentClass="input"
                type="number"
                onChange={(e) => this.setState({ overseasexpduration: e.target.value })}
                required>
              </FormControl>
              <FormControl.Feedback />
            </Col>
          </FormGroup>
          <FormGroup controlId="typeofactivity" validationState={this.state.typeofactivity.length > 0 ? 'success' : 'error'}>
            <Col componentClass={ControlLabel} sm={3}>
              Type Of Activity
                    </Col>
            <Col sm={9}>
              <FormControl
                value={this.state.typeofactivity}
                type="text"
                placeholder="Activity Type"
                onChange={(e) => this.setState({ typeofactivity: e.target.value })}>
              </FormControl>
              <FormControl.Feedback />
            </Col>
          </FormGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => this.hideAddOvereseasExpModal()}>Close</Button>
        <Button bsStyle="primary" onClick={() => this.addNewOverseasExp()}>Add Hobby</Button>
      </Modal.Footer>
    </Modal>;
    var activityModal = <Modal
      show={this.state.showAddActivity}
      onHide={() => this.hideAddActivityModal()}>
      <Modal.Header closeButton>
        <Modal.Title>Add Activity</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form horizontal>
          <FormGroup controlId="activitytype" validationState={this.state.activitytype.length > 0 ? 'success' : 'error'}>
            <Col componentClass={ControlLabel} sm={3}>
              Type of Activity
                    </Col>
            <Col sm={9}>
              <FormControl
                value={this.state.activitytype}
                type="text"
                placeholder="Type of activity"
                onChange={(e) => this.setState({ activitytype: e.target.value })}>
              </FormControl>
              <FormControl.Feedback />
            </Col>
          </FormGroup>
          <FormGroup controlId="activityduration" validationState={this.state.activityduration > 0 ? 'success' : 'error'}>
            <Col componentClass={ControlLabel} sm={3}>
              Duration (in years)
                    </Col>
            <Col sm={9}>
              <FormControl
                value={this.state.activityduration}
                componentClass="input"
                type="number"
                onChange={(e) => this.setState({ activityduration: e.target.value })}
                required>
              </FormControl>
              <FormControl.Feedback />
            </Col>
          </FormGroup>
          <FormGroup controlId="activitydesc" validationState={this.state.activitydesc.length > 0 ? 'success' : 'error'}>
            <Col componentClass={ControlLabel} sm={3}>
              Description
                    </Col>
            <Col sm={9}>
              <FormControl
                value={this.state.activitydesc}
                type="text"
                placeholder="Activity Description"
                onChange={(e) => this.setState({ activitydesc: e.target.value })}>
              </FormControl>
              <FormControl.Feedback />
            </Col>
          </FormGroup>
          <FormGroup controlId="activityresp" validationState={this.state.activityresp.length > 0 ? 'success' : 'error'}>
            <Col componentClass={ControlLabel} sm={3}>
              Rsponsibilities / Achievements
                    </Col>
            <Col sm={9}>
              <FormControl
                value={this.state.activityresp}
                type="text"
                placeholder="Responsibility"
                onChange={(e) => this.setState({ activityresp: e.target.value })}>
              </FormControl>
              <FormControl.Feedback />
            </Col>
          </FormGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => this.hideAddActivityModal()}>Close</Button>
        <Button bsStyle="primary" onClick={() => this.addNewActivity()}>Add Activity</Button>
      </Modal.Footer>
    </Modal>;

    return <div className="step3">
      <h3>Step 3</h3>
      <div className="form">
        <h4>Hobbies : <Button bsStyle="primary" onClick={() => this.showAddHobbyModal()}>
          <Glyphicon glyph="plus" /> Add Hobby</Button>
        </h4>
        <Accordion className="hobbies">
          {hobbies.length ? hobbies : <Alert bsStyle="danger">Please add at least one hobby.</Alert>}
        </Accordion>
        <h4>Trip and Experience Overseas : <Button
          bsStyle="primary"
          onClick={() => this.showAddOvereseasExpModal()}>
          <Glyphicon glyph="plus" /> Add Experience</Button>
        </h4>
        <Accordion className="overseasexps">
          {overseasexps.length ? overseasexps : <Alert bsStyle="danger">Please add at least one experience.</Alert>}
        </Accordion>
        <h4>Cultural, Sports, Social Activities : <Button
          bsStyle="primary"
          onClick={() => this.showAddActivityModal()}>
          <Glyphicon glyph="plus" /> Add Activity</Button>
        </h4>
        <Accordion className="activites">
          {activities.length ? activities : <Alert bsStyle="danger">Please add at least one activity.</Alert>}
        </Accordion>
      </div>
      {hobbyModal}
      {overseaexpModal}
      {activityModal}
    </div>
  }

  addNewHobby() {
    var hobbytype = this.state.hobbytype === 'other' ? this.state.otherhobbytype : this.state.hobbytype;
    if (this.state.hobbydesc.length > 0 && hobbytype.length > 0) {
      var hobby = {
        id: this.hobbyid++,
        type: hobbytype,
        description: this.state.hobbydesc
      };
      inputdata.hobbies.push(hobby);
      this.setState(this.defaultstate, () => this.props.refreshparent());
    }
    else
      alert("Please enter appropriate details.");
  }

  addNewOverseasExp() {
    if (this.state.overseasexpplace.length > 0 && this.state.overseasexpduration > 0 && this.state.typeofactivity.length > 0) {
      var overseasexp = {
        id: this.overseasexpid++,
        place: this.state.overseasexpplace,
        year: this.state.overseasexpyear,
        duration: this.state.overseasexpduration,
        typeofactivity: this.state.typeofactivity
      };
      inputdata.overseasexps.push(overseasexp);
      this.setState(this.defaultstate, () => this.props.refreshparent());
    }
    else
      alert("Please enter appropriate details.");
  }

  addNewActivity() {
    if (this.state.activitytype.length > 0 && this.state.activityduration > 0 && this.state.activitydesc.length > 0 && this.state.activityresp.length > 0) {
      var activity = {
        id: this.activityid++,
        type: this.state.activitytype,
        duration: this.state.activityduration,
        description: this.state.activitydesc,
        responsibility: this.state.activityresp
      };
      inputdata.activities.push(activity);
      this.setState(this.defaultstate, () => this.props.refreshparent());
    }
    else
      alert("Please enter appropriate details.");
  }
  removeHobby(id) {
    var ind = null;
    inputdata.hobbies.forEach(function (hobby, index) {
      if (hobby.id === id) {
        ind = index;
      }
    });
    inputdata.hobbies.splice(ind, 1);
    this.setState(this.state);
    this.props.refreshparent();
  }
  removeOverseasExp(id) {
    var ind = null;
    inputdata.overseasexps.forEach(function (overseasexp, index) {
      if (overseasexp.id === id) {
        ind = index;
      }
    });
    inputdata.overseasexps.splice(ind, 1);
    this.setState(this.state);
    this.props.refreshparent();
  }
  removeActivity(id) {
    var ind = null;
    inputdata.activities.forEach(function (activity, index) {
      if (activity.id === id) {
        ind = index;
      }
    });
    inputdata.activities.splice(ind, 1);
    this.setState(this.state);
    this.props.refreshparent();
  }

  showAddHobbyModal() {
    this.setState({ showAddHobby: true });
  }
  hideAddHobbyModal() {
    this.setState({ showAddHobby: false });
  }
  showAddOvereseasExpModal() {
    this.setState({ showAddOvereseasExp: true });
  }
  hideAddOvereseasExpModal() {
    this.setState({ showAddOvereseasExp: false });
  }
  showAddActivityModal() {
    this.setState({ showAddActivity: true });
  }
  hideAddActivityModal() {
    this.setState({ showAddActivity: false });
  }

}

class STEP4 extends Component {
  defaultstate = {
    showAddNewMESDoc: false,
    showAddNewLink: false,
    showAddNewVideo: false,
    showAddNewDocument: false,
    newkeyword: '',
    mesdocservice: '',
    mesdocurl: '',
    linkfor: '',
    linkurl: '',
    linksfor: ['', 'service', 'linkedin', 'viadeo', 'facebook', 'twitter', 'blog'],
    videourl: '',
    videodesc: '',
    documentfilename: '',
    documentname: '',
    documentdesc: ''
  };
  keywordid = 1;
  mesdocid = 1;
  videoid = 1;
  photoid = 1;
  documentid = 1;
  constructor() {
    super();
    this.state = this.defaultstate;
  }
  render() {
    var thisd = this;
    var keywords = [];
    inputdata.keywords.forEach(function (keyword, index) {
      var keywordhtml = <li key={index}>{keyword}<span className="glyphicon glyphicon-remove" style={{ marginLeft: "10px" }} onClick={() => thisd.removeKeyword(index)}></span></li>;
      keywords.push(keywordhtml);
    });
    var mesdocs = [];
    inputdata.mesdocs.forEach(function (mesdoc, index) {
      var mesdochtml = <Panel id={'mesdoc-' + mesdoc.id} className="mesdoc" header={<div>{(index + 1) + ". " + mesdoc.service}<span className="glyphicon glyphicon-remove pull-right" onClick={() => thisd.removeMESDoc(mesdoc.id)}></span></div>} eventKey={mesdoc.id} key={mesdoc.id}>
        <p>Service: {mesdoc.service}</p>
        <p>URL: {mesdoc.url}</p>
      </Panel>
      mesdocs.push(mesdochtml);
    });
    var links = [];
    inputdata.links.forEach(function (link, index) {
      var linkhtml = <p key={link.for}><b>{link.for.charAt(0).toUpperCase() + link.for.substr(1) + " : "}</b>{link.link}<span className="glyphicon glyphicon-remove" style={{ marginLeft: "10px" }} onClick={() => thisd.removeLink(link.for)}></span></p>;
      links.push(linkhtml);
    });
    var videos = [];
    inputdata.videos.forEach(function (video, index) {
      var videohtml = <Panel id={'video-' + video.id} className="video" header={<div>{" Video " + (index + 1)}<span className="glyphicon glyphicon-remove pull-right" onClick={() => thisd.removeVideo(video.id)}></span></div>} eventKey={video.id} key={video.id}>
        <p>URL: {video.url}</p>
        <p>description: {video.description}</p>
      </Panel>
      videos.push(videohtml);
    });
    var photos = [];
    inputdata.photos.forEach(function (photo, index) {
      var photohtml = <li key={photo.id}>{photo.filename}<span className="glyphicon glyphicon-remove" style={{ marginLeft: "10px" }} onClick={() => thisd.removePhoto(photo.id)}></span></li>;
      photos.push(photohtml);
    });
    var documents = [];
    inputdata.documents.forEach(function (document, index) {
      var documenthtml = <Panel id={'document-' + document.id} className="document" header={<div>{(index + 1) + ". " + document.name}<span className="glyphicon glyphicon-remove pull-right" onClick={() => thisd.removeDocument(document.id)}></span></div>} eventKey={document.id} key={document.id}>
        <p>Document Name: {document.name}</p>
        <p>File Name: {document.filename}</p>
        <p>Description: {document.description}</p>
      </Panel>
      documents.push(documenthtml);
    });

    var addMESDocModal = <Modal
      show={this.state.showAddNewMESDoc}
      onHide={() => this.hideAddNewMESDocModal()}>
      <Modal.Header closeButton>
        <Modal.Title>Add MES</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form horizontal>
          <FormGroup controlId="mesdocservice" validationState={this.state.mesdocservice.length > 0 ? 'success' : 'error'}>
            <Col componentClass={ControlLabel} sm={3}>
              Service
                                </Col>
            <Col sm={9}>
              <FormControl
                value={this.state.mesdocservice}
                type="text"
                placeholder="Service"
                onChange={(e) => this.setState({ mesdocservice: e.target.value })}>
              </FormControl>
              <FormControl.Feedback />
            </Col>
          </FormGroup>
          <FormGroup controlId="mesdocurl" validationState={this.state.mesdocurl.match(new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi)) ? 'success' : 'error'}>
            <Col componentClass={ControlLabel} sm={3}>
              Url
                                </Col>
            <Col sm={9}>
              <FormControl
                value={this.state.mesdocurl}
                type="text"
                placeholder="Url"
                onChange={(e) => this.setState({ mesdocurl: e.target.value })}>
              </FormControl>
              <FormControl.Feedback />
            </Col>
          </FormGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => this.hideAddNewMESDocModal()}>Close</Button>
        <Button bsStyle="primary" onClick={() => this.addNewMESDoc()}>Add MES</Button>
      </Modal.Footer>
    </Modal>;
    var addVideoModal = <Modal
      show={this.state.showAddNewVideo}
      onHide={() => this.hideAddNewVideoModal()}>
      <Modal.Header closeButton>
        <Modal.Title>Add Video</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form horizontal>
          <FormGroup controlId="videourl" validationState={this.state.videourl.match(new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi)) ? 'success' : 'error'}>
            <Col componentClass={ControlLabel} sm={3}>
              Url
                                </Col>
            <Col sm={9}>
              <FormControl
                value={this.state.videourl}
                type="text"
                placeholder="URL"
                onChange={(e) => this.setState({ videourl: e.target.value })}>
              </FormControl>
              <FormControl.Feedback />
            </Col>
          </FormGroup>
          <FormGroup controlId="videodesc" validationState={this.state.videodesc.length > 0 ? 'success' : 'error'}>
            <Col componentClass={ControlLabel} sm={3}>
              Description
                                </Col>
            <Col sm={9}>
              <FormControl
                value={this.state.videodesc}
                type="text"
                placeholder="Description"
                onChange={(e) => this.setState({ videodesc: e.target.value })}>
              </FormControl>
              <FormControl.Feedback />
            </Col>
          </FormGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => this.hideAddNewVideoModal()}>Close</Button>
        <Button bsStyle="primary" onClick={() => this.addNewVideo()}>Add Video</Button>
      </Modal.Footer>
    </Modal>;
    var addLinkModal = <Modal
      show={this.state.showAddNewLink}
      onHide={() => this.hideAddNewLinkModal()}>
      <Modal.Header closeButton>
        <Modal.Title>Add Link</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form horizontal>
          <FormGroup controlId="linkfor"
            validationState={'success'}>
            <Col componentClass={ControlLabel} sm={3}>
              For
            </Col>
            <Col sm={9}>
              <FormControl componentClass="select"
                defaultValue={this.state.linkfor}
                onChange={(e) => this.setState({ linkfor: e.target.value })}>
                {this.getNotAddedLinks()}
              </FormControl>
            </Col>
          </FormGroup>
          <FormGroup
            hidden={this.state.linkfor === '' ? true : false}
            controlId="otherhobbytype"
            validationState={this.state.linkurl.match(new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi)) ? 'success' : 'error'}>
            <Col componentClass={ControlLabel} sm={3}>
              Link URL
                    </Col>
            <Col sm={9}>
              <FormControl
                value={this.state.linkurl}
                type="text"
                placeholder="URL"
                onChange={(e) => this.setState({ linkurl: e.target.value })}>
              </FormControl>
              <FormControl.Feedback />
            </Col>
          </FormGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => this.hideAddNewLinkModal()}>Close</Button>
        <Button bsStyle="primary" onClick={() => this.addNewLink()}>Add Link</Button>
      </Modal.Footer>
    </Modal>;
    var addDocumentModal = <Modal
      show={this.state.showAddNewDocument}
      onHide={() => this.hideAddNewDocumentModal()}>
      <Modal.Header closeButton>
        <Modal.Title>Add Document</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form horizontal>
          <FormGroup controlId="document">
            <Col componentClass={ControlLabel} sm={3}>
              Document File
                                </Col>
            <Col sm={9}>
              <input className="form-control" id="newdocument" type="file" />
            </Col>
          </FormGroup>
          <FormGroup controlId="documentname" validationState={this.state.documentname.length > 0 ? 'success' : 'error'}>
            <Col componentClass={ControlLabel} sm={3}>
              Document Name
                                </Col>
            <Col sm={9}>
              <FormControl
                value={this.state.documentname}
                type="text"
                placeholder="Document Name"
                onChange={(e) => this.setState({ documentname: e.target.value })}>
              </FormControl>
              <FormControl.Feedback />
            </Col>
          </FormGroup>
          <FormGroup controlId="documentdesc" validationState={this.state.documentdesc.length > 0 ? 'success' : 'error'}>
            <Col componentClass={ControlLabel} sm={3}>
              Description
                                </Col>
            <Col sm={9}>
              <FormControl
                value={this.state.documentdesc}
                type="text"
                placeholder="Description"
                onChange={(e) => this.setState({ documentdesc: e.target.value })}>
              </FormControl>
              <FormControl.Feedback />
            </Col>
          </FormGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => this.hideAddNewDocumentModal()}>Close</Button>
        <Button bsStyle="primary" onClick={() => this.addNewDocument()}>Add Document</Button>
      </Modal.Footer>
    </Modal>;
    return <div className="step4" >
      <h3>Step 4</h3>
      <div className="form">
        <h4>Keywords (max Three) : </h4>
        <ul>
          {keywords.length ? keywords : 'Please add atleast one Keyword.'}
        </ul>
        <FormGroup controlId="newkeyword">
          <Col componentClass={ControlLabel} sm={3}>
            <FormControl
              value={this.state.newkeyword}
              type="text"
              placeholder="Keyword"
              onChange={(e) => this.setState({ newkeyword: e.target.value })}>
            </FormControl>
            <FormControl.Feedback />
          </Col>
          <Col>
            <Button bsStyle="primary" disabled={this.state.newkeyword.length === 0} onClick={(e) => this.addKeyword(document.getElementById("newkeyword").value)}>Add Keyword</Button>
          </Col>
        </FormGroup>
        <h4>MES Links / MES Docs : <Button bsStyle="primary" onClick={() => this.showAddNewMESDocModal()}>
          <Glyphicon glyph="plus" /> Add MES</Button>
        </h4>
        <Accordion className="mesdocs">
          {mesdocs.length ? mesdocs : <Alert bsStyle="danger">Please add at least one MES Link / Document.</Alert>}
        </Accordion>
        <h4>Links : <Button disabled={this.state.linksfor.length < 2 ? true : false} bsStyle="primary" onClick={() => this.showAddNewLinkModal()}>
          <Glyphicon glyph="plus" /> Add Link</Button>
        </h4>
        {links.length ? links : "Please add atleast one link."}
        <h4>Videos : <Button bsStyle="primary" onClick={() => this.showAddNewVideoModal()}>
          <Glyphicon glyph="plus" /> Add Video</Button>
        </h4>
        <Accordion className="videos">
          {videos.length ? videos : <Alert bsStyle="danger">Please add at least one Video.</Alert>}
        </Accordion>
        <h4>Photos : </h4>
        <ul>
          {photos.length ? photos : 'Please add atleast one Photo.'}
        </ul>
        <FormGroup controlId="newphoto">
          <Col componentClass={ControlLabel} sm={3}>
            <input className="form-control" id="newphoto" type="file" accept="image/*" />
          </Col>
          <Col>
            <Button bsStyle="primary" onClick={(e) => this.addNewPhoto(e)}><Glyphicon glyph="plus" /> Add Photo</Button>
          </Col>
        </FormGroup>
        <h4>Documents : <Button bsStyle="primary" onClick={() => this.showAddNewDocumentModal()}>
          <Glyphicon glyph="plus" /> Add Document</Button>
        </h4>
        <Accordion className="documents">
          {documents.length ? documents : <Alert bsStyle="danger">Please add at least one Document.</Alert>}
        </Accordion>
      </div>
      {addMESDocModal}
      {addVideoModal}
      {addDocumentModal}
      {addLinkModal}
    </div>

  }
  getNotAddedLinks() {
    var links = [];
    this.state.linksfor.forEach(function (linkfor, index) {
      links.push(<option key={index} value={linkfor}>{linkfor === '' ? 'Select' : linkfor.charAt(0).toUpperCase() + linkfor.substr(1)}</option>);
    });
    return links;
  }
  removeLink(linkfor) {
    var l = {
      link: null,
      index: null
    };
    inputdata.links.forEach(function (link, index) {
      if (linkfor === link.for) {
        l.link = link;
        l.index = index;
      }
    });
    inputdata.links.splice(l.index, 1);
    var linksfor = this.state.linksfor;
    linksfor.push(l.link.for);
    this.setState({ linksfor: linksfor });
    this.props.refreshparent();
  }
  showAddNewMESDocModal() {
    this.setState({ showAddNewMESDoc: true });
  }
  hideAddNewMESDocModal() {
    this.setState({ showAddNewMESDoc: false });
  }
  showAddNewVideoModal() {
    this.setState({ showAddNewVideo: true });
  }
  hideAddNewVideoModal() {
    this.setState({ showAddNewVideo: false });
  }
  showAddNewLinkModal() {
    this.setState({ showAddNewLink: true });
  }
  hideAddNewLinkModal() {
    this.setState({ showAddNewLink: false });
  }
  showAddNewDocumentModal() {
    this.setState({ showAddNewDocument: true });
  }
  hideAddNewDocumentModal() {
    this.setState({ showAddNewDocument: false });
  }
  removeKeyword(index) {
    inputdata.keywords.splice(index, 1);
    this.setState(this.state);
    this.props.refreshparent();
  }
  removePhoto(id) {
    var ind = null;
    inputdata.photos.forEach(function (photo, index) {
      if (photo.id === id) {
        ind = index;
      }
    });
    inputdata.photos.splice(ind, 1);
    this.setState(this.state);
    this.props.refreshparent();
  }
  removeMESDoc(id) {
    var ind = null;
    inputdata.mesdocs.forEach(function (mesdoc, index) {
      if (mesdoc.id === id) {
        ind = index;
      }
    });
    inputdata.mesdocs.splice(ind, 1);
    this.setState(this.state);
    this.props.refreshparent();
  }
  removeVideo(id) {
    var ind = null;
    inputdata.videos.forEach(function (video, index) {
      if (video.id === id) {
        ind = index;
      }
    });
    inputdata.videos.splice(ind, 1);
    this.setState(this.state);
    this.props.refreshparent();
  }
  removeDocument(id) {
    var ind = null;
    inputdata.documents.forEach(function (document, index) {
      if (document.id === id) {
        ind = index;
      }
    });
    inputdata.documents.splice(ind, 1);
    this.setState(this.state);
    this.props.refreshparent();
  }
  addKeyword(keyword) {
    if (inputdata.keywords.length < 3) {
      inputdata.keywords.push(keyword);
      this.setState(this.state);
      this.props.refreshparent();
    } else {
      alert("Maximun 3 keywords allowed.");
    }
  }
  addNewMESDoc() {
    if (this.state.mesdocservice.length > 0 && this.state.mesdocurl.match(new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi))) {
      var mesdoc = {
        id: this.mesdocid++,
        service: this.state.mesdocservice,
        url: this.state.mesdocurl
      };
      inputdata.mesdocs.push(mesdoc);
      this.setState(this.defaultstate, () => this.props.refreshparent());
    }
    else
      alert("Please enter appropriate details.");
  }
  addNewVideo() {
    if (this.state.videourl.match(new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi)) && this.state.videodesc.length > 0) {
      var video = {
        id: this.videoid++,
        url: this.state.videourl,
        description: this.state.videodesc
      };
      inputdata.videos.push(video);
      this.setState(this.defaultstate, () => this.props.refreshparent());
    }
    else
      alert("Please enter appropriate details.");
  }
  addNewPhoto(e) {
    var a = document.getElementById("newphoto");
    if (a.files.length) {
      inputdata.photos.push({
        id: this.photoid++,
        filename: a.files[0].name
      });
      this.setState(this.state);
      this.props.refreshparent();
    } else {
      alert("Please select a file.");
    }
  }
  addNewLink() {
    var linkfor = this.state.linkfor;
    var linkurl = this.state.linkurl;
    var linksfor = this.state.linksfor;
    if (this.state.linkfor !== '' && this.state.linkurl.match(new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi))) {
      var index = this.state.linksfor.indexOf(linkfor);
      linksfor.splice(index, 1);
      inputdata.links.push({ for: linkfor, link: linkurl });
      this.setState(this.defaultstate);
      this.props.refreshparent();
    }
    else {
      alert("Please provide proper details.");
    }
  }

  addNewDocument() {
    var a = document.getElementById("newdocument");
    if (a.files.length && this.state.documentname.length > 0 && this.state.documentdesc.length > 0) {
      inputdata.documents.push({
        id: this.documentid++,
        filename: a.files[0].name,
        name: this.state.documentname,
        description: this.state.documentdesc
      });
      this.setState(this.state);
      this.props.refreshparent();
      this.hideAddNewDocumentModal();
    } else {
      alert("Please select a file.");
    }
  }
}

class STEP5 extends Component {
  constructor() {
    super();
    this.state = {
      choice: 1,
      cvname: '',
      cvdesc: '',
      showsaved: false
    }
  }
  render() {
    return <div className="step5" >
      <h2>Step 5</h2>
      <Form horizontal>
        <h4>Choice of Template : </h4>
        <FormGroup id="choice">
          <input type="radio" value="1" defaultChecked name="choice" onClick={() => this.setState({ choice: 1 })} />
          <img className="resume-choice" src="choice-1.png" alt="Choice 1" />
          <input type="radio" value="2" name="choice" onClick={() => this.setState({ choice: 2 })} />
          <img className="resume-choice" src="choice-2.png" alt="Choice 2" />
          <input type="radio" value="3" name="choice" onClick={() => this.setState({ choice: 3 })} />
          <img className="resume-choice" src="choice-1.png" alt="Choice 3" />
        </FormGroup>
        <h4>Resume : </h4>
        <FormGroup controlId="cvname"
          validationState={this.state.cvname.length > 0 ? 'success' : 'error'}>
          <Col componentClass={ControlLabel} sm={1}>
            CV Name
                </Col>
          <Col sm={3}>
            <FormControl
              value={this.state.cvname}
              type="text"
              placeholder="CV Name"
              onChange={(e) => this.setState({ cvname: e.target.value })}>
            </FormControl>
            <FormControl.Feedback />
          </Col>
        </FormGroup>
        <FormGroup controlId="cvdesc" validationState={this.state.cvdesc.length > 0 ? 'success' : 'error'}>
          <Col componentClass={ControlLabel} sm={1}>
            CV Description
                </Col>
          <Col sm={3}>
            <textarea
              className="form-control"
              value={this.state.cvdesc}
              placeholder="CV Description"
              onChange={(e) => this.setState({ cvdesc: e.target.value })}
              rows="3" />
            <FormControl.Feedback />
          </Col>
        </FormGroup>
      </Form>
      <Button className="button" disabled={this.ifDone() ? false : true} bsSize="large" bsStyle="primary" onClick={() => this.saveData()}>Save Data</Button>
      <Button className="button" disabled={this.ifDone() ? false : true} bsSize="large" bsStyle="success" onClick={() => this.downloadData()}>Download Data</Button>
      <Alert style={this.state.showsaved ? {} : { "visibility": "hidden" }} bsStyle="success" onDismiss={this.handleAlertDismiss}>Saved!</Alert>
    </div>
  }
  ifDone() {
    if (this.state.cvname.length > 0 && this.state.cvdesc.length > 0)
      return true;
    else
      return false;
  }
  saveData() {
    inputdata.template = this.state.choice;
    inputdata.resume.cvname = this.state.cvname;
    inputdata.resume.cvdescription = this.state.cvdesc;
    this.setState({ showsaved: true });
    if (!this.state.showsaved) {
      var thisd = this;
      var interval = setInterval(function () {
        thisd.setState({ showsaved: false }, () => clearInterval(interval));
      }, 3000);
    }
  }
  downloadData() {
    var a = document.createElement("A");
    a.download = "data.json";
    var file = new Blob([JSON.stringify(inputdata, null, "\t")], { "type": "application/json" });
    a.download = "data.json";
    a.href = URL.createObjectURL(file);
    a.click();
  }

}

export default App;
