read -p "Enter beginning number: " start
read -p "Enter ending number: " end

for (( i=$start; i<=$end; i++ ))
    do 
    is_prime=1
        for (( j=2; j<=$i/2; j++ ))
            do
                if [ $(( i%j )) -eq 0 ]; then
                    is_prime=0
                    break
                fi
            done
    
        if [ $is_prime -eq 1 ]; then
            echo "$i is a prime number"
    
        fi
    done