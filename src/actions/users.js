import uuid from 'uuid';
import database from '../firebase/firebase.js';


// ADD_USER
export const addUser = (user) => ({
  type: 'ADD_USER',
  user
});

export const startAddUser = (userData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid
    const {
      name = '',
      bio = '',
      createdAt = 0
    } = userData;
    const user = { name, bio, createdAt }
    return database.ref(`${uid}/`).push(user).then((ref) => {
      dispatch(addUser({
        id: ref.key,
        ...user
      }))
    });
  };
};

// EDIT_USER
export const editUser = (id, updates) => ({
  type: 'EDIT_USER',
  id,
  updates
});

export const startEditUser = (id, updates) => {
  return (dispatch, getState) => {
    return database.ref(`users/`).update(updates).then(() => {
      dispatch(editUser(id, updates))
    });
  };
};

// SET_USERS
export const setUsers = (users) => ({
  type: 'SET_USERS',
  users
});

export const startSetUsers = () => {
  return (dispatch, getState) => {
    return database.ref(`users`)
      .once('value')
      .then((snapshot) => {
        const users = [];
        snapshot.forEach((childSnapshot) => {
          users.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
          console.log(users);
        });
        dispatch(setUsers(users))
      })
  };
};
