#include <iostream>
#include <vector>
using namespace std;

void updateweights(vector<int> &arr);

int main()
{
    vector<int> arr = {3, 5, 2, 7, 8, 10, 9, 6};
    updateweights(arr);
    return 0;
}

void updateweights(vector<int> &arr) {
    if (arr.size() == 2)
    {
        return;
    }
    int max = 0, secondMax = 0;

    for (int i = 1; i < arr.size(); i++)
    {
        if (arr[i] > arr[max]) // needs optomising/fixing
        {
            secondMax = max;
            max = i;
        }
        else if (arr[i] > arr[secondMax])
        {
            secondMax = i;
        }
    }

    cout << arr[max] << " => " << arr[secondMax] << endl;
        for (int elem : arr)
    {
        cout << elem << " ";
    }
    cout << endl;

    arr[max] -= arr[secondMax];
    if(secondMax == arr.size() -1) {
    arr.erase(arr.end());
    } else {
        arr.erase(arr.begin() + secondMax);
    }
    

    updateweights(arr);
}