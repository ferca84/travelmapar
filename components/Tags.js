import React, { useContext } from 'react'
import { Form } from 'react-bootstrap';
import GlobalContext from './context/globalContext';

const Tags = props => {
    const { tags } = useContext(GlobalContext)
    return (
        <>
            {tags.map(tag => {
                return  <Form.Check  
                            key={tag.id} custom  
                            label={tag.name} 
                            id={tag.id} 
                            type='checkbox' 
                            onClick={() => props.onSelect('tag', {id: Number(tag.id), name: tag.name})}  
                        />
            } )} 
        </>    
    );
}

export default Tags