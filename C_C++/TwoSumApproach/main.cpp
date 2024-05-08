#include <iostream>
#include <vector>

#include "MergeSort.h"
#include "TwoSumApproach.h"

using namespace std;

void printVector(vector<int>);

int main()
{
    vector<int> vec = {1, 45, 63, 134, 53, 124, 353, 121, 41, 89, 23};
    vector<int> result = {};
    int sum = 24;

    cout << "Sum to find is " << sum << endl << endl;

    cout << "Orginal Vector:" << endl;
    printVector(vec);
    cout << endl << endl;

    MergeSort *mergeSort = new MergeSort();
    mergeSort->mergeSort(vec);
    cout << "Sorted Vector:" << endl;
    printVector(vec);
    cout << endl << endl;

    TwoSumApproach *TSA = new TwoSumApproach();
    TSA->getIndexes(result, vec, sum);

    if (result.size() == 0)
    {
        cout << "No elements in the vector = " << sum << endl;
    }
    else
    {
        cout << result[0] << " + " << result[1] << " = " << sum << endl;
    }

    return 0;
}

void printVector(vector<int> vec) {
    for (int elem : vec)
    {
        cout << elem << " ";
    }
}