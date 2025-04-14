function greet {
    echo "Hello $1 $2"
}

myFun() {
    echo "Hello $1 $2"
}

echo "now calling both functions"
greet
myFun
echo "now calling both functions with arguments"
greet "Shreyash"
myFun "Shreyash"
echo "now calling both functions with arguments and passing them to another function"
greet "Shreyash" myFun
myFun "Shreyash" greet    