import {Item} from './Item.js'; // Adds all the different classes
import { assignment } from './assignment.js';
import { homework } from './homework.js';
import { test } from './test.js';
import { specialEvent } from './specialEvent.js';


// dynamic variables (can be changed)
let nav = 0; // allows us to go through the months
let clicked = null; // check whether we have clicked a day
let events = [];
var curr_day = [];
var delEvent = null;

const eventTypePar = document.getElementById('eventTypePar');

// constant variables (cant be changed)
const calendar = document.getElementById('calendar'); // allows us to get calendar directly (saves us time)
const defaultEventModal = document.getElementById('defaultEventModal'); // everything below is just so I don't have to type document.getElementbyId
const newEventModal = document.getElementById('newEventModal');
const backDrop = document.getElementById('modalBackDrop');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; // just keeps track of weekdays
const dropdownID = document.querySelectorAll('.dropdownID');
const divs = document.querySelectorAll('.dropdownItem');
const dropdownBox = document.querySelectorAll('.dropdownBox');
const eventTitleInput = document.getElementById('eventTitleInput');
const newEventSpecs = document.getElementById('newEventSpecs');
const eventList = document.getElementById('eventList');
const deleteEventModal = document.getElementById('deleteEventModal');


function openModal(date) { // opens a modal to create an event
    clicked = date; 

    curr_day = [];

    for(let i = 0; i < events.length; i++) { // checks which events are on that day
        if(events[i].thingy.getD() === date) curr_day.push(events[i]);
    }

    for(let i = 0; i < curr_day.length; i++) { // this adds the events on that day the modal that opens when you click on that day
        const eventSquare = document.createElement('div');
        eventSquare.innerText = curr_day[i].thingy.title;
        eventSquare.classList.add('eventText');
        eventSquare.addEventListener('click', () => {
            delEvent = curr_day[i];
            deleteEventModal.style.display = 'block';
        });

        if(curr_day[i].thingyType === "Assignment") eventSquare.classList.add('assignment'); // custom colors for each type
        else if(curr_day[i].thingyType === "Test") eventSquare.classList.add('test');
        else if(curr_day[i].thingyType === "Homework") eventSquare.classList.add('homework');
        eventList.appendChild(eventSquare);
    }
    
    defaultEventModal.style.display = 'block'; // shows the modal which was previously hidden
    backDrop.style.display = 'block'; // background dark
}

function load() { // allows function to be reusable since we need to update every time user adds things
    const dt = new Date();

    if(nav !== 0) {
        dt.setMonth(new Date().getMonth() + nav); // checks whether user has clicked next or back month button
    }

    const day = dt.getDate(); //gets the date for the clicked day
    const month = dt.getMonth();
    const year = dt.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1)

    const daysInMonth = new Date(year, month + 1, 0).getDate(); // the number of days in the current month

    const dateString = firstDayOfMonth.toLocaleDateString('en-us', { // chooses how to display the date
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]); // need padding days to fill up space that isnt in month

    document.getElementById('monthDisplay').innerText = `${dt.toLocaleDateString('en-us', {month: 'long'})} ${year}`;

    calendar.innerHTML = ''; // resets all the padding and day squares

    for(let i = 1; i <= paddingDays + daysInMonth; i++) {
        const daySquare = document.createElement('div');
        daySquare.classList.add('day'); // gives css day attributes to this 

        const dayString = `${month + 1}/${i - paddingDays}/${year}`;

        if(i > paddingDays) {
            daySquare.innerText = i - paddingDays; // adds the day number if the day is in the month

            for(var j = 0; j < events.length; j++) { // adds the events that occur on that day to the daySquare
                if(events[j].thingy.getD() === dayString) curr_day.push(events[j]);
            }

            if(i - paddingDays === day && nav === 0) { // checks whether that day is current day, special outline for current day
                daySquare.id = 'currentDay';
            }

            if(curr_day.length !== 0) { // creating a new div under the day and adding the event to it
                for(var j = 0; j < curr_day.length; j++) {
                    const eventDiv = document.createElement('div');
                    eventDiv.classList.add('event');
                    if(curr_day[j].thingyType === "Assignment") eventDiv.classList.add('assignment');
                    else if(curr_day[j].thingyType === "Test") eventDiv.classList.add('test');
                    else if(curr_day[j].thingyType === "Homework") eventDiv.classList.add('homework');
                    eventDiv.innerText = curr_day[j].thingy.title;
                    daySquare.appendChild(eventDiv);
                }
            }

            daySquare.addEventListener('click', () => openModal(dayString)); // checks for clicks
        } 
        else {
            daySquare.classList.add('padding'); // adds padding attributes
        }

        calendar.appendChild(daySquare); // adds the square to the calendar
        curr_day = []; // resets the curr_day array
    }
}

function resetDropdownBox() { // closes the dropdown boxes
    for(let i = 0; i < dropdownID.length; i++) {
        dropdownBox[i].style.display = 'none';
    }
}

function resetDropdownId() { // makes sure the inside of the dropdown is null when you close the modal
    for(let i = 0; i < dropdownID.length; i++) {
        dropdownID[i].innerText = "None";
    }
}

function closeModal() { // closes all the modals and sets all the values to null
    defaultEventModal.style.display = 'none';  
    newEventModal.style.display = 'none';
    backDrop.style.display = 'none'; // closes the backdrop
    clicked = null;  // no longer clicked
    eventTitleInput.value = '';
    eventList.innerHTML = '';
    deleteEventModal.style.display = 'none';
    load();
}

function openCreateModal() { // opens the modal to create a new event
    newEventModal.style.display = 'block';
    resetDropdownId();
    resetDropdownBox();
    newEventSpecs.style.display = 'none';
    load();
}

function changeEventType(type, text) { // calls when you click on one of the event types in dropdown, changes the type
    if(type === "eventType") {
        eventTypePar.innerText = text;
        newEventSpecs.style.display = 'block';
    }

    
    resetDropdownBox();
}

function openDropdownBox(i) { // opens the dropdown box
    dropdownBox[i].style.display = 'block';
}

function addEvent() { // adds event
    if(eventTitleInput.value !== "") {
        if(eventTypePar.innerText === "Assignment") var newEvent = new assignment(clicked, eventTitleInput.value); // custom type
        else if(eventTypePar.innerText === "Test") var newEvent = new test(clicked, eventTitleInput.value);
        else if(eventTypePar.innerText === "Homework") var newEvent = new homework(clicked, eventTitleInput.value);
        else var newEvent = new specialEvent(clicked, eventTitleInput.value);

        const eventObj = {
            title: eventTitleInput.value,
            date: clicked,
            type: eventTypePar.innerText
        };

        fetch('http://localhost:3000/api/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(eventObj)
        })
        .then(() => {
            closeModal();
            loadEventsFromBackend(); // reload from backend
        });

        closeModal(); 
        load();
    }
}

function deleteEvent() { // deletes the event from the events list
    fetch(`http://localhost:3000/api/events/${encodeURIComponent(delEvent.thingy.title)}`, {
        method: 'DELETE'
    })
    .then(() => {
        closeModal();
        loadEventsFromBackend();
    });
}


function initButtons() { // gives purpose to all the buttons and dropdowns
    document.getElementById('nextButton').addEventListener('click', () => {
        nav++;
        load();
    }); 
    document.getElementById('backButton').addEventListener('click', () => {
        nav--;
        load();
    });

    document.getElementById('closeButton').addEventListener('click', closeModal);
    document.getElementById('createButton').addEventListener('click', openCreateModal);
    document.getElementById('cancelButton').addEventListener('click', closeModal);
    document.getElementById('saveButton').addEventListener('click', addEvent);
    document.getElementById('exitButton').addEventListener('click', closeModal);
    document.getElementById('confirmButton').addEventListener('click', () => {
        deleteEvent();
        closeModal();
    });

    for(let i = 0; i < divs.length; i++) {
        divs[i].addEventListener('click', () => changeEventType(divs[i].id, divs[i].innerText));
    }

    for(let i = 0; i < dropdownID.length; i++) { // adds click listeners to dropdowns
        dropdownID[i].addEventListener('click', () => openDropdownBox(i));
    }
}

async function loadEventsFromBackend() {
  try {
    const response = await fetch('http://localhost:3000/api/events');
    const data = await response.json();

    events = data.map(e => {
        let thingy;

    switch (e.type) {
        case 'Assignment':
        thingy = new assignment(e.date, e.title);
        break;
        case 'Test':
        thingy = new test(e.date, e.title);
        break;
        case 'Homework':
        thingy = new homework(e.date, e.title);
        break;
        default:
        thingy = new specialEvent(e.date, e.title);
    }

    return {
        thingy,
        thingyType: e.type
    };
    });


    load();
  } catch (error) {
    console.error('Failed to load events:', error);
  }
}


initButtons();
loadEventsFromBackend();