Create bed_dvd_root user:
At the navigation, select "Users and Privileges" under "Management"
Under "Login", click "Add Account" 
Enter the information and click "Apply"

Give all privileges to bed_dvd_root:
Under "Users and Priveleges", select bed_dvd_root, then "Administrative Roles"
Check all the boxes for the roles and select "Apply"

Set up a new connection:
Go to MySQL Connections and click the plus button to create a new connection
Enter the information and click "OK"

Connect to MySql Server:
Click on the newly created connection
Enter the password nd click "OK"

Create bed_dvd_db schema:
Right-click the empty space at "SCHEMAS" and select "Create Schema"
Enter the name of the schema to create and select "Apply"

Run sakila_bed.sql:
Under "File", select "Open SQL Script", open sakila_bed.sql
Run the SQL script and refresh the schemas