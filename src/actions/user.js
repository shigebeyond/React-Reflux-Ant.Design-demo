import Reflux from '../reflux';

export default Reflux.createActions({
    "fetchProfile": {asyncResult:true},     // called by App
    "login": {asyncResult:true},
    "logout": {asyncResult:true},
    "reg": {asyncResult:true},
});
