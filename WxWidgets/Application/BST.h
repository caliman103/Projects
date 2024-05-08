#ifndef BST_BSTree_h
#define BST_BSTree_h

#include<iostream>
#include<string>


#include "struct.h"


using namespace std;

class BSTNode
{
    
   private:
         Record rec;
         BSTNode* left;
         BSTNode* right;
        
    public:
        //constructor functions
        BSTNode(){right = left = NULL; }
        BSTNode(Record studentRecord){rec = studentRecord; right = left = NULL;}
        
        //Accessor functions
        BSTNode* getLeft() {return left;}
        BSTNode* getRight() {return right;}
        Record getRecord() {return rec;} 
        long getID() {return rec.ID;}
        string getName() {return rec.name;}
        string getSurname() {return rec.surname;}
        string getMajor() {return rec.major;}
        float getGPA() {return rec.gpa;}
        string recAsString (Record);
        
        //Mutator functions
        void setRecord(Record studentRecord) {rec = studentRecord;}
        void setID(long newID) {rec.ID = newID;}
        void setName(string  newName) {rec.name = newName;}
        void setSurname(string newSurname) {rec.surname = newSurname;}
        void setMajor(string newMajor) {rec.major = newMajor;}
        void setGPA(float newGPA) {rec.gpa = newGPA;}
        void setLeft(BSTNode* ptr) {left = ptr;}
        void setRight (BSTNode* ptr) {right = ptr;}
        
};

string BSTNode::recAsString(Record studentRecord)
{
    string student = "";
    string GPA = "";
    
    GPA = to_string(studentRecord.gpa);
    GPA.erase(GPA.find_last_not_of('0') + 1, std::string::npos);
    
    student = to_string(studentRecord.ID) + "\t" + studentRecord.name + "\t" + studentRecord.surname + "\t" + studentRecord.major + "\t" + GPA + "\n";
    
    return student;
}
      

class BST
{
    private:
        BSTNode* root;
    
        //Recursive counterpart for inserting a node
        BSTNode* insertHelper (BSTNode*, Record);

        //Recursive counterpart for deleting a node
        BSTNode* deleteNode(BSTNode*, long);
        BSTNode* deleteHelper(BSTNode*, long);


        //Recursive counterpart of preOrder traversal
        string preOrderHelper(BSTNode*);

        //Recursive counterpart of postOrder traversal
        string postOrderHelper(BSTNode*);

        //Recursive counterpart of inOrder traversal
        string inOrderHelper(BSTNode*);
        
    public:
       //constructor function
        BST() {root = NULL;}
        
        //Accessor functions
        BSTNode* getRoot() {return root;}
        string preOrder()  {return preOrderHelper(root); }
        string postOrder()  {return postOrderHelper(root); }
        string inOrder()  {return inOrderHelper(root); }
        bool find(long);
        Record findRecord(long);
        Record convertFromFile(fileRecord);
        Record convertFromWX(wxRecord);
        
        //Mutator functions
        
        void deleteAll() {root = NULL;}
        void insert(Record studentRecord) {root = insertHelper(root, studentRecord); }
        void remove(long IDnumber) {root = deleteHelper(root, IDnumber); }
};
      




bool BST::find(long IDnumber)
{
    BSTNode* search = root;
    
    while( search != NULL ) // until a leaf is reached
    {
        if(IDnumber > search->getID() ) //search the right sub-tree
            search = search->getRight();
        
        if(IDnumber < search->getID() ) //search the left sub-tree
            search = search->getLeft();
        
        if(IDnumber == search->getID() )
        return true;
    }
    
    return false;
    
}

Record BST::findRecord(long IDnumber)
{
    if(find(IDnumber) == true)
    {
        BSTNode* search = root;
        
        if(IDnumber == search->getID() ) //ID found at root
            return search->getRecord();
        else
        {
            while( (IDnumber != search->getID() ) && (search != NULL) ) // searcgh until the record i found
            {
                if(IDnumber > search->getID() ) //search the right sub-tree
                    search = search->getRight();
                
                if(IDnumber < search->getID() ) //search the left sub-tree
                    search = search->getLeft();
            
                if(IDnumber == search->getID() )
                return search->getRecord();
            }
            
            
        }
    }
}



Record BST::convertFromFile(fileRecord fileStudent) 
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


Record BST::convertFromWX(wxRecord userStudent)
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






BSTNode* BST::insertHelper(BSTNode* ptr, Record studentRecord)
{
    if( ptr == NULL)
    {
        ptr = new BSTNode(studentRecord);
    }
    else
    {
        if ( studentRecord.ID > ptr->getID() )
            ptr->setRight(insertHelper(ptr->getRight(), studentRecord) );
        
        if ( studentRecord.ID < ptr->getID() )
            ptr->setLeft(insertHelper(ptr->getLeft(), studentRecord) );
        
    }
    return ptr;
}
    
    
BSTNode* BST::deleteHelper(BSTNode* ptr, long IDnumber)
{
    BSTNode* successor;
    

    //Base conition
    if(ptr == NULL)
    {
        return NULL;
    }
   
    else
    {   
        if(IDnumber > ptr->getID() ) //Search in the right sub-tree for the record
            ptr->setRight( deleteHelper(ptr->getRight(), IDnumber) ); 
        
        else if (IDnumber < ptr->getID() ) //Search in the left sub-tree for the record
            ptr->setLeft( deleteHelper (ptr->getLeft(),  IDnumber) );
        
            else //The record to be deleted was found
            {
                if(ptr->getRight() != NULL)
                {
                    //delete the successor of the node the 
                    successor = ptr->getRight();          //Go right
                    while(successor->getLeft() != NULL)  //go deep left
                        successor = successor->getLeft();
                    
                    
                    //Transfer data from successor to ptr
                    ptr->setRecord(successor->getRecord() );
                    
                    //Now reset ptr's right child
                    ptr->setRight(deleteHelper(ptr->getRight(), ptr->getID() ) );
                    
                }
                else
                    return (ptr->getLeft() );
                
            }
        return (ptr);
    }
    
}
    
    
string BST::preOrderHelper(BSTNode* ptr)
{
    string display = "";
    
    if( ptr !=  NULL)
        {
            display.append( ptr->recAsString(ptr->getRecord() ) );
        
            display.append( preOrderHelper(ptr->getLeft() ) ); 
            display.append( preOrderHelper(ptr->getRight()) );
            
        }
        return display;
    
}

string BST::postOrderHelper(BSTNode* ptr)
{
     string display = "";

    if ( ptr != NULL )
        {
            display.append( postOrderHelper(ptr->getLeft() ) );
            display.append( postOrderHelper(ptr->getRight () ) );
        
            display.append( ptr->recAsString(ptr->getRecord() ) );
            
            }
    return display;
}


string BST::inOrderHelper(BSTNode* ptr)
{
    string display= "";
    
    if ( ptr != NULL )
        {
            display.append( inOrderHelper(ptr->getLeft()) );
        
            display.append( ptr->recAsString(ptr->getRecord() ) );
            
        
            display.append( inOrderHelper(ptr->getRight()) );
            }
    return display;
    
}
        
#endif
