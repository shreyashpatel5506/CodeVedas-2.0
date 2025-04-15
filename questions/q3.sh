#Write a shell script which will accept a number b and display first n prime numbers as output

read -p "Enter a number: " num
count=0
i=2

while [ $count -lt $num ]; do
    is_prime=1
    for ((j=2; j<=i; j++)); do
        if [ $((i % j)) -eq 0 ]; then
            is_prime=0
            break
        fi
    done
    if [ $is_prime -eq 1 ]; then
        echo $i
        count=$((count + 1))
    fi
    i=$((i + 1))
done
