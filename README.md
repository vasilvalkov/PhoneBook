### Description

Application for storing an d managing contacts.

## Contacts list

This area should contain the following:

+ A table with the following columns:
	- Phone
	- Name
	- City
	- Gender
	- Links/Buttons for:
		+ Preview
		+ Edit
		+ Delete
+ Button for adding a new contact
+ Button for importing contacts

There should be options for filtering and sorting the contacts in the table. Using third-party ready-made grid component/widgets is not permitted.

## Add/Edit contact option

This area should contain form fields with the following requirements:

| field | required? | Description |
|-------|-----------|-------------|
| phone | yes       | Phone numbers must start either with '+' or with '0' and the next characters can only be digits. Number length should be between 5 and 12 digits. Duplicate records are not allowed. |
| name  | yes       | Text with no restricted symbols, with length up to 30 characters. Duplicate records are not allowed. |
| city  | no        | Text with no restricted symbols, with length up to 30 characters. |
| gender| yes       | 
| sign  | no        | Zodiac signs predefined in a combo box. |
| note  | no        | Text with no restricted symbols, with length up to 500 characters. |

## Preview area

This area should visualize all data for a chosen contact as text (read-only). Buttons for edition and deletion of the previewd contact should alse be displayed.

## Import contacts area

This area should contain a big multiline textarea, in which the user can type or paste formatted (TAB-deliminated) data for many contacts which will be imported at once.

The data must be formatted this way:
+ Every record should be on a new line
+ The fields of a single record are separated with a single TAB in the following order:
	- phone
	- name
	- city
	- gender 
	- sign
	- note

## Other

For simplicity, no database server should be used to store the contacts. The browser's localStorage can be used instead.

The application should work on the most modern browsers (Chrome, FireFox, Opera, Edge). Using third-party lightweight libraries like jQuery, Handlebars, Bootstrap is allowed, desirably through CDN.
The use of complex frameworks like React is forbridden.