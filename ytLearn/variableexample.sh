<<commment
# This is a simple shell script that demonstrates the use of variables and command substitution in bash.
# It defines a few variables, assigns values to them, and then prints them out.
# It also shows how to use command substitution to get the hostname of the machine.
commment


name="Shreyash"
age=22
echo "My name is $name and I am $age years old."

hostname=$(hostname)
echo "The hostname of this machine is $hostname."

<<comment
    #constant vairable example
comment

readonly constname="Shreyashpatel"
echo "My name is $constname and I am $age years old."
constname="Shreyash"
echo "My name is $constname and I am $age years old."