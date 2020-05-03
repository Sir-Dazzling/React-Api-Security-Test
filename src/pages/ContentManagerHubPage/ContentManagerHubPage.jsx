import React from 'react';

import { userService} from '../../redux/user/UserSelector';

class ContentManagerHubPage extends React.Component 
{
    constructor(props)
    {
        super(props);

        this.state = 
        {
            accessGranted: false
        }
    }

    componentWillMount()
    {
        userService.getContentManagerHub().then(
            response => 
            {
                if(response.ok)
                {
                    this.setState({
                        accessGranted: true
                    });
                }
                
                console.log("Acess Granted "+response.ok);
            }
        )

    }


    render() 
    {
        const {accessGranted} = this.state;
        console.log(accessGranted);
        if(accessGranted)
        {
            return (
                <div className="col-md-6 col-md-offset-3">
                    Content Manager Hub Page
                    <h3>Here it is {this.state.accessGranted}</h3> 
                </div>
            ); 
        }
        else
        {
            return null;
        }
            
    }
}



export default (ContentManagerHubPage);