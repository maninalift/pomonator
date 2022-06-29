## This is based on...

This project was created with `create-svelte` following Joy of Code's tutorial https://joyofcode.xyz/sveltekit-authentication-using-cookies

The authentication scheme has been extended to match cookies against the id of `authentication` records in the database instead of matching cookies against the id of `user` records. This is more secure because the authentication records expire and are less likely to be leaked than the user id.

## Pomonator

This is in early stages of development and currently not usable. 

Pomonator is a student/teacher, task assignment and management application
with integrated time tracking and "pomodoro technique" style features, allowing
students to easily keep track of their work, take breaks and see where they have
spent their time.

## TODO

### Authentication TODO
- username validity - rules about the username - length, characters
- password validity?
- put validations into shared lib used on server and client
- refactor authentication into lib separate from HTTP request / response logic,
  removing duplication
- general clean up - too much repitition in code
- efficient way to protect parts of the site AND protect api routes
    - keep track of https://github.com/sveltejs/kit/issues/3912

### Application TODO
- student assignments page
    - create assignments
    - create fixed time elements
    - create timetable? (days / morning / afternoon slots)
- student tracking page
    - see what tasks student has allocated to what assignments
- task tracking page
    - list of tasks for current day, with status
        - completed
        - delayed
        - with-follow-up
    - create tasks
    - task timer
    - complete tasks
- planning page
    - create tasks from assignments¬
    - assign to specific days
- coach QoL
    - copying tasks between weeks and between students, multiple assignments
- advanced extensions
    - chat ? or just do through other system
    - homework
    - coach comments on tasks, comments show up to user
- polish
    - page transitions
    - element interaction animations
    - replace forms with, `Form` sveltekit components when https://github.com/sveltejs/kit/issues/3533 is done