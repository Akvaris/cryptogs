import React, { Component } from 'react';
import Cryptog from '../components/Cryptog.js'
import StackGrid from 'react-stack-grid'

class StackSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTokens:{}
    }
  }
  tokenClick(id){
		console.log("CLICK",id)
		if(this.state.selectedTokens[id]){
			this.state.selectedTokens[id]=false;
		}else{
			let count = 0;
			for(let id in this.state.selectedTokens){
				if(this.state.selectedTokens[id]){count++}
			}
			if(count<5) this.state.selectedTokens[id]=true;
		}
		this.setState({selectedTokens:this.state.selectedTokens})
	}
  render(){
    const { myTokens } = this.props
    if(!myTokens) return (<div style={{opacity:0.3}}>loading...</div>)

    let images = []
    let tokenDisplay = myTokens.map((token)=>{
      let style={}
      if(this.state.selectedTokens[token.id]){
        style.opacity=0.3
      }
      images[token.id]=token.image
      return <div style={style} onClick={this.tokenClick.bind(this,token.id)} key={"cryptog"+token.id} id={token.id} ><Cryptog image={token.image}/></div>
    })
    let selectedTokens = []
    for(let id in this.state.selectedTokens){
      if(this.state.selectedTokens[id]){
        selectedTokens.push( <div onClick={this.tokenClick.bind(this,id,true)} key={"selectedcryptog"+id} id={"selected"+id} ><Cryptog image={images[id]}/></div> )
      }
    }
    let gobutton = ""
    if(selectedTokens.length<=0){
      selectedTokens.push(<div key={"holder"} style={{height:113}}></div>)
    }else if(selectedTokens.length==5){
      //take out the margin right but figure out how to get zinex right
      //normally I'm unable to click it!!! POS
      gobutton = (
        <button style={{cursor:'pointer',marginRight:-50}} onClick={this.props.goFn.bind(this,this.state.selectedTokens)}>GO</button>
      )
    }
    return (
      <div>
        <div style={{float:'right'}}>
          {gobutton}
        </div>
        <StackGrid style={{marginTop:50}} columnWidth={110}>
          {selectedTokens}
        </StackGrid>
        {this.props.message}
        <div style={{float:'right'}}>count ({tokenDisplay.length})</div>
        <StackGrid style={{marginTop:50}} columnWidth={110}>
          {tokenDisplay}
        </StackGrid>
      </div>
    )
  }
}
export default StackSelect;

/*

const JoinStack = ({ match: { params } }) => (
  <div>
    {params.stack}
  </div>
)*/
