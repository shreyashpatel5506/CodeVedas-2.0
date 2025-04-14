echo "enter a choice between 1-7 for fetching a day"
echo "Sunday(1),Monday(2),Tuesday(3),Wednesday(4),Thursday(5),Friday(6),Saturday(7)"

read -p  "Enter choice:--" choice

case $choice in
    1)echo "Sunday";;
    2)echo "Monday";;
    3)echo "Tuesday";;
    4)echo "Wednesday";;
    5)echo "Thursday";;
    6)echo "Friday";;
    7)echo "Saturday";;
    *)echo "Enter a valid choice"
esac