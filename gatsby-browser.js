import './node_modules/bootstrap/dist/css/bootstrap.min.css';
import './src/pages/app.css';
import Amplify from 'aws-amplify';
import awsconfig from './src/aws-exports';
Amplify.configure(awsconfig);

window.$crisp=[];
window.CRISP_WEBSITE_ID="c786fb60-e36d-4086-a567-553faccda000";
(function(){
    var d = document;
    var s = d.createElement("script");
    s.src="https://client.crisp.chat/l.js";
    s.async=1;
    d.getElementsByTagName("head")[0].appendChild(s);})();