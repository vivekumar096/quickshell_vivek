import axios from 'axios';

export const fetchAllData = () => async (dispatch) =>{
    try {
        dispatch({type : 'DATA_REQUEST'})
    
        const {data} = await axios.get("https://api.quicksell.co/v1/internal/frontend-assignment/");

        dispatch({type : 'DATA_SUCCESS', payload : data});

    } catch (error) {
        dispatch({type : 'DATA_FAILURE'})
    }
}

export const selectData = (group, allTickets, orderValue) => async (dispatch) =>{
    try {
        dispatch({type : 'SELECT_DATA_REQUEST'})

        let user = false;
        let mySet = new Set();
        let arr = [], selectedData = [];

        if(group === 'status'){
            allTickets.forEach((elem) => {
                mySet.add(elem.status);
            })
    
            arr = [...mySet];
    
            arr.forEach((elem, index) => {
                let arr = allTickets.filter((fElem) => {
                    return elem === fElem.status;
                })
                selectedData.push({
                    [index] : {
                        title : elem,
                        value : arr
                    }
                })
            })
        }else if(group === 'user'){
            user = true;
            allTickets?.allUser?.forEach((elem, index) => {
                arr = allTickets?.allTickets?.filter((Felem) => {
                    return elem.id === Felem.userId;
                })

                selectedData.push({
                    [index] : {
                        title : elem.name,
                        value : arr
                    }
                })
            })
        }else{
            let prior_list = ["No priority", "Low", "Medium", "High", "Urgent"];

            prior_list.forEach((elem, index) => {
                arr = allTickets.filter((fElem) => {
                    return index === fElem.priority;
                })

                selectedData.push({
                    [index] : {
                        title : elem,
                        value : arr
                    }
                })
            })
        }

        if(orderValue === "title"){
            selectedData.forEach((elem, index) => {
                elem[index]?.value?.sort((a, b) => a.title.localeCompare(b.title))
            })
        }

        if(orderValue === "priority"){
            selectedData.forEach((elem, index) => {
                elem[index]?.value?.sort((a, b) => b.priority - a.priority)
            })
        }
        
        dispatch({type : 'SELECT_DATA_SUCCESS', payload : {selectedData, user}});

    } catch (error) {
        dispatch({type : 'SELECT_DATA_FAILURE', payload : error.message})
    }
}


// import axios from 'axios';

// // Fetch all tickets and users data from the API
// export const fetchAllData = () => async (dispatch) => {
//     try {
//         dispatch({ type: 'DATA_FETCH_INITIATED' });

//         const response = await axios.get("https://api.quicksell.co/v1/internal/frontend-assignment/");
//         const { data } = response;

//         dispatch({ type: 'DATA_FETCH_SUCCESS', payload: data });
//     } catch (err) {
//         dispatch({ type: 'DATA_FETCH_ERROR' });
//     }
// };

// // Function to organize and sort tickets based on the grouping and sorting options
// export const selectData = (grouping, ticketData, sortOrder) => async (dispatch) => {
//     try {
//         dispatch({ type: 'DATA_GROUPING_INITIATED' });

//         let isUserGroup = false;
//         const groupsSet = new Set();
//         let tempGroup = [], finalData = [];

//         // Group by status
//         if (grouping === 'status') {
//             ticketData.forEach((ticket) => groupsSet.add(ticket.status));

//             Array.from(groupsSet).forEach((status, idx) => {
//                 const groupedTickets = ticketData.filter(ticket => ticket.status === status);
//                 finalData.push({ [idx]: { title: status, value: groupedTickets } });
//             });

//         // Group by user
//         } else if (grouping === 'user') {
//             isUserGroup = true;
//             ticketData?.allUser?.forEach((user, idx) => {
//                 const userSpecificTickets = ticketData?.allTickets?.filter(ticket => ticket.userId === user.id);
//                 finalData.push({ [idx]: { title: user.name, value: userSpecificTickets } });
//             });

//         // Group by priority
//         } else {
//             const priorities = ["No priority", "Low", "Medium", "High", "Urgent"];
//             priorities.forEach((level, idx) => {
//                 const priorityTickets = ticketData.filter(ticket => ticket.priority === idx);
//                 finalData.push({ [idx]: { title: level, value: priorityTickets } });
//             });
//         }

//         // Sorting by title
//         if (sortOrder === "title") {
//             finalData.forEach((group, idx) => {
//                 group[idx]?.value?.sort((a, b) => a.title.localeCompare(b.title));
//             });
//         }

//         // Sorting by priority
//         if (sortOrder === "priority") {
//             finalData.forEach((group, idx) => {
//                 group[idx]?.value?.sort((a, b) => b.priority - a.priority);
//             });
//         }

//         dispatch({ type: 'DATA_GROUPING_SUCCESS', payload: { finalData, isUserGroup } });

//     } catch (err) {
//         dispatch({ type: 'DATA_GROUPING_FAILURE', payload: err.message });
//     }
// };
