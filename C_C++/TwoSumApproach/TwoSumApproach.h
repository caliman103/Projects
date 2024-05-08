#ifndef TWOSUMAPPROACH_H
#define TWOSUMAPPROACH_H

#include <vector>

using namespace std;

class TwoSumApproach
{
public:
    TwoSumApproach() {}
    void getIndexes(vector<int> &result, vector<int> vec, int sum);
};

void TwoSumApproach::getIndexes(vector<int> &result, vector<int> vec, int sum) {
    //declare indexes
    int index1, index2;
    
    //get index values
    index1 = 0;
    index2 = vec.size() -1;

    while(index1 < index2) 
    {
        if(vec[index1] + vec[index2] == sum)
        {
            result.push_back(vec[index1]);
            result.push_back(vec[index2]);
            return;
        }

        if(vec[index1] + vec[index2] < sum) 
        {
            index1++;
        }
        else 
        {
            index2--;
        }
    }//end while

    return;    
}


#endif