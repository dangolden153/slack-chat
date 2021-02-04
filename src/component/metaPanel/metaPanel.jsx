import React,{useState} from 'react'
import {Accordion,Icon,Segment,Header, Image, List} from 'semantic-ui-react'

const MetaPanel =({currentChannel,privateChannel,currentUser,setUsersPost})=>{
   
    const [activeIndex, setactiveIndex] = useState(0)

    const setActiveIndex =(event,titleProps)=>{
        const {index} = titleProps
        const newIndex = index === activeIndex ? -1 : index
        setactiveIndex(newIndex)
    }

    const formatCount = num => 
   (num > 1 || num === 0) ? `${num} posts` : `${num}post`
   


    if (privateChannel)  return null;

    return (
            <Segment loading={!currentChannel} >
            <Header as='h3' attached="top" >
                {currentChannel && `#${currentChannel.name}`}
            </Header>

        <Accordion styled attached="true" >
            
            <Accordion.Title
            active={activeIndex === 0}
            index={0}
            onClick={setActiveIndex}
            >
              <Icon name='dropdown' />
              <Icon name='info' />
              Channels Details
            </Accordion.Title>

            <Accordion.Content active={activeIndex === 0}>
                {currentChannel && currentChannel.details}
            </Accordion.Content>







            {/* TOP POSTERS  */}

            <Accordion.Title
            active={activeIndex === 1}
            index={1}
            onClick={setActiveIndex}
            >
              <Icon name='dropdown' />
              <Icon name='user circle' />
              Top Posters
            </Accordion.Title>
            
            <Accordion.Content active={activeIndex === 1}>
            <List>
              { setUsersPost &&
        Object.entries(setUsersPost)
        .sort((a,b)=>b[1] - a[1])
        .map(([key, val], i) =>(
            <List.Item key={i}>
                <Image avatar src={val.avatar} />
                <List.Content>
                    <List.Header as='a' >{key}</List.Header>
                    <List.Description >{formatCount(val.count)}</List.Description>
                </List.Content>
            </List.Item>
        )) .slice(0,5)
    }
              </List>
            </Accordion.Content>










            {/* CREATED-BY  */}
            <Accordion.Title
            active={activeIndex === 2}
            index={2}
            onClick={setActiveIndex}
            >
              <Icon name='dropdown' />
              <Icon name='pencil' />
              Created By
            </Accordion.Title>

            <Accordion.Content active={activeIndex === 2}>
                <Header as='h3'>
                <Image circular src={currentChannel && currentChannel.createdBy.avatar} />
               {currentChannel && currentChannel.createdBy.name}
                </Header>
               
            </Accordion.Content>
        </Accordion>
        </Segment>
    )
    }
    export default MetaPanel