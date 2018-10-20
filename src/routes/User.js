import React, {Component} from 'react'
import { Button } from 'react-bootstrap';

import ipfs from '../eth-ipfs/ipfs'

class User extends Component {

    constructor(props){
        super(props);
        this.state = {
            files: [],
            filestate: {}
  
        }
        this.showMore = this.showMore.bind(this)
    }
    
    getFileList = async() => {
        await ipfs.files.ls('/test1', (err, files) => {
            this.setState({files})
            files.map(file => console.log(file.name))
            
            // files.forEach((file) => {
            //   //console.log(file)

            //   this.setState((prevState) => ({
            //     counter: prevState.files.push(file)
            //   }));
            // })
        })
    }

    showMore(file) {
        ipfs.files.stat('/test1/'+file, (err, stats) => {
            console.log(stats)
            this.setState({filestate:stats})
        })
    }

    
    render() {
        return(
            <div id="userFileList" >
                <h2 >
                    User File
                    <Button  bsStyle="primary" onClick = {this.getFileList} style={{"marginLeft":"100px"}}> Display </Button>
                </h2>
                <hr/>
                
                <ul>
                    <div style={{width:"50%", float:"left"}}>
                        {this.state.files.map(file => 
                            <li key={file.name}>
                                <button onClick={this.showMore.bind(this, file.name) }></button>
                                {file.name}
                                <hr/>
                            </li> )}
                    </div>
                </ul>

                <div style={{width:"45%", float:"right"}}>
                    <h2>{this.state.filestate.type} </h2>
                    <h2>{this.state.filestate.size} </h2>
                    <h3>{this.state.filestate.hash}</h3>

                </div>

            </div>



        )
    }
}

export default User;