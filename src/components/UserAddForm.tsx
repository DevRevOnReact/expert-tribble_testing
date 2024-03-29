/* eslint-disable @typescript-eslint/no-explicit-any */
import cl from "./style.module.scss";
import Select from 'react-select';
import { User } from "../types/types";

const options: Option[] = [
    { value: "Admin", label: "Водители" },
    { value: "User", label: "Пешеходы" }
];

interface Option {
  value: string;
  label: string;
}


interface Props {
  newUser: User;
  isDriver: boolean;
  handleRightsChange: (value: string) => void;
    setNewUser: React.Dispatch<React.SetStateAction<User>>; // Объявляем тип явно

  handleAddUser: () => void;
}


const UserAddForm: React.FC<Props> = ({ 
  newUser, 
  isDriver, 
  handleRightsChange, 
  setNewUser, 
  handleAddUser 
}) => {

    const formattedValue = options.find(option => option.value === newUser.rights);

    const customStyles = {
      option: (provided: any, state: { isSelected: any; }) => ({
        ...provided,
        color: state.isSelected ? 'white' : 'white',
        backgroundColor: state.isSelected ? 'black' : 'white',
        '&:hover': {
          backgroundColor: '#242424',
        },
        background: 'black', // Set background color of options
        cursor: 'pointer',
        border: '1px solid black',
      }),
      control: (provided: any) => ({
        ...provided,
        border: '1px solid black',
        backgroundColor: 'black',
        borderColor: 'black',
        cursor: 'pointer',
      }),
      singleValue: (provided: any) => ({
        ...provided,
        border: '1px solid black',
        color: 'white',
        cursor: 'pointer',
      }),
  
  
      };
  return (
    <div className={cl.user__add}>
      <input
        className={cl.user__add_input}
        type="text"
        name="firstName"
        value={newUser.firstName}
        onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
        placeholder="Ваше имя"
      />
      <input
        className={cl.user__add_input}
        type="text"
        name="lastName"
        value={newUser.lastName}
        onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
        placeholder="Ваша фамилия"
      />
      <input
        className={cl.user__add_input}
        type="text"
        name="phoneNumber"
        value={newUser.phoneNumber}
        onChange={(e) => setNewUser({ ...newUser, phoneNumber: e.target.value })}
        placeholder="Ваш номер"
      />
      <input
        className={cl.user__add_input}
        type="number"
        name="yearOfBirth"
        value={newUser.yearOfBirth}
        onChange={(e) => setNewUser({ ...newUser, yearOfBirth: parseInt(e.target.value) })}
        placeholder="Ваш год рождения"
      />
      {isDriver && (
  <input
    className={cl.user__add_input}
    type="text"
    name="carNumber"
    value={newUser.carNumber}
    onChange={(e) => setNewUser({ ...newUser, carNumber: e.target.value })}
    placeholder="Номер автомобиля"
  />
)}
<Select
  className={cl.user__add_select}
  name="rights"
  value={formattedValue}
  options={options}
  onChange={(selectedOption) => {
    if (selectedOption && 'value' in selectedOption) {
      handleRightsChange(selectedOption.value);
    }
  }}
  formatOptionLabel={(option) => <div>{option.label}</div>}
  styles={customStyles}
/>
      <button className={cl.user__add_button} onClick={handleAddUser}>Добавить пользователя</button>
    </div>
  );
};

export default UserAddForm;
