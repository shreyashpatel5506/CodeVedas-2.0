#Write a shell script to display multiplication table of given number
read -p "Enter a number:-" num

for i in {1..10}
    do 
        echo "$i * $num = $((i * num))"
    done
