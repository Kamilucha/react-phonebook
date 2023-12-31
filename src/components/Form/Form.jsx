import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from 'redux/contacts/selector';
import { addContactsThunk } from 'redux/thunk';
import { Input, Label, FormContainer, Button } from "./Form.styled"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Form = () => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const dispatch = useDispatch();
    const contacts = useSelector(getContacts);


    const handleChange = e => {
        const { name, value } = e.target
        switch (name) {
            case 'name':
                setName(value)
                break;
            
            case 'number':
                setNumber(value)
                break;
        
            default:
                break;
        }
    };

    const handleSubmit = e => {
        e.preventDefault();

         const duplicateName = contacts.some(
    contact => contact.name.toLowerCase() === name.toLowerCase()
  );
  const duplicateNumber = contacts.some(
    contact => contact.number === number
  );

  if (duplicateName) {
    toast.error(`Name ${name} is already in contacts`, {
      position: "top-center",
      autoClose: 3000,
    });
    return;
  }

  if (duplicateNumber) {
    toast.error(`Number ${number} is already in contacts`, {
      position: "top-center",
      autoClose: 3000,
    });
    return;
  }

    //     const duplicate = contacts.some(
    //   contact =>
    //     contact.name.toLowerCase() === name.toLowerCase() ||
    //     contact.number === number
    // );

    // if (duplicate) {
    //     return alert (`${name} is already in contacts`);
    // }
  

        const newContact = {
                name,
                number,
        };


        dispatch(addContactsThunk(newContact));

        reset()
    };

    const reset = () => {
        setName('');
        setNumber('');
    }



    return (
        <FormContainer onSubmit={handleSubmit}>
            <Label> Name
            <Input
                type="text"
                name="name"
                pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
                value={name}
                onChange={handleChange}/>

                </Label>
                <Label>
                    Number
            <Input
                type="tel"
                name="number"
               pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
                value={number}
                onChange={handleChange}/>
                </Label>
            <Button type="submit">Add contact</Button>
            <ToastContainer />
     </FormContainer>
) 
}



export default Form

