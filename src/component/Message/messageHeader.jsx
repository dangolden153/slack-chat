import React from 'react'
import {Header, Segment, Input, Icon} from 'semantic-ui-react'

const MessageHeader =({channalName,numUniqueUsers,openModal,toggleState
    ,handleSearch,privateChannel,isStarredChannel, handleStarred})=>{

       
    return(
        <Segment clearing className="message_header">

            <Header fluid="true" floated="left" as="h2" style={{marginBottom:"0" }} >
           
            
         <div style={{display: 'flex'}}>
         <span className="media_ArrowIcon" floated="left">
         <Icon name='arrow left'   onClick={toggleState}/>
          </span>
            
            {channalName}
           
           {!privateChannel && <Icon 
           onClick={handleStarred}
           name={ isStarredChannel ? "star" : "star outline" }
           color={ isStarredChannel ? "yellow" : "black"}
           />}
                </div>

                <Header.Subheader> { !privateChannel && numUniqueUsers}</Header.Subheader>
            </Header>

            <Header floated="right" className='MessageHeader_input' >
            <Input
            onChange={handleSearch}
            size="mini"
            placeholder="seach messages"
            icon="search"
            name="searchTerm"
            className='MessageHeader_input'
            />
            </Header>

        </Segment>
    )
}

export default MessageHeader