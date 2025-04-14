#Write a shell script to find factorial of given number n.

read -p "Enter a number: " num
count=1
fact=1
while [ $count -le $num ]
    do 
        fact=$((count * fact))
        count=$((count + 1))
    done
echo "Factorial of $num is $fact"