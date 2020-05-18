export const Action = Object.freeze({
    LoadMemories: 'LoadMemories', 
    FinishAddingMemory: 'FinishAddingMemory',
    EnterEditMode: 'EnterEditMode',
    LeaveEditMode: 'LeaveEditMode',
    FinishSavingMemory: 'FinishSavingMemory',
    FinishDeletingMemory: 'FinishDeletingMemory',
});

export function loadMemories(memories){
    return{
        type: Action.LoadMemories,
        payload: memories,

    };
}

export function finishAddingMemory(memory){
    return{
        type: Action.FinishAddingMemory,
        payload: memory,

    };
}

export function finishSavingMemory(memory){
    return{
        type: Action.FinishSavingMemory,
        payload: memory,

    };
}

export function finishDeletingMemory(memory){
    return{
        type: Action.FinishDeletingMemory,
        payload: memory,

    };
}

export function enterEditMode(memory){
    return{
        type: Action.EnterEditMode,
        payload: memory,

    };
}

export function leaveEditMode(memory){
    return{
        type: Action.LeaveEditMode,
        payload: memory,

    };
}

function checkForErrors(response){
    if(!response.ok){
        throw Error(`${response.status}：${response.statusText}`);
    }

    return response;
}

//const host='https://today-api.twodee.org:8442';

const host = 'https://shuyuli.duckdns.org:8442';

export function loadDay(month, day){
    return dispatch =>{
    fetch(`${host}/memories/${month}/${day}`)
        .then(checkForErrors)
        .then(response => response.json())
        .then(data =>{
            if(data.ok){
             //data.memories
                dispatch(loadMemories(data.memories));
            }
        })
    .catch(e => console.error(e));
    };
}


export function startAddingMemory(year, month, day){
    const memory={year, month, day, username:'', message: ''};

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(memory),
    }
    return dispatch =>{
    fetch(`${host}/memories`, options)
        .then(checkForErrors)
        .then(response => response.json())
        .then(data =>{
            if(data.ok){
             //data.memories
                memory.id = data.id;
                dispatch(finishAddingMemory(memory));
            }
        })
    .catch(e => console.error(e));
    };
}

export function startSavingMemory(memory){

    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(memory),
    }
    return dispatch =>{
    fetch(`${host}/memories/${memory.id}`, options)
        .then(checkForErrors)
        .then(response => response.json())
        .then(data =>{
            if(data.ok){
             //data.memories       
                dispatch(finishSavingMemory(memory));
            }
        })
        .catch(e => console.error(e));
    };
}

export function startDeletingMemory(memory){
    const options = {
        method: 'DELETE',
    };
    return dispatch =>{
    fetch(`${host}/memories/${memory.id}`, options)
        .then(checkForErrors)
        .then(response => response.json())
        .then(data =>{
            if(data.ok){
             //data.memories
                dispatch(finishDeletingMemory(memory));
            }
        })
    .catch(e => console.error(e));
    };
}