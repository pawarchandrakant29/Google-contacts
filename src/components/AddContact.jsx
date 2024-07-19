import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebaseConfig";
import { addContact } from "../redux/contactActions";

const AddContact = ({ onClose }) => {
  const initialContactState = {
    id: "",
    avatar: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  };

  const [contact, setContact] = useState(initialContactState);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({
      ...contact,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const generateRandomId = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newContact = { ...contact, id: generateRandomId() };

    if (file) {
      const fileRef = ref(storage, `avatars/${file.name}`);
      await uploadBytes(fileRef, file);
      const avatarUrl = await getDownloadURL(fileRef);
      newContact.avatar = avatarUrl;
    }

    dispatch(addContact(newContact));
    setContact(initialContactState);
    setFile(null);
    onClose();
    navigate("/");
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <section className="contact-us" id="contact-section">
      <form id="contact" onSubmit={handleSubmit}>
        <div
          className="close-btn d-flex justify-content-end"
          onClick={handleClose}
        >
          <span>X</span>
        </div>
        <div className="section-heading">
          <h4>Add Contact</h4>
        </div>

        <input type="file" onChange={handleFileChange} />

        <div className="inputField">
          <input
            name="name"
            placeholder="Name"
            value={contact.name}
            onChange={handleChange}
          />
        </div>

        <div className="inputField">
          <input
            name="email"
            placeholder="Email"
            value={contact.email}
            onChange={handleChange}
          />
        </div>

        <div className="inputField">
          <input
            name="phone"
            placeholder="Phone"
            value={contact.phone}
            onChange={handleChange}
          />
        </div>

        <div className="inputField">
          <input
            name="address"
            placeholder="Address"
            value={contact.address}
            onChange={handleChange}
          />
        </div>

        <div className="inputField">
          <textarea
            name="notes"
            placeholder="Notes"
            value={contact.notes}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="inputField btn">
          <button type="submit" className="btn22">
            Add
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddContact;
