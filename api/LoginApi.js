import {logged, loginError, doAuth} from "../actions/actionLogin";
import 'isomorphic-fetch';
import axios from "axios/index";
import { Flash } from '../components/Flash';
import {apiUrl} from "../config/ApiConfig";
import { Cookies } from 'react-cookie';

const cookies = new Cookies();
export default class LoginApi{



  static login(email, password){
    const body = {
      email: email,
      password: password
    };

    return dispatch => {

      dispatch(doAuth());

      axios.post(apiUrl + '/auth/sign_in',  body).then((resp) => {
        cookies.set('token', resp.headers["access-token"]);
        // this.setState({
        //   token: resp.headers["access-token"]
        // });
        return resp.data;
      }).then(profile => {
        dispatch(logged(profile.data));
      }).catch(reject => {
        dispatch(loginError());
        Flash.create('error', reject.response.data.errors);
      });
    }
  }

}