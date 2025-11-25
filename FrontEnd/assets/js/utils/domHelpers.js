/* -------------------------------------------------
   DOM Helpers — Small tools to manipulate the DOM
   ------------------------------------------------- */

/**
 * Create an element*
 */
export function createElement(tag) {
    return document.createElement(tag);
}

/**
 * Remove all children inside an element
 */
export function clearElement(el) {
    console.log("clear element");
    if (el) {
        el.innerHTML = "";
    }
}
