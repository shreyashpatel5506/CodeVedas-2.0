#untill loop run till then any condition is false 

count=0
num=10

until [ "$count" -ge "$num" ];
do
  echo "Count is $count"
  count=$((count + 1))
done