import React from 'react';
import cl from "./style.module.scss";
import ReactSelect from 'react-select';

const UserFilter = ({ 
  searchByName, 
  searchByLastName, 
  searchByPhoneNumber, 
  searchByYearOfBirth, 
  isDriver, 
  searchText, 
  filter, 
  handleCheckboxChange, 
  setSearchText, 
  setFilter,
  setIsDriver
}) => {

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
    <div className={cl.user__search}>
      <div className={cl.user__search_labels}>
        <h1>Параметры поиска</h1>
        <label className={cl.user__search_label}>
          Имя
          <input
            className={cl.user__search_checkbox}
            type="checkbox"
            name="searchByName"
            id="checkbox1"
            checked={searchByName}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="checkbox1"></label>
        </label>
        <label className={cl.user__search_label}>
          Фамилия
          <input
            className={cl.user__search_checkbox}
            type="checkbox"
            name="searchByLastName"
            id="checkbox2"
            checked={searchByLastName}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="checkbox2"></label>
        </label>
        <label className={cl.user__search_label}>
          Номер телефона
          <input
            className={cl.user__search_checkbox}
            type="checkbox"
            id="checkbox3"
            name="searchByPhoneNumber"
            checked={searchByPhoneNumber}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="checkbox3"></label>
        </label>
        <label className={cl.user__search_label}>
          Дата рождения
          <input
            className={cl.user__search_checkbox}
            type="checkbox"
            id="checkbox4"
            name="searchByYearOfBirth"
            checked={searchByYearOfBirth}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="checkbox4"></label>
        </label>
        <label className={cl.user__search_label}>
          Номер автомобиля
          <input
            className={cl.user__search_checkbox}
            type="checkbox"
            id="checkbox5"
            name="isDriver"
            checked={isDriver}
            onChange={(e) => setIsDriver(e.target.checked)}
          />
          <label htmlFor="checkbox5"></label>
        </label>
      </div>
      <div className={cl.user__search_info}>
        <input
          className={cl.user__search_input}
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Общий поиск"
        />
      </div>
      <ReactSelect
    className={cl.user__search_filter}
    options={[
        { label: 'Все пользователи', value: '' },
        { label: 'Водители', value: 'Admin' },
        { label: 'Пешеходы', value: 'User' }
    ]}
    value={{ label: filter === '' ? 'Все пользователи' : (filter === 'Admin' ? 'Водители' : 'Пешеходы'), value: filter }}
    onChange={(option) => setFilter(option?.value || '')}
    styles={customStyles}
/>
    </div>

  );
};

export default UserFilter;
