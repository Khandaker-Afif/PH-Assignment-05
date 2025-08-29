# Emergency Service Directory

I build this project which is a web-based Emergency Service Directory. It provides quick access to important government and NGO services in Bangladesh. Users can view services, copy phone numbers, make calls (simulated), and track their call history.

The project uses **HTML**, **CSS**, and **JavaScript** with dynamic DOM manipulation and also local storage for persistent state.

---

## Features

- Responsive design for desktop and mobile.
- This webpage shows the emergency service cards with icons, phone numbers, and categories.
- It remain with favorite button (Heart) and copy number functionality.
- It can produce call simulation with coin deduction.
- It has also the call history tracking with clear history option.

---

## How It Works

The app uses JavaScript to dynamically generate service cards and update UI elements like hearts, coins, and copies. Event delegation is used to handle button clicks efficiently. State is saved to `localStorage` so that the app remembers someone's (users) actions across sessions.

---

## Questions & Answers

### 1. Difference between `getElementById`, `getElementsByClassName`, and `querySelector` / `querySelectorAll`

Ans: Difference between them is given below:

- **`getElementById(id)`**  
  It returns a single element with the given `id`and also Fast and commonly used for unique elements.  
  Example: 
  ```Js
  const header = document.getElementById('cardsArea');
  '''
- **`getElementsByClassName(className)`**  
  It returns a live HTMLCollection of elements with the specified class. Multiple elements can be selected by this.   
  Example: 
  ```Js
  const cards = document.getElementsByClassName('card');
  ```

- **`querySelector(selector)`**  
  It returns the first element that matches a CSS selector. it's more flexible than `getElementById` and `getElementsByClassName`.  
  Example:
  ```Js 
  const firstCard = document.querySelector('.card');
  ```

- **`querySelectorAll(selector)`**  
  It returns a static NodeList of all elements matching the CSS selector.It Can be iterated using `forEach`.  
  Example:
  ```JS
  const allCards = document.querySelectorAll('.card');
  ```

---

### 2. How to create and insert a new element into the DOM

Ans: To create a new element into the DOM user have to use `document.createElement`.Then have to set its properties, classes, or innerHTML.After that user have to insert it into the DOM using `appendChild`, `prepend`, or `insertBefore`.

Example:
```js
const newCard = document.createElement('div');
newCard.className = 'card';
newCard.textContent = 'New Emergency Service';
cardsArea.appendChild(newCard);
```

---

### 3. What is Event Bubbling and how does it work

Ans : Event bubbling is when an event on a child element propagates up through its parent elements. 
For example, if I click a button inside a card, the click event first triggers on the button, then on its parent elements 
(like the card and `cardsArea`).

```js
cardsArea.addEventListener('click', () => console.log('cardsArea clicked'));
```
It occurs by clicking a button inside `cardsArea` would trigger both the button and `cardsArea` click events.

---

### 4. What is Event Delegation in JavaScript? Why is it useful

Ans: Event delegation is a technique where a single event listener is added to a parent element to handle events for its child elements. 

This is efficient because I don’t need to attach listeners to each child separately. It works well with dynamic content.

Example from this project:
```js
cardsArea.addEventListener('click', (ev) => {
  const btn = ev.target.closest('button');
  if (!btn) return; 
});
```
 This allows buttons added later dynamically to still be functional.

---

### 5. Difference between `preventDefault()` and `stopPropagation()`

Ans: Difference between them is given below:

- **`preventDefault()`**  
  It stops the browser’s default action for an event. Example: Prevent a form from submitting or a link from navigating.
  ```js
  form.addEventListener('submit', (e) => e.preventDefault());
  ```

- **`stopPropagation()`**  
  Stops the event from bubbling up to parent elements. Useful to isolate events so parent listeners aren’t triggered.
  ```js
  button.addEventListener('click', (e) => e.stopPropagation());
  ```

---

### Usage Instructions

1. Clone the repository.
2. Open `index.html` in a browser.
3. Interact with the cards:
   - Click **favorite (heart icon)** to increase hearts.
   - Click **copy button** to copy the phone number.
   - Click **call button** to simulate a call and deduct coins.
4. Track call history in the sidebar.
5. Clear history using the **Clear button** button.

