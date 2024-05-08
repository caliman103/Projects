#include <iostream>
#include <string>
#include <vector>

using namespace std;

int reverseVector(vector<int>);
vector<int> addNumbers(int, int);


int main() {

    vector<int> vec1 = {3, 5, 1};
    vector<int> vec2 = {1, 6, 3};

   cout << reverseVector(addNumbers(reverseVector(vec1), reverseVector(vec2))) << endl;

    return 0;
}

int reverseVector(vector<int> vec) {

    string numberString = "";;

    for(int i = vec.size() - 1; i >= 0; i--) {
        numberString += to_string(vec[i]);
    }

    return stoi(numberString);
}


vector<int> addNumbers(int num1, int num2) {
    int sum = num1 + num2;
    vector<int> vec = {};
    while(sum > 0) {
        vec.insert(vec.begin(), sum % 10);
        sum /= 10;
    }

    return vec;
}