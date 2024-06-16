import React from 'react';
import './newUser.css';
const NewUser = () => {
  return (
    <div className="new">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input type="text" placeholder="ABIMANYU" />
        </div>
        <div className="newUserItem">
          <label>Full Name</label>
          <input type="text" placeholder="ABIMANYU S" />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="Email" placeholder=" abimanyu@gamil.com" />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input type="password" placeholder=" password" />
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input type="text" placeholder=" +1 23 4456" />
        </div>
        <div className="newUserItem">
          <label>Address</label>
          <input type="text" placeholder=" india" />
        </div>
        <div className="newUserItem">
          <label>Gender</label>
          <div className="newUserGender">
            <input type="radio" name="gender" id="male" value="male" />
            <label for="male">Male</label>
            <input type="radio" name="gender" id="female" value="female" />
            <label for="female">Female</label>
            <input type="radio" id="other" name="gender" value="other " />
            <label for="other">Others</label>
          </div>
        </div>
        <div className="newUserItem">
          <label className="Active">Active</label>
          <select name="active" id="active" className="newUserSelect">
            <option value="yes">yes</option>
            <option value="no">no</option>
          </select>
        </div>

        <button className="newUserButton">Create</button>
      </form>
    </div>
  );
};

export default NewUser;
