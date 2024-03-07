import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { User } from '../types/types';
import { addUser, updateUser, deleteUser } from '../store/reducers';
import cl from "./style.module.scss";
import { useState, useCallback, useMemo } from 'react';
import UserAddForm from './UserAddForm';
import UserFilter from './UserFilter';
import UserItemList from './UserItemList';


const UserList: React.FC = () => {
  const users = useSelector((state: RootState) => state.users.users);
  const dispatch = useDispatch();

  const [isDriver, setIsDriver] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const [filter, setFilter] = useState<string>('');
  const [searchByName, setSearchByName] = useState<boolean>(false);
  const [searchByLastName, setSearchByLastName] = useState<boolean>(false);
  const [searchByPhoneNumber, setSearchByPhoneNumber] = useState<boolean>(false);
  const [searchByYearOfBirth, setSearchByYearOfBirth] = useState<boolean>(false);
  const [newUser, setNewUser] = useState<User>({
    id: Date.now(),
    firstName: '',
    lastName: '',
    phoneNumber: '',
    yearOfBirth: 1990,
    rights: 'User',
    carNumber: '',
  });


  const handleAddUser = useCallback(() => {
    if (
      newUser.firstName.trim() === '' ||
      newUser.lastName.trim() === '' ||
      newUser.phoneNumber.trim() === '' ||
      (isDriver && newUser.carNumber.trim() === '')
    ) {
      return;
    }
  
    const isDuplicate = users.some(
      (user) =>
        user.firstName.toLowerCase() === newUser.firstName.toLowerCase() &&
        user.lastName.toLowerCase() === newUser.lastName.toLowerCase() &&
        user.phoneNumber === newUser.phoneNumber &&
        (!isDriver || user.carNumber === newUser.carNumber)
    );
  
    if (isDuplicate) {
      console.error('Duplicate user detected!');
      return;
    }
  
    dispatch(addUser(newUser));
    setNewUser({
      id: Date.now(),
      firstName: '',
      lastName: '',
      phoneNumber: '',
      yearOfBirth: 1990,
      rights: 'User',
      carNumber: '',
    });
    setIsDriver(false);
  }, [dispatch, newUser, users, isDriver]);

  const handleUpdateUser = useCallback(
    (updatedUser: User) => {
      dispatch(updateUser(updatedUser));
    },
    [dispatch]
  );

  const handleDeleteUser = useCallback(
    (userId: number) => {
      dispatch(deleteUser(userId));
    },
    [dispatch]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, user: User) => {
      const { name, value } = e.target;
      handleUpdateUser({ ...user, [name]: value });
    },
    [handleUpdateUser]
  );

  const handleRightsChange = (value: string) => {
    setNewUser({ ...newUser, rights: value });
    setIsDriver(value === "Admin");
  };
  

  const handleCheckboxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = e.target;
      switch (name) {
        case 'searchByName':
          setSearchByName(checked);
          break;
        case 'searchByLastName':
          setSearchByLastName(checked);
          break;
        case 'searchByPhoneNumber':
          setSearchByPhoneNumber(checked);
          break;
        case 'searchByYearOfBirth':
          setSearchByYearOfBirth(checked);
          break;
          case 'searchByCarNumber':
          setIsDriver(checked);
        break;
        default:
          break;
      }
    },
    []
  );

  const generalSearch = useCallback(
    (user: User): boolean => {
      return (
        searchText === '' ||
        user.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
        user.phoneNumber.includes(searchText) ||
        user.yearOfBirth.toString().includes(searchText) ||
        user.carNumber.toString().includes(searchText)
      );
    },
    [searchText]
  );

  const parameterSearch = useCallback(
    (user: User): boolean => {
      const isDriverMatch = isDriver || user.rights === 'Admin'; // Проверяем, является ли пользователь водителем или администратором
      return (
        (searchByName && user.firstName.toLowerCase().includes(searchText.toLowerCase())) ||
        (searchByLastName && user.lastName.toLowerCase().includes(searchText.toLowerCase())) ||
        (searchByPhoneNumber && user.phoneNumber.includes(searchText)) ||
        (searchByYearOfBirth && user.yearOfBirth.toString().includes(searchText)) ||
        (isDriverMatch && user.carNumber.toLowerCase().includes(searchText.toLowerCase())) // Проверяем, является ли пользователь водителем перед поиском по номеру автомобиля
      );
    },
    [searchByName, searchByLastName, searchByPhoneNumber, searchByYearOfBirth, searchText, isDriver]
  );

  const filteredUsers = useMemo(() => {
    return users.filter((user: User) => {
      const isGeneralMatch = generalSearch(user);
      const isFilterMatch = filter === '' || user.rights.toLowerCase() === filter.toLowerCase();

      if (!(searchByName || searchByLastName || searchByPhoneNumber || searchByYearOfBirth)) {
        return isGeneralMatch && isFilterMatch;
      }

      const isSelectedSearchMatch = parameterSearch(user);
      return isSelectedSearchMatch && isFilterMatch;
    });
  }, [
    users,
    generalSearch,
    filter,
    searchByName,
    searchByLastName,
    searchByPhoneNumber,
    searchByYearOfBirth,
    parameterSearch,
  ]);

  return (
    <>
      <div className={cl.user__info}>
      <UserFilter 
        searchByName={searchByName} 
        searchByLastName={searchByLastName} 
        searchByPhoneNumber={searchByPhoneNumber} 
        searchByYearOfBirth={searchByYearOfBirth} 
        isDriver={isDriver} 
        searchText={searchText} 
        filter={filter} 
        handleCheckboxChange={handleCheckboxChange} 
        setSearchText={setSearchText} 
        setFilter={setFilter} 
        setIsDriver={setIsDriver}
      />
      <UserAddForm 
        newUser={newUser} 
        isDriver={isDriver} 
        handleRightsChange={handleRightsChange} 
        setNewUser={setNewUser} 
        handleAddUser={handleAddUser} 
      />
      <UserItemList 
        filteredUsers={filteredUsers} 
        handleInputChange={handleInputChange} 
        handleDeleteUser={handleDeleteUser} 
      />
    </div>
    </>
  );
};

export default UserList;
