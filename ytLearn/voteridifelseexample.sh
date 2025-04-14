read -p "Enter your age:" age

if [ $age -ge 18 ]
then 
    echo "you are eligible for voting"
else
    echo "you are not eligible for voting"
fi

