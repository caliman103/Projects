#ifndef STRUCT_H
#define STRUCT_H

#include<iostream>
#include<string>
#include <vector> 

using namespace std;

struct record
{
    long ID;
    string name;
    string surname;
    string major;
    float gpa;

};
typedef struct record Record;



struct filerecord
{
    long ID;
    char name[10];
    char surname[15];
    char major[15];
    float gpa;

};
typedef struct filerecord fileRecord;



struct wxrecord
{
    long ID;
    wxString name;
    wxString surname;
    wxString major;
    float gpa;
    
};
typedef struct wxrecord wxRecord;


#endif
