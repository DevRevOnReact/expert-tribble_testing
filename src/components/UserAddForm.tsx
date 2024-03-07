import cl from "./style.module.scss";
import Select from 'react-select';

const options = [
    { value: "Admin", label: "Водители" },
    { value: "User", label: "Пешеходы" }
];

const UserAddForm = ({ 
  newUser, 
  isDriver, 
  handleRightsChange, 
  setNewUser, 
  handleAddUser 
}) => {

    const formattedValue = options.find(option => option.value === newUser.rights);

    const customStyles: OptionStyles = {
        option: (provided, state) => ({
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
        control: (provided) => ({
          ...provided,
          border: '1px solid black',
          backgroundColor: 'black',
          borderColor: 'black',
          cursor: 'pointer',
        }),
        singleValue: (provided) => ({
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
   value={formattedValue} // передаем объект со свойствами value и label
   options={options}
   onChange={(selectedOption) => handleRightsChange(selectedOption.value)}
   formatOptionLabel={(option) => <div>{option.label}</div>} 
   styles={customStyles}
/>
      <button className={cl.user__add_button} onClick={handleAddUser}>Добавить пользователя</button>
    </div>
  );
};

export default UserAddForm;
