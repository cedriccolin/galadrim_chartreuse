window.onload = function(){
    // Load the navigation scripts
    burger_navigation();
}


/**
 * Function to handle burger navigation.
 *
 * @returns {void}
 */
function burger_navigation(){
    burger_opening_button();
    burger_closing_button();

    close_menu_key_shortcut();
    close_menu_by_clicking_on_background();
}

/**
 * Attaches a keyup event listener to the document body that triggers the
 * close_menu() function when the "Escape" key is released.
 *
 * @return {void}
 */
function close_menu_key_shortcut(){
    document.body.addEventListener(
        "keydown",
        (k) => {
            if (["Escape", "Home"].includes(k.code)) {
                close_menu();
            }
        }
    )
}

/**
 * Closes the menu by clicking on the background element.
 *
 * @throws {Error} If no element with the path '.opened_burger .background' is found.
 *
 * @return {void}
 */
function close_menu_by_clicking_on_background(){
    let elm = document.querySelector(".opened_burger .background");
    if (!elm) throw new Error("No element with the path '.opened_burger .background' had been found");

    elm.addEventListener("click", close_menu);
}

/**
 * Attaches a click event listener to the burger opening button element.
 *
 * @throws {Error} If no element with the id 'menu_invisible' exists.
 *
 * @returns {void}
 */
function burger_opening_button(){
    let elm = document.getElementById("menu_invisible");
    if (elm){
        elm.addEventListener("click", open_menu);
    } else throw new Error("Aucun element avec l'identifiant 'menu_invisible' n'existe")
}

/**
 * Adds a click event listener to the burger menu closing button.
 *
 * @throws {Error} If an element with the id 'menu_visible' does not exist.
 *
 * @returns {void}
 */
function burger_closing_button(){
    let elm = document.getElementById("menu_visible");
    if (elm){
        elm.addEventListener("click", close_menu);
    } else throw new Error("Aucun element avec l'identifiant 'menu_visible' n'existe")
}

/**
 * Opens the menu by adding a CSS class to the navigation element.
 *
 * @throws {Error} If no 'nav' tag exists in the document.
 *
 * @returns {void}
 */
function open_menu(){
    let nav_elm = document.querySelector("nav");
    if (!nav_elm) throw new Error("Aucune balise 'nav' n'existe.");

    nav_elm.classList.add("burger_opened");
    nav_elm.classList.remove("burger_closed");
}

/**
 * Closes the menu by adding the "burger_closed" class to the <nav> element
 * and removing the "burger_opened" class.
 *
 * @throws {Error} If no <nav> element exists in the document.
 *
 * @returns {void}
 */
function close_menu(){
    let nav_elm = document.querySelector("nav");
    if (!nav_elm) throw new Error("Aucune balise 'nav' n'existe.");

    nav_elm.classList.add("burger_closed");
    nav_elm.classList.remove("burger_opened");
}