is_palidrome() {
    str = $1
    if([ "$str" == "$(echo $str | rev)" ]); then
        echo "Palindrome"
    else
        echo "Not a palindrome"
    fi                              
}

read -p "Enter a string: " string
is_palidrome $string
