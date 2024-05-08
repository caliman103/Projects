#ifndef SET2_H
#define SET2_H

#include<iostream>
#include<string>
#include <vector> 


#include "struct.h"

using namespace std;


  

class SetADT
{   
    private:
        Record rec;
        vector <Record> elements;
       
    
    public:
        //constructor functions
        SetADT(void) {elements.resize(0);}
        SetADT(Record); 
      
        
        //Accessor functions
        int amount() const {return elements.size();}
        string getRecord(int) const; 
        int findIndex(const int); 
        bool find(const int) const;
        string display();
       
    
        //Mutator Functions
        Record convertFromFile(fileRecord);
        Record convertFromWX(wxRecord);
        void add(Record);
        void addSetA(Record);
        void addSetB(Record);
     //   wxString removeElem(int);
        void removeElem(long);
        void deleteAll() {elements.resize(0);}
        void removeFirst();
        void removeLast();
        void intersect(const SetADT*, const SetADT*);
        void Union (const SetADT*, const SetADT*);
     
};



SetADT::SetADT(Record studentRecord)
{
    elements.resize(0);
   
   elements.push_back(studentRecord);
    
}

string SetADT::getRecord(int i) const
{
    
    Record tempRec;
    string student = "";
    string GPA = "";
    
    
    if(i <= elements.size() )
    {
       tempRec = elements[i];
       
    GPA = to_string(tempRec.gpa);
    GPA.erase(GPA.find_last_not_of('0') + 1, std::string::npos);
    
    student = to_string(tempRec.ID) + "\t" + tempRec.name + "\t" + tempRec.surname + "\t" + tempRec.major + "\t" + GPA + "\n";
    
    return student;
    }
  //  if(i = -1)
  //      return "Index out of Range";
  
  
}



bool SetADT::find(const int studentID) const
{
    Record tempRec;
    int idNo;
    for(int i = 0; i < elements.size(); i++)
    {
        tempRec = elements[i];
        idNo = tempRec.ID;
        if(idNo == studentID)
            return true;
    }   
    return false;
        
}


int SetADT::findIndex(const int studentID)
{
    Record tempRec;
    int idNo;
    if( find(studentID) == 1)
    {
        for(int i = 0; i < elements.size(); i++)
        {   tempRec = elements[i];
            idNo = tempRec.ID;
            if(idNo == studentID)
                return i;
        }   
    }
    return -1;
}

string SetADT::display()
{
    int i;
    string vec;
    Record tempRec;
    
    for(i = 0; i < elements.size(); i++)
    {
        vec.append(getRecord(i) );
        
    }
    return vec;
}


Record SetADT::convertFromFile(fileRecord fileStudent) 
{
    Record convertedRecord;
    convertedRecord.ID = fileStudent.ID;
    
    string ConvName = fileStudent.name;
    convertedRecord.name = ConvName;
    
    string ConvSurname = fileStudent.surname;
    convertedRecord.surname = ConvSurname;
    
    string ConvMajor = fileStudent.major;
    convertedRecord.major = ConvMajor;
    
    convertedRecord.gpa = fileStudent.gpa;
    
    
    return convertedRecord;
    
}


Record SetADT::convertFromWX(wxRecord userStudent)
{
    Record convertedRecord;
    convertedRecord.ID = userStudent.ID;
    
    string ConvName = string(userStudent.name.mb_str() );
    convertedRecord.name = ConvName;
    
    
    string ConvSurname = string(userStudent.surname.mb_str() );
    convertedRecord.surname = ConvSurname;
    
    
    string ConvMajor = string(userStudent.major.mb_str() );
    convertedRecord.major = ConvMajor;
    
    
    convertedRecord.gpa = userStudent.gpa;
    
    return convertedRecord;
}


void SetADT::add(Record studentRecord)
{
    
    int idNo = studentRecord.ID;
    if( find(idNo ) )
        return;
        
    else
    {
        rec = studentRecord;
        
        elements.push_back(rec);
        
    }
    
    return;
}

void SetADT::addSetA(Record studentRecord)
{
    int idNo = studentRecord.ID;
    if( find(idNo ) )
        return;
        
    else
    {
       string major = studentRecord.major;
        
        if(major.compare("COMP") == 0 )
            elements.push_back(studentRecord);
        
    }
        
}


void SetADT::addSetB(Record studentRecord)
{
    int idNo = studentRecord.ID;
    if( find(idNo ) )
        return;
        
    else
    {
       string major = studentRecord.major;
        
        if(major.compare("IT") == 0 )
            elements.push_back(studentRecord);
        
    }
        
}

/*
string SetADT::removeElem(wxstring studentRecord)
{
    if(studentRecord == "Index out of Range")
        return studentRecord;
    else
    {
        int i = 0;
        string tempRec = getRecord(i);
        
        while( (i <= elements.size() ) && ( tempRec.compare(studentRecord) != 0) )//travels along the vector
        {
            i++;
            tempRec = getRecord(i);
        }
        
        if(i == elements.size() ) // mot found
            return studentRecord;
        
        else                    //num was found
        {
            for(int j = i; j < elements.size(); j++) // travels to the end of vector from index i 
                elements[j] = elements[j+1];        //make the value at index j equal to the netx value in the vector
            
            elements.resize(elements.size() -1 );     // make the size of the vector one less
        }
        return studentRecord + " was successfully deleted";
    }
    
}
*/

void SetADT::removeElem(long studentID)
{
    
    if(find(studentID) == true)
    {
        int i;
    for(i = 0; i < elements.size() && elements[i].ID != studentID; i++);
    
        if(i == elements.size() ) // not found
                return;
        else
        {
            for(int j = i; j < elements.size()-1; j++)// travels to the end of vector from index i 
            {       
                elements[j] = elements[j+1];        //make the value at index j equal to the netx value in the vector
                    
            }
                
            elements.resize(elements.size() -1 );     // make the size of the vector one less
        }
        return;
    }
    else
        return;
    
}

/*
void SetADT::removeElem(long studentID)
{
    int i, j;
    
   for(i = 0; i < elements.size() && elements[i].ID != studentID; i++);
   
    if(i == elements.size() ) // mot found
            return;
    else
    {
       
        elements.resize(0);     // make the size of the vector one less
    }
    return;
    
}
*/

/*
void SetADT::removeFirst()
{
    if(elements.size() == 0)
        return;
    else
    {
        for(int i = 0; i < elements.size(); i++)
            elements[i] = elements[i+1];
        
        elements.resize(elements.size() -1 );
        
    }
    return;
}



void SetADT::removeLast()
{
    if(elements.size() == 0)
        return;
    else
        elements.pop_back(); 
    
    return;
}

*/


void SetADT::intersect(const SetADT* A, const SetADT* B)
{
    int i, j;
    Record elemInA, elemInB;
    elements.resize(0);    
    
    for(int i = 0; i < A->amount(); i++)
    {
        elemInA = A->elements[i];
        float grade = elemInA.gpa;
        
        if(grade >= 3.60)
            elements.push_back(elemInA);
        
    }
    
    for(int i = 0; i < B->amount(); i++)
    {
        elemInB = B->elements[i];
        float grade = elemInB.gpa;
        
        if(grade >= 3.60)
            elements.push_back(elemInB);
        
    }
        
    return;
            
}


void SetADT::Union(const SetADT* A, const SetADT* B)
{
    Record elemInA, elemInB;
    
    
    elements.resize(0);
    
    if(A->amount() >= B->amount() )
    {
        elements = A->elements;
        
        for(int i = 0; i < B->amount(); i++)
        {
            elemInB = B->elements[i];
            int idNo = elemInB.ID;
            
            if(A->find(idNo) == false)
                elements.push_back(elemInB );

            
        }
        return;
    }
    if(A->amount() < B->amount() )
    {
        elements = B->elements;
        
        for(int i = 0; i < A->amount(); i++)
        {
            elemInA = A->elements[i];
            int idNo = elemInA.ID;
            
            if(B->find(idNo) == false)
                elements.push_back(elemInA );
        }
        return;
    }
    
    
}







#endif
