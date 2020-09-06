import React, { useContext } from 'react'
import { Form } from 'react-bootstrap';
import GlobalContext from './context/globalContext';

const SearchCountry = props => {
    const { countries } = useContext(GlobalContext)
   
const handleChange = event => {
    const countrySelected = countries.find(c => c.code === event.target.value);
    props.onSelect('country', countrySelected)
}

    return (
        <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Control as="select" required onChange={handleChange}>
                    <option value="">Selecciona un pais...</option>
                    {countries.map(country => {
                        return  <option key={country.code} value={country.code}>{country.name}</option>
                    } )}
                </Form.Control>
        </Form.Group>
    );
}

export default SearchCountry