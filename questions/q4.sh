#Write a shell script which will generate first n fibonnacci numbers like: 1, 1, 2, 3, 5, 13

a=0
b=1
read -p "Enter a number: " num

for ((i=0; i<num; i++))
    do
        echo $b
        fn=$((a + b))
        a=$b
        b=$fn
    done
