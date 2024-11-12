#include <iostream>
#include <vector>
using namespace std;

// declare first so we can use this functions inside main
void integer_square_pair(int x, int y);
void divisible_by_ten();
void find_max_even_num();
void find_max_and_avg();

int main()
{
    cout << "From 1 to 20, count and find its square" << endl;
    integer_square_pair(1, 20);
    cout << endl;

    cout << "Count numbers that are divisible by ten" << endl;
    divisible_by_ten();
    cout << endl;

    cout << "Find highest even number in 5 numbers" << endl;
    find_max_even_num();
    cout << endl;

    cout << "Find highest number and average in 7 numbers" << endl;
    find_max_and_avg();

    return 0;
}

void integer_square_pair(int x, int y)
{
    // from the parameters (x and y)
    // we start from x then end on y
    // example: x = 1, y = 20, so 1 to 20
    for (int i = x; i <= y; i++)
    {
        cout << i << " " << i * i << endl;
        // i * i, basically means 1*1, 2*2, 3*3, ... and so on until 20
    }
}

void divisible_by_ten()
{
    // declare bases so we can use them in the loop
    int number;
    int count = 0;

    // loops 5 times
    for (int i = 0; i < 5; i++)
    {
        // prompt user for a number
        cout << "Enter number: ";
        cin >> number;

        // in each loop, it checks if it is divisible by 10
        // modulo operator (%) checks if there is a remainder
        // so we check if it has no remainder
        if (number % 10 == 0)
        {
            // if it is, then we add the count of even numbers
            count += 1;
        }
    }

    cout << "Count: " << count << endl;
}

void find_max_even_num()
{
    int number;
    vector<int> numbers;

    for (int i = 0; i < 5; i++)
    {
        cout << "Enter number: ";
        cin >> number;

        // this just adds the number to vector<int>
        // it's kinda like a dynamic array
        numbers.push_back(number);
    }

    // need this to reference the first number of the array
    int max_num = numbers[0];

    // this is a for each loop
    // we don't need to assign the start and end
    // because it references the length/size of the array
    for (auto number : numbers)
    {
        // we check if the number is even by using the modulo operator
        // and we also check if it is higher than the first number of array
        if (number % 2 == 0 && number > max_num)
        {
            // if it is, replace the number to the current number
            // because it is now the highest number
            max_num = number;

            // then it repeats the logic, until it has looped thru all numbers
        }
    }

    cout << "Highest even number: " << max_num << endl;
}

void find_max_and_avg()
{
    int number;
    vector<int> numbers;

    for (int i = 0; i < 6; i++)
    {
        cout << "Enter number: ";
        cin >> number;

        numbers.push_back(number);
    }

    int max_num = numbers[0];

    // declare this but we will replace this later
    int sum = 0;

    for (auto number : numbers)
    {
        // check if number is higher than the first number in array
        if (number > max_num)
        {
            // then make it the highest number
            max_num = number;
        }

        // while looping, we add the current number to the sum
        // so for example, current number is 5 then sum = 0 + 5
        // then just loops again
        sum += number;
    }

    double avg = static_cast<double>(sum) / numbers.size();
    cout << "Highest number: " << max_num << endl;
    cout << "Average: " << avg;
}