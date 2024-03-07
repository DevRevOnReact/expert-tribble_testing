import React from 'react';
import cl from "./style.module.scss";
import { User } from './types';
import Select from 'react-select';

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

const UserItemList = ({ 
  filteredUsers, 
  handleInputChange, 
  handleDeleteUser 
}) => {

  

  return (
    <ul className={cl.user__list}>
    {filteredUsers.length > 0 ? (
      filteredUsers.map((user: User) => ( 
        <li className={cl.user__item} key={user.id}>
          <input
            className={cl.user__item_input}
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={(e) => handleInputChange(e, user)}
            placeholder="Ваше имя"
          />
          <input
            className={cl.user__item_input}
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={(e) => handleInputChange(e, user)}
            placeholder="Ваша фамилия"
          />
          <input
            className={cl.user__item_input}
            type="text"
            name="phoneNumber"
            value={user.phoneNumber}
            onChange={(e) => handleInputChange(e, user)}
            placeholder="Ваш номер"
          />
          <input
            className={cl.user__item_input}
            type="number"
            name="yearOfBirth"
            value={user.yearOfBirth}
            onChange={(e) => handleInputChange(e, user)}
            placeholder="Ваш год рождения"
          />
           {user.rights === "Admin" && (
      <input
        className={cl.user__add_input}
        type="text"
        name="carNumber"
        value={user.carNumber}
        onChange={(e) => handleInputChange(e, user)}
        placeholder="Номер автомобиля"
      />
    )}
    <Select
        className={cl.user__item_select}
        name="rights"
        value={{ label: user.rights === "Admin" ? "Водитель" : "Пешеход", value: user.rights }}
        options={[
            { value: "Admin", label: "Водитель" },
            { value: "User", label: "Пешеход" }
        ]}
        styles={customStyles}
        onChange={(selectedOption) => handleInputChange({ target: { name: "rights", value: selectedOption.value } }, user)}
    />
          <button className={cl.user__item_button} onClick={() => handleDeleteUser(user.id)}>Удалить</button>
        </li>
      ))
    ) : (
      <li className={cl.user__empty_message}>Пока нет пользователей</li>
    )}
  </ul>
  );
};

export default UserItemList;
