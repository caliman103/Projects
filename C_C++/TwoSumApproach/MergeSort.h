#ifndef MERGESORT_H
#define MERGESORT_H

#include <vector>

using namespace std;

class MergeSort
{
public:
    MergeSort(){};
    void mergeSort(vector<int> &vec);
    void merge(vector<int>, vector<int>, vector<int>&);
};

void MergeSort::mergeSort(vector<int> &vec)
{
    int vecSize = vec.size();
    if (vecSize <= 1)
        return; // base case

    // declare sub vectors
    vector<int> leftVector, rightVector;
    leftVector = rightVector = {};

    // declare variables used to populate sub vectors
    int i = 0;
    int middle = vecSize / 2;

    // populate sub vectors;
    for (i; i < vecSize; i++)
    {
        if (i < middle)
        {
            leftVector.push_back(vec[i]);
        }
        else
        {
            rightVector.push_back(vec[i]);
        }
    }

    mergeSort(leftVector);
    mergeSort(rightVector);
    merge(leftVector, rightVector, vec);
}

void MergeSort::merge(vector<int> leftVector, vector<int> rightVector, vector<int> &vec)
{
    // get vector sizes;
    int vecSize = vec.size();
    int leftSize = vecSize / 2;
    int rightSize = vecSize - leftSize;

    // declare indexes used for sorting
    int leftIndex, rightIndex, vecIndex;
    leftIndex = rightIndex = vecIndex = 0;

    // repopulate original vector while the sub vectors have elements
    while (leftIndex < leftSize && rightIndex < rightSize)
    {
        // determine which element to add (sorting done here)
        if (leftVector[leftIndex] < rightVector[rightIndex])
        {
            vec[vecIndex] = leftVector[leftIndex];
            vecIndex++;
            leftIndex++;
        }
        else
        {
            vec[vecIndex] = rightVector[rightIndex];
            vecIndex++;
            rightIndex++;
        }
    } // end while

    // add in any extra elements left from the sorting while
    while(leftIndex < leftSize)
    {
        vec[vecIndex] = leftVector[leftIndex];
        vecIndex++;
        leftIndex++;
    }

    while(rightIndex < rightSize)
    {
        vec[vecIndex] = rightVector[rightIndex];
        vecIndex++;
        rightIndex++;
    }
}

#endif