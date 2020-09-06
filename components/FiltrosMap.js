import { Button, Form, InputGroup, Badge } from 'react-bootstrap'
import { useState } from 'react';
import { deJSAFechaAmericana } from '../utils/functions';
import SearchCountry from './SearchCountry';
import Tags from './Tags';

const FiltrosMap = props => {

    const [validated, setValidated] = useState(false);
    const { filters, setFilters, onClickAplicar, refreshPosts } = props;

    /*
    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {

        }

        setValidated(true);
    };
    */

    const handleSelect = (type, item) => {
        const filterFinded = filters.find(fil => fil.type === type && fil.name === item.name);
        if (filterFinded) {
            setFilters(state => state.filter(elem => item.name !== elem.name && item.id !== elem.id))
        } else {
            setFilters(state => state.concat({ name: item.name, type, id: item.id }))
        }
    };


    return (
        <div style={{padding: '30px'}}>
            <fieldset style={styles.fieldSet}>
                <h6>Selección Actual</h6>
                {
                    filters.map( (filter,i) => {
                        return <Badge key={i} variant="secondary" style={{margin: '0 5px'}}>{filter.name}</Badge>
                    })
                }
                <div>
                    <Button variant="link" onClick={() => setFilters([])}>Limpiar Filtros</Button>
                </div>
            </fieldset>  
            <fieldset style={styles.fieldSet}>
                <h6>Ubicación</h6>
                <SearchCountry onSelect={handleSelect} />
            </fieldset>  
            <fieldset style={styles.fieldSet}>
                <h6>Categorias</h6>
                <Tags onSelect={handleSelect} />
            </fieldset>  
            <fieldset style={styles.fieldSet}>
                <h6>Usuario</h6>
                <Form inline>
                    <Form.Control style={{width: '100%'}} type="text" placeholder="Buscar Usuario"  />
                </Form>
            </fieldset>  


            <div className="text-center">
                <Button style={{width: '100%'}} variant="primary" onClick={onClickAplicar}>Aplicar</Button>
            </div>
            
        </div>
    );
}

const styles = {
    fieldSet: {
        padding: '15px 0',
        borderBottom: '1px solid #e9e9e9'
    }
}

export default FiltrosMap;