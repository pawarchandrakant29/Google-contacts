import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebaseConfig";
import { updateContact } from "../redux/contactActions";

const EditContact = ({ contactId, onClose }) => {
  const contact = useSelector((state) =>
    state.contacts.contacts.find((contact) => contact.id === contactId)
  );
  const [updatedContact, setUpdatedContact] = useState(contact);
  const [file, setFile] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (contact) setUpdatedContact(contact);
  }, [contact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedContact({
      ...updatedContact,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (file) {
      const fileRef = ref(storage, `avatars/${file.name}`);
      await uploadBytes(fileRef, file);
      const avatarUrl = await getDownloadURL(fileRef);
      dispatch(updateContact({ ...updatedContact, avatar: avatarUrl }));
    } else {
      dispatch(updateContact(updatedContact));
    }

    onClose();
  };

  if (!contact) return <div>Contact not found</div>;

  return (
    <section className="contact-us" id="contact-section">
      <form id="contact" onSubmit={handleSubmit}>
        <div className="section-heading">
          <h4>Edit Contact</h4>
        </div>

        <input type="file" onChange={handleFileChange} />

        <div className="inputField">
          <input
            name="name"
            placeholder="Name"
            value={updatedContact.name}
            onChange={handleChange}
          />
        </div>

        <div className="inputField">
          <input
            name="email"
            placeholder="Email"
            value={updatedContact.email}
            onChange={handleChange}
          />
        </div>

        <div className="inputField">
          <input
            name="phone"
            placeholder="Phone"
            value={updatedContact.phone}
            onChange={handleChange}
          />
        </div>

        <div className="inputField">
          <input
            name="address"
            placeholder="Address"
            value={updatedContact.address}
            onChange={handleChange}
          />
        </div>

        <div className="inputField">
          <textarea
            name="notes"
            placeholder="Notes"
            value={updatedContact.notes}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="inputField btn">
          <button type="button" onClick={onClose} className="btn22 me-2">
            Cancel
          </button>
          <button type="submit" className="btn22">
            Update
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditContact;
