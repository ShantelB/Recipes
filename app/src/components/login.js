 import React, {useState, useEffect} from 'react';
 import * as yup from "yup";
 import axios from "axios";
 import { Container, Card, CardBody, CardTitle, CardSubtitle, } from 'reactstrap';
 import "../App.css";


  const formSchema = yup.object().shape({
        name: yup.string().required("Name is a required field.").min(3, "Name must be at least 3 characters"), 
        password: yup.string().required("Password is required").min(2, "Must be at least 6 characters"),
      });

function Login(props) {
 const [disable, setDisable] = useState(true);

 const [post, setPost] = useState([])
    
      const [loginName, setLoginName] = useState({
          name: '', 
          password: '',
        })  
    
        const [error, setError] = useState({
            name: '', 
            password: '', 
        })
        
       
    
     useEffect(() => {
        formSchema.isValid(loginName)
        .then(pressed => {
            setDisable(!pressed);
        })
    }, [loginName])
    
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
                ...loginName, [event.target.name] : 
                event.target.type === "checkbox" ? event.target.checked : event.target.value
            };
            setLoginName(newData);
            validation(event);
        };
    
    
        const submit = event => {
            event.preventDefault();
            // dispatch(login(loginName,history))
            axios
                  .post("https://reqres.in/api/users", loginName)
                  .then(response => {
                    setPost(response.data); 
                    console.log("success", post);
                
                    props.addLogin(loginName);
                    
                    setLoginName({
                      name: "",
                      password: "",
                    });
                  })
                  .catch(err => console.log(err.response));
        }
                
    useEffect (() => {
       const getLogin = () => {
        axios
        .get("https://secret-recipes-bw-alt.herokuapp.com/api/auth/login")
        .then(response => {
            setLoginName(response.data);
        })
        .catch(error => {
            console.error('Server Error', error);
          });
       }
       getLogin();
    },[])

    
        return (
          <div className="login">
          <form onSubmit={submit}>
            <Container className="card">           
                 <Card className="cards">
                    <CardBody className="body">

            <CardTitle className="title"><h1>Login</h1></CardTitle>   
            
             <CardSubtitle className="name">
              <label htmlFor="name">Name {error.name.length > 0 ? <p className="error">{error.name}</p> : null}</label>
              <input id="name" type="text" name="name" onChange={finalValidation} placeholder="name" value= {loginName.name} />
              </CardSubtitle>

              <CardSubtitle className="password">
                  {/* .... */}
              <label htmlFor="password">Password {error.password.length > 0 ? <p className="error">{error.password}</p> : null}</label>
              <input id="password" type="password" name="password" onChange={finalValidation} placeholder="password" value= {loginName.password} />
                </CardSubtitle>

             <button disabled={disable} type="submit">Submit</button>
                   
                    </CardBody>
                </Card>
             </Container>
          </form>
    
          </div>
        );
    
     
    }
    
    export default Login;
 