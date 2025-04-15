read -p "Enter a first number : " first
read -p "Enter a second number : " second
read -p "Enter a third number : " third

if [ $first -gt $second ] && [ $first -gt $third ]; then
    echo "$first is the largest number"
elif [ $second -gt $first ] && [ $second -gt $third ]; then
    echo "$second is the largest number"
else
    echo "$third is the largest number"
fi