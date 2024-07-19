import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchContacts, deleteContact } from "../redux/contactActions";
import AddContact from "./AddContact";
import EditContact from "./EditContact";
import * as icons from "react-bootstrap-icons";

const GoogleContacts = () => {
  const [showAddContact, setShowAddContact] = useState(false);
  const [showEditContact, setShowEditContact] = useState(false);
  const [editContactId, setEditContactId] = useState(null); // Track the ID of contact to edit
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // Sorting order, can be 'asc' or 'desc'

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const { contacts, status, error } = useSelector((state) => state.contacts);

  const toggleAddContact = () => {
    setShowAddContact(!showAddContact);
  };

  const toggleEditContact = (id) => {
    setEditContactId(id);
    setShowEditContact(!showEditContact);
  };

  // Filter and sort contacts based on search query and sort order
  const filteredContacts = contacts
    .filter((contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <>
      <header>
        <div className="app-bar">
          <div className="sidebar-header col-2">
            <icons.List />
            <div className="avatar">
              <img
                src="https://www.gstatic.com/images/branding/product/1x/contacts_2022_48dp.png"
                alt="Contacts Icon"
              />
            </div>
            <div className="user-info">
              <div className="user-name">Contacts</div>
            </div>
          </div>
          <div className="search-field ps-4">
            <span className="icon">
              <icons.Search />
            </span>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <div className="app-bar-icons col d-flex justify-content-end">
            <div className="icons-setting">
              <icons.QuestionCircle />
              <span className="ps-3">
                <icons.Gear />
              </span>
              <span className="ps-5">
                <icons.Grid3x3Gap />
              </span>
            </div>
            <div className="avatar ms-2">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/contacts-e5a08.appspot.com/o/avatars%2Fme.png?alt=media&token=12f0c3a5-9ed5-438b-a104-a92824458d78"
                alt="Avatar"
              />
            </div>
          </div>
        </div>
      </header>
      <div className="app">
        <div className="sidebar">
          <ul className="sidebar-menu">
            <li className="pt-4 pb-3" onClick={toggleAddContact}>
              <div className="cc-create">
                <a href="#" className="create-cc">
                  <icons.Plus />
                  Create contact
                </a>
              </div>
            </li>
            <li className="menu-item active">
              <span className="d-flex align-item-center">
                <icons.PersonFill />
                <span className="ps-3">Contacts</span>
                <p className="m-0 col align-end">{contacts.length}</p>
              </span>
            </li>
            <li className="menu-item">
              <span className="d-flex align-item-center">
                <icons.ClockHistory />
                <span className="ps-3">Frequent</span>
              </span>
            </li>
            <li className="menu-item">
              <span className="d-flex align-item-center">
                <icons.FileArrowDown />
                <span className="ps-3">Other contacts</span>
                <p className="m-0 col align-end">
                  <icons.InfoCircle />
                </p>
              </span>
            </li>
            <li className="menu-item active2">Fix and manage</li>
            <li className="menu-item">
              <span className="d-flex align-item-center">
                <icons.Tools />
                <span className="ps-3">Merge and fix</span>
              </span>
            </li>
            <li className="menu-item">
              <span className="d-flex align-item-center">
                <icons.Download />
                <span className="ps-3">Import</span>
              </span>
            </li>
            <li className="menu-item">
              <span className="d-flex align-item-center">
                <icons.Trash />
                <span className="ps-3">Bin</span>
              </span>
            </li>
            <li className="menu-item active2">
              <span className="d-flex">
                <span>Labels</span>
                <p className="m-0 col align-end">
                  <icons.Plus />
                </p>
              </span>
            </li>
            <li className="menu-item">
              <span className="d-flex align-item-center">
                <icons.BookmarkFill />
                <span className="ps-3">Imported on 17/07/24</span>
              </span>
            </li>
          </ul>
        </div>
        <main className="main-content">
          <div className="center">
            <div className="pb-4 ps-3 pt-4 d-flex pe-3">
              <div className="fw-semibold fs-4 col-6">
                Contacts ({contacts.length})
              </div>
              <div className="fw-semibold fs-4 col-6 d-flex justify-content-end">
                <span>
                  <icons.Printer />
                </span>
                <span className="ps-3">
                  <icons.Upload />
                </span>
                <span className="ps-3">
                  <icons.ThreeDotsVertical />
                </span>
              </div>
            </div>
            <div>
              {status === "loading" && <div>Loading...</div>}
              {status === "failed" && <div>Error: {error}</div>}
              {status === "succeeded" && filteredContacts.length === 0 && (
                <div>No contacts found.</div>
              )}
              {status === "succeeded" && filteredContacts.length > 0 && (
                <table width="100%">
                  <thead>
                    <tr>
                      <th>Avatar</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Address</th>
                      <th>Notes</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContacts.map((contact) => (
                      <tr key={contact.id}>
                        <td className="img-set">
                          <img src={contact.avatar} alt={contact.name} />
                        </td>
                        <td>{contact.name}</td>
                        <td>{contact.email}</td>
                        <td>{contact.phone}</td>
                        <td>{contact.address}</td>
                        <td>{contact.notes}</td>
                        <td>
                          <button
                            className="btn-edit"
                            onClick={() => toggleEditContact(contact.id)}
                          >
                            <icons.PencilSquare />
                          </button>
                          <button
                            className="btn-delete ms-2"
                            onClick={() => dispatch(deleteContact(contact.id))}
                          >
                            <icons.Trash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </main>
        {(showEditContact || showAddContact) && <div className="overlay"></div>}
        {showEditContact && (
          <div className="popup">
            <EditContact
              contactId={editContactId}
              onClose={() => setShowEditContact(false)}
            />
          </div>
        )}
        {showAddContact && (
          <div className="popup">
            <AddContact onClose={toggleAddContact} />
          </div>
        )}
      </div>
    </>
  );
};

export default GoogleContacts;
