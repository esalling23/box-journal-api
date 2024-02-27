# box-journal-api

## Models

### Box

- date (Date)
- intention (String)
- memory (String)
- tracker[] (BoxTracker[])
- owner (User)

### BoxTracker

- tracker (Tracker)
- box (Box)
- content (BoxTrackerContent: { type, value })
- position (Number)

### Tracker

- name
- type ([Counter, Tracker, Memory])
- 

### User

- Email
- Password
