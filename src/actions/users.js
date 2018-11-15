import uuid from 'uuid';
import database,  { storage } from '../firebase/firebase.js';


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
    return database.ref('users').push(user).then((ref) => {
      return storage.ref().child(`${ref.key}`).put(userData.pic).then(() => {
        return storage.ref().child(`${ref.key}`).getDownloadURL().then((url) => {
          return database.ref(`users/${ref.key}`).update({ pic: url }).then(() => {
            dispatch(addUser({
              id: ref.key,
              pic: url,
              ...user,
            }))
          })
        })
      })
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
    const uid = getState().auth.uid
    return storage.ref().child(`${id}`).put(updates.pic).then(() => {
      return storage.ref().child(`${id}`).getDownloadURL().then((url) => {
        const updateObj = {
          ...updates,
          pic: url
        }
        return database.ref(`users/${id}`).update(updateObj).then(() => {
          dispatch(editUser(id, updateObj))
        });
      })
    })
  };
};

// SET_USERS
export const setUsers = (users) => ({
  type: 'SET_USERS',
  users
});

export const startSetUsers = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid
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
