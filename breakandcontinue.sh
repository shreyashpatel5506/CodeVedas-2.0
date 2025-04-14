#!/bin/bash

# Example of break and continue in a for loop

for i in {1..10}; do
    if [ "$i" -eq 5 ]; then
        echo "Skipping number $i"
        continue
    fi

    if [ "$i" -eq 8 ]; then
        echo "Breaking the loop at number $i"
        break
    fi

    echo "Processing number $i"
done

echo "Loop completed."