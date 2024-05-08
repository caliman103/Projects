#include <iostream>
#include <fstream>
#include <string>
#include <sstream>
#include <algorithm>
#include <cstdlib>
#include <ctime>
#include <vector>
#include <map>

using namespace std;

void readFile(string filePath);
void trim(string &word);
bool isWord(string word);
bool checkPalindrome(string word);
void updateWordCount(map<string, int> &myMap, string word);
void duplicateVector(vector<int> vecToDuplicate, int vecSize, int duplicates);

int main()
{
    srand(static_cast<unsigned int>(time(nullptr)));
    string filePath = "";
    cout << "Enter the path to the file below:\n";
    cin >> filePath;
    readFile(filePath);
    /*
        int vectorSize = 3;
        vector<int> nums;
        int duplicates = 2;
        for(int i = 0; i < vectorSize; i++) {
            nums.push_back(rand() % 5000);
            cout << i << " : " << nums[i] << endl;
        }

        cout << "---------------------------------------------------------" << endl;  */
    // duplicateVector(nums, vectorSize, duplicates);
    // cout << checkPalindrome("10011") << endl;
    return 0;
}

void readFile(string filePath)
{
    ifstream theFile(filePath);
    string line = "";
    string word = "";
    map<string, int> wordMap;
    int palindromeCounter, wordCounter;
    palindromeCounter = wordCounter = 0;
    if (theFile.is_open())
    {
        while (getline(theFile, line))
        {
            stringstream myStream(line);
            while (getline(myStream, word, ' '))
            {
                trim(word);
                wordCounter++;
                if (checkPalindrome(word))
                {
                    palindromeCounter++;
                    updateWordCount(wordMap, word);
                }
            }
        }
        theFile.close();
    }
    for (const auto &pair : wordMap)
    {
        cout << pair.first << " : " << pair.second << endl;
    }
    cout << "Out of " << wordCounter << " words, " << palindromeCounter << " were palindromes." << endl;
}

void trim(string &str)
{
    vector<char> specialCharacters = {' ', '\t', '\n', '.', ';', '*', '\'', '\"', '-', '+'};
    for (char c : specialCharacters)
    {
        while (str.find(c) != string::npos)
        {
            str.erase(remove(str.begin(), str.end(), c), str.end());
        }
    }
}

bool isWord(string word)
{
    for (int i = 0; i < word.length(); i++)
    {
        int number = int(word[i]);
        if (!((number >= 65 && number <= 90) || (number >= 97 && number <= 122)))
        {
            return false;
        }
    }
    return true;
}

bool checkPalindrome(string word)
{
    if (word.length() <= 2 || !isWord(word))
        return false;
    int index1, index2;
    bool isPalindrome = true;
    index1 = 0;
    index2 = word.length() - 1;

    while (index1 <= index2)
    {
        if ((char)tolower(word[index1]) != (char)tolower(word[index2]))
        {
            isPalindrome = false;
            break;
        }
        index1++;
        index2--;
    }
    return isPalindrome;
}

void updateWordCount(map<string, int> &myMap, string word)
{
    if (myMap.find(word) != myMap.end())
    {
        myMap[word]++;
    }
    else
    {
        myMap[word] = 1;
    }
}

void duplicateVector(vector<int> vecToDuplicate, int vecSize, int duplicates)
{
    vector<int> ans;

    for (int i = 0; i < vecSize * duplicates; i++)
    {
        ans.push_back(vecToDuplicate[i % vecSize]);
    }

    for (int elem : ans)
    {
        cout << elem << endl;
    }
}