import { Component} from "react";
import emailjs from 'emailjs-com';
import './index.css'

class ShareGmail extends Component{
    state = {}
     sendEmail(e) {
        e.preventDefault();    //This is important, i'm not sure why, but the email won't send without it
    
        emailjs.sendForm('service_6pcdnoa', 'template_9cxjs7d', e.target, 'PRdRi-DJha6bwA-5z')
          .then((result) => {
              window.location.reload()  //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior) 
          }, (error) => {
              console.log(error.text);
          });
      }
    render(){
        const {Sharedetails} = this.props
        const {active,state,confirmed,deaths,recovered} = Sharedetails
        return(
            <form className='form-container' onSubmit={this.sendEmail}>
            <input type="hidden" name='active' value={active}/>
            <input type="hidden" name='state' value={state}/>
            <input type="hidden" name='confirmed' value={confirmed}/>
            <input type="hidden" name='deaths' value={deaths}/>
            <input type="hidden" name='recovered' value={recovered}/>
            <div className="input-container">
                <label className="input-label" htmlFor="name">Name:</label>
                <input type="text" name="name" id='name'  className="input-type"/>
            </div>
            <div className="input-container">
                <label className="input-label" htmlFor="user_email">User Gmail:</label>
                <input type="email" name="User_email" id='user_email' className="input-type"/>
            </div>
            <div className="input-container">
                <label className="input-label" htmlFor="subject">Subject:</label>
                <input type="text" name="subject" id='subject'className="input-type"/>
            </div>
            <div>
                <label className="input-label" htmlFor="html_message">Message</label>
                <textarea name="html_message" id='html_message' className="input-type"/>
            </div>
            <input type="submit" value="Send" />
          </form>
        )
    }
}

export default ShareGmail