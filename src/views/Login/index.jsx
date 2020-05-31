import React, {useState, useContext} from 'react';
import './Login.scss';
import { Input, message, Button } from 'antd';
import * as AuthApi from '../../api/AuthApi';
import { useHistory } from "react-router-dom";
import appConfig from '../../config/appConfig';
import userContext from '../../context/userContext/index';


const Login = () => {
    const [LoginParam, setLoginParam] = useState({username: '', password: ''});
    const [RgParam, setRgParam] = useState({name: '', username: '', password: '', confirmPassowrd: ''});
    let history = useHistory();
    const {setUser} = useContext(userContext);

    return (
        <div className="form__box">
            <header className="form__box__header">
                <h1 className="form__box__header__heading">Grand Chat</h1>
                <div className="form__box__header__signin">
                    <span>
                        Username
                    </span>
                    <Input onChange={e => setLoginParam({...LoginParam, username: e.target.value})}/> 
                    {console.log(`Login username: ${LoginParam.username}`)};
                    
                    <span>
                        Password
                    </span>                   
                    <Input.Password onChange={e => setLoginParam({...LoginParam, password: e.target.value})}/>
                    {console.log(`Login password: ${LoginParam.password}`)}                  
                        <Button 
                        onClick = {() => {
                            if(LoginParam.username && LoginParam.password) {
                                AuthApi.login(LoginParam.username, LoginParam.password).then(res => {
                                    if(res.status === 200) {
                                        setUser({...res.data.user, token: res.data.token.token});
                                        window.localStorage.setItem(appConfig.Localtoken, res.data.token.token)
                                        window.localStorage.setItem(appConfig.ProfilName, JSON.stringify(res.data.user))
                                        history.replace("/");            
                                    }
                                }).catch (error=>{
                                    console.log("error", error)
                                })
                            } else {
                                message.warning("Required both username and password")
                            }
                        }}
                        type="primary">
                            Log in
                        </Button>
                </div>
            </header>
            <main className="form__box__main">
                <div className="form__box__main__container">
                <Input 
                     placeholder="name" 
                     className = "rg__input"                    
                     onChange = {(e) => setRgParam({...RgParam, name: e.target.value})}
                     />
                     {console.log(`Registration name: ${RgParam.name}`)}                     
                    
                     <Input.Password 
                     placeholder="password" 
                     className = "rg__input"
                     onChange = {(e) => setRgParam({...RgParam, password: e.target.value})}
                     />
                     {console.log(`Registration password: ${RgParam.password}`)}

                     <Input.Password 
                     placeholder="Confirm password" 
                     className = "rg__input"
                     onChange = {(e) => setRgParam({...RgParam, confirmPassword: e.target.value})}
                     />
                     {console.log(`Registration confirm password: ${RgParam.confirmPassword}`)}

                     <Input 
                     placeholder="username" 
                     className = "rg__input"
                     onChange = {(e) => setRgParam({...RgParam, username: e.target.value})}
                     /> 
                     {console.log(`Registration username: ${RgParam.username}`)}

                    <Button 
                     onClick = {() => {
                         if(RgParam.name && RgParam.username && RgParam.password) {
                            AuthApi.register(RgParam.username, RgParam.name, RgParam.password)
                             .then(res => {
                                 console.log("response", res);                                
                             }).catch(error => {
                                console.log("error", error);
                            })                             
                         }
                     }}
                     type="primary" 
                     className="form__box__main__container__btn ant-btn-lg">
                         Sign up
                     </Button>
                </div>
            </main>
        </div>
    );
}

export default Login;