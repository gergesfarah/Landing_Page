// Global variables

const navBar = document.querySelector('#navbar__list');
const sections = document.querySelectorAll('section');
const segment = document.createDocumentFragment();

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// Generate navbar from sections
function addSection() {
    

    sections.forEach((mySection) => {
        let Lists = document.createElement('li');
        let aTag = document.createElement('a');
        aTag.innerText = mySection.getAttribute('data-nav');
        aTag.setAttribute('class', 'menu__link');

        // scroll to anchor ID using scroll to event
        aTag.addEventListener("click", () => {
            mySection.scrollIntoView({behavior: "smooth"});
            });
        Lists.appendChild(aTag);
        segment.appendChild(Lists);
    });
    navBar.appendChild(segment);
};

// viewport  
function sectionInViewPort() {
    let minor = window.innerHeight;
    visibleSectionIndex = -1;

    sections.forEach((mySection, index) => {
        let myView = mySection.getBoundingClientRect();
        if(Math.abs(myView.top) < minor){
            minor = Math.abs(myView.top);
            visibleSectionIndex = index;
        }
    });
    return visibleSectionIndex;
}

function setActiveSection(){
    visibleSectionIndex = sectionInViewPort();

    // If visibleSection exists
    if(visibleSectionIndex != -1){
        // create a list of Atags from navigation menu
        let Menu = document.querySelectorAll('.menu__link');

        // Loop through all section
        for (let i = 0; i < sections.length; i++) {
            // For section in viewport: Add active state to the section and navigation
            if (i == visibleSectionIndex){
                sections[i].classList.add('your-active-class');
                Menu[i].classList.add('your-active-class');
            }
            // For other sections: Remove active state from the section and navigation
            else{
                sections[i].classList.remove('your-active-class');
                Menu[i].classList.remove('your-active-class');
            }
        }; 
    };
}

// Build navigation menu
addSection();

// Set sections as active (highlight section and nav if section is in viewport)
document.addEventListener('scroll', setActiveSection);