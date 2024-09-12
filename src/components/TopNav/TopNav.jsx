import React, { useEffect, useState } from "react";
import { TiThList } from "react-icons/ti";
import "./TopNav.css";
import { useDispatch, useSelector } from "react-redux";
import { selectData } from "../../Actions/DataAction";

const retrieveGroup = () => {
  return localStorage.getItem("group") || "status"; /* Simplified logic */
};

const retrieveOrder = () => {
  return localStorage.getItem("order") || "priority"; /* Simplified logic */
};

const TopNav = () => {
  const [displayOnClick, setDisplayOnClick] = useState(false);
  const dispatch = useDispatch();
  const { allTickets, allUser } = useSelector((state) => state.DataReducer);
  const [groupValue, setGroupValue] = useState(retrieveGroup()); /* Renamed helper function */
  const [orderValue, setOrderValue] = useState(retrieveOrder()); /* Renamed helper function */

  const handleGroupValue = (e, isGroup) => { /* Changed variable name */
    const selectedValue = e.target.value;
    if (isGroup) {
      setGroupValue(selectedValue);
      localStorage.setItem("group", selectedValue); /* Simplified localStorage */
    } else {
      setOrderValue(selectedValue);
      localStorage.setItem("order", selectedValue); /* Simplified localStorage */
    }
    setDisplayOnClick(false); /* Simplified toggle logic */
  };

  useEffect(() => {
    const data = groupValue === "user" ? { allTickets, allUser } : allTickets;
    dispatch(selectData(groupValue, data, orderValue)); /* Simplified dispatch logic */
  }, [allTickets, dispatch, groupValue, allUser, orderValue]);

  return (
    <div className="top-header" style={{ paddingLeft: "12px" }}> {/* Slightly adjusted padding */}
      <div className="displayButton">
        <button
          className="p-10 f-16 btn"
          onClick={() => setDisplayOnClick((prev) => !prev)} /* Simplified state toggle */
        >
          <TiThList /> Display
        </button>
        {displayOnClick && (
          <div className="dropOnClick flex-gap-10 p-12"> {/* Adjusted padding */}
            <div className="selectGroup flex-sb">
              <span>Grouping</span>
              <select
                value={groupValue}
                onChange={(e) => handleGroupValue(e, true)}
                className="selectStyle"
                name="group"
                id="group"
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="selectGroup flex-sb">
              <span>Ordering</span>
              <select
                value={orderValue}
                onChange={(e) => handleGroupValue(e, false)}
                className="selectStyle"
                name="order"
                id="order"
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopNav;
