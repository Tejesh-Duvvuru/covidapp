import { Component} from "react";
import emailjs from 'emailjs-com';

class ShareGmail extends Component{
    state = {}

     sendEmail(e) {
        e.preventDefault();    //This is important, i'm not sure why, but the email won't send without it
    
        emailjs.sendForm('service_6pcdnoa', 'template_mym3n5m', e.target, 'PRdRi-DJha6bwA-5z')
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
            <form className="contact-form" onSubmit={this.sendEmail}>
            <input type="hidden" name='active' value={active}/>
            <input type="hidden" name='state' value={state}/>
            <input type="hidden" name='confirmed' value={confirmed}/>
            <input type="hidden" name='deaths' value={deaths}/>
            <input type="hidden" name='recovered' value={recovered}/>

            <label>Name</label>
            <input type="text" name="name" />

            <label>Email</label>
            <input type="email" name="user_email" />

            <label>Subject</label>
            <input type="text" name="subject" />

            <label>Message</label>
            <textarea name="html_message" />

            <input type="submit" value="Send" />
          </form>
        )
    }
}

export default ShareGmail