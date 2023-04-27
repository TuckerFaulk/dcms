# HAVS|CALC|DB - Database for Risk Assessing Vibration

<!-- ![Am I Responsive Image](static/readme_images/am_i_responsive.jpg) -->

The live link for the site can be found here - https://project5-dcms-react.herokuapp.com/

# Table of Contents
<!-- - [Overview](#overview)
- [UX](#ux)
  - [Strategy](#strategy)
  - [Scope](#scope)
  - [Structure](#structure)
  - [Skeleton](#skeleton)
  - [Surface](#surface)
- [Languages Used](#languages-used)
- [Features](#features)
  - [Existing Features](#existing-features)
  - [CRUD](#crud)
  - [Other Features](#other-features)
  - [Future Features](#future-features)
- [Testing](#testing)
  - [Automated Testing](#automated-testing)
  - [Manual Test of User Stories](#manual-test-of-user-stories)
  - [Test on Alternative Browsers and Screen Size](#test-on-alternative-browsers-and-screen-size)
  - [Debugging](#debugging)
  - [Validator Testing](#validator-testing)
  - [Unfixed Bugs](#unfixed-bugs)
- [Libraries and Programs Used](#libraries-and-programs-used)
- [Deployment](#deployment)
- [Credits](#credits)
  - [Content](#content) -->

# Overview

This site was developed to address a problem which occurred during my previous employment as a Senior Account Manager for a Health and Safety Consultancy. 

# UX

This site was created respecting the Five Planes Of Website Design:

## Strategy

**Typical User**

<!-- *Site User*

A typical Site User would be a line manager responsible for the health and safety of their colleagues who are exposed to vibration as part of their duties. They will be required to assess the vibration risk exposed to their colleagues and will do this by completing a risk assessment. 

*Site Admin*

A typical Site Admin may be a Health and Safety Manager or a Director within a medium to large organisation whose employees are exposed to vibration as part of their duties. This company may have 100s of employees required to complete a vibration risk assessment on their behalf and/or have 100s of type of vibration equipment which their employees may use as part of their daily tasks. -->

**User Stories** 

As seen above, there will only be two different types of user of this site (Site User and Site Admin). I have broken down my user stories into these two categories:

<!-- *As a Site User:*

| Epic   |   ID   |      User Story     |  Story Points |
|--------|:------:|:--------------------|:-------------:|
|Calculator|1A|**View Calculator**: I can View the Calculator so that I can start to assess the vibration exposure of a new task.|4|
||1B|**Add Equipment to Calculator**: I can Add Equipment to a new Project so that I can include the equipment being used during a task to then assess the vibration exposure.|2|
||1C|**View Calculator Equipment Details**: I can View Calculator Equipment Details so that I can view the partial exposure limits of the item.|3|
||1D|**Edit Equipment Details in Calculator**: I can Edit Equipment Details in an Existing Project so that I can update equipment details where the duration of use has changed.|2|
||1E|**Delete Equipment in Calculator**: I can Delete Equipment in an Existing Project so that I can remove equipment which my no longer be used in a task.|2|
||1F|**Reset Calculator**: I can Reset Calculator so that I can assess a new task.|1|
||1G|**Calculate Exposure Details**: I can Calculate Exposure Details so that I can assess the overall exposure to vibration of a task.|3|
|Equipment (Site User)|2A|**View Equipment List**: I can View the Equipment List so that I can ensure the equipment needed for their calculation us available.|4|
||2B|**View Equipment Details**: I can View Equipment Details so that I can view the exposure limits of various items and decide which equipment is the safest to use.|3|
|Supplementary Site Features|3A|**Account Registration**: I can Register an Account so that I can access the system to assess a task with the calculator.|4|
||3B|**Equipment Pagination**: I can View a Paginated List of Equipment so that I can easily find equipment and view it's details.|1|

*As a Site Admin:*

| Epic   |   ID   |      User Story     |  Story Points |
|--------|:------:|:--------------------|:-------------:|
|Equipment (Site Admin)|4A|**Add equipment**: I can Add Equipment so that It is available for a user to included it within a calculator.|3|
||4B|**Edit Equipment Details**: I can Edit Equipment Details so that The most up to date information is available to the user.|1|
||4C|**Delete Equipment**: I can Delete Equipment so that It is no longer available to be used in a calculator.|1|
||4D|**Add Categories**: I can Add a Category so that It is available to be allocated to equipment.|3|
||4E|**Edit Categories**: I can Edit a Category so that The correct category can be allocated to equipment.|1|
||4F|**Delete Categories**: I can Delete a Category so that It is no longer available to be allocated to equipment.|1| -->

<!-- The objectives of this site are to:

- Make it quicker and easier for the user to assess a vibration task as all of the information is in a central accessible place
- Improve the users selection of equipment as they are able to decide to use a tool with a lower magnitude now that this information is available to them
- Reduce mistakes from potentially transferring incorrect information from testing reports or manufacturer's instructions
- Improve the uptake of employees assessing their vibration tasks given all of the information will be available to them and it easy to use
- Create a place for the management of company equipment. The database provides a central database of tools so the company is aware of what is being used within the business.  -->

## Scope

<!-- An MVP (Minimum Viable Product) approach was taken to the development of this site. The main features deemed as basic requirements for this site where:

- Account Registration
- CRUD Functionality (Both Site User and Site Admin)
- Device Responsiveness

For detailed explanation of all existing features see [Existing Features](#existing-features). While [Future Features](#future-features) where still within the possible scope of this project, they were deemed unnecessary at this point in time. -->

## Structure

**Site Navigation Flowchart**

<!-- ![Flowchart](static/readme_images/flowchart.jpg) -->

## Skeleton

**Wireframes**

*Index Page*

<!-- ![Index Page Wireframe](static/readme_images/index_wireframe.jpg) -->

**Database Schema**

<!-- After initially setting out all of the information required for the site, I used data normalisation to structure each relational model to help reduce data redundancy and improve data integrity.

![Database Schema](static/readme_images/data_schema.jpg)

*Class Functions and JavaScript Functions*

To further improve data integrity, I decided to create class functions which calculated data values rather than storing this information in each model. As the user was able to update instances within the models which the outcome of the class function calculations were dependant on, keeping these separate from the model meant that only one instance within the model required updating.

This is also inclusive of the JavaScript Functions which update the users calculator page. These functions have been written in JavaScript rather than in the Django Calculator Model as the information required for these calculations can be multiple instances of equipment in users calculator. -->

## Surface

**Visual Design**

<!-- I selected 'Raleway' as the main font style to keep the website simple. The logo font of 'Permanent Marker' was used to add some style to the site. This font has also been used for the text links in the nav and for headings to maintain design continuity.

The heading background colour of light blue (rgb(108, 171, 221)) was also selected to keep with the minimalist style. I wanted to keep the main background white but then use the colours of the heading background for table headings to ensure that they were the main central focus of the page. Different colours have been used for the buttons on the site to make these easily distinguishable.

Icons were added to buttons throughout the site to aid the understanding of the functionality of that button. -->

# Agile Methodology

An Agile approach was taken for the management of this project. 

<!-- - User stories were written for each of the sites features. These included details of both acceptance criteria and the a list of tasks required to complete them.
- The user stories where then managed in a Kanban board which was created in [GitHub Projects](https://github.com/users/TuckerFaulk/projects/4/views/1?visibleFields=%5B%22Title%22%2C%22Assignees%22%2C%22Status%22%2C%22Labels%22%2C%22Milestone%22%5D). The kanban board was split into three columns: To do, In Progress, and Done.
- User stories were then prioritized with the MoSCoW approach and labels where used to manage this. -->

# Languages Used

<!-- - HTML
- CSS
- JavaScript
- JQuery
- Python
- Django
- Unittest (Django’s unit tests Python standard library module)
- SQL (PostgreSQL) -->

# Features

## Existing Features

### Home Page

- The home page provides context of what the site does and how it can provide benefit to the user.

<!-- ![Home Page](static/readme_images/home-page.jpg) -->

### Logo

<!-- ![Logo](static/readme_images/logo.jpg) -->

### Navigation

*User - Logged Out*

<!-- ![Navigation](static/readme_images/navbar_logged_out.jpg) -->

*User - Logged In*

<!-- ![Navigation - User Logged In](static/readme_images/navbar_logged_in.jpg) -->

*Mobile*

<!-- ![Navigation - Mobile](static/readme_images/navbar_mobile.jpg) -->

### Favicon

<!-- ![Favicon](static/readme_images/android-chrome-192x192.png) -->





## CRUD

CRUD (Create, Read, Update, and Delete) functionality has been at the centre of the design for this website and these features have been included for both of the typical users:

**Site User:**

<!-- - CREATE: A site user can add equipment to their calculator
- READ: A site user can view equipment details in their calculator and also in the equipment list
- UPDATE: A site user can edit details of equipment in their calculator
- DELETE: A site user can delete equipment from their calculator -->

**Site Admin:**

<!-- - CREATE: A site admin can add equipment/categories to the equipment/categories list through the admin site
- READ: A site admin can view details of equipment in the equipment list through the admin site
- UPDATE: A site admin can edit equipment/categories in the equipment/categories list through the admin site
- DELETE: A site admin can delete equipment/categories from the equipment/categories list through the admin site -->

## Other Features


## Future Features

<!-- - **Add Projects:** As a Site User I can Add a Project so that instead of resetting my calculator for a new task, I can create a new project and add to a new calculator (saving ones previously created to go back to). -->

# Testing

## Manual Test of User Stories



## Test on Alternative Browsers and Screen Size

|   Test   |   Small (≥576px) |  Medium (≥768px)   |   Large (≥992px)   |   Functionality (Pass)   |
|----------|:----------------:|:------------------:|:------------------:|:------------------------:|
|Chrome    |      ☑           |         ☑         |         ☑         |            ☑             |
|Safari    |      ☑           |         ☑         |         ☑         |            ☑             |
|Firefox   |      ☑           |         ☑         |         ☑         |            ☑             |
|Edge      |      ☑           |         ☑         |         ☑         |            ☑             |

## Debugging



## Validator Testing

- HTML: All html files were input into the checker and the Jinja code was removed to avoid errors. No errors were returned when passing through the official W3C HTML validator. 

<!-- ![HTML W3C Validator](static/readme_images/html-w3c-validator.jpg) -->

- CSS: No errors were found when passing through the official W3C CSS validator.

<!-- ![CSS W3C Validator](static/readme_images/css-validation.jpg) -->

- JSHint: No errors were found when passing through the JSHint validator.

<!-- ![JSHint](static/readme_images/jshint.jpg) -->

- CI Python Linter: No errors were returned when passing through the Code Institute Python Linter.

<details>
<summary>Calculator - CI Python Linter Screenshots</summary>

<!-- *admin.py*

![Admin - CI Python Linter](static/readme_images/admin-ci-linter.jpg)

*apps.py*

![Apps - CI Python Linter](static/readme_images/apps-ci-linter.jpg)

*forms.py*

![Forms - CI Python Linter](static/readme_images/forms-ci-linter.jpg)

*models.py*

![Models - CI Python Linter](static/readme_images/models-ci-linter.jpg)

*urls.py*

![URLs - CI Python Linter](static/readme_images/urls-ci-linter.jpg)

*views.py*

![Views - CI Python Linter](static/readme_images/views-ci-linter.jpg) -->

</details>
<br/>
<details>
<summary>Havscalcdb - CI Python Linter Screenshots</summary>

*urls.py*

<!-- ![URLs - CI Python Linter](static/readme_images/urls-havscalcdb-ci-linter.jpg) -->

</details>
<br/>

- Lighthouse (Accessibility Audit): The page achieved a great accessibility performance.

<!-- ![Lighthouse Accessibility Audit](static/readme_images/lighthouse.jpg) -->

## Unfixed Bugs



## Libraries and Programs Used

<!-- - Github: Store Repository
- Gitpod: IDE
- Heroku: Site Deployment
- Cloudinary: Serving static media files
- ElephantSQL: PostgreSQL database hosting
- Google Chrome, Microsoft Edge, Mozilla Firefox, Safari: Site testing on alternative browsers
- Chrome Dev Tools: Debugging and CSS testing of the site
- Microsoft OneNote: Planning notes for the project
- Microsoft Whiteboard: Developing wireframes
- Am I Responsive: Screenshots of the final project for the README file
- Lucid Charts: Planning the site process with a flow diagram
- Adobe Photoshop: Photo editing
- Bootstrap: CSS Styling
- Google Fonts: for the font families
- Font Awesome: to add icons to the site
- Real Favicon Generator: Creating Favicon -->

**Installed Packages**

<!-- - Cloudinary (1.30.0)
- Dj-database-url (0.5.0)
- Django (3.2.16)
- Django-allauth (0.51.0)
- Django-crispy-forms (1.14.0)
- Gunicorn (20.1.0)
- Psycopg2 (2.9.5)
- Coverage (7.0.5) -->

# Deployment

This project was deployed on Heroku using Code Institute's Videos. After creating a GitHub repository, the steps taken to create the Heroku App were:

# Credits

I have again enjoyed learning with the Code Institute and completing my fifth assignment. I would like to thank my mentor Martina for her support, the CI Student Support Team and the CI Slack Community. Finally a big thank you to my girlfriend and little sister for their help with testing and the review of this site.

## Content

**Resources Used:**

- Code Institutes Videos

**Images:**

*Jumbotron Image*

<!-- - [Jackhammer](https://www.istockphoto.com/photo/working-on-a-road-construction-gm164526286-23495173) -->



[Back to Top](#table-of-contents)