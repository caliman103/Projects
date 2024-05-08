#include <iostream>
#include <vector>
#include <time.h>

using namespace std;

void mergeSort(vector<int> &);
void merge(vector<int>, vector<int>, vector<int> &);

int main()
{
    srand(time(0));

    vector<int> original = {};
    for (int i = 0; i < 100000; i++)
    {
        original.push_back(rand() % 100000000 + 1);
    }

    for (int i = 0; i < original.size(); i++)
    {
        cout << original[i] << " ";
        
    }

    cout << endl;
    cout << "SORTING HERE\n";

    mergeSort(original);

    cout << "Sorted\n";

    for (int i = 0; i < original.size(); i++)
    {
        cout << original[i] << " ";
    }
    cout << endl;

    return 0;
}

void mergeSort(vector<int> &array)
{
    int length = array.size();
    if (length <= 1)
        return; // base case

    int middle = length / 2;
    vector<int> leftArray = {};
    vector<int> rightArray = {};

    int i, j;
    i = j = 0;

    for (i; i < length; i++)
    {
        if (i < middle)
        {
            leftArray.push_back(array[i]);
        }
        else
        {
            rightArray.push_back(array[i]);
        }
    }
    mergeSort(leftArray);
    mergeSort(rightArray);
    merge(leftArray, rightArray, array);
}

void merge(vector<int> leftArray, vector<int> rightArray, vector<int> &array)
{
    int leftSize = array.size() / 2;
    int rightSize = array.size() - leftSize;

    int i = 0, l = 0, r = 0; // indicies

    // check conditions for merging
    while (l < leftSize && r < rightSize)
    {
        if (leftArray[l] < rightArray[r])
        {
            array[i] = leftArray[l];
            i++;
            l++;
        }
        else
        {
            array[i] = rightArray[r];
            i++;
            r++;
        }
    }

    while (l < leftSize)
    {
        array[i] = leftArray[l];
        i++;
        l++;
    }
    while (r < rightSize)
    {
        array[i] = rightArray[r];
        i++;
        r++;
    }
}