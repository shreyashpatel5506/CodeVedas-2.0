read -p "Enter a mark of OS:" os
read -p "Enter a mark of DBMS:" dbms
read -p "Enter a mark of DS:" ds

sum=$((os + dbms + ds))
avg=$((sum / 3))
echo "Sum of marks is: $sum"
echo "Average of marks is: $avg"
echo percentage is $((avg * 100 / 100))