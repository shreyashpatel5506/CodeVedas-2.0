#!/bin/bash

read -p "Enter a date (dd-mm-yyyy): " date

# Validate the date format using regex
if [[ $date =~ ^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-[0-9]{4}$ ]]; then
    echo "Valid date format."
else
    echo "Invalid date format. Please use dd-mm-yyyy."
fi