import React, {useState, useEffect} from 'react';
import * as yup from "yup";
import axios from "axios";
import { Container, Card, CardBody, CardTitle, CardSubtitle, } from 'reactstrap';
import "../App.css";


const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field").min(3, "Name must be at least 3 characters"),
    email: yup.string().required("Must include email address").email("Must have valid email address"),
    password: yup.string().required("Must include password").min(2, "Must be at least 6 characters"),
    terms: yup.boolean().oneOf([true], "Must agree to terms"),
})

function Registration(props) {

const [disable, setDisable] = useState(true);

const [post, setPost] = useState([]);

const [newMember, setNewMember] = useState({
    name:'',
    email:'',
    password:'',
    terms:'',
})

const [error, setError] = useState({
    name:'',
    email:'',
    password:'',
    terms:'',  
})

useEffect(() => {
    formSchema.isValid(newMember)
    .then(pressed => {
        setDisable(!pressed);
    })
},[newMember])

const validation = event => {
    yup.reach(formSchema, event.target.name).validate(event.target.value).then(pressed => {
        setError({
            ...error, [event.target.name] : ''
        });
    })
    .catch(err => {
        setError({
            ...error, [event.target.name] : err.errors[0], 
        })
    })
}

const finalValidation = event => {
    event.persist();
    const newData = {
        ...newMember, [event.target.name] :  event.target.type === "checkbox" ? event.target.checked : event.target.value
    };
    setNewMember(newData);
    validation(event);
}

const submit = event => {
    event.preventDefault();
    props.addNewMember(newMember);
    axios.post("https://reqres.in/api/users", newMember)
    .then( response => {
        setPost(response.data);
        console.log('success', post);

        setNewMember({
            name:'',
            email:'',
            password:'',
            terms:'',
        })
    })
    .catch(error => console.log(error.response));
}

    
    return (
      <div className="registration">
           <form onSubmit={submit}>
           <Container className="registrationCard">           
                 <Card className="Registration-cards">
                    <CardBody className="Registration-body">
             <CardTitle><h1>Registration</h1></CardTitle>   

            <CardSubtitle>
                <br></br>
            <div className="name">
          <label htmlFor="name">Name {error.name.length > 0 ? <p className="error">{error.name}</p> : null}</label>
          <input id="name" type="text" name="name" onChange={finalValidation} placeholder="Name" value= {newMember.name} />
            </div>
          <br></br>
          </CardSubtitle>

          <CardSubtitle>
          <br></br>
            <div className="email">
          <label htmlFor="email">Email {error.email.length > 0 ? <p className="error">{error.email}</p> : null}</label>
          <input id="email" type="text" name="email" onChange={finalValidation} placeholder="Email" value= {newMember.email} />
            </div>
          <br></br>
          </CardSubtitle>

            <CardSubtitle>
          <br></br>
            <div className="password">
          <label htmlFor="password">Password {error.password.length > 0 ? <p className="error">{error.password}</p> : null}</label>
          <input id="password" type="password" name="password" onChange={finalValidation} placeholder="Password" value= {newMember.password} />
            </div>
          <br></br>
          </CardSubtitle>

          <CardSubtitle>
          <input type="checkbox" name="terms" checked={newMember.terms} onChange={finalValidation} />
          <label htmlFor="terms" className="terms">Terms and Conditions</label>
          </CardSubtitle>
            
          <div className="button">
              <CardSubtitle>
         <button disabled={disable} type="submit" >Submit</button>
                </CardSubtitle>
         </div>
                    </CardBody>
                </Card>
            </Container>
            </form>
      </div>
    );
  }
  
  export default Registration;