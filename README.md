# Topcoder Notifier

The core of this app is to run tasks periodically. This app specializes in collecting data from Topcoder API and emails any new data to registered emails. The user should be able to customize the data being watched. For now, this app is designed to only serve 1 user. Therefore, no database is planned to be used to keep it light.

### Core Features (in prioritized order)

1. The app should be able to email user about new challenges (with specific hard-coded technologies) as soon as possible.
  - [x] Implement a working task runner.
  - [ ] Implement challenges API query task.
  - [ ] Implement latest challenge separation.
  - [ ] Implement 3 different challenges API query tasks.
  - [ ] Implement email function.
2. The app should have front-end that shows all latest challenges (with specific hard-coded technologies).
  - [ ] Implement a working front-end.
  - [ ] Implement task controller with get operation.
  - [ ] Implement task data display.
  - [ ] Implement socket.io to periodically update data on front-end.
3. The user should be able to customize the app.
  - [ ] Implement complete CRUD functionality for tasks.
  - [ ] Implement config customization.
