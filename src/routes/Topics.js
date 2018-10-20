import React, {Component} from 'react'
import {Table, Button, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import './Topics.css'
import config from '../config'
import ipfs from '../eth-ipfs/ipfs'

class Topics extends Component{

    constructor(props){
        super(props);
        this.state = {
            fileName:'',
            fileHash:''
        }
    }

    searchFile = () => {
        console.log("(react) search file: ",document.getElementById('filePara').value);
        fetch(config.express.url + config.express.port + "/search?filePara=" + document.getElementById('filePara').value)
            .then(res => res.text())
            .then(res => {
            console.log("(mongodb) search result: ", JSON.parse(res));
            let fileName = JSON.parse(res).name;
            let fileHash = JSON.parse(res).hash;
            this.setState({fileName});
            this.setState({fileHash});
        })
    } 

    // // (删除)从后端使用 nodejs 的 fs.writeFile 方法 得到的文件，只能存在后段代码所在的计算机中，所以舍弃
    // downloadFile = async () => { 
    //     //let cid = document.getElementById("ipfsHash").innerText
    //     fetch(config.express.url + config.express.port + "/topic?cid=" + this.state.fileHash + "&filename=" + this.state.fileName)
    //       .then(res => res.text())
    //       .then(res => {
    //         console.log("(mongodb) downloading statues :", res)
    //       })
    // }

    //（加入）将获取的uint8Array 转为 blob 可以直接从前端下载
    //这里需要注意的是 new Blob() 函数的第一个参数一定是 Array ，而且传入函数的方式是 new Blob([array],{type:''}), 没错，array 外面还要一个[]
    downFile(blob, fileName) {
        // if (!window.navigator.msSaveOrOpenBlob) {
        //     navigator.msSaveBlob(blob, fileName);
        // } else {
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            link.click();
            window.URL.revokeObjectURL(link.href);
       // }
    }

    //（删除）功能同上
    // saveAs(blob, filename) {
    //     var type = blob.type;
    //     var force_saveable_type = 'application/octet-stream';
    //     if (type && type !== force_saveable_type) {
    //       // 强制下载，而非在浏览器中打开
    //       var slice = blob.slice || blob.webkitSlice || blob.mozSlice;
    //       blob = slice.call(blob, 0, blob.size, force_saveable_type);
    //     }
    //     var url = window.URL.createObjectURL(blob);
    //     var a = document.createElement('a');
    //     a.href = url;
    //     a.target = '_blank';
    //     a.download = filename;
    
    //     var event = new MouseEvent('click', {
    //       bubbles: true,
    //       cancelable: true,
    //       view: window
    //     });
    //     a.dispatchEvent(event);
    //     window.URL.revokeObjectURL(url);
    //   }

    download = async() => {
        let fileName = this.state.fileName;
        let down = this.downFile;
        await ipfs.get(this.state.fileHash, function (err, files) {
            if (err) console.log("ipfsGetErr", err);
            files.forEach((file) => {
                //console.log(typeof(file.content))
                //console.log(file.content)
                let blob = new Blob([file.content], { type: '' });
                //console.log(blob);
                down(blob, fileName)

            })

        })


    }
    

    render() {
        return (
                
            <div className = 'Topics'>
                <header className = 'Topics-Header'>
                    <h2>Topics</h2>
                </header>
                <hr/>
                <Form >
                    <FormGroup>
                        <ControlLabel>fileName or fileHash</ControlLabel>{' '}
                        <FormControl id="filePara" 
                        placeholder="example:'hello-world.txt' or 'QmcFc6EPhavNSfdjG8byaxxV6KtHZvnDwYXLHvyJQPp3uN'" />
                    </FormGroup>{' '}
                    <Button           
                        bsStyle="primary" 
                        onClick = {this.searchFile}>
                        Search
                    </Button>
                </Form>
                <Table striped bordered  condensed hover>
                    <thead>
                        <tr>
                        <th>File Name</th>
                        <th>File Hash</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>{this.state.fileName}</td>
                        <td >{this.state.fileHash}</td>
                        </tr>
                    </tbody>
                </Table>
                <Button onClick = {this.download }>Download</Button>
                
            </div>
        )
    }
}

export default Topics;